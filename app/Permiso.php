<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Permiso extends Model
{
    use SoftDeletes;
    protected $table = 'permiso';
    protected $primaryKey = 'id';
    protected $fillable = ['descripcion', 'estado'];
}
