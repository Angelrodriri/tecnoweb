<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DetalleVenta extends Model
{
    use SoftDeletes;
    protected $table = 'detalle_venta';
    protected $primaryKey = 'id';
    protected $fillable = [
        'idventa', 'idproducto', 'idcombo', 
        'cantidad', 'precio', 'concepto',
    ];
}
