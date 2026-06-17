<?php
namespace App\Http\Controllers;

use App\Models\ProductSale;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductSaleController extends Controller
{
    // Danh sách + tìm kiếm + lọc + phân trang
    public function index(Request $request)
    {
        $query = ProductSale::with('product');

        if ($request->has('keyword')) {
            $query->where('name', 'like', "%{$request->keyword}%");
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('product_id')) {
            $query->where('product_id', $request->product_id);
        }

        $sales = $query->orderBy('date_begin', 'desc')->paginate(10);
        return response()->json($sales);
    }

    // Thêm mới
    public function store(Request $request)
    {
        $request->validate([
            'name'       => 'required|string|max:255',
            'product_id' => 'required|exists:products,id',
            'price_sale' => 'required|numeric',
            'date_begin' => 'required|date',
            'date_end'   => 'required|date|after:date_begin',
        ]);
        $sale = ProductSale::create([
                'name'       => $request->name,
                'product_id' => $request->product_id,
                'price_sale' => $request->price_sale,
                'date_begin' => $request->date_begin,
                'date_end'   => $request->date_end,
                'status'     => $request->status ?? 1,
                'created_by' => 1,
            ]);
            return response()->json($sale, 201);
    }

    // Chi tiết
    public function show($id)
    {
        $sale = ProductSale::with('product')->findOrFail($id);
        return response()->json($sale);
    }

    // Cập nhật
    public function update(Request $request, $id)
    {
        $sale = ProductSale::findOrFail($id);
        $sale->update($request->all());
        return response()->json($sale);
    }

    // Xóa
    public function destroy($id)
    {
        $sale = ProductSale::findOrFail($id);
        $sale->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }

    // Import excel (nâng cao)
public function import(Request $request)
{
    $request->validate([
        'file' => 'required|file|mimes:xlsx,xls',
    ]);

    $filePath = $request->file('file')->getRealPath();

    $reader = ReaderEntityFactory::createXLSXReader();
    $reader->open($filePath);

    $insertData = [];
    foreach ($reader->getSheetIterator() as $sheet) {
        foreach ($sheet->getRowIterator() as $index => $row) {
            if ($index === 1) continue; // bỏ dòng tiêu đề

            $cells = $row->toArray();

            // mapping cột Excel -> DB
            $insertData[] = [
                'name'       => $cells[0] ?? null,
                'product_id' => $cells[1] ?? null,
                'price_sale' => $cells[2] ?? null,
                'date_begin' => $cells[3] ?? null,
                'date_end'   => $cells[4] ?? null,
                'status'     => $cells[5] ?? 1,
                'created_by' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }
    }

    $reader->close();

    // chèn batch vào DB
    if (!empty($insertData)) {
        ProductSale::insert($insertData);
    }

    return response()->json([
        'message' => 'Import thành công',
        'rows'    => count($insertData),
    ]);
}
    // // Export excel (nâng cao)
    // public function export(Request $request)
    // {
    //     $sales = ProductSale::with('product')->get();

    //     $writer = WriterEntityFactory::createXLSXWriter();
    //     $filePath = storage_path('app/public/product_sales_export.xlsx');
    //     $writer->openToFile($filePath);

    //     // Header
    //     $header = ['Name', 'Product ID', 'Price Sale', 'Date Begin', 'Date End', 'Status'];
    //     $headerRow = WriterEntityFactory::createRowFromArray($header);
    //     $writer->addRow($headerRow);

    //     // Data
    //     foreach ($sales as $sale) {
    //         $row = [
    //             $sale->name,
    //             $sale->product_id,
    //             $sale->price_sale,
    //             $sale->date_begin,
    //             $sale->date_end,
    //             $sale->status,
    //         ];
    //         $dataRow = WriterEntityFactory::createRowFromArray($row);
    //         $writer->addRow($dataRow);
    //     }

    //     $writer->close();

    //     return response()->download($filePath)->deleteFileAfterSend(true);
    // }
}
