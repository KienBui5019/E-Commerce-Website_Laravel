<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Contact extends Model
{
    protected $table = 'contacts';
    protected $fillable = ['user_id', 'name', 'email', 'phone', 'content', 'status'];

    // Liên kết với User
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
