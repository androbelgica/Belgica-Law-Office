-- MIGRATION SCRIPT: Initial Data for Services and Articles
-- Run this script in your Supabase SQL Editor to populate the CMS with initial data.

-- 1. CLEANUP (Optional: Remove existing data to avoid duplicates if re-running)
-- DELETE FROM services;
-- DELETE FROM articles;

-- 2. INSERT SERVICES
INSERT INTO services (title, slug, description, icon, image_url, features, is_active)
VALUES
(
    'Civil Litigation',
    'civil-litigation',
    'Expert representation in civil disputes including breach of contract, property disputes, and torts.',
    'ScaleIcon',
    '/images/litigation_1767510503947.png',
    '["Breach of Contract", "Property Disputes", "Torts and Damages", "Collection Cases"]'::jsonb,
    true
),
(
    'Corporate Law',
    'corporate-law',
    'Legal assistance for business formation, compliance, contracts, and corporate governance.',
    'BriefcaseIcon',
    '/images/corporate_law_1767510529163.png',
    '["Business Registration (SEC/DTI)", "Corporate Governance", "Contract Drafting & Review", "Mergers & Acquisitions"]'::jsonb,
    true
),
(
    'Family Law',
    'family-law',
    'Compassionate handling of annulment, child custody, support, and other family matters.',
    'HeartIcon',
    '/images/family_law_1767510586642.png',
    '["Annulment / Nullity of Marriage", "Child Custody & Support", "Adoption", "Estate Settlement"]'::jsonb,
    true
),
(
    'Real Estate',
    'real-estate',
    'Assistance with property transactions, titling, transfers, and land disputes.',
    'HomeIcon',
    '/images/real_estate_1767510559509.png',
    '["Property Transfer/Titling", "Due Diligence", "Deed of Sale", "Land Disputes"]'::jsonb,
    true
),
(
    'Labor Law',
    'labor-law',
    'Advising on employer-employee relationships, termination disputes, and labor standards.',
    'UserGroupIcon',
    '/images/labor_law_1767510930550.png', 
    '["Illegal Dismissal Cases", "Labor Standards Compliance", "Employment Contracts", "Labor Relations"]'::jsonb,
    true
),
(
    'Notarial Services',
    'notarial-services',
    'Authentication of documents, affidavits, deeds of sale, and other legal instruments.',
    'DocumentTextIcon',
    '/images/notarial_services_1767510457772.png',
    '["Affidavits (Loss, Undertaking, etc.)", "Deeds of Sale / Donation", "Special Power of Attorney (SPA)", "Contracts and Agreements"]'::jsonb,
    true
);

