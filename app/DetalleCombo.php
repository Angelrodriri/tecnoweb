<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DetalleCombo extends Model
{
    protected $table = 'detalle_combo';
    protected $primaryKey = 'id';
    protected $fillable = [
        'idcombo', 'idproducto', 'cantidad', 'costo'
    ];
}
