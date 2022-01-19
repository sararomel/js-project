<?php

namespace Database\Factories;

use App\Models\Mobile;
use Illuminate\Database\Eloquent\Factories\Factory;

class MobileFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Mobile::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->word(),
            'description' => $this->faker->text(),
            'price' => $this->faker->numberBetween($min = 1000, $max = 10000),
            'amount' => $this->faker->numberBetween($min = 1, $max = 100),
        ];
    }
}
