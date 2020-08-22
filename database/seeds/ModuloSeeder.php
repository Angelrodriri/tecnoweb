<?php

use Illuminate\Database\Seeder;
use App\Modulo;

class ModuloSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $modulos = $this->getModulos();
        foreach ($modulos as $key => $modulo) {
            Modulo::create($modulo);
        }
    }

    public function getModulos() {
        return [
            [
                'nombre' => 'Seguridad',
                'descripcion' => 'Seguridad del Sistema'
            ],
            [
                'nombre' => 'Ventas',
                'descripcion' => 'Modulo de ventas de productos'
            ],
            [
                'nombre' => 'Almacen',
                'descripcion' => 'Modulo de almacen de insumos'
            ],
            [
                'nombre' => 'Reportes',
                'descripcion' => 'Modulo de reportes'
            ],
        ];
    }
}
