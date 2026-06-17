<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductStore extends Model
{
    protected $table = 'product_stores';

    protected $fillable = [
        'product_id',
        'price_root',
        'qty',
        'status',
        'created_by',
        'updated_by',
    ];

    public $timestamps = true;

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
