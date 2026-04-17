import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: "Hey I'm the Biztory WhatNew Chatbot and I'm here to help you understand all the new features in our tool library",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/snowflake-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: [{ type: 'text', text: input }] }],
          stream: false,
          model: 'openai-gpt-5',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong with the Snowflake API.');
      }

      const data = await response.json();
      console.log('Snowflake API Response:', data);
      
      const textBlock = data.content?.find(item => item.type === 'text');
      const botResponse = textBlock?.text || 'No response from bot.';
      
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'bot', content: botResponse },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'bot', content: `Error: ${error.message}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-xl shadow-inner border border-gray-200">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={cn(
              'flex flex-col p-4 rounded-2xl max-w-[85%] whitespace-pre-wrap shadow-sm',
              msg.role === 'user' ? 'ml-auto bg-purple-700 text-white' : 'mr-auto bg-gray-100 text-gray-800 border border-gray-200'
            )}
          >
            <div className="flex items-center gap-2 mb-2 opacity-80">
              {msg.role === 'bot' ? (
                <>
                  <Bot size={14} className="text-purple-700" />
                  <span className="text-xs font-bold uppercase tracking-wider">Biztory Bot</span>
                </>
              ) : (
                <>
                  <User size={14} className="text-purple-200" />
                  <span className="text-xs font-bold uppercase tracking-wider">You</span>
                </>
              )}
            </div>
            <div className={cn(
              "text-sm prose prose-sm max-w-none",
              msg.role === 'user' ? "prose-invert" : "prose-slate"
            )}>
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex flex-col p-4 rounded-2xl bg-gray-100 mr-auto max-w-[85%] border border-gray-200 animate-pulse">
            <div className="flex items-center gap-2 mb-2 opacity-80">
              <Bot size={14} className="text-purple-700" />
              <span className="text-xs font-bold uppercase tracking-wider">Biztory Bot</span>
            </div>
            <div className="flex items-center gap-2">
              <Loader2 className="animate-spin text-purple-700" size={16} />
              <span className="text-sm italic text-gray-500 font-medium">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
        <input
          type="text"
          className="flex-1 p-3 rounded-l-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <button
          className="bg-purple-700 hover:bg-purple-800 text-white px-6 rounded-r-xl flex items-center justify-center transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          onClick={sendMessage}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Send size={20} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
