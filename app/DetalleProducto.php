<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DetalleProducto extends Model
{
    protected $table = 'detalle_producto';
    protected $primaryKey = 'id';
    protected $fillable = [
        'idinsumo', 'idproducto', 'cantidad', 'costo'
    ];
}
