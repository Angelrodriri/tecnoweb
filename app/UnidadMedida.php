<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UnidadMedida extends Model
{
    use SoftDeletes;
    protected $table = 'unidad_medida';
    protected $primaryKey = 'id';
    protected $fillable = ['descripcion', 'abreviatura', 'estado'];
}
