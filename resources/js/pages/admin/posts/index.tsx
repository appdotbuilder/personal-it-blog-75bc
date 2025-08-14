import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

interface Category {
    id: number;
    name: string;
    color: string;
}

interface User {
    id: number;
    name: string;
}

interface Tag {
    id: number;
    name: string;
    color: string;
}

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    status: string;
    published_at: string | null;
    views_count: number;
    comments_count: number;
    reading_time: number;
    category: Category;
    user: User;
    tags: Tag[];
    created_at: string;
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
    categories: Category[];
    filters: {
        status?: string;
        category?: string;
        search?: string;
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Posts', href: '/posts' },
];

export default function PostsIndex({ posts, categories, filters }: Props) {
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const search = formData.get('search') as string;
        
        router.get('/posts', { 
            ...filters, 
            search: search || undefined,
            page: undefined
        }, { 
            preserveState: true,
            preserveScroll: true
        });
    };

    const handleFilter = (key: string, value: string | undefined) => {
        router.get('/posts', { 
            ...filters, 
            [key]: value,
            page: undefined
        }, { 
            preserveState: true,
            preserveScroll: true
        });
    };

    const clearFilters = () => {
        router.get('/posts', {}, { 
            preserveState: true,
            preserveScroll: true
        });
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Not published';
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'published':
                return <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">✅ Published</span>;
            case 'draft':
                return <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200">📝 Draft</span>;
            case 'scheduled':
                return <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">⏰ Scheduled</span>;
            default:
                return <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200">{status}</span>;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="All Posts" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">📚 All Posts</h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Manage all your blog posts ({posts.meta.total} total)
                        </p>
                    </div>
                    <Link
                        href="/posts/create"
                        className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                    >
                        ✍️ New Post
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <form onSubmit={handleSearch}>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="🔍 Search posts..."
                                    defaultValue={filters.search || ''}
                                    className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"
                                />
                                <button
                                    type="submit"
                                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700"
                                >
                                    Search
                                </button>
                            </div>
                        </form>

                        <select
                            value={filters.status || ''}
                            onChange={(e) => handleFilter('status', e.target.value || undefined)}
                            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"
                        >
                            <option value="">All Status</option>
                            <option value="published">📤 Published</option>
                            <option value="draft">📝 Draft</option>
                            <option value="scheduled">⏰ Scheduled</option>
                        </select>

                        <select
                            value={filters.category || ''}
                            onChange={(e) => handleFilter('category', e.target.value || undefined)}
                            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"
                        >
                            <option value="">All Categories</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Active filters */}
                    {(filters.search || filters.status || filters.category) && (
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
                            {filters.search && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                    🔍 "{filters.search}"
                                </span>
                            )}
                            {filters.status && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm text-green-800 dark:bg-green-900 dark:text-green-200">
                                    📊 {filters.status}
                                </span>
                            )}
                            {filters.category && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                                    📂 Category #{filters.category}
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

                {/* Posts List */}
                <div className="bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    {posts.data.length === 0 ? (
                        <div className="py-12 text-center">
                            <div className="text-6xl mb-4">📝</div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                No posts found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                {Object.keys(filters).length > 0 
                                    ? "Try adjusting your filters or search terms"
                                    : "Get started by creating your first blog post"
                                }
                            </p>
                            <Link
                                href="/posts/create"
                                className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700"
                            >
                                ✍️ Create First Post
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {posts.data.map((post) => (
                                <div key={post.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <span
                                                    className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
                                                    style={{ backgroundColor: post.category.color }}
                                                >
                                                    {post.category.name}
                                                </span>
                                                {getStatusBadge(post.status)}
                                            </div>
                                            
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                                <Link 
                                                    href={`/posts/${post.id}`} 
                                                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                                >
                                                    {post.title}
                                                </Link>
                                            </h3>
                                            
                                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {post.tags.map((tag) => (
                                                    <span
                                                        key={tag.id}
                                                        className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium"
                                                        style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
                                                    >
                                                        🏷️ {tag.name}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                                <span>👤 {post.user.name}</span>
                                                <span>📅 {formatDate(post.published_at)}</span>
                                                <span>👀 {post.views_count} views</span>
                                                <span>💬 {post.comments_count} comments</span>
                                                <span>⏱️ {post.reading_time} min read</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2 ml-4">
                                            <Link
                                                href={`/posts/${post.id}/edit`}
                                                className="inline-flex items-center rounded-md bg-blue-50 px-3 py-2 text-sm text-blue-600 hover:bg-blue-100 dark:bg-blue-900/50 dark:text-blue-400 dark:hover:bg-blue-900/80 transition-colors"
                                            >
                                                ✏️ Edit
                                            </Link>
                                            
                                            <Link
                                                href={`/posts/${post.id}`}
                                                className="inline-flex items-center rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 transition-colors"
                                            >
                                                👁️ View
                                            </Link>

                                            {post.status === 'published' && (
                                                <Link
                                                    href={`/blog/${post.slug}`}
                                                    className="inline-flex items-center rounded-md bg-green-50 px-3 py-2 text-sm text-green-600 hover:bg-green-100 dark:bg-green-900/50 dark:text-green-400 dark:hover:bg-green-900/80 transition-colors"
                                                    target="_blank"
                                                >
                                                    🌐 Live
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {posts.meta.last_page > 1 && (
                        <div className="border-t border-gray-200 px-6 py-4 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Showing {((posts.meta.current_page - 1) * posts.meta.per_page) + 1} to {Math.min(posts.meta.current_page * posts.meta.per_page, posts.meta.total)} of {posts.meta.total} results
                                </div>
                                <nav className="flex items-center space-x-2">
                                    {posts.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                                                link.active
                                                    ? 'bg-blue-600 text-white'
                                                    : link.url
                                                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </nav>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}