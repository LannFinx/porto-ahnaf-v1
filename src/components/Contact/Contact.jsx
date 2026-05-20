'use client';
// components/Contact/Contact.js
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext'; // <── 1. IMPORT CONTEXT BAHASA
import portfolioData from '@/data/portfolioData';
import styles from './Contact.module.css';

// ─── KOMPONEN: Magnetic Social Link ───
const MagneticSocial = ({ href, children }) => {
  const linkRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = linkRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px)`;
  };

  const handleMouseLeave = () => {
    if (linkRef.current) linkRef.current.style.transform = `translate(0px, 0px)`;
  };

  return (
    <a
      ref={linkRef}
      href={href}
      className={styles.socialLink}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </a>
  );
};

export default function Contact() {
  const { language } = useLanguage(); // <── 2. STATE BAHASA AKTIF
  const { profile, social } = portfolioData;
  const [time, setTime] = useState('');
  
  // State untuk Modal & Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  // Logika: Live Local Time (WITA - Banjarbaru)
  useEffect(() => {
    const updateTime = () => {
      const options = { timeZone: 'Asia/Makassar', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      setTime(formatter.format(new Date()));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Logika: Submit API Resend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        // Auto-close modal after 3 seconds on success
        setTimeout(() => {
          setIsModalOpen(false);
          setStatus('idle');
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  // ─── KAMUS LOKAL BILINGUAL UNTUK CONTACT ───
  const textUI = {
    subheading: { id: "Mari Berkolaborasi", en: "Let's Collaborate" },
    localTime: { id: "Waktu Lokal (WITA):", en: "Local Time (WITA):" },
    bigBtnText1: { id: "Hubungi ", en: "Get In " },
    bigBtnText2: { id: "Saya.", en: "Touch." },
    modalTitle: { id: "Kirim Pesan", en: "Send a Message" },
    modalSub: { id: "Tertarik bekerja sama? Isi form di bawah ini.", en: "Interested in working together? Fill out the form below." },
    successTitle: { id: "Pesan Terkirim!", en: "Message Sent!" },
    successDesc: { id: "Terima kasih. Saya akan segera membalas email Anda.", en: "Thank you. I will get back to you shortly." },
    placeName: { id: "Nama Lengkap", en: "Full Name" },
    placeEmail: { id: "Alamat Email", en: "Email Address" },
    placeMsg: { id: "Ceritakan tentang proyek Anda...", en: "Tell me about your project..." },
    errorText: { id: "Gagal mengirim pesan. Silakan coba lagi nanti.", en: "Failed to send message. Please try again later." },
    submitBtn: { id: "Kirim Pesan ↗", en: "Send Message ↗" }
  };

  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.container}>
        
        {/* ── CTA UTAMA ── */}
        <div className={styles.ctaWrapper}>
          <div className={styles.topInfo}>
            {/* 3. Terapkan Bilingual */}
            <p className={styles.subheading}>{textUI.subheading[language]}</p>
            <div className={styles.localTime}>
              <span className={styles.pulseDot}></span>
              <span>{textUI.localTime[language]} {time}</span>
            </div>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)} 
            className={styles.bigEmailBtn}
          >
            <span className={styles.defaultText}>
              {/* 3. Terapkan Bilingual */}
              {textUI.bigBtnText1[language]} <em className={styles.italicAksent}>{textUI.bigBtnText2[language]}</em>
            </span>
          </button>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            © {new Date().getFullYear()} {profile.fullName}.
          </div>
          <div className={styles.socials}>
            {social.map((soc, idx) => (
              <MagneticSocial key={idx} href={soc.href}>
                {soc.label}
              </MagneticSocial>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTACT MODAL (GLASSMORPHISM) ── */}
      <div className={`${styles.modalOverlay} ${isModalOpen ? styles.showModal : ''}`}>
        <div className={styles.modalContent}>
          <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>×</button>
          
          <div className={styles.modalHeader}>
            {/* 3. Terapkan Bilingual */}
            <h3>{textUI.modalTitle[language]}</h3>
            <p>{textUI.modalSub[language]}</p>
          </div>

          {status === 'success' ? (
            <div className={styles.successState}>
              <div className={styles.checkIcon}>✓</div>
              {/* 3. Terapkan Bilingual */}
              <h4>{textUI.successTitle[language]}</h4>
              <p>{textUI.successDesc[language]}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <input 
                  type="text" 
                  placeholder={textUI.placeName[language]} // <── Bilingual
                  required 
                  disabled={status === 'loading'}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className={styles.inputGroup}>
                <input 
                  type="email" 
                  placeholder={textUI.placeEmail[language]} // <── Bilingual
                  required 
                  disabled={status === 'loading'}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className={styles.inputGroup}>
                <textarea 
                  placeholder={textUI.placeMsg[language]} // <── Bilingual
                  rows="4" 
                  required
                  disabled={status === 'loading'}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              
              {status === 'error' && (
                <p className={styles.errorText}>{textUI.errorText[language]}</p> // <── Bilingual
              )}

              <button type="submit" className={styles.submitBtn} disabled={status === 'loading'}>
                {/* 3. Terapkan Bilingual */}
                {status === 'loading' ? <span className={styles.spinner}></span> : textUI.submitBtn[language]}
              </button>
            </form>
          )}
        </div>
      </div>
    </footer>
  );
}