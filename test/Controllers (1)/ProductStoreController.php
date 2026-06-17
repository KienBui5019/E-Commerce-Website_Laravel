<?php

namespace App\Http\Controllers;

use App\Models\ProductStore;
use Illuminate\Http\Request;
use Box\Spout\Reader\Common\Creator\ReaderEntityFactory;

class ProductStoreController extends Controller
{
    // Danh sách + tìm kiếm + phân trang
    public function index(Request $request)
    {
        $query = ProductStore::with('product');

        if ($request->has('keyword')) {
            $keyword = $request->keyword;
            $query->whereHas('product', function ($q) use ($keyword) {
                $q->where('name', 'like', "%$keyword%");
            });
        }

        $stores = $query->orderBy('created_at', 'desc')->paginate(10);
        return response()->json($stores);
    }

    // Thêm mới
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'price_root' => 'required|numeric',
            'qty'        => 'required|integer|min:1',
        ]);

        $store = ProductStore::create([
            'product_id' => $request->product_id,
            'price_root' => $request->price_root,
            'qty'        => $request->qty,
            'status'     => $request->status ?? 1,
            'created_at' => now(),
            'created_by' => 1,
        ]);

        return response()->json($store, 201);
    }

    // Chi tiết
    public function show($id)
    {
        $store = ProductStore::with('product')->findOrFail($id);
        return response()->json($store);
    }

    // Cập nhật
    public function update(Request $request, $id)
    {
        $store = ProductStore::findOrFail($id);
        $request->validate([
            'price_root' => 'required|numeric',
            'qty'        => 'required|integer|min:1',
        ]);

        $store->update([
            'price_root' => $request->price_root,
            'qty'        => $request->qty,
            'status'     => $request->status ?? $store->status,
            'updated_at' => now(),
            'updated_by' => 1,
        ]);

        return response()->json($store);
    }

    // Xóa
    public function destroy($id)
    {
        $store = ProductStore::findOrFail($id);
        $store->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }

    // Import Excel
    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls',
        ]);

        $filePath = $request->file('file')->getRealPath();

        $reader = ReaderEntityFactory::createXLSXReader();
        $reader->open($filePath);

        $insertData = [];
        foreach ($reader->getSheetIterator() as $sheet) {
            foreach ($sheet->getRowIterator() as $index => $row) {
                if ($index === 1) continue; // bỏ dòng tiêu đề
                $cells = $row->toArray();

                $insertData[] = [
                    'product_id' => $cells[0] ?? null,
                    'price_root' => $cells[1] ?? null,
                    'qty'        => $cells[2] ?? null,
                    'status'     => $cells[3] ?? 1,
                    'created_at' => now(),
                    'created_by' => 1,
                ];
            }
        }
        $reader->close();

        if (!empty($insertData)) {
            ProductStore::insert($insertData);
        }

        return response()->json([
            'message' => 'Import thành công',
            'rows'    => count($insertData),
        ]);
    }
}
