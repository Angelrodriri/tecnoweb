<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDetalleBitacoraTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('detalle_bitacora', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('idbitacora')->unsigned();
            $table->string('accion');
            $table->timestamps();
            $table->foreign('idbitacora')->references('id')->on('bitacora')->ondelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('detalle_bitacora');
    }
}
