'use client';
// components/Hero/Hero.js
// ─── Hero Interaktif Awwwards-Level dengan Custom Cursor & Magnetic UI ───

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext'; // <── 1. IMPORT CONTEXT BAHASA
import portfolioData from '@/data/portfolioData';
import styles from './Hero.module.css';

export default function Hero() {
  const { language } = useLanguage(); // <── 2. STATE BAHASA
  const { profile, heroUI } = portfolioData; // <── 3. TAMBAHKAN heroUI
  
  // ── REFS UNTUK PERFORMA TINGGI (Tanpa Re-render) ──
  const bgRef = useRef(null);
  const cursorRef = useRef(null);
  const btnRef = useRef(null);

  // State ringan hanya untuk teks di dalam kursor
  const [cursorText, setCursorText] = useState('');
  const [isHovering, setIsHovering] = useState(false);

  // ── LOGIKA 1: INTERPOLASI KURSOR & PLAYABLE GRID ──
  // Kita menggunakan requestAnimationFrame agar pergerakan kursor dan cahaya grid 
  // sangat mulus (60 FPS) tanpa membebani React dengan re-render.
  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let animationFrameId;

    const handleMouseMove = (e) => {
      if (window.innerWidth <= 768) return;
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const renderLoop = () => {
      // Rumus LERP (Linear Interpolation) untuk efek 'delay' atau per/karet pada kursor
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      // 1. Update Custom Cursor
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      }

      // 2. Update Playable Cyber-Grid (Jejak Cahaya) & Parallax Orb
      if (bgRef.current) {
        // Posisi absolut untuk lampu sorot di grid
        bgRef.current.style.setProperty('--mouse-x', `${cursorX}px`);
        bgRef.current.style.setProperty('--mouse-y', `${cursorY}px`);
        
        // Posisi relatif (-1 ke 1) untuk parallax Orb
        const relX = (cursorX / window.innerWidth - 0.5) * 2;
        const relY = (cursorY / window.innerHeight - 0.5) * 2;
        bgRef.current.style.setProperty('--rel-x', relX);
        bgRef.current.style.setProperty('--rel-y', relY);
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('mousemove', handleMouseMove);
    renderLoop();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // ── LOGIKA 2: MAGNETIC CTA BUTTON ──
  const handleMagneticMove = (e) => {
    const btn = btnRef.current;
    if (window.innerWidth <= 768) return;
    if (!btn) return;
    
    // Menghitung jarak mouse dari titik tengah tombol
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Menarik tombol sebesar 30% dari jarak mouse (efek magnet)
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  };

  const handleMagneticLeave = () => {
    if (btnRef.current) {
      // Mengembalikan tombol ke posisi semula dengan efek per/spring (diatur di CSS)
      btnRef.current.style.transform = `translate(0px, 0px)`;
    }
  };

  // ── LOGIKA 3: INTERAKSI KURSOR PINTAR (HOVER DETECTOR) ──
  const handleMouseEnterInteractable = (text) => {
    setIsHovering(true);
    setCursorText(text);
  };

  const handleMouseLeaveInteractable = () => {
    setIsHovering(false);
    setCursorText('');
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fungsi utilitas untuk memecah teks menjadi rentetan <span> beranimasi
  const splitText = (text) => {
    return text.split('').map((char, index) => (
      <span key={index} className={styles.char} style={{ '--char-index': index }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    // Kelas heroWrapper digunakan untuk menyembunyikan kursor bawaan sistem
    <div className={styles.heroWrapper}>
      
      {/* ── CUSTOM MORPHING CURSOR ── */}
      <div 
        ref={cursorRef} 
        className={`${styles.customCursor} ${isHovering ? styles.cursorHovered : ''}`}
      >
        <span className={styles.cursorText}>{cursorText}</span>
      </div>

      {/* ── FIXED INTERACTIVE CANVAS (Background Global) ── */}
      <div className={styles.fixedBackground} ref={bgRef}>
        <div className={styles.noise} />
        
        {/* Orb Parallax */}
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        
        {/* Playable Cyber Grid (Menyala saat dilewati kursor) */}
        <div className={styles.interactiveGrid} />
      </div>

      {/* ── KONTEN HERO ── */}
      <section className={styles.hero} id="home">
        <div className={styles.container}>
          
          <div className={styles.statusBadge}>
            <span className={styles.statusDot} />
            {/* ── BILINGUAL: Badge Status ── */}
            <span>{heroUI.badge[language]}</span>
          </div>

          {/* ── CINEMATIC SPLIT-TEXT REVEAL ── */}
          {/* Bagian ini sengaja dibiarkan statis "Software Engineer & Designer." karena itu gelar universal yang sangat estetik */}
          <div 
            className={styles.headingWrapper}
            onMouseEnter={() => handleMouseEnterInteractable('EXPLORE')}
            onMouseLeave={handleMouseLeaveInteractable}
          >
            <h1 className={styles.heading}>
              <div className={styles.lineOverflow}>
                <span className={styles.headingLine1}>{splitText("Software")}</span>
              </div>
              <div className={styles.lineOverflow}>
                <span className={styles.headingLine2}>
                  {splitText("Engineer")}
                  <em className={styles.ampersand}>&</em>
                </span>
              </div>
              <div className={styles.lineOverflow}>
                <span className={styles.headingLine3}>{splitText("Designer.")}</span>
              </div>
            </h1>
          </div>

          <div className={styles.meta}>
            <p className={styles.description}>
              {/* ── BILINGUAL: Deskripsi dan Lokasi ── */}
              {profile.summary[language]}
              <br />{heroUI.locationPrefix[language]} <strong>{profile.location[language]}</strong>.
            </p>

            <div className={styles.actions}>
              {/* MAGNETIC CTA BUTTON */}
              <div className={styles.magneticArea} 
                   onMouseMove={handleMagneticMove} 
                   onMouseLeave={handleMagneticLeave}>
                <button
                  ref={btnRef}
                  className={styles.primaryBtn}
                  onClick={() => scrollToSection('projects')}
                  onMouseEnter={() => handleMouseEnterInteractable('CLICK')}
                  onMouseLeave={handleMouseLeaveInteractable}
                >
                  {/* ── BILINGUAL: Teks Tombol Primary ── */}
                  {heroUI.btnPrimary[language]}
                </button>
              </div>

              <button
                className={styles.ghostBtn}
                onClick={() => scrollToSection('contact')}
                onMouseEnter={() => handleMouseEnterInteractable('HELLO')}
                onMouseLeave={handleMouseLeaveInteractable}
              >
                {/* ── BILINGUAL: Teks Tombol Secondary ── */}
                {heroUI.btnSecondary[language]}
              </button>
            </div>
          </div>

          <div 
            className={styles.scrollIndicator} 
            onClick={() => scrollToSection('about')}
            onMouseEnter={() => handleMouseEnterInteractable('SCROLL')}
            onMouseLeave={handleMouseLeaveInteractable}
          >
            <div className={styles.scrollLine} />
            {/* ── BILINGUAL: Label Scroll ── */}
            <span className={styles.scrollLabel}>{heroUI.scroll[language]}</span>
          </div>
        </div>

        <div className={styles.fullNameStrip}>
          <span>{profile.fullName}</span>
          <span className={styles.dot}>·</span>
          {/* ── BILINGUAL: Tagline Bawah ── */}
          <span>{profile.tagline[language]}</span>
        </div>
      </section>
    </div>
  );
}