<?php

use Illuminate\Database\Seeder;
use App\Insumo;

class InsumoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $insumos = $this->_getInsumos();
        foreach ($insumos as $key => $insumo) {
            Insumo::create($insumo);
        }
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
            [
                'nombre' => 'Carne',
                'tipo' => 'Fiambre',
                'idunidadmedida' => 1
            ],
        ];

    }
}
