import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Post {
    id: number;
    title: string;
    slug: string;
    status: string;
    published_at: string | null;
    views_count: number;
    comments_count: number;
    category: {
        name: string;
        color: string;
    };
    user: {
        name: string;
    };
}

interface Props {
    stats?: {
        total_posts: number;
        published_posts: number;
        draft_posts: number;
        total_views: number;
        total_comments: number;
        pending_comments: number;
    };
    recentPosts?: Post[];
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ stats, recentPosts }: Props) {
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
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">📊 Blog Dashboard</h1>
                        <p className="text-gray-600 dark:text-gray-400">Kelola blog IT Anda dengan mudah</p>
                    </div>
                    <div className="flex space-x-4">
                        <Link
                            href="/posts/create"
                            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                        >
                            ✍️ New Post
                        </Link>
                        <Link
                            href="/blog"
                            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                            👀 View Blog
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                {stats && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="overflow-hidden rounded-lg bg-white shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                            <span className="text-2xl">📝</span>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Posts</dt>
                                            <dd className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total_posts}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-green-600 dark:text-green-400">✅ {stats.published_posts} Published</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600 dark:text-gray-400">📝 {stats.draft_posts} Drafts</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-lg bg-white shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                                            <span className="text-2xl">👀</span>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Views</dt>
                                            <dd className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total_views.toLocaleString()}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-lg bg-white shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                                            <span className="text-2xl">💬</span>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Comments</dt>
                                            <dd className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total_comments}</dd>
                                        </dl>
                                    </div>
                                </div>
                                {stats.pending_comments > 0 && (
                                    <div className="mt-2">
                                        <span className="text-sm text-orange-600 dark:text-orange-400">
                                            ⏳ {stats.pending_comments} pending approval
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Quick Actions */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Link
                        href="/posts/create"
                        className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white transition-transform hover:scale-105 shadow-lg"
                    >
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">✍️</div>
                            <div>
                                <h3 className="text-lg font-semibold">New Post</h3>
                                <p className="text-blue-100">Create article</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/posts"
                        className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-green-500 to-green-600 p-6 text-white transition-transform hover:scale-105 shadow-lg"
                    >
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">📚</div>
                            <div>
                                <h3 className="text-lg font-semibold">All Posts</h3>
                                <p className="text-green-100">Manage content</p>
                            </div>
                        </div>
                    </Link>

                    <div className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white cursor-pointer shadow-lg">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">📂</div>
                            <div>
                                <h3 className="text-lg font-semibold">Categories</h3>
                                <p className="text-purple-100">Organize topics</p>
                            </div>
                        </div>
                    </div>

                    <div className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white cursor-pointer shadow-lg">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">💬</div>
                            <div>
                                <h3 className="text-lg font-semibold">Comments</h3>
                                <p className="text-orange-100">Moderate discussions</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Posts */}
                <div className="bg-white shadow-sm rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                                📚 Recent Posts
                            </h3>
                            <Link
                                href="/posts"
                                className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                View all →
                            </Link>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {recentPosts && recentPosts.length > 0 ? (
                            recentPosts.map((post) => (
                                <div key={post.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <div className="flex items-center justify-between">
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
                                            <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                                                <Link href={`/posts/${post.id}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                    {post.title}
                                                </Link>
                                            </h4>
                                            <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                                <span>📅 {formatDate(post.published_at)}</span>
                                                <span>👀 {post.views_count} views</span>
                                                <span>💬 {post.comments_count} comments</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Link
                                                href={`/posts/${post.id}/edit`}
                                                className="inline-flex items-center rounded-md bg-blue-50 px-3 py-1 text-sm text-blue-600 hover:bg-blue-100 dark:bg-blue-900/50 dark:text-blue-400 dark:hover:bg-blue-900/80 transition-colors"
                                            >
                                                ✏️ Edit
                                            </Link>
                                            {post.status === 'published' && (
                                                <Link
                                                    href={`/blog/${post.slug}`}
                                                    className="inline-flex items-center rounded-md bg-gray-50 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 transition-colors"
                                                    target="_blank"
                                                >
                                                    👁️ View
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="px-6 py-12 text-center">
                                <div className="text-6xl mb-4">📝</div>
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No posts yet</h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-6">
                                    Get started by creating your first blog post about technology
                                </p>
                                <Link
                                    href="/posts/create"
                                    className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700"
                                >
                                    ✍️ Create First Post
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}