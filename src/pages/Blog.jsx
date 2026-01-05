import { supabase } from '../lib/supabase';
import React, { useState, useEffect } from 'react';

export default function Blog() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const { data, error } = await supabase
                    .from('articles')
                    .select('*')
                    .order('published_at', { ascending: false });

                if (error) throw error;

                // transform data
                const formatted = (data || []).map(a => ({
                    ...a,
                    formatted_published_at: new Date(a.published_at).toLocaleDateString(),
                    read_time: 5, // fallback
                }));
                setArticles(formatted);
            } catch (err) {
                console.error('Error fetching articles:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const categories = ['All', ...new Set(articles.map(article => article.category))];

    const filteredArticles = filter === 'All'
        ? articles
        : articles.filter(article => article.category === filter);

    return (
        <Layout title="Legal Blog - Insights and Updates">
            {/* Hero Section */}
            <div className="bg-secondary-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-900 via-secondary-800 to-primary-900 opacity-90"></div>
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-20"
                    style={{ backgroundImage: "url('/images/bg.png')" }}
                ></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                        Legal Insights
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Stay updated with the latest legal news, guides, and practical advice from our expert team.
                    </p>
                </div>
            </div>

            {/* Filter */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setFilter(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === category
                                ? 'bg-primary-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredArticles.map((article, index) => (
                        <ArticleCard key={article.id} article={article} index={index} />
                    ))}
                </div>

                {filteredArticles.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No articles found in this category.</p>
                    </div>
                )}
            </div>
        </Layout>
    );
}
