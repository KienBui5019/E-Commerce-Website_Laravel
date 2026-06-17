<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TopicController extends Controller
{
    // Danh sách + tìm kiếm + phân trang
    public function index(Request $request)
    {
        $query = Topic::query();

        if ($search = $request->input('search')) {
            $query->where('name', 'like', "%$search%");
        }

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        $topics = $query->orderBy('sort_order')->paginate(10);

        return response()->json($topics);
    }

    // Thêm chủ đề
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:topics,name',
        ]);

        $topic = Topic::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'sort_order' => $request->sort_order ?? 0,
            'description' => $request->description,
            'status' => $request->status ?? 1,
            'created_by' => 1,
        ]);

        return response()->json($topic, 201);
    }

    // Cập nhật
    public function update(Request $request, $id)
    {
        $topic = Topic::findOrFail($id);

        $topic->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'sort_order' => $request->sort_order ?? 0,
            'description' => $request->description,
            'status' => $request->status ?? 1,
            'updated_by' => 1,
        ]);

        return response()->json($topic);
    }

    // Xóa
    public function destroy($id)
    {
        $topic = Topic::findOrFail($id);
        $topic->delete();

        return response()->json(['message' => 'Xóa thành công']);
    }
}
