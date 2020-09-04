<?php

use Illuminate\Database\Seeder;
use App\Rol;

class RolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = $this->_getRoles();
        foreach ($roles as $key => $rol) {
            Rol::create($rol);
        }
    }

    public function _getRoles() {

        return [
            [
                'descripcion' => 'adminstrador'
            ],
            [
                'descripcion' => 'vendedor'
            ]
        ];

    }
}
