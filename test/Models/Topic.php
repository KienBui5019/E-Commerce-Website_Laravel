<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    protected $table = 'topics';

    protected $fillable = [
        'name',
        'slug',
        'sort_order',
        'description',
        'status',
        'created_by',
        'updated_by',
    ];

    public $timestamps = true;
}
