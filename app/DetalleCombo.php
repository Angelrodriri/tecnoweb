<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DetalleCombo extends Model
{
    use SoftDeletes;
    protected $table = 'detalle_combo';
    protected $primaryKey = 'id';
    protected $fillable = [
        'idcombo', 'idproducto', 'cantidad', 'costo'
    ];
}
