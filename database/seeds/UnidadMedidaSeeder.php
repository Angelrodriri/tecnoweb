<?php

use Illuminate\Database\Seeder;
use App\UnidadMedida;

class UnidadMedidaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {   
        $unidades = $this->_getUnidades();
        foreach ($unidades as $key => $unidad) {
            UnidadMedida::create($unidad);
        }
    }

    public function _getUnidades() {
        return [
            [
                'descripcion' => 'Kilogramo',
                'abreviatura' => 'Kg'
            ],
            [
                'descripcion' => 'Litro',
                'abreviatura' => 'L'
            ],
            [
                'descripcion' => 'Arroba',
                'abreviatura' => 'a'
            ],
        ];
    }
}
