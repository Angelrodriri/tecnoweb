<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Bitacora extends Model
{

    use SoftDeletes;
    protected $table = 'bitacora';
    protected $primaryKey = 'id';
    protected $fillable = [
        'nombre', 'estado',
    ];
}
