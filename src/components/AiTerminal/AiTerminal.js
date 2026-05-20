'use client';
// components/AiTerminal/AiTerminal.js
import { useState, useRef, useEffect } from 'react';
import styles from './AiTerminal.module.css';

export default function AiTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Sistem Terhubung. Saya adalah AI representasi Ahnaf. Ajukan pertanyaan, dan saya bisa memandu Anda menjelajahi halaman ini.' }
  ]);
  
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
        body: JSON.stringify({ message: userMsg })
      });

      const data = await response.json();

      if (response.ok) {
        setMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
        
        // ─── DOM MANIPULATION (MENGGUNAKAN FUNGSI YANG SUDAH DIBUAT) ───
        if (data.action) {
          executeAction(data.action);
        }
        // ───────────────────────────────────────────────────────────────

      } else {
        // Tampilkan pesan jika Google sedang 503 / sibuk
        setMessages(prev => [...prev, { role: 'ai', text: `[SYSTEM ALERT]: ${data.error}` }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: '[NETWORK ERROR]: Koneksi terputus.' }]);
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
            placeholder="Ketik: 'tunjukkan project game' atau sapa..." 
            className={styles.inputField}
            autoComplete="off"
            disabled={isLoading}
          />
        </form>
      </div>
    </>
  );
}