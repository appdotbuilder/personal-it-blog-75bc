<?php

namespace Database\Factories;

use App\Models\Tag;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tag>
 */
class TagFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Tag>
     */
    protected $model = Tag::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->unique()->randomElement([
            'tutorial',
            'tips',
            'best-practices',
            'beginner',
            'advanced',
            'framework',
            'library',
            'tools',
            'debugging',
            'optimization',
            'security',
            'testing',
            'deployment',
            'architecture',
            'clean-code',
            'design-patterns',
            'api',
            'database',
            'performance',
            'mobile',
            'web',
            'fullstack',
            'frontend',
            'backend'
        ]);

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => fake()->sentence(8),
            'color' => fake()->randomElement([
                '#10B981', '#F59E0B', '#EF4444', '#3B82F6',
                '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
            ]),
        ];
    }
}