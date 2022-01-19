<?php

namespace Database\Seeders;

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
        // \App\Models\User::factory(10)->create();
        \App\Models\Labtop::factory(20)->create();
        \App\Models\Mobile::factory(20)->create();
        \App\Models\Product::factory(20)->create();

    }
}
