import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../layouts/Layout';
import { CalendarIcon, ClockIcon, UserIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { supabase } from '../lib/supabase';

export default function BlogPost() {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const { data, error } = await supabase
                    .from('articles')
                    .select('*')
                    .eq('slug', slug)
                    .single();

                if (error) throw error;

                setArticle({
                    ...data,
                    formatted_published_at: new Date(data.published_at).toLocaleDateString(),
                    read_time: 5, // fallback
                    author: 'Atty. Belgica' // fallback/hardcoded unless we join profiles
                });
            } catch (err) {
                console.error('Error fetching article:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [slug]);

    if (loading) return <Layout><div className="py-20 text-center">Loading article...</div></Layout>;
    if (!article) return <Layout><div className="py-20 text-center">Article not found.</div></Layout>;

    return (
        <Layout title={`${article.title} - BelgicaLaw Blog`}>
            <div className="bg-white py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link to="/blog" className="inline-flex items-center text-primary-600 hover:text-primary-800 mb-6 transition-colors">
                        <ArrowLeftIcon className="h-4 w-4 mr-2" />
                        Back to Articles
                    </Link>

                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                        {article.title}
                    </h1>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center text-gray-500 text-sm mb-8 space-x-6 border-b border-gray-100 pb-8">
                        <div className="flex items-center">
                            <UserIcon className="h-4 w-4 mr-2" />
                            {article.author}
                        </div>
                        <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            {article.formatted_published_at}
                        </div>
                        <div className="flex items-center">
                            <ClockIcon className="h-4 w-4 mr-2" />
                            {article.read_time} min read
                        </div>
                        <div className="flex items-center">
                            <span className="bg-primary-50 text-primary-700 px-2.5 py-0.5 rounded-full font-medium">
                                {article.category}
                            </span>
                        </div>
                    </div>

                    {/* Featured Image Placeholder */}
                    <div className="w-full h-80 bg-gray-200 rounded-xl mb-8 flex items-center justify-center text-gray-400">
                        {article.featured_image ? (
                            <img src={article.featured_image} className="w-full h-full object-cover rounded-xl" alt={article.title} />
                        ) : (
                            <span className="text-lg">Featured Image</span>
                        )}
                    </div>

                    {/* Content */}
                    <div
                        className="prose prose-lg max-w-none text-gray-700 font-sans"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                </div>
            </div>
        </Layout>
    );
}
