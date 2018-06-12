<?php

use Illuminate\Database\Seeder;
use App\userTypes;

class UserTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        userTypes::create([
            'id' => 1,
            'type' => 'Administrador'
        ]);
        userTypes::create([
            'id' => 2,
            'type' => 'Usuario'
        ]);
    }
}
