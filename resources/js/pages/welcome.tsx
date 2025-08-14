import React from 'react';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

interface Props {
    stats?: {
        posts_count: number;
        categories_count: number;
        views_count: number;
    };
    [key: string]: unknown;
}

export default function Welcome({ stats }: Props) {
    const { auth } = usePage<SharedData>().props;

    const defaultStats = {
        posts_count: 50,
        categories_count: 8,
        views_count: 10000
    };

    const displayStats = stats || defaultStats;

    return (
        <>
            <Head title="IT Blog Personal - Catatan & Artikel Teknologi">
                <meta name="description" content="Blog personal tentang teknologi informasi, programming, dan development. Berbagi pengalaman dan pengetahuan IT untuk developer Indonesia." />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
                {/* Header */}
                <header className="bg-white/80 shadow-sm backdrop-blur-sm dark:bg-gray-900/80">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center space-x-3">
                                        <div className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-2">
                                            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                            </svg>
                                        </div>
                                        <span className="text-xl font-bold text-gray-900 dark:text-white">IT Blog</span>
                                    </div>
                                </div>
                            </div>
                            <nav className="flex items-center space-x-4">
                                <a href="/blog" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                                    📖 Blog
                                </a>
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <div className="relative py-16 sm:py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="mb-8 flex justify-center">
                                <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-6 shadow-xl">
                                    <span className="text-4xl">💻</span>
                                </div>
                            </div>
                            
                            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
                                💻 IT Blog Personal
                            </h1>
                            
                            <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600 dark:text-gray-300">
                                🚀 Catatan dan artikel seputar teknologi informasi, programming, dan development. 
                                Berbagi pengalaman dan pengetahuan IT untuk developer Indonesia.
                            </p>

                            {/* Stats */}
                            <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
                                <div className="rounded-lg bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/80">
                                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">📝 {displayStats.posts_count}+</div>
                                    <div className="text-gray-600 dark:text-gray-300">Artikel IT</div>
                                </div>
                                <div className="rounded-lg bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/80">
                                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">📂 {displayStats.categories_count}</div>
                                    <div className="text-gray-600 dark:text-gray-300">Kategori</div>
                                </div>
                                <div className="rounded-lg bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/80">
                                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">👀 {displayStats.views_count.toLocaleString()}+</div>
                                    <div className="text-gray-600 dark:text-gray-300">Total Views</div>
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                                <a
                                    href="/blog"
                                    className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-4 text-lg font-medium text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl"
                                >
                                    📖 Mulai Membaca
                                </a>
                                {!auth.user && (
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white px-8 py-4 text-lg font-medium text-gray-700 shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                    >
                                        🔐 Admin Login
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="bg-white py-16 dark:bg-gray-900">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                                ✨ Fitur Unggulan
                            </h2>
                            <p className="mb-12 text-lg text-gray-600 dark:text-gray-300">
                                Platform blog modern dengan fitur lengkap untuk berbagi pengetahuan IT
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="text-center">
                                <div className="mb-4 flex justify-center">
                                    <div className="rounded-lg bg-blue-100 p-4 dark:bg-blue-900">
                                        <span className="text-3xl">📝</span>
                                    </div>
                                </div>
                                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">Editor WYSIWYG</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Trix Editor untuk menulis artikel dengan format teks kaya dan syntax highlighting
                                </p>
                            </div>
                            
                            <div className="text-center">
                                <div className="mb-4 flex justify-center">
                                    <div className="rounded-lg bg-green-100 p-4 dark:bg-green-900">
                                        <span className="text-3xl">🔍</span>
                                    </div>
                                </div>
                                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">Pencarian Cepat</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Laravel Scout & Meilisearch untuk pencarian artikel yang lightning fast
                                </p>
                            </div>
                            
                            <div className="text-center">
                                <div className="mb-4 flex justify-center">
                                    <div className="rounded-lg bg-purple-100 p-4 dark:bg-purple-900">
                                        <span className="text-3xl">🖼️</span>
                                    </div>
                                </div>
                                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">Media Library</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Upload dan optimasi gambar otomatis dengan Spatie Media Library
                                </p>
                            </div>
                            
                            <div className="text-center">
                                <div className="mb-4 flex justify-center">
                                    <div className="rounded-lg bg-orange-100 p-4 dark:bg-orange-900">
                                        <span className="text-3xl">💬</span>
                                    </div>
                                </div>
                                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">Sistem Komentar</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Komentar built-in dengan moderasi dan sistem reply berjenjang
                                </p>
                            </div>
                            
                            <div className="text-center">
                                <div className="mb-4 flex justify-center">
                                    <div className="rounded-lg bg-red-100 p-4 dark:bg-red-900">
                                        <span className="text-3xl">📊</span>
                                    </div>
                                </div>
                                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">SEO Optimal</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Meta tags dinamis, sitemap XML, dan schema markup untuk SEO terbaik
                                </p>
                            </div>
                            
                            <div className="text-center">
                                <div className="mb-4 flex justify-center">
                                    <div className="rounded-lg bg-indigo-100 p-4 dark:bg-indigo-900">
                                        <span className="text-3xl">🎨</span>
                                    </div>
                                </div>
                                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">Modern UI</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Tailwind CSS & DaisyUI dengan dark mode dan animasi yang smooth
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Popular Topics */}
                <div className="bg-gray-50 py-16 dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                                🔥 Topik Populer
                            </h2>
                            <p className="mb-12 text-lg text-gray-600 dark:text-gray-300">
                                Kategori artikel IT yang paling banyak dibaca
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
                            {[
                                { name: 'Laravel', color: 'bg-red-500', emoji: '🔴' },
                                { name: 'Vue.js', color: 'bg-green-500', emoji: '💚' },
                                { name: 'React', color: 'bg-blue-500', emoji: '⚛️' },
                                { name: 'PHP', color: 'bg-purple-500', emoji: '🐘' },
                                { name: 'JavaScript', color: 'bg-yellow-500', emoji: '⚡' },
                                { name: 'Database', color: 'bg-indigo-500', emoji: '🗄️' },
                                { name: 'DevOps', color: 'bg-gray-600', emoji: '⚙️' },
                                { name: 'API', color: 'bg-pink-500', emoji: '🔗' },
                            ].map((topic, index) => (
                                <div
                                    key={index}
                                    className="group cursor-pointer rounded-lg bg-white p-4 text-center shadow-md transition-all hover:scale-105 hover:shadow-lg dark:bg-gray-700"
                                >
                                    <div className={`mx-auto mb-2 h-12 w-12 rounded-full ${topic.color} flex items-center justify-center text-white transition-transform group-hover:scale-110`}>
                                        <span className="text-lg">{topic.emoji}</span>
                                    </div>
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">{topic.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="mb-4 text-3xl font-bold text-white">
                                🚀 Siap Untuk Mulai?
                            </h2>
                            <p className="mb-8 text-xl text-blue-100">
                                Bergabung dengan komunitas developer Indonesia dan mulai berbagi pengetahuan IT Anda
                            </p>
                            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                                <a
                                    href="/blog"
                                    className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-medium text-blue-600 shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl"
                                >
                                    📚 Jelajahi Artikel
                                </a>
                                {!auth.user && (
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-lg font-medium text-white shadow-lg transition-all hover:bg-white hover:text-blue-600 hover:shadow-xl"
                                    >
                                        ✍️ Mulai Menulis
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-gray-900 py-8">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="mb-4 flex items-center justify-center space-x-3">
                                <div className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-2">
                                    <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    </svg>
                                </div>
                                <span className="text-lg font-bold text-white">IT Blog Personal</span>
                            </div>
                            <p className="text-gray-400">
                                © 2024 IT Blog Personal. Berbagi pengetahuan teknologi untuk Indonesia.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}