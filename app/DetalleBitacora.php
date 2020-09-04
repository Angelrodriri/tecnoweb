<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DetalleBitacora extends Model
{
    use SoftDeletes;
    protected $table = 'detalle_bitacora';
    protected $primaryKey = 'id';
    protected $fillable = [
        'idbitacora', 'accion', 
    ];
}
