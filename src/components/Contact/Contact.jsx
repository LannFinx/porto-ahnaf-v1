'use client';
// components/Contact/Contact.js
// ─── Grand Finale: Tipografi Interaktif, Live Time, & Magnetic Socials ───

import { useState, useEffect, useRef } from 'react';
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
  const { profile, social } = portfolioData;
  
  // State untuk interaksi Copy to Clipboard
  const [isCopied, setIsCopied] = useState(false);
  // State untuk Waktu Lokal (WITA)
  const [time, setTime] = useState('');

  // ─── LOGIKA 1: Live Local Time (WITA - Banjarbaru) ───
  useEffect(() => {
    const updateTime = () => {
      // Mengambil waktu spesifik zona waktu WITA (Asia/Makassar)
      const options = { timeZone: 'Asia/Makassar', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      setTime(formatter.format(new Date()));
    };
    
    updateTime(); // Setel langsung saat render
    const interval = setInterval(updateTime, 1000); // Update setiap detik
    return () => clearInterval(interval);
  }, []);

  // ─── LOGIKA 2: Click to Copy ───
  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(profile.email);
    setIsCopied(true);
    
    // Kembalikan teks setelah 3 detik
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.container}>
        
        {/* ── CTA UTAMA ── */}
        <div className={styles.ctaWrapper}>
          <div className={styles.topInfo}>
            <p className={styles.subheading}>Mari Berkolaborasi</p>
            
            {/* Widget Waktu Lokal yang Elegan */}
            <div className={styles.localTime}>
              <span className={styles.pulseDot}></span>
              <span>Local Time (WITA): {time}</span>
            </div>
          </div>

          {/* Teks Raksasa Click-to-Copy */}
          <button 
            onClick={handleCopyEmail} 
            className={styles.bigEmailBtn}
            title="Click to copy email"
          >
            {isCopied ? (
              <span className={styles.copiedText}>Email Copied!</span>
            ) : (
              <span className={styles.defaultText}>
                Get In <em className={styles.italicAksent}>Touch.</em>
              </span>
            )}
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
    </footer>
  );
}