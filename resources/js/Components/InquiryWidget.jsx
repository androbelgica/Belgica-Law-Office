import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { 
    ChatBubbleLeftRightIcon, 
    XMarkIcon,
    PaperAirplaneIcon 
} from '@heroicons/react/24/outline';

export default function InquiryWidget() {
    const [isOpen, setIsOpen] = useState(false);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/inquiry', {
            onSuccess: () => {
                reset();
                setIsOpen(false);
                // You can add a success notification here
            }
        });
    };

    return (
        <>
            {/* Widget Toggle Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg transition-colors duration-200"
                >
                    {isOpen ? (
                        <XMarkIcon className="h-6 w-6" />
                    ) : (
                        <ChatBubbleLeftRightIcon className="h-6 w-6" />
                    )}
                </button>
            </div>

            {/* Widget Panel */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-xl border z-50">
                    <div className="bg-primary-600 text-white p-4 rounded-t-lg">
                        <h3 className="font-semibold">Quick Inquiry</h3>
                        <p className="text-sm text-primary-100">Send us a message</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="p-4 space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Your Name (Optional)"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                            )}
                        </div>
                        
                        <div>
                            <input
                                type="email"
                                placeholder="Your Email (Optional)"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                            )}
                        </div>
                        
                        <div>
                            <textarea
                                placeholder="Your message..."
                                rows={4}
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                                className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                                required
                            />
                            {errors.message && (
                                <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                            )}
                        </div>
                        
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
                        >
                            {processing ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            ) : (
                                <>
                                    Send Message
                                    <PaperAirplaneIcon className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </button>
                    </form>
                    
                    <div className="px-4 pb-4">
                        <p className="text-xs text-secondary-500 text-center">
                            We'll get back to you as soon as possible
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
