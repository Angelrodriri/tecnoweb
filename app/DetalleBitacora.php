<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DetalleBitacora extends Model
{
    protected $table = 'detalle_bitacora';
    protected $primaryKey = 'id';
    protected $fillable = [
        'idbitacora', 'accion', 
    ];
}
