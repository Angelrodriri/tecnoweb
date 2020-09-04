<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVentaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('venta', function (Blueprint $table) {
            $table->increments('id');
            $table->string('codigo');
            $table->string('tipo')->nullable();
            $table->integer('idcliente')->unsigned();
            $table->integer('cantidadtotal');
            $table->decimal('total', 12, 2);
            $table->timestamps();
            $table->foreign('idcliente')->references('id')->on('cliente')->ondelete('cascade');
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
        Schema::dropIfExists('venta');
    }
}
