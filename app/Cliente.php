<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    protected $table= 'cliente';
    protected $primaryKey = 'id';
    protected $fillable = [
        'nit', 'nombre', 'apellido',
        'genero', 'telefono', 'correo', 'imagen'
    ];
}
