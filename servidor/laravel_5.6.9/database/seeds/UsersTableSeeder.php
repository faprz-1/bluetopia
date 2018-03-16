<?php

use Illuminate\Database\Seeder;
use App\User;
use Faker\Factory as Faker;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       
    	//Limpiando la tabla
        User::truncate();

        $faker = \Faker\Factory::create();

        // Todos los seed tendrán la misa contraseña, esta será hasheada
        $password = Hash::make('testing');
        //Se va crear solo un usuario real para casos de adminsitración y testing
        User::create([
            'nombres' => 'Admin',
            'apellidos' =>'test',
            'email' => 'admin@test.com',
            'password' => $password,
            'telefono' => '31102308811',
            'sexo' => 'SUDO'
        ]);

        /*factory(App\User::class, 6)->create();*/
        // se van a generar 6 usuarios faker
        for ($i = 0; $i < 3; $i++) {
            User::create([
                'nombres' => $faker->name,
                'apellidos' => $faker->text(7),
                'email' => $faker->email,
                'password' => $password,
                'telefono' => '1234567890',
                'sexo' => 'Hombre'
            ]);
        }

        for ($i = 0; $i < 3; $i++) {
            User::create([
                'nombres' => $faker->name,
                'apellidos' => $faker->text(7),
                'email' => $faker->email,
                'password' => $password,
                'telefono' => '0987654321',
                'sexo' => 'Mujer'
            ]);
        }
    }
}
