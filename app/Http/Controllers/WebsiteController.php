<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Faq;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WebsiteController extends Controller
{
    public function home()
    {
        $services = Service::active()->ordered()->get();
        $articles = Article::published()->recent(3)->get();
        $settings = $this->getSettings();

        // Sample testimonials (you can move these to database later)
        $testimonials = [
            [
                'name' => 'Maria Santos',
                'role' => 'Business Owner',
                'content' => 'BelgicaLaw provided excellent legal guidance for my business incorporation. Professional and reliable service.',
                'rating' => 5
            ],
            [
                'name' => 'Juan Dela Cruz',
                'role' => 'Property Investor',
                'content' => 'Their expertise in real estate law helped me navigate complex property transactions with confidence.',
                'rating' => 5
            ],
            [
                'name' => 'Ana Rodriguez',
                'role' => 'Family Client',
                'content' => 'Compassionate and thorough legal support during a difficult family matter. Highly recommended.',
                'rating' => 5
            ]
        ];

        return Inertia::render('Home', [
            'services' => $services,
            'articles' => $articles,
            'testimonials' => $testimonials,
            'settings' => $settings
        ]);
    }

    public function about()
    {
        $settings = $this->getSettings();

        return Inertia::render('About', [
            'settings' => $settings
        ]);
    }

    public function services()
    {
        $services = Service::active()->ordered()->get();
        $settings = $this->getSettings();

        return Inertia::render('Services', [
            'services' => $services,
            'settings' => $settings
        ]);
    }

    public function contact()
    {
        $settings = $this->getSettings();

        return Inertia::render('Contact', [
            'settings' => $settings
        ]);
    }

    private function getSettings()
    {
        $settings = Setting::all();
        $settingsArray = [];

        foreach ($settings as $setting) {
            $settingsArray[$setting->key] = $setting->value;
        }

        return $settingsArray;
    }
}
