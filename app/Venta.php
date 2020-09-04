<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Venta extends Model
{
    use SoftDeletes;
    protected $table = 'venta';
    protected $primaryKey = 'id';
    protected $fillable = [
        'codigo', 'tipo', 'idcliente',
        'cantidadtotal', 'total', 'estado',
    ];
}