-- 3. INSERT ARTICLES
INSERT INTO articles (title, slug, category, excerpt, content, published_at, views, is_featured, tags)
VALUES
(
    'Understanding Philippine Labor Laws',
    'understanding-philippine-labor-laws',
    'labor-law',
    'A comprehensive guide to employee rights and employer responsibilities in the Philippines.',
    '<p class="mb-4">Labor laws in the Philippines are designed to afford protection to labor, promote full employment, ensure equal work opportunities regardless of sex, race or creed, and regulate the relations between workers and employers.</p><h3 class="text-xl font-bold mb-2">Key Rights of Employees</h3><ul class="list-disc pl-5 mb-4"><li>Security of Tenure</li><li>Minimum Wage</li><li>Holiday Pay, 13th Month Pay, and Overtime Pay</li><li>Rest Days and Leaves (Service Incentive Leave, Maternity/Paternity Leave)</li><li>Social Security Benefits (SSS, PhilHealth, Pag-IBIG)</li></ul><p class="mb-4">Employers must also maintain a safe working environment and observe due process when imposing disciplinary actions or termination.</p><div class="bg-gray-50 p-4 border-l-4 border-primary-600 my-6"><strong>Note:</strong> This article provides a general overview. Specific cases may vary.</div>',
    '2023-10-15 10:00:00+00',
    120,
    true,
    '["Labor", "Employment", "Rights"]'::jsonb
),
(
    'Buying Property in the Philippines',
    'buying-property-philippines',
    'real-estate',
    'Essential legal steps and requirements for purchasing real estate in the country.',
    '<p class="mb-4">Buying real estate is one of the most significant investments you can make. Here is a simplified guide to the legal process in the Philippines.</p><h3 class="text-xl font-bold mb-2">1. Due Diligence</h3><p class="mb-4">Before signing anything, verify the Transfer Certificate of Title (TCT) with the Register of Deeds. Ensure the seller is the real owner and there are no encumbrances.</p><h3 class="text-xl font-bold mb-2">2. Deed of Absolute Sale</h3><p class="mb-4">Once the price is agreed upon and payment is made, a Deed of Absolute Sale is drafted and notarized.</p><h3 class="text-xl font-bold mb-2">3. Taxes and Transfer</h3><p class="mb-4">You must pay the Capital Gains Tax, Documentary Stamp Tax, Transfer Tax, and Registration Fees before the new title can be issued in your name.</p>',
    '2023-11-02 09:00:00+00',
    85,
    false,
    '["Real Estate", "Property", "Investment"]'::jsonb
),
(
    'Family Code Highlights',
    'family-code-highlights',
    'family-law',
    'Key provisions of the Family Code that every Filipino family should know.',
    '<p>The Family Code of the Philippines establishes the roadmap for family life, covering marriage, property relations between spouses, and parental authority. It is essential for every Filipino to understand the basic tenets of this code to protect their family''s interests.</p><p>Key areas include the requisites for a valid marriage, the system of absolute community of property (which is the default for marriages after Aug 3, 1988), and the grounds for legal separation and annulment. Understanding these can help prevent future legal disputes.</p>',
    '2023-12-10 14:00:00+00',
    200,
    false,
    '["Family", "Marriage", "Law"]'::jsonb
),
(
    'Starting a Business: Legal Requirements',
    'starting-business-legal-requirements',
    'corporate-law',
    'Everything you need to know about registering your business with the SEC and DTI.',
    '<p>Starting a business involves several legal hurdles. First, you must decide on the business structure: Sole Proprietorship (registered with DTI), Partnership, or Corporation (registered with SEC).</p><p>After registration, you need to secure a Mayor’s Permit from the Local Government Unit (LGU) where your business is located, and register with the Bureau of Internal Revenue (BIR) for tax purposes. Don''t forget statutory benefits for employees like SSS, PhilHealth, and Pag-IBIG.</p>',
    '2024-01-05 08:30:00+00',
    45,
    false,
    '["Business", "Startup", "SEC"]'::jsonb
),
(
    'Estate Planning 101',
    'estate-planning-101',
    'family-law',
    'Why having a Last Will and Testament is crucial for protecting your family''s future.',
    '<p>Estate planning is not just for the wealthy. It is about ensuring that your hard-earned assets are distributed according to your wishes after you pass away.</p><p>A Last Will and Testament allows you to designate heirs and specific properties for them. Without a will, your estate is settled via judicial or extrajudicial settlement among heirs, which can sometimes lead to disputes. Consulting with a lawyer to draft a valid will is the best step to secure your family''s harmony.</p>',
    '2024-01-20 11:15:00+00',
    67,
    false,
    '["Wills", "Estate", "Inheritance"]'::jsonb
),
(
    'Notary Public Services: What You Need',
    'notary-public-services-what-you-need',
    'legal-tips',
    'Common documents that require notarization and what to bring to your appointment.',
    '<p>Notarization converts a private document into a public instrument, making it admissible in court without further proof of its authenticity.</p><p>Common documents requiring notarization include Deeds of Sale, Special Powers of Attorney, Affidavits, and Contracts. When visiting a notary, always bring a valid government-issued ID (Passport, Driver’s License, UMID, etc.) to prove your identity. You must strictly appear in person before the notary public.</p>',
    '2024-02-01 13:45:00+00',
    156,
    false,
    '["Notary", "Documents", "Legal"]'::jsonb
);
