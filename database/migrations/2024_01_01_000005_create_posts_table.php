<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('excerpt')->nullable()->comment('Short description for SEO and listings');
            $table->longText('content');
            $table->string('featured_image')->nullable();
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('status', ['draft', 'published', 'scheduled'])->default('draft');
            $table->timestamp('published_at')->nullable();
            $table->timestamp('scheduled_at')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('allow_comments')->default(true);
            $table->integer('views_count')->default(0);
            $table->integer('comments_count')->default(0);
            $table->integer('reading_time')->nullable()->comment('Estimated reading time in minutes');
            $table->json('meta_data')->nullable()->comment('SEO meta tags and other metadata');
            $table->timestamps();
            
            $table->index(['status', 'published_at']);
            $table->index(['is_featured', 'published_at']);
            $table->index(['category_id', 'status']);
            $table->index('slug');
            $table->index('user_id');
            $table->index('scheduled_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};