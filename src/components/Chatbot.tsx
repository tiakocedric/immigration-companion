import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatbotProps {
  language: 'fr' | 'en';
}

export default function Chatbot({ language }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const content = {
    fr: {
      title: 'Assistant Immigration',
      subtitle: 'Posez vos questions',
      placeholder: 'Tapez votre message...',
      welcome: 'Bonjour! Je suis l\'assistant virtuel de MIMBIMMIGRATION. Comment puis-je vous aider avec votre projet d\'immigration au Canada?',
      error: 'Une erreur est survenue. Veuillez réessayer.',
    },
    en: {
      title: 'Immigration Assistant',
      subtitle: 'Ask your questions',
      placeholder: 'Type your message...',
      welcome: 'Hello! I\'m the virtual assistant of MIMBIMMIGRATION. How can I help you with your Canadian immigration project?',
      error: 'An error occurred. Please try again.',
    },
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ role: 'assistant', content: content[language].welcome }]);
    }
  }, [isOpen, language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('faq-chatbot', {
        body: { messages: [...messages, userMessage] },
      });

      if (error) throw error;

      if (data?.error) {
        toast.error(data.error);
        return;
      }

      const assistantMessage: Message = { role: 'assistant', content: data.message };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      toast.error(content[language].error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 flex items-center justify-center hover:bg-primary/90 transition-all ${isOpen ? 'hidden' : ''}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <MessageCircle size={20} className="sm:w-6 sm:h-6" />
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[360px] max-w-[360px] h-[calc(100vh-120px)] sm:h-[500px] max-h-[500px] bg-surface border border-border rounded-xl sm:rounded-2xl shadow-corporate-lg flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-primary text-primary-foreground">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Bot size={14} className="sm:w-[18px] sm:h-[18px]" />
                </div>
                <div>
                  <p className="font-semibold text-xs sm:text-sm">{content[language].title}</p>
                  <p className="text-[10px] sm:text-xs opacity-80">{content[language].subtitle}</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-primary-foreground/20 rounded-lg transition-colors">
                <X size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user' ? 'bg-primary/10' : 'bg-muted'
                  }`}>
                    {message.role === 'user' ? (
                      <User size={12} className="text-primary sm:w-[14px] sm:h-[14px]" />
                    ) : (
                      <Bot size={12} className="text-txt-secondary sm:w-[14px] sm:h-[14px]" />
                    )}
                  </div>
                  <div className={`max-w-[80%] px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-tr-sm'
                      : 'bg-muted text-txt-primary rounded-tl-sm'
                  }`}>
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-muted flex items-center justify-center">
                    <Bot size={12} className="text-txt-secondary sm:w-[14px] sm:h-[14px]" />
                  </div>
                  <div className="px-2.5 sm:px-3 py-2 rounded-xl rounded-tl-sm bg-muted">
                    <Loader2 size={14} className="animate-spin text-txt-secondary sm:w-4 sm:h-4" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-2.5 sm:p-3 border-t border-border">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={content[language].placeholder}
                  disabled={isLoading}
                  className="flex-1 px-3 py-2 sm:py-2.5 bg-background border border-border rounded-lg text-xs sm:text-sm text-txt-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 disabled:opacity-50"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="p-2 sm:p-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={14} className="sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}