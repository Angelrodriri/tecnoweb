<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Insumo extends Model
{
    protected $table = 'insumo';
    protected $primaryKey = 'id';
    protected $fillable = [
        'idunidadmedida', 'tipo', 'nombre', 'estado',
    ];
}
