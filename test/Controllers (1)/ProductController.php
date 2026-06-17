<?php

// namespace App\Http\Controllers;

// use App\Models\Product;
// use App\Models\ProductStore;
// use App\Models\ProductSale;
// use App\Models\ProductImage;
// use App\Models\Category;
// use App\Models\OrderDetail;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\DB;
// use Illuminate\Support\Str;
// use Carbon\Carbon;

// class ProductController extends Controller
// {
//     // public function index()
//     // {
//     //     $products = Product::with(['store', 'sale', 'images', 'category','orderDetails'])
//     //         ->withSum('orderDetails as total_sold', 'qty') // tính tổng số lượng đã bán
//     //         ->get();

//     //     return response()->json($products);
//     // }
//     public function index(Request $request)
// {
//     $query = Product::with(['store', 'sale', 'images', 'category', 'orderDetails'])
//         ->withSum('orderDetails as total_sold', 'choseqty'); // tính tổng số lượng đã bán

//     // Lọc theo danh mục nếu có
//     if ($request->has('category_id') && $request->category_id != '') {
//         $query->where('category_id', $request->category_id);
//     }

//     // Tìm kiếm theo tên sản phẩm
//     if ($request->has('search') && $request->search != '') {
//         $search = $request->search;
//         $query->where('name', 'like', "%$search%");
//     }

//     // Phân trang
//     $perPage = $request->input('per_page', 10); // mặc định 10 sản phẩm/trang
//     $products = $query->orderBy('created_at', 'desc')->paginate($perPage);

//     return response()->json($products);
// }

//     public function create()
//     {
//         return response()->json([
//             'categories' => DB::table('categories')->select('id','name')->get(),
//         ]);

//     }
//         public function store(Request $request)
//     {
//         $data = $request->validate([
//             'name'        => 'required|string|max:255',
//             'category_id'    => 'required|exists:categories,id',
//             'thumbnail' => 'required|file|mimes:jpg,jpeg,png,gif|max:2048',
//             'description' => 'nullable|string',
//             'price_buy'   => 'required|numeric',

//         ]);

//         $data['slug'] = Str::slug($request->slug);  
//         $data['created_by'] = 1;
//         $data['created_at'] = now();
//         $data['status'] = 1;
//         $data['content'] = $request->input('content', '');

// //
// if ($request->hasFile('thumbnail')) {
//         $filename =$request->file('thumbnail')->getClientOriginalName();
//         $request->file('thumbnail')->move(public_path('images/products'), $filename);
//         $data['thumbnail'] = $filename;
//     }
//     //
//         // $product = Product::create($data);
// try {
//     $product = Product::create($data);
//     return response()->json([
//         'message' => 'Thêm sản phẩm thành công',
//         'product' => $product
//     ], 201);
// } catch (\Exception $e) {
//     return response()->json([
//         'message' => 'Lỗi server',
//         'error' => $e->getMessage()
//     ], 500);
// }

//         return response()->json(['message' => 'Thêm sản phẩm thành công', 'product' => $product], 201);
//     }

// // public function store(Request $request)
// // {
// //     // 1. Validate dữ liệu đầu vào
// //     $request->validate([
// //         'name'        => 'required|string|max:255',
// //         'category_id' => 'required|integer',
// //         // 'thumbnail'   => 'required|file|mimes:jpg,jpeg,png,gif|max:2048',
// //         'thumbnail' => 'required|string|max:255',

// //         'description' => 'nullable|string',
// //         'price_buy'   => 'required|numeric',
// //         'qty'         => 'required|integer',
// //         'price_sale'  => 'nullable|numeric',
// //     ]);

// //     // 2. Bắt đầu transaction để đảm bảo dữ liệu đồng bộ
// //     DB::transaction(function () use ($request) {
// //         // 2.1 Xử lý ảnh thumbnail
// //         if ($request->hasFile('thumbnail')) {
// //         $filename =$request->file('thumbnail')->getClientOriginalName();
// //         $request->file('thumbnail')->move(public_path('images/posts'), $filename);
// //         $data['thumbnail'] = $filename;
// //     }

// //         // $filename = 'default.png';
// //         // if ($request->hasFile('thumbnail')) {
// //         //     $file     = $request->file('thumbnail');
// //         //     $filename = $file->getClientOriginalName(); // lấy tên gốc
// //         //     $file->move(public_path('images/products'), $filename); // lưu file
// //         // }

