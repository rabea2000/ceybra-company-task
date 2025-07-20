<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use  HasFactory;
    protected $fillable = [
        'name',
        'price',
        'image',
    ];


    /**
     * Get the cart items for the product.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }

    /**
     * Scope a query to search for products by name.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query The query builder instance.
     * @param string $search The search term to filter by.
     * @return \Illuminate\Database\Eloquent\Builder The modified query builder.
     */
    public function scopeSearch($query, $search)
    {
        if (!empty($search)) {
            $query->where('name', 'like', '%' . $search . '%');
        }
    }
}
