<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Combo extends Model
{
    protected $table = 'combo';
    protected $primaryKey = 'id';
    protected $fillable = [
        'descripcion', 'estado', 'imagen', 'precio', 'codigo'
    ];
}
