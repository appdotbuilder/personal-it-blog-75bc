<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\PostController;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Home page with blog stats
Route::get('/', function () {
    $stats = [
        'posts_count' => Post::where('status', 'published')->where('published_at', '<=', now())->count(),
        'categories_count' => Category::where('is_active', true)->count(),
        'views_count' => Post::where('status', 'published')->where('published_at', '<=', now())->sum('views_count'),
    ];

    return Inertia::render('welcome', [
        'stats' => $stats,
    ]);
})->name('home');

// Public blog routes
Route::controller(BlogController::class)->group(function () {
    Route::get('/blog', 'index')->name('blog.index');
    Route::get('/blog/{post:slug}', 'show')->name('blog.show');
});

Route::middleware(['auth', 'verified'])->group(function () {
    // Admin dashboard with stats
    Route::get('dashboard', function () {
        $stats = [
            'total_posts' => Post::count(),
            'published_posts' => Post::where('status', 'published')->where('published_at', '<=', now())->count(),
            'draft_posts' => Post::where('status', 'draft')->count(),
            'total_views' => Post::sum('views_count'),
            'total_comments' => \App\Models\Comment::where('status', 'approved')->count(),
            'pending_comments' => \App\Models\Comment::where('status', 'pending')->count(),
        ];

        $recentPosts = Post::with(['category', 'user'])
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentPosts' => $recentPosts,
        ]);
    })->name('dashboard');

    // Admin post management
    Route::resource('posts', PostController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
