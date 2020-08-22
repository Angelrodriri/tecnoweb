<?php

use Illuminate\Database\Seeder;
use App\ModuloRol;

class ModuloRolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $modulos = $this->getModuloRols();
        foreach ($modulos as $key => $modulo) {
            ModuloRol::create($modulo);
        }
    }

    public function getModuloRols() {
        return [
            [
                'visible' => 'S',
                'idmodulo' => 1,
                'idrol' => 1
            ],
            [
                'visible' => 'S',
                'idmodulo' => 2,
                'idrol' => 1
            ],
            [
                'visible' => 'S',
                'idmodulo' => 3,
                'idrol' => 1
            ],
            [
                'visible' => 'S',
                'idmodulo' => 4,
                'idrol' => 1
            ],
            //rol 2
            [
                'visible' => 'N',
                'idmodulo' => 1,
                'idrol' => 2
            ],
            [
                'visible' => 'S',
                'idmodulo' => 2,
                'idrol' => 2
            ],
            [
                'visible' => 'S',
                'idmodulo' => 3,
                'idrol' => 2
            ],
            [
                'visible' => 'N',
                'idmodulo' => 4,
                'idrol' => 2
            ],
        ];
    }

}