// //         // 2.2 Tạo product
// //         $product = Product::create([
// //             'name'        => $request->name,
// //             'slug'        => Str::slug($request->name),
// //             'thumbnail'   => $filename, // chỉ lưu tên file
// //             'description' => $request->description,
// //             'category_id' => $request->category_id,
// //             'status'      => $request->status ?? 1,
// //             'created_by'  => 1,
// //         ]);

// //         // 2.3 Tạo bản ghi ProductStore
// //         ProductStore::create([
// //             'product_id' => $product->id,
// //             'price_root' => $request->price_buy,
// //             'qty'        => $request->qty,
// //             'status'     => 1,
// //             'created_by' => 1,
// //         ]);

// //         // 2.4 Nếu có giá sale -> thêm ProductSale
// //         if ($request->price_sale) {
// //             ProductSale::create([
// //                 'product_id' => $product->id,
// //                 'price_sale' => $request->price_sale,
// //                 'date_begin' => $request->date_begin ?? Carbon::now(),
// //                 'date_end'   => $request->date_end ?? Carbon::now()->addDays(7),
// //                 'status'     => 1,
// //                 'created_by' => 1,
// //             ]);
// //         }
// //     });

// //     // 3. Trả về JSON response
// //     return response()->json(['message' => 'Product created successfully']);
// // }


//     public function show($slug)
//     {
//         $product = Product::with(['store', 'sale', 'images', 'category'])
//                         ->withSum('orderDetails as total_sold', 'choseqty')
//                         ->where('slug', $slug)
//                         ->first();

//         if (!$product) {
//             return response()->json(['message'=>'Product not found'], 404);
//         }

//         return response()->json($product);
//     }
//     public function edit($id)
//     {
//         $product = Product::with(['store', 'sale', 'images'])->find($id);
//         if (!$product) return response()->json(['message'=>'Product not found'], 404);

//         return response()->json([
//             'product' => $product,
//             'categories' => DB::table('categories')->select('id','name')->get(),
//         ]);
//     }
//     public function update(Request $request, $id)
//     {
//         $product = Product::find($id);
//         if (!$product) return response()->json(['message'=>'Product not found'], 404);

//         DB::transaction(function() use ($request, $product) {
//             $product->update([
//                 'name' => $request->name ?? $product->name,
//                 'slug' => $request->name ? Str::slug($request->name) : $product->slug,
//                 'thumbnail' => $request->thumbnail ?? $product->thumbnail,
//                 'description' => $request->description ?? $product->description,
//                 'category_id' => $request->category_id ?? $product->category_id,
//                 'status' => $request->status ?? $product->status,
//                 'updated_by' => 1,
//             ]);

//             $store = $product->store;
//             if ($store) $store->update([
//                 'price_root' => $request->price_buy ?? $store->price_root,
//                 'qty' => $request->qty ?? $store->qty,
//                 'updated_by' => 1,
//             ]);

//             if ($request->price_sale) {
//                 $sale = $product->sale;
//                 if ($sale) {
//                     $sale->update([
//                         'price_sale' => $request->price_sale,
//                         'date_begin' => $request->date_begin ?? $sale->date_begin,
//                         'date_end' => $request->date_end ?? $sale->date_end,
//                         'updated_by' => 1,
//                     ]);
//                 } else {
//                     ProductSale::create([
//                         'product_id' => $product->id,
//                         'price_sale' => $request->price_sale,
//                         'date_begin' => $request->date_begin ?? Carbon::now(),
//                         'date_end' => $request->date_end ?? Carbon::now()->addDays(7),
//                         'status' => 1,
//                         'created_by' => 1,
//                     ]);
//                 }
//             }
//             if ($request->hasFile('thumbnail')) {
//                 $filename = $request->file('thumbnail')->getClientOriginalName();
//                 $request->file('thumbnail')->move(public_path('images/products'), $filename);
//                 $product->thumbnail = $filename;
//                 $product->save();
//             }
//         });

//         return response()->json(['message'=>'Product updated successfully']);
//     }

//     public function destroy($id)
//     {
//         $product = Product::find($id);
//         if (!$product) return response()->json(['message'=>'Product not found'], 404);

//         DB::transaction(function() use ($product) {
//             $product->store()->delete();
//             $product->sale()->delete();
//             $product->images()->delete();
//             $product->delete();
//         });

