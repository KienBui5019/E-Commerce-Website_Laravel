<?php
namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index(Request $request)
    {
        $query = Contact::with('user');

        if ($search = $request->input('search')) {
            $query->where('name', 'like', "%$search%")
                  ->orWhere('email', 'like', "%$search%");
        }
        if (!is_null($request->input('status'))) {
                $query->where('status', $request->input('status'));
            }
        try {
            $contacts = $query->paginate(10);
            return response()->json($contacts);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Lỗi server: '.$e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {

        $validated = $request->validate([
            'user_id' => 'nullable|integer|exists:users,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'nullable|string|max:20',
            'content' => 'required|string',
            'status' => 'nullable|integer',
        ]);

        $contact = Contact::create($validated);
        return response()->json($contact, 201);
    }

    public function destroy($id)
    {
        Contact::findOrFail($id)->delete();
        return response()->json(['message'=>'Deleted']);
    }
}
