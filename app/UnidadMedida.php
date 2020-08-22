<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UnidadMedida extends Model
{
    protected $table = 'unidad_medida';
    protected $primaryKey = 'id';
    protected $fillable = ['descripcion', 'abreviatura', 'estado'];
}