//         return response()->json(['message'=>'Product deleted successfully']);
//     }

//     // -------------------- CHỨC NĂNG ĐẶC BIỆT -------------------- //

//     // 1. Sản phẩm khuyến mãi
//     public function product_sale(Request $request)
//     {
//         $now = now();
//         $limit = $request->limit ?? 10;

//         // Lấy thông tin sản phẩm có tồn kho
//         $productStore = ProductStore::query()
//             ->select('product_id', 'price_root', 'qty');

//         // Lấy các sản phẩm đang khuyến mãi
//         $productSale = ProductSale::query()
//             ->select('product_id', 'price_sale')
//             ->where('date_begin', '<=', $now)
//             ->where('date_end', '>', $now);

//         // Join với bảng products
//         $products = Product::query()
//             ->joinSub($productStore, 'ps', function ($join) {
//                 $join->on('ps.product_id', '=', 'products.id')
//                     ->where('ps.qty', '>', 0); // chỉ lấy sản phẩm còn hàng
//             })
//             ->joinSub($productSale, 'psale', function ($join) {
//                 $join->on('psale.product_id', '=', 'products.id'); // chỉ lấy sản phẩm đang khuyến mãi
//             })
//             ->select(
//                 'products.id',
//                 'products.name',
//                 'products.thumbnail',
//                 'ps.price_root',
//                 'ps.qty',
//                 'psale.price_sale'
//             )
//             ->orderBy('products.created_at', 'desc')
//             ->limit($limit)
//             ->get();

//         return response()->json($products);
//     }

//     // 2. Sản phẩm mới
//     public function product_new($limit = 10)
//     {
//         $products = Product::with(['store','sale','images'])
//             ->where('created_at', '>=', Carbon::now()->subDays(5)) // chỉ lấy trong 3 ngày gần đây
//             ->orderBy('created_at','desc')
//             ->limit($limit)
//             ->get();
//         return response()->json($products);
//     }
//     // 3. Sản phẩm theo danh mục
// public function product_by_category($cat_id)
// {
//     $products = Product::where('category_id', $cat_id)
//         ->orderBy('id', 'DESC')
//         ->get();

//     return response()->json($products);
// }
//     // 4.Sản phẩm hot (theo lượt bán)
// public function product_hot(Request $request, $limit = 10)
// {
//     // Lấy limit từ query param nếu có
//     $limit = $request->input('limit', $limit);

//     // Query sản phẩm bán chạy nhất
//     $products = Product::with(['store','sale','images'])
//         ->withSum('orderDetails as total_sold', 'choseqty') // Tính tổng số lượng đã bán
//         ->orderByDesc('total_sold')
//         ->limit($limit)
//         ->get();

//     return response()->json($products);
// }

