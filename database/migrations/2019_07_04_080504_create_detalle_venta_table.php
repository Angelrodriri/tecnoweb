<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDetalleVentaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('detalle_venta', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('idventa')->unsigned();
            $table->integer('idproducto')->unsigned()->nullable();
            $table->integer('idcombo')->unsigned()->nullable();
            $table->integer('cantidad');
            $table->decimal('precio', 12, 2);
            $table->string('concepto')->nullable();
            $table->timestamps();
            $table->foreign('idventa')->references('id')->on('venta')->ondelete('cascade');
            $table->foreign('idproducto')->references('id')->on('producto')->ondelete('cascade');
            $table->foreign('idcombo')->references('id')->on('combo')->ondelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('detalle_venta');
    }
}
