<?php

namespace Database\Factories;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Comment>
     */
    protected $model = Comment::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $hasUser = fake()->boolean(70); // 70% chance of being from a registered user

        return [
            'post_id' => Post::factory(),
            'user_id' => $hasUser ? User::factory() : null,
            'author_name' => $hasUser ? null : fake()->name(),
            'author_email' => $hasUser ? null : fake()->safeEmail(),
            'author_website' => fake()->boolean(30) ? fake()->url() : null,
            'content' => fake()->paragraph(random_int(2, 5)),
            'status' => fake()->randomElement(['approved', 'pending', 'approved', 'approved']), // More approved than pending
            'ip_address' => fake()->ipv4(),
            'user_agent' => fake()->userAgent(),
        ];
    }

    /**
     * Indicate that the comment is from a guest.
     */
    public function guest(): static
    {
        return $this->state(fn (array $attributes) => [
            'user_id' => null,
            'author_name' => fake()->name(),
            'author_email' => fake()->safeEmail(),
        ]);
    }

    /**
     * Indicate that the comment is pending approval.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
        ]);
    }

    /**
     * Indicate that the comment is approved.
     */
    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'approved',
        ]);
    }

    /**
     * Indicate that the comment is spam.
     */
    public function spam(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'spam',
        ]);
    }
}