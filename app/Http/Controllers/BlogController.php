<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Display the main blog homepage.
     */
    public function index(Request $request)
    {
        $query = Post::with(['category', 'user', 'tags'])
            ->published()
            ->latest('published_at');

        // Search functionality
        if ($request->filled('search')) {
            $searchTerm = $request->get('search');
            $query->where(function ($q) use ($searchTerm) {
                $q->where('title', 'like', '%' . $searchTerm . '%')
                  ->orWhere('excerpt', 'like', '%' . $searchTerm . '%')
                  ->orWhere('content', 'like', '%' . $searchTerm . '%');
            });
        }

        // Category filter
        if ($request->filled('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->get('category'));
            });
        }

        // Tag filter
        if ($request->filled('tag')) {
            $query->whereHas('tags', function ($q) use ($request) {
                $q->where('slug', $request->get('tag'));
            });
        }

        $posts = $query->paginate(12)->withQueryString();

        // Get featured posts for hero section (only on first page without filters)
        $featuredPosts = collect();
        if (!$request->hasAny(['search', 'category', 'tag', 'page'])) {
            $featuredPosts = Post::with(['category', 'user', 'tags'])
                ->published()
                ->featured()
                ->latest('published_at')
                ->take(3)
                ->get();
        }

        // Get categories and tags for filters
        $categories = Category::active()
            ->withCount(['posts' => function ($query) {
                $query->where('status', 'published')
                      ->where('published_at', '<=', now());
            }])
            ->having('posts_count', '>', 0)
            ->orderBy('name')
            ->get();

        $popularTags = Tag::whereHas('posts', function ($query) {
                $query->where('status', 'published')
                      ->where('published_at', '<=', now());
            })
            ->withCount(['posts' => function ($query) {
                $query->where('status', 'published')
                      ->where('published_at', '<=', now());
            }])
            ->orderByDesc('posts_count')
            ->take(20)
            ->get();

        return Inertia::render('blog/index', [
            'posts' => $posts,
            'featuredPosts' => $featuredPosts,
            'categories' => $categories,
            'popularTags' => $popularTags,
            'filters' => $request->only(['search', 'category', 'tag']),
        ]);
    }

    /**
     * Display the specified post.
     */
    public function show(Post $post)
    {
        // Only show published posts to non-authenticated users
        if ($post->status !== 'published' && !auth()->check()) {
            abort(404);
        }

        // Increment view count
        $post->incrementViews();

        // Load relationships
        $post->load([
            'category',
            'user',
            'tags',
            'approvedComments' => function ($query) {
                $query->with(['user', 'replies' => function ($subQuery) {
                    $subQuery->approved()->with('user')->latest();
                }])->whereNull('parent_id')->latest();
            }
        ]);

        // Get related posts
        $relatedPosts = Post::with(['category', 'user'])
            ->published()
            ->where('id', '!=', $post->id)
            ->where(function ($query) use ($post) {
                $query->where('category_id', $post->category_id)
                      ->orWhereHas('tags', function ($q) use ($post) {
                          $q->whereIn('tags.id', $post->tags->pluck('id'));
                      });
            })
            ->latest('published_at')
            ->take(4)
            ->get();

        return Inertia::render('blog/show', [
            'post' => $post,
            'relatedPosts' => $relatedPosts,
        ]);
    }


}