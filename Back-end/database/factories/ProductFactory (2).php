<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

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
            'rate' => $this->faker->numberBetween($min = 1, $max = 5),
            'number_of_sales' => $this->faker->numberBetween($min = 0, $max = 100),
            'type' => $this->faker->randomElement(['laptop','mobile']),
        ];
    }
}
