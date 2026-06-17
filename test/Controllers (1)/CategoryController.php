<?php

namespace App\Http\Controllers;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;           // <--- để dùng Str::slug
use Illuminate\Validation\ValidationException; // 
class CategoryController extends Controller
{
    // Hiển thị danh sách phân trang + tìm kiếm + lọc trạng thái
    public function index(Request $request)
    {
        $query = Category::query();

        if ($search = $request->input('search')) {
            $query->where('name', 'like', "%$search%");
        }

        if (!is_null($request->input('status')) && $request->input('status') !== '') {
            $query->where('status', $request->input('status'));
        }

        $perPage = 10;
        $categories = $query->orderBy('id', 'desc')->paginate($perPage);

        return response()->json($categories);
    }
public function all()
{
    $categories = Category::where('status', 1)->orderBy('name')->get();
    return response()->json($categories);
}

    // Thêm mới
    // public function store(Request $request)
    // {
    //     $request->validate([
    //              'name' => 'required|string|max:255|unique:categories,name',
    // ], [
    //     'name.unique' => 'Tên danh mục đã tồn tại, vui lòng chọn tên khác.',
    //         // 'name' => 'required|string|max:255',
    //         // 'slug' => 'required|string|max:255|unique:categories',
    //     ]);
    //     $data = $request->only(['name', 'status']);
    //     $data['slug'] = Str::slug($request->name);
    //     $category = Category::create($request->all());
    //     return response()->json($category, 201);
    // }

    // Lấy chi tiết danh mục
    public function show(string $id)
    {
        $category = Category::findOrFail($id);
        return response()->json($category);
    }

    // Cập nhật
    // public function update(Request $request, string $id)
    // {
    //     $category = Category::findOrFail($id);

    //     $request->validate([
    //              'name' => 'required|string|max:255|unique:categories,name,' . $id, 
    //     // trừ category hiện tại để tránh báo lỗi khi giữ tên
    // ], [
    //     'name.unique' => 'Tên danh mục đã tồn tại, vui lòng chọn tên khác.',
    //         // 'name' => 'required|string|max:255',
    //         // 'slug' => 'required|string|max:255|unique:categories,slug,' . $id,
    //     ]);
    //     $data = $request->only(['name', 'status']);
    //     $data['slug'] = Str::slug($request->name);
    //     $category->update($data);
    //     // $category->update($request->all());
    //     return response()->json($category);
    // }
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255|unique:categories,name',
                'description' => 'nullable|string',

            ], [
                'name.unique' => 'Tên danh mục đã tồn tại, vui lòng chọn tên khác.',
            ]);

            $data = $request->only(['name', 'status','description']);
            $data['slug'] = Str::slug($request->name);
            $category = Category::create($data);

            return response()->json($category, 201);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => $e->validator->errors()->first()
            ], 422);
        }
    }

    // Cập nhật
    public function update(Request $request, string $id)
    {
        $category = Category::findOrFail($id);

        try {
            $request->validate([
                'name' => 'required|string|max:255|unique:categories,name,' . $id,
                'description' => 'nullable|string',

            ], [
                'name.unique' => 'Tên danh mục đã tồn tại, vui lòng chọn tên khác.',
            ]);

            $data = $request->only(['name', 'status','description']);
            $data['slug'] = Str::slug($request->name);
            $category->update($data);

            return response()->json($category);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => $e->validator->errors()->first()
            ], 422);
        }
    }

    // Xóa
    public function destroy(string $id)
    {
        $category = Category::findOrFail($id);
        $category->delete();
        return response()->json(['message' => 'Category deleted']);
    }
}
