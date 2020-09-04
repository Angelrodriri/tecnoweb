<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Insumo extends Model
{
    use SoftDeletes;
    protected $table = 'insumo';
    protected $primaryKey = 'id';
    protected $fillable = [
        'idunidadmedida', 'tipo', 'nombre', 'estado',
    ];
}
