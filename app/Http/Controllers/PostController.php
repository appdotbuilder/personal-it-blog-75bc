<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Post::with(['category', 'user', 'tags'])
            ->latest('created_at');

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->get('status'));
        }

        // Filter by category
        if ($request->filled('category')) {
            $query->where('category_id', $request->get('category'));
        }

        // Search
        if ($request->filled('search')) {
            $searchTerm = $request->get('search');
            $query->where(function ($q) use ($searchTerm) {
                $q->where('title', 'like', '%' . $searchTerm . '%')
                  ->orWhere('excerpt', 'like', '%' . $searchTerm . '%');
            });
        }

        $posts = $query->paginate(15)->withQueryString();

        $categories = Category::active()->orderBy('name')->get();

        return Inertia::render('admin/posts/index', [
            'posts' => $posts,
            'categories' => $categories,
            'filters' => $request->only(['status', 'category', 'search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::active()->orderBy('name')->get();
        $tags = Tag::orderBy('name')->get();

        return Inertia::render('admin/posts/create', [
            'categories' => $categories,
            'tags' => $tags,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();

        // Handle status-specific logic
        if ($data['status'] === 'published' && !isset($data['published_at'])) {
            $data['published_at'] = now();
        } elseif ($data['status'] === 'scheduled') {
            $data['published_at'] = null;
        }

        $post = Post::create($data);

        // Attach tags
        if ($request->has('tags')) {
            $post->tags()->sync($request->get('tags'));
        }

        return redirect()->route('posts.show', $post)
            ->with('success', 'Post created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        $post->load(['category', 'user', 'tags', 'comments.user']);

        return Inertia::render('admin/posts/show', [
            'post' => $post,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        $post->load(['category', 'tags']);
        
        $categories = Category::active()->orderBy('name')->get();
        $tags = Tag::orderBy('name')->get();

        return Inertia::render('admin/posts/edit', [
            'post' => $post,
            'categories' => $categories,
            'tags' => $tags,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        $data = $request->validated();

        // Handle status changes
        if ($data['status'] === 'published' && $post->status !== 'published' && !isset($data['published_at'])) {
            $data['published_at'] = now();
        } elseif ($data['status'] === 'scheduled') {
            $data['published_at'] = null;
        } elseif ($data['status'] === 'draft') {
            $data['published_at'] = null;
            $data['scheduled_at'] = null;
        }

        $post->update($data);

        // Sync tags
        if ($request->has('tags')) {
            $post->tags()->sync($request->get('tags'));
        }

        return redirect()->route('posts.show', $post)
            ->with('success', 'Post updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return redirect()->route('posts.index')
            ->with('success', 'Post deleted successfully.');
    }
}