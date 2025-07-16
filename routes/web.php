<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [App\Http\Controllers\WebsiteController::class, 'home']);
Route::get('/about', [App\Http\Controllers\WebsiteController::class, 'about']);
Route::get('/services', [App\Http\Controllers\WebsiteController::class, 'services']);
Route::get('/contact', [App\Http\Controllers\WebsiteController::class, 'contact']);

// Blog routes
Route::get('/blog', [App\Http\Controllers\BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/category/{category}', [App\Http\Controllers\BlogController::class, 'category'])->name('blog.category');
Route::get('/blog/{article:slug}', [App\Http\Controllers\BlogController::class, 'show'])->name('blog.show');

// Handle form submissions
Route::post('/contact', [App\Http\Controllers\ContactController::class, 'store']);
Route::post('/inquiry', [App\Http\Controllers\InquiryController::class, 'store']);

// Admin Dashboard (redirect to admin dashboard)
Route::get('/dashboard', function () {
    return redirect('/admin');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin routes (protected by auth middleware)
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
    Route::resource('services', App\Http\Controllers\Admin\ServiceController::class);
    Route::resource('contacts', App\Http\Controllers\Admin\ContactController::class)->only(['index', 'show', 'update', 'destroy']);
    Route::resource('inquiries', App\Http\Controllers\Admin\InquiryController::class)->only(['index', 'show', 'update', 'destroy']);
    Route::resource('faqs', App\Http\Controllers\Admin\FaqController::class);
    Route::resource('articles', App\Http\Controllers\Admin\ArticleController::class);
    Route::get('settings', [App\Http\Controllers\Admin\SettingController::class, 'index'])->name('settings.index');
    Route::post('settings', [App\Http\Controllers\Admin\SettingController::class, 'update'])->name('settings.update');
});

require __DIR__.'/auth.php';
