<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDetalleComboTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('detalle_combo', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('idproducto')->unsigned();
            $table->integer('idcombo')->unsigned();
            $table->integer('cantidad');
            $table->decimal('costo', 12, 2);
            $table->timestamps();
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
        Schema::dropIfExists('detalle_combo');
    }
}
