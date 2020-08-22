<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DetalleVenta extends Model
{
    protected $table = 'detalle_venta';
    protected $primaryKey = 'id';
    protected $fillable = [
        'idventa', 'idproducto', 'idcombo', 
        'cantidad', 'precio', 'concepto',
    ];
}
