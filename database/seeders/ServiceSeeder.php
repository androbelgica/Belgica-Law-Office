<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [
                'title' => 'Legal Consultation',
                'description' => 'Professional legal advice and consultation services for individuals and businesses. Our experienced lawyers provide comprehensive guidance on various legal matters.',
                'features' => [
                    'Initial consultation assessment',
                    'Legal document review',
                    'Risk assessment and mitigation',
                    'Strategic legal planning',
                    'Ongoing legal support'
                ],
                'icon' => 'ScaleIcon',
                'sort_order' => 1,
                'is_active' => true
            ],
            [
                'title' => 'Document Preparation',
                'description' => 'Expert preparation and review of legal documents including contracts, agreements, and official paperwork with attention to detail and legal compliance.',
                'features' => [
                    'Contract drafting and review',
                    'Legal document templates',
                    'Notarization services',
                    'Document authentication',
                    'Legal compliance verification'
                ],
                'icon' => 'DocumentTextIcon',
                'sort_order' => 2,
                'is_active' => true
            ],
            [
                'title' => 'Corporate Legal Services',
                'description' => 'Comprehensive legal support for businesses including incorporation, compliance, contracts, and corporate governance matters.',
                'features' => [
                    'Business incorporation',
                    'Corporate compliance',
                    'Commercial contracts',
                    'Intellectual property protection',
                    'Employment law guidance'
                ],
                'icon' => 'BuildingOfficeIcon',
                'sort_order' => 3,
                'is_active' => true
            ],
            [
                'title' => 'Family Law Services',
                'description' => 'Compassionate legal assistance for family-related matters including divorce, custody, adoption, and domestic relations.',
                'features' => [
                    'Divorce proceedings',
                    'Child custody arrangements',
                    'Adoption services',
                    'Prenuptial agreements',
                    'Domestic violence protection'
                ],
                'icon' => 'HeartIcon',
                'sort_order' => 4,
                'is_active' => true
            ],
            [
                'title' => 'Real Estate Law',
                'description' => 'Expert legal services for property transactions, real estate disputes, and property-related legal matters.',
                'features' => [
                    'Property purchase/sale assistance',
                    'Title verification',
                    'Real estate contracts',
                    'Property dispute resolution',
                    'Zoning and land use issues'
                ],
                'icon' => 'HomeIcon',
                'sort_order' => 5,
                'is_active' => true
            ],
            [
                'title' => 'Litigation Support',
                'description' => 'Professional representation and support for court proceedings, disputes, and legal conflicts requiring litigation.',
                'features' => [
                    'Court representation',
                    'Case preparation and strategy',
                    'Evidence gathering',
                    'Settlement negotiations',
                    'Appeals and post-trial support'
                ],
                'icon' => 'ShieldCheckIcon',
                'sort_order' => 6,
                'is_active' => true
            ]
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}
