<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    protected $table = 'banners';

    protected $fillable = [
        'name',
        'link',
        'image',
        'description',
        'sort_order',
        'position',
        'status',
        'created_by',
        'updated_by',
    ];

    public $timestamps = true;
}
