<?php
namespace App\Http\Controllers;

use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductImageController extends Controller
{
    // Lấy danh sách ảnh theo product_id
    // public function index($productId)
    // {
    //     $query = ProductImage::query();

    //         if ($request->has('product_id')) {
    //             $query->where('product_id', $request->product_id);
    //         }

    //         return $query->get();    }
public function getByProduct($productId)
{
    return ProductImage::where('product_id', $productId)->get();
}
    // Thêm ảnh
    // public function store(Request $request, $productId)
    // {
    //     $request->validate([
    //         'image' => 'required|image',
    //         'alt' => 'nullable|string',
    //         'title' => 'nullable|string',
    //     ]);

    //     $path = $request->file('image')->store('products', 'public');

    //     $image = ProductImage::create([
    //         'product_id' => $productId,
    //         'image' => $path,
    //         'alt' => $request->alt,
    //         'title' => $request->title,
    //     ]);

    //     return response()->json($image, 201);
    // }
public function store(Request $request, $productId)
{
    $request->validate([
        'image' => 'required|image|max:2048',
        'alt' => 'nullable|string|max:255',
        'title' => 'nullable|string|max:255',
    ]);

    if ($request->hasFile('image')) {
        $file = $request->file('image');
        $filename = $file->getClientOriginalName();
        $file->move(public_path('images/products'), $filename);

        $image = ProductImage::create([
            'product_id' => $productId,
            'image' => $filename, // lưu đường dẫn relative
            // 'image' => 'products/' . $filename, // lưu đường dẫn relative
            'alt' => $request->alt,
            'title' => $request->title,
        ]);

        return response()->json($image, 201);
    }

    return response()->json(['message' => 'No image uploaded'], 400);
}

// Update ảnh
public function update(Request $request, $id)
{
    $request->validate([
        'image' => 'nullable|image|max:2048',
        'alt' => 'nullable|string|max:255',
        'title' => 'nullable|string|max:255',
    ]);

    $image = ProductImage::findOrFail($id);

    if ($request->hasFile('image')) {
        // Xóa file cũ
        if (file_exists(public_path('images/' . $image->image))) {
            unlink(public_path('images/' . $image->image));
        }

        $file = $request->file('image');
        $filename = $file->getClientOriginalName();
        $file->move(public_path('images/products'), $filename);
        $image->image = 'products/' . $filename;
    }
    //         $file = $request->file('image');
    //     $filename = time() . '_' . $file->getClientOriginalName();
    //     $file->move(public_path('images/products'), $filename);
    //     $image->image = 'products/' . $filename;
    // }

    $image->alt = $request->alt ?? $image->alt;
    $image->title = $request->title ?? $image->title;
    $image->save();

    return response()->json($image);
}
    // Xóa ảnh
    public function destroy($id)
    {
        $image = ProductImage::findOrFail($id);
        Storage::disk('public')->delete($image->image);
        $image->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
