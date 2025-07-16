import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function FlashMessage() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
        if (flash?.success) {
            setMessage(flash.success);
            setType('success');
            setVisible(true);
        } else if (flash?.error) {
            setMessage(flash.error);
            setType('error');
            setVisible(true);
        }
    }, [flash]);

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                setVisible(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <div className="fixed top-4 right-4 z-50 max-w-sm">
            <div className={`rounded-lg p-4 shadow-lg ${
                type === 'success'
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
            }`}>
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        {type === 'success' ? (
                            <CheckCircleIcon className="h-5 w-5 text-green-400" />
                        ) : (
                            <XCircleIcon className="h-5 w-5 text-red-400" />
                        )}
                    </div>
                    <div className="ml-3 flex-1">
                        <p className={`text-sm font-medium ${
                            type === 'success' ? 'text-green-800' : 'text-red-800'
                        }`}>
                            {message}
                        </p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                        <button
                            onClick={() => setVisible(false)}
                            className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                type === 'success'
                                    ? 'text-green-500 hover:bg-green-100 focus:ring-green-600'
                                    : 'text-red-500 hover:bg-red-100 focus:ring-red-600'
                            }`}
                        >
                            <XMarkIcon className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
