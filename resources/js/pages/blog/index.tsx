import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';

interface Category {
    id: number;
    name: string;
    slug: string;
    color: string;
    posts_count: number;
}

interface Tag {
    id: number;
    name: string;
    slug: string;
    color: string;
    posts_count: number;
}

interface User {
    id: number;
    name: string;
}

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    published_at: string;
    reading_time: number;
    views_count: number;
    comments_count: number;
    is_featured: boolean;
    category: Category;
    user: User;
    tags: Tag[];
}

interface Props {
    posts: {
        data: Post[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        meta: {
            current_page: number;
            last_page: number;
            per_page: number;
            total: number;
        };
    };
    featuredPosts: Post[];
    categories: Category[];
    popularTags: Tag[];
    filters: {
        search?: string;
        category?: string;
        tag?: string;
    };
    [key: string]: unknown;
}

export default function BlogIndex({ posts, featuredPosts, categories, popularTags, filters }: Props) {
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const search = formData.get('search') as string;
        
        router.get('/blog', { 
            ...filters, 
            search: search || undefined,
            page: undefined // Reset to first page
        }, { 
            preserveState: true,
            preserveScroll: true
        });
    };

    const clearFilters = () => {
        router.get('/blog', {}, { 
            preserveState: true,
            preserveScroll: true
        });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const isFirstPage = !filters.search && !filters.category && !filters.tag && posts.meta.current_page === 1;

    return (
        <>
            <Head title="Blog - IT Articles & Tutorials" />
            
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Header */}
                <header className="bg-white shadow-sm dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <Link href="/" className="flex items-center space-x-3">
                                    <div className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-2">
                                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                        </svg>
                                    </div>
                                    <span className="text-xl font-bold text-gray-900 dark:text-white">IT Blog</span>
                                </Link>
                            </div>
                            <nav className="flex items-center space-x-6">
                                <Link href="/" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                                    🏠 Home
                                </Link>
                                <Link href="/login" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                                    🔐 Admin
                                </Link>
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section (only on first page without filters) */}
                {isFirstPage && featuredPosts.length > 0 && (
                    <div className="bg-gradient-to-br from-blue-600 to-purple-700 py-16">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12">
                                <h1 className="text-4xl font-bold text-white mb-4">📚 Featured Articles</h1>
                                <p className="text-xl text-blue-100">Artikel terbaru dan terpopuler seputar teknologi</p>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {featuredPosts.map((post) => (
                                    <Link
                                        key={post.id}
                                        href={`/blog/${post.slug}`}
                                        className="group block"
                                    >
                                        <article className="h-full overflow-hidden rounded-lg bg-white shadow-lg transition-transform group-hover:scale-105 dark:bg-gray-800">
                                            <div className="p-6">
                                                <div className="mb-3 flex items-center space-x-2">
                                                    <span 
                                                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
                                                        style={{ backgroundColor: post.category.color }}
                                                    >
                                                        {post.category.name}
                                                    </span>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">⭐ Featured</span>
                                                </div>
                                                <h3 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                                                    {post.title}
                                                </h3>
                                                <p className="mb-4 text-gray-600 dark:text-gray-300">
                                                    {post.excerpt}
                                                </p>
                                                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                                    <div className="flex items-center space-x-4">
                                                        <span>👤 {post.user.name}</span>
                                                        <span>📅 {formatDate(post.published_at)}</span>
                                                    </div>
                                                    <span>⏱️ {post.reading_time} min</span>
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-8">
                            {/* Search and Filters */}
                            <div className="mb-8">
                                <form onSubmit={handleSearch} className="mb-4">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            name="search"
                                            placeholder="🔍 Cari artikel..."
                                            defaultValue={filters.search || ''}
                                            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400"
                                        />
                                        <button
                                            type="submit"
                                            className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
                                        >
                                            Cari
                                        </button>
                                    </div>
                                </form>

                                {/* Active filters */}
                                {(filters.search || filters.category || filters.tag) && (
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
                                        {filters.search && (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                🔍 "{filters.search}"
                                            </span>
                                        )}
                                        {filters.category && (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm text-green-800 dark:bg-green-900 dark:text-green-200">
                                                📂 {filters.category}
                                            </span>
                                        )}
                                        {filters.tag && (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                                                🏷️ {filters.tag}
                                            </span>
                                        )}
                                        <button
                                            onClick={clearFilters}
                                            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                        >
                                            ❌ Clear all
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Posts Grid */}
                            <div className="space-y-6">
                                {posts.data.length === 0 ? (
                                    <div className="py-12 text-center">
                                        <div className="text-6xl mb-4">📭</div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                            No articles found
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Try adjusting your search or filters
                                        </p>
                                    </div>
                                ) : (
                                    posts.data.map((post) => (
                                        <Link
                                            key={post.id}
                                            href={`/blog/${post.slug}`}
                                            className="group block"
                                        >
                                            <article className="overflow-hidden rounded-lg bg-white p-6 shadow-md transition-shadow group-hover:shadow-lg dark:bg-gray-800">
                                                <div className="mb-3 flex items-center space-x-2">
                                                    <span 
                                                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
                                                        style={{ backgroundColor: post.category.color }}
                                                    >
                                                        {post.category.name}
                                                    </span>
                                                    {post.is_featured && (
                                                        <span className="text-xs text-yellow-600 dark:text-yellow-400">⭐ Featured</span>
                                                    )}
                                                </div>
                                                <h2 className="mb-3 text-2xl font-bold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                                                    {post.title}
                                                </h2>
                                                <p className="mb-4 text-gray-600 dark:text-gray-300">
                                                    {post.excerpt}
                                                </p>
                                                <div className="mb-3 flex flex-wrap gap-2">
                                                    {post.tags.map((tag) => (
                                                        <span
                                                            key={tag.id}
                                                            className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                                                            style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
                                                        >
                                                            🏷️ {tag.name}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                                    <div className="flex items-center space-x-4">
                                                        <span>👤 {post.user.name}</span>
                                                        <span>📅 {formatDate(post.published_at)}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-4">
                                                        <span>👀 {post.views_count}</span>
                                                        <span>💬 {post.comments_count}</span>
                                                        <span>⏱️ {post.reading_time} min</span>
                                                    </div>
                                                </div>
                                            </article>
                                        </Link>
                                    ))
                                )}
                            </div>

                            {/* Pagination */}
                            {posts.meta.last_page > 1 && (
                                <div className="mt-8 flex justify-center">
                                    <nav className="flex items-center space-x-2">
                                        {posts.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url || '#'}
                                                className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                                                    link.active
                                                        ? 'bg-blue-600 text-white'
                                                        : link.url
                                                        ? 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </nav>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="mt-8 lg:col-span-4 lg:mt-0">
                            {/* Categories */}
                            <div className="mb-8 overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800">
                                <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">📂 Categories</h3>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-3">
                                        {categories.map((category) => (
                                            <Link
                                                key={category.id}
                                                href={`/blog?category=${category.slug}`}
                                                className={`flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 ${
                                                    filters.category === category.slug ? 'bg-blue-50 dark:bg-blue-900' : ''
                                                }`}
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <div
                                                        className="h-3 w-3 rounded-full"
                                                        style={{ backgroundColor: category.color }}
                                                    />
                                                    <span className="text-gray-900 dark:text-white">{category.name}</span>
                                                </div>
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    {category.posts_count}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Popular Tags */}
                            <div className="overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800">
                                <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🏷️ Popular Tags</h3>
                                </div>
                                <div className="p-6">
                                    <div className="flex flex-wrap gap-2">
                                        {popularTags.map((tag) => (
                                            <Link
                                                key={tag.id}
                                                href={`/blog?tag=${tag.slug}`}
                                                className={`inline-flex items-center rounded-full px-3 py-1 text-sm transition-colors hover:opacity-80 ${
                                                    filters.tag === tag.slug ? 'ring-2 ring-blue-500' : ''
                                                }`}
                                                style={{ 
                                                    backgroundColor: `${tag.color}20`, 
                                                    color: tag.color,
                                                    border: `1px solid ${tag.color}40`
                                                }}
                                            >
                                                {tag.name} ({tag.posts_count})
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}