<?php

use Illuminate\Database\Seeder;

class InsumoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
    }

    public function _getInsumos() {
        
        return [
            [
                'nombre' => 'Papa',
                'tipo' => 'Hortalizas',
                'idunidadmedida' => 3
            ],
            [
                'nombre' => 'Arroz',
                'tipo' => 'Legumbres',
                'idunidadmedida' => 1
            ],
            [
                'nombre' => 'Pollo',
                'tipo' => 'Fiambre',
                'idunidadmedida' => 1
            ],
        ];

    }
}
