<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DetallePedidoCliente extends Model
{
    use SoftDeletes;
    protected $table = 'detalle_pedido_cliente';
}
