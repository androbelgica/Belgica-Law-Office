<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Article;
use Carbon\Carbon;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $articles = [
            [
                'title' => 'Understanding Your Rights in Employment Law',
                'excerpt' => 'A comprehensive guide to employee rights and protections under Philippine labor law.',
                'content' => '<p>Employment law in the Philippines provides extensive protections for workers. Understanding your rights is crucial for maintaining a fair and safe workplace.</p><p>Key areas covered include:</p><ul><li>Working hours and overtime compensation</li><li>Leave entitlements and benefits</li><li>Termination procedures and severance</li><li>Workplace safety and health standards</li></ul><p>If you believe your rights have been violated, it\'s important to seek legal counsel promptly to protect your interests.</p>',
                'category' => 'legal-tips',
                'tags' => ['employment', 'labor law', 'workers rights', 'Philippines'],
                'status' => 'published',
                'is_featured' => true,
                'meta_title' => 'Employment Rights in the Philippines - Legal Guide',
                'meta_description' => 'Learn about your employment rights under Philippine labor law. Expert legal guidance on workplace protections and employee benefits.',
                'published_at' => Carbon::now()->subDays(2),
            ],
            [
                'title' => 'Business Registration in the Philippines: A Step-by-Step Guide',
                'excerpt' => 'Everything you need to know about registering your business legally in the Philippines.',
                'content' => '<p>Starting a business in the Philippines requires proper legal registration and compliance with various government agencies.</p><p>Essential steps include:</p><ol><li>Choose your business structure (sole proprietorship, partnership, corporation)</li><li>Register with the Department of Trade and Industry (DTI)</li><li>Obtain necessary permits and licenses</li><li>Register with the Bureau of Internal Revenue (BIR)</li><li>Comply with Social Security System (SSS) requirements</li></ol><p>Proper legal guidance ensures your business starts on solid legal ground.</p>',
                'category' => 'business-law',
                'tags' => ['business registration', 'DTI', 'BIR', 'permits', 'startup'],
                'status' => 'published',
                'is_featured' => true,
                'meta_title' => 'Business Registration Philippines - Complete Legal Guide',
                'meta_description' => 'Step-by-step guide to business registration in the Philippines. Legal requirements, permits, and compliance made simple.',
                'published_at' => Carbon::now()->subDays(5),
            ],
            [
                'title' => 'Family Law: Child Custody and Support Guidelines',
                'excerpt' => 'Understanding child custody arrangements and support obligations in Philippine family law.',
                'content' => '<p>Child custody and support are among the most sensitive issues in family law. Philippine law prioritizes the best interests of the child in all custody decisions.</p><p>Key considerations include:</p><ul><li>Types of custody arrangements (sole, joint, shared)</li><li>Factors courts consider in custody decisions</li><li>Child support calculation and enforcement</li><li>Visitation rights and schedules</li><li>Modification of custody orders</li></ul><p>Professional legal representation is essential to protect both parental rights and children\'s welfare.</p>',
                'category' => 'family-law',
                'tags' => ['child custody', 'child support', 'family court', 'parental rights'],
                'status' => 'published',
                'is_featured' => false,
                'meta_title' => 'Child Custody and Support in Philippines - Family Law Guide',
                'meta_description' => 'Expert guidance on child custody and support under Philippine family law. Protecting children\'s interests and parental rights.',
                'published_at' => Carbon::now()->subDays(7),
            ],
            [
                'title' => 'Real Estate Transactions: Legal Requirements and Pitfalls',
                'excerpt' => 'Essential legal considerations when buying or selling property in the Philippines.',
                'content' => '<p>Real estate transactions involve significant legal and financial commitments. Understanding the legal requirements helps avoid costly mistakes.</p><p>Critical aspects include:</p><ul><li>Title verification and due diligence</li><li>Contract preparation and review</li><li>Transfer of ownership procedures</li><li>Tax obligations and payments</li><li>Common legal pitfalls to avoid</li></ul><p>Professional legal assistance ensures your property transaction is secure and legally compliant.</p>',
                'category' => 'real-estate',
                'tags' => ['real estate', 'property law', 'title transfer', 'due diligence'],
                'status' => 'published',
                'is_featured' => false,
                'meta_title' => 'Real Estate Legal Requirements Philippines - Property Law Guide',
                'meta_description' => 'Legal guide to real estate transactions in the Philippines. Title verification, contracts, and avoiding common pitfalls.',
                'published_at' => Carbon::now()->subDays(10),
            ],
            [
                'title' => 'Contract Law Basics: Essential Elements and Enforcement',
                'excerpt' => 'Understanding the fundamental principles of contract law and how to protect your interests.',
                'content' => '<p>Contracts form the foundation of business and personal relationships. Understanding contract law basics helps protect your rights and interests.</p><p>Essential elements of valid contracts:</p><ol><li>Offer and acceptance</li><li>Consideration (mutual benefit)</li><li>Legal capacity of parties</li><li>Lawful purpose and object</li><li>Proper form when required by law</li></ol><p>When contracts are breached, legal remedies are available to protect the injured party\'s interests.</p>',
                'category' => 'general',
                'tags' => ['contracts', 'contract law', 'legal agreements', 'enforcement'],
                'status' => 'published',
                'is_featured' => false,
                'meta_title' => 'Contract Law Basics Philippines - Legal Guide',
                'meta_description' => 'Essential guide to contract law in the Philippines. Understanding valid contracts, enforcement, and legal remedies.',
                'published_at' => Carbon::now()->subDays(14),
            ],
            [
                'title' => 'Recent Changes in Philippine Tax Law',
                'excerpt' => 'Updates on recent tax law changes affecting individuals and businesses.',
                'content' => '<p>Tax law in the Philippines undergoes regular updates that affect both individuals and businesses. Staying informed about these changes is crucial for compliance.</p><p>Recent significant changes include:</p><ul><li>Updates to income tax rates and brackets</li><li>New deduction and exemption rules</li><li>Digital tax compliance requirements</li><li>Changes in business tax obligations</li></ul><p>This article is currently being updated with the latest information. Please check back soon for complete details.</p>',
                'category' => 'news',
                'tags' => ['tax law', 'BIR', 'tax compliance', 'updates'],
                'status' => 'draft',
                'is_featured' => false,
                'meta_title' => 'Philippine Tax Law Changes - Latest Updates',
                'meta_description' => 'Stay updated on recent changes in Philippine tax law affecting individuals and businesses.',
                'published_at' => null,
            ]
        ];

        foreach ($articles as $articleData) {
            Article::create($articleData);
        }
    }
}
