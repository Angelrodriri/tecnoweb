<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInsumoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('insumo', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('idunidadmedida')->unsigned();
            $table->string('tipo');
            $table->string('nombre');
            $table->enum('estado', ['1', '0'])->default('1');
            $table->timestamps();
            $table->foreign('idunidadmedida')->references('id')->on('unidad_medida')->ondelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('insumo');
    }
}
