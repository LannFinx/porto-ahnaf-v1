'use client';
// components/AiTerminal/AiTerminal.js
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext'; // <── 1. IMPORT CONTEXT BAHASA
import styles from './AiTerminal.module.css';

export default function AiTerminal() {
  const { language } = useLanguage(); // <── 2. STATE BAHASA AKTIF
  
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // ─── KAMUS BILINGUAL LOKAL ───
  const uiText = {
    welcome: {
      id: 'Sistem Terhubung. Saya adalah AI representasi Ahnaf. Ajukan pertanyaan, dan saya bisa memandu Anda menjelajahi halaman ini.',
      en: 'System Connected. I am an AI representing Ahnaf. Ask a question, and I can guide you through this page.'
    },
    placeholder: {
      id: "Ketik: 'tunjukkan project game' atau sapa...",
      en: "Type: 'show me your projects' or say hi..."
    },
    errorNetwork: {
      id: '[NETWORK ERROR]: Koneksi terputus.',
      en: '[NETWORK ERROR]: Connection lost.'
    }
  };

  const [messages, setMessages] = useState([
    { role: 'ai', text: uiText.welcome.id } // Set awal (fallback)
  ]);

  // Efek ini akan mengganti bahasa pesan sapaan JIKA user belum mengetik apa-apa
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].role === 'ai') {
        return [{ role: 'ai', text: uiText.welcome[language] }];
      }
      return prev; // Jika sudah ada chat, biarkan history sebelumnya apa adanya
    });
  }, [language]);

  const messagesEndRef = useRef(null);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  // ─── LOGIKA MAGIC: EKSEKUSI PERINTAH SCROLL ───
  const executeAction = (actionCode) => {
    if (!actionCode || actionCode === 'NONE') return;

    let targetId = '';
    switch (actionCode) {
      case 'SCROLL_PROJECTS':    targetId = 'projects'; break;
      case 'SCROLL_CONTACT':     targetId = 'contact'; break;
      case 'SCROLL_SKILLS':      targetId = 'skills'; break;
      case 'SCROLL_EXPERIENCE':  targetId = 'experience'; break;
      default: return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      // Menutup terminal sementara di mobile agar efek scroll terlihat jelas
      if (window.innerWidth <= 768) {
        setIsOpen(false);
      }
      
      // Jalankan Auto-Scroll halus ke target element ID
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 800); // Tunda sedikit agar user sempat membaca pesan AI sebentar
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // ─── 3. INJEKSI BAHASA KE PAYLOAD API ───
        body: JSON.stringify({ message: userMsg, language: language }) 
      });

      const data = await response.json();

      if (response.ok) {
        setMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
        
        // ─── DOM MANIPULATION ───
        if (data.action) {
          executeAction(data.action);
        }

      } else {
        setMessages(prev => [...prev, { role: 'ai', text: `[SYSTEM ALERT]: ${data.error}` }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: uiText.errorNetwork[language] }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button className={`${styles.toggleBtn} ${isOpen ? styles.hidden : ''}`} onClick={() => setIsOpen(true)}>
        <span className={styles.terminalIcon}>&gt;_</span>
      </button>

      <div className={`${styles.terminalWindow} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <span className={styles.title}>AHNAF_OS_CORE.exe</span>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>×</button>
        </div>

        <div className={styles.chatArea}>
          {messages.map((msg, idx) => (
            <div key={idx} className={msg.role === 'ai' ? styles.aiMessage : styles.userMessage}>
              <span className={styles.prefix}>{msg.role === 'ai' ? 'AHNAF_AI:~$' : 'GUEST:~$'}</span>
              <p className={styles.text}>{msg.text}</p>
            </div>
          ))}
          {isLoading && (
            <div className={styles.aiMessage}>
              <span className={styles.prefix}>AHNAF_AI:~$</span>
              <span className={styles.loader}></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className={styles.inputArea}>
          <span className={styles.promptArrow}>&gt;</span>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={uiText.placeholder[language]} // <── 4. Placeholder Bilingual
            className={styles.inputField}
            autoComplete="off"
            disabled={isLoading}
          />
        </form>
      </div>
    </>
  );
}