// }

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductStore;
use App\Models\ProductSale;
use App\Models\ProductImage;
use App\Models\Category;
use App\Models\OrderDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ProductController extends Controller
{
    // public function index()
    // {
    //     $products = Product::with(['store', 'sale', 'images', 'category','orderDetails'])
    //         ->withSum('orderDetails as total_sold', 'qty') // tính tổng số lượng đã bán
    //         ->get();

    //     return response()->json($products);
    // }
    public function index(Request $request)
{
    $query = Product::with(['store', 'sale', 'images', 'category', 'orderDetails'])
        ->withSum('orderDetails as total_sold', 'choseqty'); // tính tổng số lượng đã bán

    // Lọc theo danh mục nếu có
    if ($request->has('category_id') && $request->category_id != '') {
        $query->where('category_id', $request->category_id);
    }

    // Tìm kiếm theo tên sản phẩm
    if ($request->has('search') && $request->search != '') {
        $search = $request->search;
        $query->where('name', 'like', "%$search%");
    }

    // Phân trang
    $perPage = $request->input('per_page', 10); // mặc định 10 sản phẩm/trang
    $products = $query->orderBy('created_at', 'desc')->paginate($perPage);

    return response()->json($products);
}

    public function create()
    {
        return response()->json([
            'categories' => DB::table('categories')->select('id','name')->get(),
        ]);

    }
        public function store(Request $request)
    {
        $data = $request->validate([
            'name'        => 'required|string|max:255',
            'category_id'    => 'required|exists:categories,id',
            'thumbnail' => 'required|file|mimes:jpg,jpeg,png,gif|max:2048',
            'description' => 'nullable|string',
            'price_buy'   => 'required|numeric',

        ]);

        $data['slug'] = Str::slug($request->slug);  
        $data['created_by'] = 1;
        $data['created_at'] = now();
        $data['status'] = 1;
        $data['content'] = $request->input('content', '');

//
if ($request->hasFile('thumbnail')) {
        $filename =$request->file('thumbnail')->getClientOriginalName();
        $request->file('thumbnail')->move(public_path('images/products'), $filename);
        $data['thumbnail'] = $filename;
    }
    //
        // $product = Product::create($data);
try {
    $product = Product::create($data);
    return response()->json([
        'message' => 'Thêm sản phẩm thành công',
        'product' => $product
    ], 201);
} catch (\Exception $e) {
    return response()->json([
        'message' => 'Lỗi server',
        'error' => $e->getMessage()
    ], 500);
}

        return response()->json(['message' => 'Thêm sản phẩm thành công', 'product' => $product], 201);
    }

// public function store(Request $request)
// {
//     // 1. Validate dữ liệu đầu vào
//     $request->validate([
//         'name'        => 'required|string|max:255',
//         'category_id' => 'required|integer',
//         // 'thumbnail'   => 'required|file|mimes:jpg,jpeg,png,gif|max:2048',
//         'thumbnail' => 'required|string|max:255',

//         'description' => 'nullable|string',
//         'price_buy'   => 'required|numeric',
//         'qty'         => 'required|integer',
//         'price_sale'  => 'nullable|numeric',
//     ]);

//     // 2. Bắt đầu transaction để đảm bảo dữ liệu đồng bộ
//     DB::transaction(function () use ($request) {
//         // 2.1 Xử lý ảnh thumbnail
//         if ($request->hasFile('thumbnail')) {
//         $filename =$request->file('thumbnail')->getClientOriginalName();
//         $request->file('thumbnail')->move(public_path('images/posts'), $filename);
//         $data['thumbnail'] = $filename;
//     }

//         // $filename = 'default.png';
//         // if ($request->hasFile('thumbnail')) {
//         //     $file     = $request->file('thumbnail');
//         //     $filename = $file->getClientOriginalName(); // lấy tên gốc
//         //     $file->move(public_path('images/products'), $filename); // lưu file
//         // }

//         // 2.2 Tạo product
//         $product = Product::create([
//             'name'        => $request->name,
//             'slug'        => Str::slug($request->name),
//             'thumbnail'   => $filename, // chỉ lưu tên file
//             'description' => $request->description,
//             'category_id' => $request->category_id,
//             'status'      => $request->status ?? 1,
//             'created_by'  => 1,
//         ]);

//         // 2.3 Tạo bản ghi ProductStore
//         ProductStore::create([
//             'product_id' => $product->id,
//             'price_root' => $request->price_buy,
//             'qty'        => $request->qty,
//             'status'     => 1,
//             'created_by' => 1,
//         ]);

//         // 2.4 Nếu có giá sale -> thêm ProductSale
//         if ($request->price_sale) {
//             ProductSale::create([
//                 'product_id' => $product->id,
//                 'price_sale' => $request->price_sale,
//                 'date_begin' => $request->date_begin ?? Carbon::now(),
//                 'date_end'   => $request->date_end ?? Carbon::now()->addDays(7),
//                 'status'     => 1,
//                 'created_by' => 1,
//             ]);
//         }
//     });

//     // 3. Trả về JSON response
//     return response()->json(['message' => 'Product created successfully']);
// }


    public function show($slug)
    {
        $product = Product::with(['store', 'sale', 'images', 'category'])
                        ->withSum('orderDetails as total_sold', 'choseqty')
                        ->where('slug', $slug)
                        ->first();

        if (!$product) {
            return response()->json(['message'=>'Product not found'], 404);
        }

        return response()->json($product);
    }
    public function edit($id)
    {
        $product = Product::with(['store', 'sale', 'images'])->find($id);
        if (!$product) return response()->json(['message'=>'Product not found'], 404);

        return response()->json([
            'product' => $product,
            'categories' => DB::table('categories')->select('id','name')->get(),
        ]);
    }
    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        if (!$product) return response()->json(['message'=>'Product not found'], 404);

        DB::transaction(function() use ($request, $product) {
            $product->update([
                'name' => $request->name ?? $product->name,
                'slug' => $request->name ? Str::slug($request->name) : $product->slug,
                'thumbnail' => $request->thumbnail ?? $product->thumbnail,
                'description' => $request->description ?? $product->description,
                'category_id' => $request->category_id ?? $product->category_id,
                'status' => $request->status ?? $product->status,
                'updated_by' => 1,
            ]);

            $store = $product->store;
            if ($store) $store->update([
                'price_root' => $request->price_buy ?? $store->price_root,
                'qty' => $request->qty ?? $store->qty,
                'updated_by' => 1,
            ]);

            if ($request->price_sale) {
                $sale = $product->sale;
                if ($sale) {
                    $sale->update([
                        'price_sale' => $request->price_sale,
                        'date_begin' => $request->date_begin ?? $sale->date_begin,
                        'date_end' => $request->date_end ?? $sale->date_end,
                        'updated_by' => 1,
                    ]);
                } else {
                    ProductSale::create([
                        'product_id' => $product->id,
                        'price_sale' => $request->price_sale,
                        'date_begin' => $request->date_begin ?? Carbon::now(),
                        'date_end' => $request->date_end ?? Carbon::now()->addDays(7),
                        'status' => 1,
                        'created_by' => 1,
                    ]);
                }
            }
            if ($request->hasFile('thumbnail')) {
                $filename = $request->file('thumbnail')->getClientOriginalName();
                $request->file('thumbnail')->move(public_path('images/products'), $filename);
                $product->thumbnail = $filename;
                $product->save();
            }
        });

        return response()->json(['message'=>'Product updated successfully']);
    }

    public function destroy($id)
    {
        $product = Product::find($id);
        if (!$product) return response()->json(['message'=>'Product not found'], 404);

        DB::transaction(function() use ($product) {
            $product->store()->delete();
            $product->sale()->delete();
            $product->images()->delete();
            $product->delete();
        });

        return response()->json(['message'=>'Product deleted successfully']);
    }

    // -------------------- CHỨC NĂNG ĐẶC BIỆT -------------------- //

    // 1. Sản phẩm khuyến mãi
    public function product_sale(Request $request)
    {
        $now = now();
        $limit = $request->limit ?? 10;

        // Lấy thông tin sản phẩm có tồn kho
        $productStore = ProductStore::query()
            ->select('product_id', 'price_root', 'qty');

        // Lấy các sản phẩm đang khuyến mãi
        $productSale = ProductSale::query()
            ->select('product_id', 'price_sale')
            ->where('date_begin', '<=', $now)
            ->where('date_end', '>', $now);

        // Join với bảng products
        $products = Product::query()
            ->joinSub($productStore, 'ps', function ($join) {
                $join->on('ps.product_id', '=', 'products.id')
                    ->where('ps.qty', '>', 0); // chỉ lấy sản phẩm còn hàng
            })
            ->joinSub($productSale, 'psale', function ($join) {
                $join->on('psale.product_id', '=', 'products.id'); // chỉ lấy sản phẩm đang khuyến mãi
            })
            ->select(
                'products.id',
                'products.name',
                'products.thumbnail',
                'ps.price_root',
                'ps.qty',
                'psale.price_sale'
            )
            ->orderBy('products.created_at', 'desc')
            ->limit($limit)
            ->get();

        return response()->json($products);
    }

    // 2. Sản phẩm mới
    public function product_new($limit = 10)
    {
        $products = Product::with(['store','sale','images'])
            ->where('created_at', '>=', Carbon::now()->subDays(5)) // chỉ lấy trong 3 ngày gần đây
            ->orderBy('created_at','desc')
            ->limit($limit)
            ->get();
        return response()->json($products);
    }
    // 3. Sản phẩm theo danh mục
public function product_by_category($cat_id)
{
    $products = Product::where('category_id', $cat_id)
        ->orderBy('id', 'DESC')
        ->get();

    return response()->json($products);
}
    // 4.Sản phẩm hot (theo lượt bán)
public function product_hot(Request $request, $limit = 10)
{
    // Lấy limit từ query param nếu có
    $limit = $request->input('limit', $limit);

    // Query sản phẩm bán chạy nhất
    $products = Product::with(['store','sale','images'])
        ->withSum('orderDetails as total_sold', 'choseqty') // Tính tổng số lượng đã bán
        ->orderByDesc('total_sold')
        ->limit($limit)
        ->get();

    return response()->json($products);
}

}
