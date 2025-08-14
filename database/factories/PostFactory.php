<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Post>
     */
    protected $model = Post::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(random_int(4, 8), false);
        
        // Generate technical blog content inline
        $sections = [
            '<h2>Introduction</h2>',
            '<p>' . fake()->paragraph(4) . '</p>',
            '<h2>Getting Started</h2>',
            '<p>' . fake()->paragraph(3) . '</p>',
            '<pre><code class="language-php"><?php

namespace App\\Services;

class ExampleService
{
    public function process($data)
    {
        // Process the data
        return $this->transform($data);
    }

    private function transform($data)
    {
        return array_map(function ($item) {
            return strtoupper($item);
        }, $data);
    }
}</code></pre>',
            '<h2>Key Features</h2>',
            '<ul>',
            '<li>' . fake()->sentence() . '</li>',
            '<li>' . fake()->sentence() . '</li>',
            '<li>' . fake()->sentence() . '</li>',
            '<li>' . fake()->sentence() . '</li>',
            '</ul>',
            '<p>' . fake()->paragraph(3) . '</p>',
            '<h2>Best Practices</h2>',
            '<p>' . fake()->paragraph(4) . '</p>',
            '<blockquote>',
            '<p>' . fake()->sentence(12) . '</p>',
            '</blockquote>',
            '<h2>Conclusion</h2>',
            '<p>' . fake()->paragraph(3) . '</p>',
        ];
        
        $content = implode("\n", $sections);

        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'excerpt' => fake()->paragraph(2),
            'content' => $content,
            'category_id' => Category::factory(),
            'user_id' => User::factory(),
            'status' => 'published',
            'published_at' => fake()->dateTimeBetween('-6 months', 'now'),
            'is_featured' => fake()->boolean(20), // 20% chance of being featured
            'allow_comments' => true,
            'views_count' => fake()->numberBetween(50, 2000),
            'comments_count' => fake()->numberBetween(0, 25),
            'reading_time' => fake()->numberBetween(3, 15),
            'meta_data' => [
                'meta_title' => $title,
                'meta_description' => fake()->sentence(15),
                'meta_keywords' => implode(', ', fake()->words(8)),
                'og_title' => $title,
                'og_description' => fake()->sentence(12),
                'twitter_title' => $title,
                'twitter_description' => fake()->sentence(10),
            ],
        ];
    }



    /**
     * Indicate that the post is a draft.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'draft',
            'published_at' => null,
        ]);
    }

    /**
     * Indicate that the post is scheduled.
     */
    public function scheduled(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'scheduled',
            'scheduled_at' => fake()->dateTimeBetween('now', '+1 month'),
            'published_at' => null,
        ]);
    }

    /**
     * Indicate that the post is featured.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
        ]);
    }
}