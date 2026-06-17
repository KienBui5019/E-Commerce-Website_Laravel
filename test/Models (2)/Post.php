<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $table = 'posts';

    protected $fillable = [
        'topic_id',
        'title',
        'slug',
        'image',
        'content',
        // 'post_type',
        'status',
        'created_by',
        'updated_by',
    ];

    public $timestamps = true;

    public function topic()
    {
        return $this->belongsTo(Topic::class, 'topic_id');
    }
}
