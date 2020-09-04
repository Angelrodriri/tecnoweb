<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Producto extends Model
{
    use SoftDeletes;
    protected $table = 'producto';
    protected $primaryKey = 'id';
    protected $fillable = [
        'descripcion', 'estado', 'imagen', 'precio', 'codigo'
    ];
}
