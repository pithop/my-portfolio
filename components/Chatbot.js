'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const { t } = useTranslation();
    const messagesEndRef = useRef(null);
    const [modelLoaded, setModelLoaded] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    
    useEffect(() => {
        scrollToBottom();
      }, [messages.length]);

    // Preload model and set up initial welcome message
    useEffect(() => {
        if (!isOpen) return;
        
        const preloadModel = async () => {
          try {
            // Check if environment variable is set
            if (!process.env.NEXT_PUBLIC_CHATBOT_URL) {
              throw new Error('Chatbot URL not configured');
            }
            
            const baseUrl = process.env.NEXT_PUBLIC_CHATBOT_URL;
            const url = new URL(baseUrl);
            if (url.port !== '11434') url.port = '11434';
            
            const apiUrl = new URL('api/generate', url).href;
            
            // Preload request
            const response = await fetch(apiUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                model: 'portfolio-gemma',
                prompt: 'Preload model',
                stream: false,
              }),
            });
            
            if (!response.ok) {
              throw new Error(`Preload failed: ${response.status}`);
            }
            
            setModelLoaded(true);
            
            // Add welcome message only once when model loads
            if (messages.length === 0) {
              setMessages([
                { 
                  text: "Hello! I'm Idriss's portfolio assistant. Ask me anything about his skills, projects, or experience!", 
                  sender: 'ai' 
                }
              ]);
            }
          } catch (error) {
            console.error('Model preload failed:', error);
            setMessages([
              { 
                text: "Hello! I'm Idriss's portfolio assistant. How can I help you today?", 
                sender: 'ai' 
              }
            ]);
          }
        };
      
        preloadModel();
      }, [isOpen, messages.length]);

    // Optimized context generation
    const getOptimizedContext = () => {
        return `
            You are an assistant for Idriss Chahraoui's portfolio. 
            Key skills: ${t('skillsData', { returnObjects: true }).slice(0, 5).join(', ')}
            Recent projects: ${t('projectsData', { returnObjects: true }).slice(0, 3).map(p => p.title).join(', ')}
            Experience highlights: ${t('experienceData', { returnObjects: true }).slice(0, 2).map(e => e.title).join(', ')}
            Answer concisely and professionally.
        `;
    };

    const sendMessage = async () => {
        if (!message.trim() || isTyping || !modelLoaded) return;

        // Add user message
        const userMsg = { text: message, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setMessage('');
        
        // Add typing indicator
        setMessages(prev => [...prev, { text: '', sender: 'ai', isTyping: true }]);
        setIsTyping(true);

        try {
            const baseUrl = process.env.NEXT_PUBLIC_CHATBOT_URL;
            let url = new URL(baseUrl);
            if (url.port !== '11434') url.port = '11434';
            
            const apiUrl = new URL('api/generate', url).href;
            const context = getOptimizedContext();
            
            // Use streaming API for faster responses
            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'portfolio-gemma',
                    prompt: `${context}\n\nUser: ${userMsg.text}\nAssistant:`,
                    stream: true,  // Enable streaming
                }),
            });

            if (!res.ok) throw new Error('Failed to fetch from chatbot API');

            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let responseText = '';
            let aiResponseIndex = -1;
            
            // Create a placeholder for the AI response
            setMessages(prev => {
                const newMessages = [...prev.filter(msg => !msg.isTyping)];
                aiResponseIndex = newMessages.length;
                newMessages.push({ text: '', sender: 'ai' });
                return newMessages;
            });
            
            // Process streamed response
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                
                const chunk = decoder.decode(value);
                const lines = chunk.split('\n').filter(line => line.trim());
                
                for (const line of lines) {
                    try {
                        const data = JSON.parse(line);
                        if (data.response) {
                            responseText += data.response;
                            
                            // Update the specific AI message
                            setMessages(prev => {
                                const newMessages = [...prev];
                                if (aiResponseIndex >= 0 && aiResponseIndex < newMessages.length) {
                                    newMessages[aiResponseIndex] = { 
                                        text: responseText, 
                                        sender: 'ai' 
                                    };
                                }
                                return newMessages;
                            });
                        }
                    } catch {
                        // Skip invalid JSON
                    }
                }
            }
            
        } catch (error) {
            setMessages(prev => {
                const newMessages = prev.filter(msg => !msg.isTyping);
                newMessages.push({ 
                    text: `Sorry, I encountered an error: ${error.message}`, 
                    sender: 'ai' 
                });
                return newMessages;
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
                                        transition={{ duration: 0.3 }}
                                        className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user'
                                                ? 'bg-indigo-500 text-white ml-auto rounded-br-none'
                                                : 'bg-gray-100 dark:bg-gray-800 rounded-bl-none'
                                            }`}
                                    >
                                        {msg.isTyping ? (
                                            <div className="flex space-x-1.5">
                                                <motion.div
                                                    className="w-2 h-2 bg-gray-500 rounded-full"
                                                    animate={{ y: [0, -5, 0] }}
                                                    transition={{ 
                                                        duration: 0.6,
                                                        repeat: Infinity,
                                                        repeatType: "reverse"
                                                    }}
                                                />
                                                <motion.div
                                                    className="w-2 h-2 bg-gray-500 rounded-full"
                                                    animate={{ y: [0, -5, 0] }}
                                                    transition={{ 
                                                        duration: 0.6,
                                                        repeat: Infinity,
                                                        repeatType: "reverse",
                                                        delay: 0.2
                                                    }}
                                                />
                                                <motion.div
                                                    className="w-2 h-2 bg-gray-500 rounded-full"
                                                    animate={{ y: [0, -5, 0] }}
                                                    transition={{ 
                                                        duration: 0.6,
                                                        repeat: Infinity,
                                                        repeatType: "reverse",
                                                        delay: 0.4
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            msg.text
                                        )}
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
                                    onKeyDown={(e) => e.key === 'Enter' && !isTyping && sendMessage()}
                                    disabled={isTyping}
                                    className="flex-1 p-2 rounded-lg border dark:bg-gray-800 text-gray-900 dark:text-white disabled:opacity-70"
                                    placeholder={isTyping ? "Assistant is typing..." : "Type your message..."}
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={isTyping || !modelLoaded}
                                    className="p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50"
                                    title={!modelLoaded ? "Model is still loading" : ""}
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