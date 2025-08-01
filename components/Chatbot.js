'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { franc } from 'franc-min';

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const { t } = useTranslation();
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // This effect smoothly scrolls down whenever a new message is added.
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // ✅ FIXED: This effect sets the welcome message ONCE when the chatbot opens.
    // It only depends on `isOpen` to avoid the size-change error.
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([
                {
                    id: Date.now(),
                    text: "Hello! I'm Idriss's portfolio assistant. Ask me anything about his skills, projects, or experience!",
                    sender: 'ai'
                }
            ]);
        }
    }, [isOpen]);

    const getOptimizedContext = (lang) => {
        return `
          Idriss is a full-stack developer with expertise in:
          ${t('skillsData', { returnObjects: true, lng: lang }).slice(0, 15).join(', ')}...
          
          Education:
          - ${t('educationData', { returnObjects: true, lng: lang }).map(e => e.title).join('\n- ') ||
            'Currently in a Master in Software Engineering, University of Montpellier\n- Professional License in Digital Systems, University of Avignon\n- DUT in Computer Engineering, EST Sidi Bennour'}
          
          Key experience:
          ${t('experienceData', { returnObjects: true, lng: lang }).slice(0, 2).map(e =>
                `- ${e.title} at ${e.company}: ${e.description}`
            ).join('\n')}
        `;
    };

    const sendMessage = async () => {
        if (!message.trim() || isTyping) return;

        const userMsgId = Date.now();
        const userMsg = { id: userMsgId, text: message, sender: 'user', status: 'Sending...' };

        setMessages(prev => [...prev, userMsg]);
        setMessage('');
        setIsTyping(true);

        try {
            const apiUrl = '/api/chatbot';
            const detectedLangCode = franc(message) === 'fra' ? 'fr' : 'en';
            const context = getOptimizedContext(detectedLangCode);

            const systemMessage = `
              You are Idriss Chahraoui's portfolio assistant. Here is some information about him:
              ${context}
              Provide concise, professional responses in 1-2 sentences. 
              Add a touch of subtle, professional humor when appropriate. 
              Always respond in the same language as the user's question, using markdown for formatting.
            `;
            const fullPrompt = `<system>${systemMessage}</system><user>${userMsg.text}</user><response>`;

            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: fullPrompt }),
            });

            // Mark as "Seen" once the API responds
            setMessages(prev => prev.map(msg => msg.id === userMsgId ? { ...msg, status: 'Seen' } : msg));

            if (!res.ok) {
                const errorBody = await res.json();
                throw new Error(errorBody.error?.message || 'The assistant is currently offline.');
            }
            
            // Add the AI typing indicator
            const aiTypingId = Date.now() + 1;
            setMessages(prev => [...prev, { id: aiTypingId, sender: 'ai', isTyping: true, text: '' }]);

            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let responseText = '';

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const jsonStr = line.substring(6);
                        if (jsonStr === '[DONE]') break;
                        try {
                            const data = JSON.parse(jsonStr);
                            const content = data.choices?.[0]?.delta?.content;
                            if (content) {
                                responseText += content;
                                setMessages(prev => prev.map(msg => 
                                    msg.id === aiTypingId ? { ...msg, text: responseText } : msg
                                ));
                            }
                        } catch (e) { /* Ignore incomplete JSON */ }
                    }
                }
            }
            // Finalize the AI message by removing the typing indicator
            setMessages(prev => prev.map(msg => msg.id === aiTypingId ? { ...msg, isTyping: false } : msg));

        } catch (error) {
            setMessages(prev => {
                const finalMessages = prev.filter(msg => !msg.isTyping);
                finalMessages.push({
                    id: Date.now(),
                    text: `Sorry, an error occurred: ${error.message}`,
                    sender: 'ai'
                });
                return finalMessages.map(msg => msg.id === userMsgId ? { ...msg, status: 'Failed' } : msg);
            });
        } finally {
            setIsTyping(false);
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
                        <div className="p-4 bg-indigo-500 text-white rounded-t-xl flex justify-between items-center">
                            <div>
                                <h3 className="font-bold">Portfolio Assistant</h3>
                                <p className="text-sm opacity-80">Ask me anything about Idriss</p>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-white/20 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        <div className="flex-1 p-4 overflow-y-auto">
                            <div className="space-y-2">
                                {messages.map((msg) => (
                                    <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className={`max-w-[85%] p-3 rounded-2xl ${msg.sender === 'user'
                                                ? 'bg-indigo-500 text-white ml-auto rounded-br-none'
                                                : 'bg-gray-100 dark:bg-gray-800 rounded-bl-none'
                                            }`}
                                        >
                                            {msg.isTyping ? (
                                                <div className="flex space-x-1.5">
                                                    <motion.div className="w-2 h-2 bg-gray-500 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }} />
                                                    <motion.div className="w-2 h-2 bg-gray-500 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse", delay: 0.2 }} />
                                                    <motion.div className="w-2 h-2 bg-gray-500 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse", delay: 0.4 }} />
                                                </div>
                                            ) : (
                                                <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                                            )}
                                        </motion.div>
                                        {msg.sender === 'user' && msg.status && (
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="text-xs text-gray-500 dark:text-gray-400 mt-1 mr-2"
                                            >
                                                {msg.status}
                                            </motion.p>
                                        )}
                                    </div>
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
                                    onKeyDown={(e) => e.key === 'Enter' && !isTyping && sendMessage()}
                                    disabled={isTyping}
                                    className="flex-1 p-2 rounded-lg border dark:bg-gray-800 text-gray-900 dark:text-white disabled:opacity-70"
                                    placeholder={isTyping ? "Assistant is typing..." : "Type your message..."}
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={isTyping}
                                    className="p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
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
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}