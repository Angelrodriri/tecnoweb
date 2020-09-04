<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pagina extends Model
{
    use SoftDeletes;
    protected $table = 'pagina';
}
