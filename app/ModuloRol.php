<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ModuloRol extends Model
{
    use SoftDeletes;
    protected $table = 'modulo_rol';
}
