<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';

    protected $fillable = [
        'name',
        'slug',
        'thumbnail',
        'description',
        'content',
        'price_buy',
        'category_id',
        'status',
        'created_by',
        'updated_by',
    ];

    public $timestamps = true;

    // Quan hệ
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function store()
    {
        return $this->hasOne(ProductStore::class, 'product_id');
    }

    public function sale()
    {
        return $this->hasOne(ProductSale::class, 'product_id');
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class, 'product_id');
    }
public function orderDetails()
{
    return $this->hasMany(OrderDetail::class, 'product_id');
}

}
