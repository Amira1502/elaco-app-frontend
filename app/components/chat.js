'use client';

import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Bot,
  Send,
  X,
  Minimize2,
  Maximize2,
  Zap,
  Calendar,
  Briefcase,
  Coffee,
} from 'lucide-react';

export default function CoworkingSpaceBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      text:
        'Welcome to our coworking space! I can help with bookings, amenities, or any questions you have. How can I assist you today?',
      isBot: true,
      isProcessing: false,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [userId, setUserId] = useState(null);
  const [botActivity, setBotActivity] = useState(0);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const apiUrl = 'https://1c91-34-87-3-152.ngrok-free.app';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    let interval;
    if (isTyping) {
      interval = setInterval(() => {
        setBotActivity((prev) => (prev + 1) % 100);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isTyping]);

  useEffect(() => {
    let stored = localStorage.getItem('userId');
    if (!stored) {
      stored = uuidv4();
      localStorage.setItem('userId', stored);
    }
    setUserId(stored);
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      if (!isMinimized) {
        setTimeout(() => inputRef.current?.focus(), 300);
      }
    }
  }, [messages, isOpen, isMinimized]);
  const handleSendMessage = async () => {
  if (!message.trim() || isTyping) return;

  const userText = message.trim();
  setMessages((prev) => [...prev, { text: userText, isBot: false, isProcessing: false }]);
  setMessage('');
  setIsTyping(true);

  setMessages((prev) => [...prev, { text: 'Thinking...', isBot: true, isProcessing: true }]);

  try {
    const res = await fetch(`${apiUrl}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: userText }),  // <-- use "question" here

    });

    let botReply = 'Sorry, I didn’t get that.';
    if (res.ok) {
      const data = await res.json();
      console.log('API response:', data);
      if (data.response) botReply = data.response;
    } else {
      console.error('API returned status', res.status);
    }

    setMessages((prev) => {
      // Remove processing messages
      const filtered = prev.filter((m) => !m.isProcessing);
      // Add the bot reply
      return [...filtered, { text: botReply, isBot: true, isProcessing: false }];
    });
  } catch (err) {
    console.error('Send error:', err);
    setMessages((prev) => {
      const filtered = prev.filter((m) => !m.isProcessing);
      return [
        ...filtered,
        {
          text: 'Connection error. Please try again later.',
          isBot: true,
          isProcessing: false,
        },
      ];
    });
  } finally {
    setIsTyping(false);
  }
};


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen((o) => !o);
    setIsMinimized(false);
  };
  const toggleMinimize = () => setIsMinimized((m) => !m);

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-black hover:bg-gray-900 text-[#07ebbd] rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-110 relative"
          aria-label="Open coworking space assistant"
        >
          <div className="absolute inset-0 bg-[#07ebbd] rounded-full opacity-20 animate-ping"></div>
          <div className="relative">
            <Bot size={24} className="animate-pulse" />
          </div>
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-[#07ebbd] px-3 py-1 rounded-full text-xs whitespace-nowrap border border-[#07ebbd]">
            Ask me anything!
          </div>
        </button>
      )}

      {isOpen && (
        <div
          className={`bg-black rounded-lg shadow-2xl overflow-hidden transition-all duration-500 flex flex-col border border-[#07ebbd]
                      ${isMinimized ? 'h-14 w-72' : 'h-96 w-80 md:w-96'}`}
          style={{
            animation: 'slideIn 0.3s ease-out',
            boxShadow: '0 0 20px rgba(7, 235, 189, 0.35)',
          }}
        >
          <div className="bg-black text-[#07ebbd] p-3 flex justify-between items-center border-b border-gray-800">
            <div className="flex items-center space-x-2" ref={messagesEndRef}>
              <Bot size={20} className={isTyping ? 'animate-pulse' : ''} />
              <h3 className="font-medium">Coworking Assistant</h3>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={toggleMinimize}
                className="hover:bg-gray-900 rounded p-1 transition-colors"
                aria-label={isMinimized ? 'Maximize chat' : 'Minimize chat'}
              >
                {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>
              <button
                onClick={toggleChat}
                className="hover:bg-gray-900 rounded p-1 transition-colors"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="bg-gray-900 px-3 py-2 flex justify-center space-x-4 text-xs">
                <button
                  className="flex flex-col items-center text-[#07ebbd] hover:bg-gray-800 p-1 rounded transition-colors"
                  onClick={() => {
                    setMessage('How do I book a meeting room?');
                    setTimeout(handleSendMessage, 100);
                  }}
                >
                  <Calendar size={16} />
                  <span>Booking</span>
                </button>
                <button
                  className="flex flex-col items-center text-[#07ebbd] hover:bg-gray-800 p-1 rounded transition-colors"
                  onClick={() => {
                    setMessage('What are the opening hours?');
                    setTimeout(handleSendMessage, 100);
                  }}
                >
                  <Briefcase size={16} />
                  <span>Hours</span>
                </button>
                <button
                  className="flex flex-col items-center text-[#07ebbd] hover:bg-gray-800 p-1 rounded transition-colors"
                  onClick={() => {
                    setMessage('Where can I get coffee?');
                    setTimeout(handleSendMessage, 100);
                  }}
                >
                  <Coffee size={16} />
                  <span>Amenities</span>
                </button>
              </div>

              <div
                className="flex-1 overflow-y-auto p-4 bg-gray-900 relative"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, rgba(7, 235, 189, 0.03) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              >
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`mb-3 max-w-3/4 ${
                      msg.isBot ? 'mr-auto' : 'ml-auto'
                    }`}
                  >
                    <div
                      className={`p-3 rounded-lg ${
                        msg.isBot
                          ? 'bg-black text-[#07ebbd] border-l-2 border-[#07ebbd]'
                          : 'bg-gray-800 text-white border-r-2 border-[#07ebbd] rounded-br-none'
                      } ${msg.isProcessing ? 'animate-pulse' : ''}`}
                      style={{
                        animation:
                          i === messages.length - 1
                            ? 'fadeIn 0.3s ease-out'
                            : 'none',
                        boxShadow: msg.isBot
                          ? '0 0 8px rgba(7, 235, 189, 0.15)'
                          : 'none',
                      }}
                    >
                      {msg.text}
                    </div>
                    {msg.isBot && !msg.isProcessing && (
                      <div className="ml-2 mt-1 text-xs text-gray-400 flex items-center">
                        <Zap size={10} className="mr-1 text-[#07ebbd]" />
                        <span>ASSISTANT</span>
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && !messages.some((m) => m.isProcessing) && (
                  <div className="flex space-x-1 p-3 bg-black text-[#07ebbd] rounded-lg max-w-xs mr-auto border-l-2 border-[#07ebbd]">
                    <div className="w-2 h-2 bg-[#07ebbd] rounded-full animate-ping"></div>
                    <div className="w-2 h-2 bg-[#07ebbd] rounded-full animate-ping delay-100"></div>
                    <div className="w-2 h-2 bg-[#07ebbd] rounded-full animate-ping delay-200"></div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-3 border-t border-gray-800 bg-black flex">
                <input
                  ref={inputRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="flex-1 bg-gray-800 text-white rounded-l px-3 py-2 outline-none"
                  placeholder="Type your message..."
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-[#07ebbd] hover:bg-[#06d6aa] text-black px-3 py-2 rounded-r transition-colors disabled:opacity-50"
                  disabled={isTyping}
                >
                  <Send size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
