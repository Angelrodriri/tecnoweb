<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        $this->call(UnidadMedidaSeeder::class);
        $this->call(InsumoSeeder::class);
        $this->call(RolSeeder::class);
        $this->call(PaginaSeeder::class);
        $this->call(ModuloSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(ModuloRolSeeder::class);
    }
}
