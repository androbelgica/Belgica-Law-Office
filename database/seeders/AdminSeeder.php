<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Faq;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        User::firstOrCreate(
            ['email' => 'admin@belgicalaw.com'],
            [
                'name' => 'BelgicaLaw Admin',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // Create initial services
        $services = [
            [
                'title' => 'Legal Consultation',
                'description' => 'Professional legal advice and guidance for various legal matters.',
                'features' => ['Initial Case Assessment', 'Legal Strategy Development', 'Risk Analysis', 'Legal Documentation Review'],
                'icon' => 'ScaleIcon',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Notarial Services',
                'description' => 'Certified notarization of documents and legal instruments.',
                'features' => ['Document Notarization', 'Affidavits', 'Acknowledgments', 'Jurat Services'],
                'icon' => 'DocumentTextIcon',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Corporate Legal Services',
                'description' => 'Comprehensive legal support for businesses and corporations.',
                'features' => ['Business Formation', 'Contract Drafting', 'Compliance Review', 'Corporate Governance'],
                'icon' => 'UserGroupIcon',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'Legal Protection & Defense',
                'description' => 'Safeguard your rights and interests with expert legal representation.',
                'features' => ['Legal Representation', 'Dispute Resolution', 'Litigation Support', 'Settlement Negotiation'],
                'icon' => 'ShieldCheckIcon',
                'sort_order' => 4,
                'is_active' => true,
            ],
        ];

        foreach ($services as $service) {
            Service::firstOrCreate(
                ['title' => $service['title']],
                $service
            );
        }

        // Create initial settings
        $settings = [
            ['key' => 'site_name', 'value' => 'BelgicaLaw', 'type' => 'text', 'group' => 'general', 'description' => 'Website name'],
            ['key' => 'contact_email', 'value' => 'info@belgicalaw.com', 'type' => 'text', 'group' => 'contact', 'description' => 'Main contact email'],
            ['key' => 'contact_phone', 'value' => '+63 XXX XXX XXXX', 'type' => 'text', 'group' => 'contact', 'description' => 'Main contact phone'],
            ['key' => 'office_address', 'value' => 'Metro Manila, Philippines', 'type' => 'text', 'group' => 'contact', 'description' => 'Office address'],
            ['key' => 'office_latitude', 'value' => '14.5995', 'type' => 'text', 'group' => 'contact', 'description' => 'Office latitude coordinate for map display'],
            ['key' => 'office_longitude', 'value' => '120.9842', 'type' => 'text', 'group' => 'contact', 'description' => 'Office longitude coordinate for map display'],
            ['key' => 'map_zoom_level', 'value' => '15', 'type' => 'text', 'group' => 'contact', 'description' => 'Default zoom level for office location map'],
            ['key' => 'about_content', 'value' => 'Welcome to BelgicaLaw, where legal expertise meets personalized service. With years of experience in the Philippine legal system, we are committed to providing comprehensive legal solutions tailored to meet the unique needs of our clients.', 'type' => 'textarea', 'group' => 'content', 'description' => 'About page content'],
        ];

        foreach ($settings as $setting) {
            Setting::firstOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }

        // Create initial FAQs
        $faqs = [
            [
                'question' => 'What types of legal services do you offer?',
                'answer' => 'We offer a wide range of legal services including legal consultation, notarial services, corporate legal support, and legal representation.',
                'category' => 'services',
                'sort_order' => 1,
                'is_published' => true,
            ],
            [
                'question' => 'How much do your services cost?',
                'answer' => 'Our fees vary depending on the type and complexity of the legal matter. We offer transparent pricing and will provide you with a clear fee structure during your initial consultation.',
                'category' => 'pricing',
                'sort_order' => 2,
                'is_published' => true,
            ],
            [
                'question' => 'How can I schedule a consultation?',
                'answer' => 'You can schedule a consultation by calling our office, sending us an email, or using the contact form on our website. We typically respond within 24 hours.',
                'category' => 'consultation',
                'sort_order' => 3,
                'is_published' => true,
            ],
        ];

        foreach ($faqs as $faq) {
            Faq::firstOrCreate(
                ['question' => $faq['question']],
                $faq
            );
        }
    }
}
