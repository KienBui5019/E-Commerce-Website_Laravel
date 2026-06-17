<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PostController extends Controller
{
     public function latest_posts($limit = 5)
    {
        // Lấy $limit bài viết mới nhất
        $posts = Post::orderBy('created_at', 'desc')->take($limit)->get();

        return response()->json($posts);
    }
    public function show($id)
    {
        // Tìm bài viết theo id, nếu không có sẽ trả về 404
        $post = Post::find($id);

        if (!$post) {
            return response()->json(['message' => 'Bài viết không tồn tại'], 404);
        }

        return response()->json($post);
    }

    // Danh sách + tìm kiếm + phân trang
    public function index(Request $request)
    {
        // $query = Post::query();
        $query = Post::with('topic');

        // Tìm kiếm theo title hoặc content
        if ($search = $request->input('search')) {
            $query->where('title', 'like', "%$search%")
                  ->orWhere('content', 'like', "%$search%");
        }

        // Lọc theo post_type
        if ($topic_id = $request->input('topic_id')) {
            $query->where('topic_id', $topic_id);
        }

        // Lọc theo status
        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        $posts = $query->orderBy('created_at', 'desc')->paginate(5);

        return response()->json($posts);
    }

    // Thêm bài viết
    public function store(Request $request)
    {
        $data = $request->validate([
            'topic_id'    => 'required|exists:topics,id',
            'title'       => 'required|string|max:255',
            // 'image'       => 'required|string',
            'image' => 'required|file|mimes:jpg,jpeg,png,gif|max:2048',
            'content'     => 'required',
            // 'description' => 'nullable|string',
            // 'post_type'   => 'in:post,page',
            'status'      => 'in:0,1',
        ]);

        $data['slug'] = Str::slug($request->title);
        $data['created_by'] = 1;
//
if ($request->hasFile('image')) {
        $filename =$request->file('image')->getClientOriginalName();
        $request->file('image')->move(public_path('images/posts'), $filename);
        $data['image'] = $filename;
    }
    //
        $post = Post::create($data);

        return response()->json(['message' => 'Thêm bài viết thành công', 'post' => $post], 201);
    }

    // Cập nhật bài viết
    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);

        $data = $request->validate([
            'topic_id'    => 'required|exists:topics,id',
            'title'       => 'required|string|max:255',
            // 'image'       => 'required|string',
            'image' => 'required|file|mimes:jpg,jpeg,png,gif|max:2048',
            'content'     => 'required',
            // 'post_type'   => 'in:post,page',
            'status'      => 'in:0,1',
        ]);

        $data['slug'] = Str::slug($request->title);
        $data['updated_by'] = 1;
//
if ($request->hasFile('image')) {
        $filename = $request->file('image')->getClientOriginalName();
        $request->file('image')->move(public_path('images/posts'), $filename);
        $data['image'] = $filename;
    }
    //
        $post->update($data);

        return response()->json(['message' => 'Cập nhật bài viết thành công', 'post' => $post]);
    }

    // Xóa bài viết
    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();

        return response()->json(['message' => 'Xóa bài viết thành công']);
    }
}
