<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Comment;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@itblog.com',
            'email_verified_at' => now(),
        ]);

        // Create additional users
        $users = User::factory(5)->create();

        // Create categories
        $categories = Category::factory(8)->create();

        // Create tags
        $tags = Tag::factory(20)->create();

        // Create posts
        $posts = collect();
        
        // Featured posts by admin
        $featuredPosts = Post::factory(3)
            ->featured()
            ->for($admin, 'user')
            ->create()
            ->each(function ($post) use ($categories, $tags) {
                $post->category()->associate($categories->random());
                $post->tags()->attach($tags->random(random_int(2, 5)));
                $post->save();
            });

        // Regular posts by all users
        $regularPosts = Post::factory(15)
            ->create()
            ->each(function ($post) use ($categories, $tags, $users, $admin) {
                $post->user()->associate(collect($users)->push($admin)->random());
                $post->category()->associate($categories->random());
                $post->tags()->attach($tags->random(random_int(1, 4)));
                $post->save();
            });

        // Draft posts
        $draftPosts = Post::factory(5)
            ->draft()
            ->for($admin, 'user')
            ->create()
            ->each(function ($post) use ($categories, $tags) {
                $post->category()->associate($categories->random());
                $post->tags()->attach($tags->random(random_int(1, 3)));
                $post->save();
            });

        $posts = $featuredPosts->concat($regularPosts)->concat($draftPosts);

        // Create comments for published posts
        $publishedPosts = $posts->where('status', 'published');
        
        foreach ($publishedPosts as $post) {
            $commentCount = random_int(0, 8);
            
            if ($commentCount > 0) {
                $comments = Comment::factory($commentCount)
                    ->state(['status' => 'approved'])
                    ->for($post, 'post')
                    ->create()
                    ->each(function ($comment) use ($users) {
                        // 60% chance of being from a registered user
                        if (fake()->boolean(60)) {
                            $comment->user()->associate($users->random());
                            $comment->author_name = null;
                            $comment->author_email = null;
                            $comment->save();
                        }
                    });

                // Create some replies
                foreach ($comments->take(3) as $parentComment) {
                    if (fake()->boolean(40)) { // 40% chance of having replies
                        Comment::factory(random_int(1, 3))
                            ->state(['status' => 'approved'])
                            ->for($post, 'post')
                            ->for($parentComment, 'parent')
                            ->create()
                            ->each(function ($reply) use ($users, $admin) {
                                $reply->user()->associate(collect($users)->push($admin)->random());
                                $reply->author_name = null;
                                $reply->author_email = null;
                                $reply->save();
                            });
                    }
                }

                // Update post comments count
                $post->update(['comments_count' => $post->comments()->where('status', 'approved')->count()]);
            }
        }

        // Create some pending comments for moderation
        Comment::factory(5)
            ->state(['status' => 'pending'])
            ->create()
            ->each(function ($comment) use ($publishedPosts) {
                $comment->post()->associate($publishedPosts->random());
                $comment->save();
            });
    }
}
