<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Modulo extends Model
{
    use SoftDeletes;
    protected $table = 'modulo';
    protected $primaryKey = 'id';
}
