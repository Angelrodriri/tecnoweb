<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDetalleProductoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('detalle_producto', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('idproducto')->unsigned();
            $table->integer('idinsumo')->unsigned();
            $table->integer('cantidad');
            $table->decimal('costo', 12, 2);
            $table->timestamps();
            $table->foreign('idproducto')->references('id')->on('producto')->ondelete('cascade');
            $table->foreign('idinsumo')->references('id')->on('insumo')->ondelete('cascade');
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
        Schema::dropIfExists('detalle_producto');
    }
}
