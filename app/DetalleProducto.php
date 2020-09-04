<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DetalleProducto extends Model
{
    use SoftDeletes;
    protected $table = 'detalle_producto';
    protected $primaryKey = 'id';
    protected $fillable = [
        'idinsumo', 'idproducto', 'cantidad', 'costo'
    ];
}
