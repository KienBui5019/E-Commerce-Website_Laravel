<?php
namespace App\Http\Controllers;

use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BannerController extends Controller
{
    // Danh sách banner (phân trang + tìm kiếm + lọc trạng thái)
    public function index(Request $request)
    {
        $query = Banner::query();

        // Tìm kiếm theo tên
        if ($search = $request->input('search')) {
            $query->where('name', 'like', "%$search%");
        }

        // // Lọc theo trạng thái
        // if (!is_null($request->input('status'))) {
        //     $query->where('status', $request->input('status'));
        // }
        // ✅ Lọc theo vị trí (slideshow / ads)
            if ($position = $request->input('position')) {
                $query->where('position', $position);
            }

        // Phân trang
        $perPage = $request->input('per_page', 10);
        $banners = $query->orderBy('sort_order', 'asc')->paginate($perPage);

        return response()->json($banners);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name'   => 'required|string|max:255',
            'image'  => 'required|image|mimes:jpg,jpeg,png,gif|max:2048',
            'link'   => 'nullable|string|max:255',
            'position' => 'required|in:slideshow,ads',
            'description'=> 'nullable|string',
            'sort_order' => 'nullable|integer',
            'status'     => 'nullable|integer',

        ]);

        // Lưu file ảnh vào storage
        $image = $request->file('image');
        $imageName = $image->getClientOriginalName(); // tên gốc
        $image->move(public_path('uploads/banners'), $imageName);

        $banner = Banner::create([
            'name'       => $request->name,
            'image'      => $imageName, // lưu tên gốc vào DB
            'link'       => $request->link,
            'position'   => $request->position,
            'sort_order' => $request->sort_order ?? 0,
            'description'=> $request->description,
            'status'     => $request->status ?? 1,
            'created_by' => 1, // tạm hardcode
        ]);

        return response()->json($banner, 201);
    }

    // Cập nhật banner
    public function update(Request $request, $id)
    {
        $banner = Banner::findOrFail($id);

        $request->validate([
            'name'   => 'required|string|max:255',
            'image'  => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
            'link'   => 'nullable|string|max:255',
            'position' => 'required|in:slideshow,ads',
            'description'=> 'nullable|string',
            'sort_order' => 'nullable|integer',
            'status'     => 'nullable|integer',

        ]);

        $data = $request->only(['name', 'link', 'position', 'sort_order', 'description', 'status']);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = $image->getClientOriginalName();
            $image->move(public_path('uploads/banners'), $imageName);
            $data['image'] = $imageName;
        }

        $data['updated_by'] = 1; // tạm hardcode
        $banner->update($data);

        return response()->json($banner);
    }

    // Xóa banner
    public function destroy($id)
    {
        $banner = Banner::findOrFail($id);

        // Nếu muốn xóa luôn file ảnh:
        $filePath = public_path('uploads/banners/' . $banner->image);
        if (file_exists($filePath)) {
            unlink($filePath);
        }

        $banner->delete();
        return response()->json(['message' => 'Banner deleted']);
    }
}
