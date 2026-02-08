import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader2, Key } from 'lucide-react';
import { callGemini } from '../lib/gemini';

const SYSTEM_PROMPT = {
    sender: 'system',
    text: "Sei SchoolBot, un assistente simpatico e paziente per studenti delle scuole superiori italiane. Aiuti con i compiti, spieghi concetti difficili in modo semplice e organizzi lo studio. Usa emoji. Non dare soluzioni complete ai compiti, ma guida lo studente verso la risposta. Sii incoraggiante."
};

export default function ChatView() {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'ai', text: "Ciao! 👋 Sono il tuo Tutor AI. Come posso aiutarti oggi con la scuola?" }
    ]);
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);
    const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_key') || '');
    const [showKeyInput, setShowKeyInput] = useState(!localStorage.getItem('gemini_key'));
    const scrollRef = useRef(null);

    // Auto-scroll logic
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputText.trim() || !apiKey) return;

        const userMsg = { id: Date.now(), sender: 'user', text: inputText };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setLoading(true);

        try {
            // Prepare context: System prompt + recent history (last 10 messages)
            const historyForAi = [SYSTEM_PROMPT, ...messages.slice(-10), userMsg];
            const responseText = await callGemini(historyForAi, apiKey);

            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: responseText }]);
        } catch (error) {
            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: "⚠️ Errore di connessione. Controlla la tua API Key." }]);
        } finally {
            setLoading(false);
        }
    };

    const saveKey = (e) => {
        e.preventDefault();
        localStorage.setItem('gemini_key', apiKey);
        setShowKeyInput(false);
    };

    if (showKeyInput) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-blue-100 p-4 rounded-full mb-4 text-blue-600">
                    <Bot size={48} />
                </div>
                <h2 className="text-xl font-bold mb-2">Attiva il tuo Tutor</h2>
                <p className="text-gray-500 mb-6 text-sm">Per usare l'intelligenza artificiale, inserisci la tua Google Gemini API Key.</p>

                <form onSubmit={saveKey} className="w-full max-w-sm space-y-3">
                    <div className="relative">
                        <Key className="absolute left-3 top-3.5 text-gray-400" size={18} />
                        <input
                            type="password"
                            value={apiKey}
                            onChange={e => setApiKey(e.target.value)}
                            placeholder="Incolla qui la tua API Key"
                            className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-blue-700">
                        Inizia a Chattare
                    </button>
                    <p className="text-xs text-gray-400 mt-4">
                        La chiave viene salvata solo sul tuo dispositivo.
                    </p>
                </form>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-white rounded-t-3xl shadow-inner overflow-hidden relative">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100 shadow-sm z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white shadow-md">
                        <Bot size={24} />
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-800">SchoolBot</h2>
                        <p className="text-xs text-green-500 font-medium flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Online
                        </p>
                    </div>
                </div>
                <button onClick={() => setShowKeyInput(true)} className="text-xs text-gray-400 hover:text-blue-500 underline">
                    Cambia Key
                </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div
                            className={`max-w-[85%] p-3.5 rounded-2xl shadow-sm text-sm leading-relaxed ${msg.sender === 'user'
                                    ? 'bg-blue-600 text-white rounded-tr-none'
                                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                                }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex items-center gap-2">
                            <Loader2 size={16} className="animate-spin text-blue-500" />
                            <span className="text-xs text-gray-400">Sto scrivendo...</span>
                        </div>
                    </div>
                )}
                <div className="h-2" /> {/* Spacer */}
            </div>

            {/* Input input */}
            <div className="p-3 bg-white border-t border-gray-100 pb-24 sm:pb-3">
                <form onSubmit={handleSend} className="relative flex items-center gap-2">
                    <input
                        type="text"
                        value={inputText}
                        onChange={e => setInputText(e.target.value)}
                        placeholder="Chiedimi qualcosa..."
                        className="flex-1 p-3.5 bg-gray-100 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none text-sm font-medium pl-4"
                    />
                    <button
                        type="submit"
                        disabled={!inputText.trim() || loading}
                        className="p-3.5 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 disabled:opacity-50 disabled:scale-95 transition-all shadow-md active:scale-95"
                    >
                        <Send size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
}
