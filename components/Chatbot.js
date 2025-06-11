'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { t } = useTranslation();
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!message.trim()) return;

        // Add user message
        const userMsg = { text: message, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setMessage('');

        const context = `You are an assistant for a software engineer's portfolio. Projects: ${JSON.stringify(t('projectsData', { returnObjects: true }))}. Skills: ${t('skillsData', { returnObjects: true }).join(', ')}. Experience: ${JSON.stringify(t('experienceData', { returnObjects: true }))}. Answer questions about the portfolio.`;

        try {
            const baseUrl = process.env.NEXT_PUBLIC_CHATBOT_URL;

            // Create a URL object to manipulate the baseUrl
            let url = new URL(baseUrl);

            // If the port is not 11434, set it to 11434
            if (url.port !== '11434') {
                url.port = '11434';
            }

            // Construct the full API URL by appending '/api/generate'
            const apiUrl = new URL('api/generate', url).href;
            console.log('API URL:', apiUrl); // Optional: for debugging

            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'portfolio-gemma',
                    prompt: `${context}\n\nUser: ${message}\nAssistant:`,
                    stream: false,
                }),
            });

            if (!res.ok) throw new Error('Failed to fetch from chatbot API');

            const data = await res.json();
            const aiMsg = { text: data.response || "I couldn't process that request", sender: 'ai' };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            const errorMsg = { text: `Error connecting to AI: ${error.message}`, sender: 'ai' };
            setMessages(prev => [...prev, errorMsg]);
            console.error('Chatbot error:', error);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="bg-glass rounded-xl shadow-2xl w-[350px] h-[500px] flex flex-col border border-gray-200 dark:border-gray-700"
                    >
                        <div className="p-4 bg-indigo-500 text-white rounded-t-xl">
                            <h3 className="font-bold">Portfolio Assistant</h3>
                            <p className="text-sm opacity-80">Ask me anything about Idriss</p>
                        </div>

                        <div className="flex-1 p-4 overflow-y-auto">
                            <div className="space-y-4">
                                {messages.map((msg, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user'
                                                ? 'bg-indigo-500 text-white ml-auto rounded-br-none'
                                                : 'bg-gray-100 dark:bg-gray-800 rounded-bl-none'
                                            }`}
                                    >
                                        {msg.text}
                                    </motion.div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>

                        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                    className="flex-1 p-2 rounded-lg border dark:bg-gray-800"
                                    placeholder="Type your message..."
                                />
                                <button
                                    onClick={sendMessage}
                                    className="p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(true)}
                        className="w-14 h-14 bg-indigo-500 text-white rounded-full shadow-lg flex items-center justify-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                            />
                        </svg>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}