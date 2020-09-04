<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Combo extends Model
{
    use SoftDeletes;
    protected $table = 'combo';
    protected $primaryKey = 'id';
    protected $fillable = [
        'descripcion', 'estado', 'imagen', 'precio', 'codigo'
    ];
}
