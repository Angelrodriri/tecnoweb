<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDetallePedidoClienteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('detalle_pedido_cliente', function (Blueprint $table) {
            $table->increments('id');
            $table->double('cantidad');
            $table->double('precio');
            $table->enum('tipo', ['L', 'M']);
            $table->integer('idproducto');
            $table->integer('idpedido_cliente');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('detalle_pedido_cliente');
    }
}
