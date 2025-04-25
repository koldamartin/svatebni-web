import { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ChatBot() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message to chat history
    setChatHistory([...chatHistory, { sender: 'user', text: message }]);
    
    // Clear input field
    setMessage('');
    
    // Simulate AI response (this will be replaced with actual backend later)
    setTimeout(() => {
      setChatHistory(prev => [
        ...prev, 
        { sender: 'bot', text: 'Děkuji za vaši zprávu! Tato funkce bude brzy k dispozici.' }
      ]);
    }, 1000);
  };

  return (
    <section id="chatbot" className="section chatbot">
      <div className="container">
        <h2 className="section-title">Zeptejte se nás</h2>
        
        <div className="chatbot-container">
          <div className="chat-messages">
            {chatHistory.length === 0 ? (
              <div className="empty-chat">
                <Bot size={40} />
                <p>Napište nám zprávu a my vám odpovíme!</p>
              </div>
            ) : (
              chatHistory.map((chat, index) => (
                <motion.div 
                  key={index}
                  className={`message ${chat.sender}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="message-icon">
                    {chat.sender === 'bot' ? <Bot size={20} /> : <User size={20} />}
                  </div>
                  <div className="message-text">{chat.text}</div>
                </motion.div>
              ))
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="chat-input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Napište svou zprávu..."
              aria-label="Zpráva"
            />
            <button type="submit" aria-label="Odeslat zprávu">
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .chatbot {
          background-color: var(--light-color);
          padding-top: 2rem;
        }
        
        .chatbot-container {
          max-width: 800px;
          margin: 0 auto;
          background-color: white;
          border-radius: 16px;
          box-shadow: 0 4px 32px 0 rgba(0,0,0,0.12);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        
        .chat-messages {
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
          min-height: 300px;
          max-height: 400px;
          overflow-y: auto;
        }
        
        .empty-chat {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: #888;
          text-align: center;
          padding: 2rem;
        }
        
        .empty-chat p {
          margin-top: 1rem;
          font-size: 1.1rem;
        }
        
        .message {
          display: flex;
          margin-bottom: 1rem;
          max-width: 80%;
          align-items: flex-start;
        }
        
        .message.user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }
        
        .message-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          margin: 0 0.5rem;
          background-color: var(--primary-color);
          color: white;
        }
        
        .message.user .message-icon {
          background-color: var(--secondary-color);
        }
        
        .message-text {
          padding: 0.8rem 1.2rem;
          border-radius: 12px;
          background-color: #f0f0f0;
          line-height: 1.5;
        }
        
        .message.user .message-text {
          background-color: var(--primary-color);
          color: white;
        }
        
        .chat-input {
          display: flex;
          padding: 1rem;
          border-top: 1px solid #eee;
        }
        
        .chat-input input {
          flex: 1;
          padding: 0.8rem 1rem;
          border: 1px solid #ddd;
          border-radius: 24px;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s;
        }
        
        .chat-input input:focus {
          border-color: var(--primary-color);
        }
        
        .chat-input button {
          background-color: var(--primary-color);
          color: white;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          margin-left: 0.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .chat-input button:hover {
          background-color: var(--secondary-color);
        }
        
        @media (max-width: 768px) {
          .message {
            max-width: 90%;
          }
          
          .chat-messages {
            min-height: 250px;
          }
        }
      `}</style>
    </section>
  );
}
