import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
};

const TOAST_TYPES = {
    success: {
        icon: CheckCircle,
        bgLight: 'bg-green-50',
        bgDark: 'dark:bg-green-900/20',
        borderLight: 'border-green-200',
        borderDark: 'dark:border-green-800',
        textLight: 'text-green-800',
        textDark: 'dark:text-green-200',
        iconColor: 'text-green-500'
    },
    error: {
        icon: AlertCircle,
        bgLight: 'bg-red-50',
        bgDark: 'dark:bg-red-900/20',
        borderLight: 'border-red-200',
        borderDark: 'dark:border-red-800',
        textLight: 'text-red-800',
        textDark: 'dark:text-red-200',
        iconColor: 'text-red-500'
    },
    warning: {
        icon: AlertTriangle,
        bgLight: 'bg-yellow-50',
        bgDark: 'dark:bg-yellow-900/20',
        borderLight: 'border-yellow-200',
        borderDark: 'dark:border-yellow-800',
        textLight: 'text-yellow-800',
        textDark: 'dark:text-yellow-200',
        iconColor: 'text-yellow-500'
    },
    info: {
        icon: Info,
        bgLight: 'bg-blue-50',
        bgDark: 'dark:bg-blue-900/20',
        borderLight: 'border-blue-200',
        borderDark: 'dark:border-blue-800',
        textLight: 'text-blue-800',
        textDark: 'dark:text-blue-200',
        iconColor: 'text-blue-500'
    }
};

const Toast = ({ id, message, type = 'info', onClose }) => {
    const config = TOAST_TYPES[type];
    const Icon = config.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className={`
                ${config.bgLight} ${config.bgDark}
                ${config.borderLight} ${config.borderDark}
                border rounded-xl shadow-lg p-4 pr-12 min-w-[300px] max-w-md
                backdrop-blur-sm relative overflow-hidden
            `}
        >
            <div className="flex items-start gap-3">
                <Icon className={`${config.iconColor} flex-shrink-0 mt-0.5`} size={20} />
                <p className={`${config.textLight} ${config.textDark} text-sm font-medium flex-1`}>
                    {message}
                </p>
            </div>
            <button
                onClick={() => onClose(id)}
                className={`
                    absolute top-3 right-3 p-1 rounded-lg
                    ${config.textLight} ${config.textDark}
                    hover:bg-black/5 dark:hover:bg-white/10
                    transition-colors
                `}
            >
                <X size={16} />
            </button>
        </motion.div>
    );
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info', duration = 4000) => {
        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { id, message, type }]);

        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }

        return id;
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const toast = {
        success: (message, duration) => addToast(message, 'success', duration),
        error: (message, duration) => addToast(message, 'error', duration),
        warning: (message, duration) => addToast(message, 'warning', duration),
        info: (message, duration) => addToast(message, 'info', duration),
    };

    return (
        <ToastContext.Provider value={toast}>
            {children}
            <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 pointer-events-none">
                <AnimatePresence mode="popLayout">
                    {toasts.map(({ id, message, type }) => (
                        <div key={id} className="pointer-events-auto">
                            <Toast
                                id={id}
                                message={message}
                                type={type}
                                onClose={removeToast}
                            />
                        </div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};
