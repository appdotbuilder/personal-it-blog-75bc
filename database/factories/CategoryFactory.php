<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Category>
     */
    protected $model = Category::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->unique()->randomElement([
            'Laravel',
            'Vue.js',
            'React',
            'PHP',
            'JavaScript',
            'Database',
            'DevOps',
            'Frontend',
            'Backend',
            'Mobile Development',
            'Machine Learning',
            'Cloud Computing',
            'Web Security',
            'API Development',
            'Performance'
        ]);

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => fake()->sentence(10),
            'color' => fake()->randomElement([
                '#3B82F6', '#EF4444', '#10B981', '#F59E0B', 
                '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
            ]),
            'icon' => fake()->randomElement([
                'code', 'database', 'server', 'mobile', 
                'shield', 'cpu', 'cloud', 'terminal'
            ]),
            'is_active' => true,
            'sort_order' => fake()->numberBetween(0, 100),
        ];
    }

    /**
     * Indicate that the category is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}