<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    // Danh sách đơn hàng (có tìm kiếm & phân trang)
    public function index(Request $request)
    {
        $query = Order::with(['user','details.product']);

        if ($search = $request->input('search')) {
            $query->where('name', 'like', "%$search%")
                ->orWhere('email', 'like', "%$search%")
                ->orWhere('phone', 'like', "%$search%");
        }

        $orders = $query->orderBy('created_at', 'desc')->paginate(10);

        return response()->json($orders);
    }
    public function checkout(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
            'name'    => 'nullable|string',
            'email'   => 'nullable|email',
            'phone'   => 'required|string',
            'address' => 'required|string',
            'note'    => 'nullable|string',
            'products' => 'required|array|min:1',
            'products.*.product_id' => 'required|integer|exists:products,id',
            'products.*.choseqty' => 'required|integer|min:1',
        ]);

        // Tạo Order
        $order = Order::create([
            'user_id'    => $request->user_id,
            'name'       => $request->name ?? 'Khách hàng',
            'email'      => $request->email ?? '',
            'phone'      => $request->phone,
            'address'    => $request->address,
            'note'       => $request->note,
            'status'     => 1,
            'created_by' => $request->user_id,
        ]);

        $totalAmount = 0;

        foreach ($request->products as $item) {
            $product = Product::with(['store', 'sale'])->findOrFail($item['product_id']);

            $price = $product->store?->price_root ?? $product->price_buy;
            $discount = 0;
            if ($product->sale?->price_sale) {
                $discount = $price - $product->sale->price_sale;
                $price = $product->sale->price_sale;
            }

            $amount = $price * $item['choseqty'];
            $totalAmount += $amount;

            // Tạo OrderDetail
            OrderDetail::create([
                'order_id'   => $order->id,
                'product_id' => $product->id,
                'price'      => $price,
                'choseqty'   => $item['choseqty'],
                'amount'     => $amount,
                'discount'   => $discount,
            ]);

            // Giảm tồn kho
            if ($product->store) {
                $product->store->decrement('qty', $item['choseqty']);
            }
        }

        return response()->json([
            'message'   => 'Đặt hàng thành công!',
            'order_id'  => $order->id,
            'total'     => $totalAmount,
        ], 201);
    }

    // Xem chi tiết đơn hàng
    public function show($id)
    {
        $order = Order::with([
            'user',
            'details.product.images'
        ])->findOrFail($id);

        return response()->json($order);
    }

    // Cập nhật trạng thái đơn hàng
    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);
        $order->update([
            'status' => $request->input('status', $order->status),
            'updated_by' => 1,
        ]);

        return response()->json(['message' => 'Cập nhật trạng thái thành công', 'order' => $order]);
    }

    // Xóa đơn hàng
    public function destroy($id)
    {
        Order::findOrFail($id)->delete();
        return response()->json(['message' => 'Đã xóa đơn hàng']);
    }
}
