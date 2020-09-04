<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PedidoCliente extends Model
{
    use SoftDeletes;
    protected $table = 'pedido_cliente';
}
