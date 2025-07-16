<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $query = Article::published();

        // Filter by category
        if ($request->has('category') && $request->category !== 'all') {
            $query->byCategory($request->category);
        }

        // Search
        if ($request->has('search') && $request->search) {
            $query->where(function($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('content', 'like', '%' . $request->search . '%')
                  ->orWhere('excerpt', 'like', '%' . $request->search . '%');
            });
        }

        $articles = $query->latest('published_at')->paginate(12)->withQueryString();
        $featuredArticles = Article::published()->featured()->recent(3)->get();
        $recentArticles = Article::published()->recent(5)->get();

        return Inertia::render('Blog/Index', [
            'articles' => $articles,
            'featuredArticles' => $featuredArticles,
            'recentArticles' => $recentArticles,
            'categories' => Article::getCategories(),
            'filters' => $request->only(['category', 'search']),
        ]);
    }

    public function show(Article $article)
    {
        // Check if article is published
        if (!$article->isPublished()) {
            abort(404);
        }

        // Increment views
        $article->incrementViews();

        // Get related articles
        $relatedArticles = Article::published()
            ->where('id', '!=', $article->id)
            ->where('category', $article->category)
            ->recent(3)
            ->get();

        return Inertia::render('Blog/Show', [
            'article' => $article,
            'relatedArticles' => $relatedArticles,
        ]);
    }

    public function category(Request $request, $category)
    {
        $categories = Article::getCategories();

        if (!array_key_exists($category, $categories)) {
            abort(404);
        }

        $articles = Article::published()
            ->byCategory($category)
            ->latest('published_at')
            ->paginate(12);

        return Inertia::render('Blog/Category', [
            'articles' => $articles,
            'category' => $category,
            'categoryName' => $categories[$category],
            'categories' => $categories,
        ]);
    }
}
