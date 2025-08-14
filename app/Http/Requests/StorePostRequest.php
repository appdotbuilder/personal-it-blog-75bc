<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:posts,slug',
            'excerpt' => 'nullable|string|max:500',
            'content' => 'required|string',
            'featured_image' => 'nullable|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'status' => 'required|in:draft,published,scheduled',
            'published_at' => 'nullable|date',
            'scheduled_at' => 'nullable|date|after:now',
            'is_featured' => 'boolean',
            'allow_comments' => 'boolean',
            'meta_data' => 'nullable|array',
            'meta_data.meta_title' => 'nullable|string|max:255',
            'meta_data.meta_description' => 'nullable|string|max:500',
            'meta_data.meta_keywords' => 'nullable|string|max:255',
            'meta_data.og_title' => 'nullable|string|max:255',
            'meta_data.og_description' => 'nullable|string|max:500',
            'meta_data.twitter_title' => 'nullable|string|max:255',
            'meta_data.twitter_description' => 'nullable|string|max:500',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Post title is required.',
            'content.required' => 'Post content is required.',
            'category_id.required' => 'Please select a category.',
            'category_id.exists' => 'The selected category is invalid.',
            'scheduled_at.after' => 'Scheduled date must be in the future.',
            'tags.*.exists' => 'One or more selected tags are invalid.',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'is_featured' => $this->boolean('is_featured'),
            'allow_comments' => $this->boolean('allow_comments'),
        ]);
    }
}