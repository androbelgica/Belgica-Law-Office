<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\Inquiry;
use App\Models\Service;
use App\Models\Faq;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_contacts' => Contact::count(),
            'unread_contacts' => Contact::unread()->count(),
            'total_inquiries' => Inquiry::count(),
            'unread_inquiries' => Inquiry::unread()->count(),
            'total_services' => Service::count(),
            'active_services' => Service::active()->count(),
            'total_faqs' => Faq::count(),
            'published_faqs' => Faq::published()->count(),
        ];

        $recent_contacts = Contact::latest()->take(5)->get();
        $recent_inquiries = Inquiry::latest()->take(5)->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recent_contacts' => $recent_contacts,
            'recent_inquiries' => $recent_inquiries,
        ]);
    }
}
