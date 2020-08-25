<?php

use Illuminate\Database\Seeder;
use App\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = $this->_getUsers();
        foreach ($users as $key => $user) {
            User::create($user);
        }

    }

    public function _getUsers() {

        return [
            [
                'nombre' => 'admin',
                'apellido' => 'administrador',
                'usuario' => 'admin',
                'password' => bcrypt('123123'),
                'idrol' => '1'
            ]
        ];

    }
}
