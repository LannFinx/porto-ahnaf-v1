'use client';
// components/Navbar/Navbar.js
// ─── Navbar Modern: Auto-hide, Spy Scroll, Progress Bar & Cinematic Menu ───

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext'; // <── IMPORT CONTEXT
import portfolioData from '@/data/portfolioData';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { navLinks, profile } = portfolioData;
  const { language, changeLanguage } = useLanguage(); // <── STATE BAHASA
  
  // State Management
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Refs untuk menyimpan nilai scroll sebelumnya
  const lastScrollY = useRef(0);

  // LOGIKA 1: Smart Scroll, Progress Bar, & Auto-Hide
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // 1A. Progress Bar Kalkulasi
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);

      // 1B. Cek apakah sudah lewat posisi hero
      setIsScrolled(currentScrollY > 50);

      // 1C. Smart Auto-Hide Logic
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHidden(true);
        setMenuOpen(false); 
      } else {
        setIsHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // LOGIKA 2: Spy Scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', 
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Tutup menu saat layar berubah ukuran ke desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fungsi Toggle Bahasa (ID <-> EN)
  const toggleLanguage = () => {
    changeLanguage(language === 'id' ? 'en' : 'id');
  };

  return (
    <>
      {/* HEADER UTAMA */}
      <header className={`
        ${styles.header} 
        ${isScrolled ? styles.scrolled : ''} 
        ${isHidden ? styles.hidden : ''}
      `}>
        
        <div className={styles.progressBarWrapper}>
          <div 
            className={styles.progressBar} 
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <nav className={styles.nav}>
          {/* Logo / Nama */}
          <a href="#" className={styles.logo} onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <span className={styles.logoMark}>A</span>
            <span className={styles.logoText}>{profile.name}</span>
          </a>

          {/* Nav Links — Desktop */}
          <ul className={styles.navLinks}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`${styles.navLink} ${activeSection === link.href ? styles.activeNavLink : ''}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                >
                  {link.label[language]} {/* <── BILINGUAL */}
                </a>
              </li>
            ))}
          </ul>

          {/* ── BUNGKUSAN KANAN: TOGGLE BAHASA + HIRE ME ── */}
          <div className={styles.rightActions}>
            <button className={styles.langToggleBtn} onClick={toggleLanguage} aria-label="Toggle Language">
              <span className={styles.globeIcon}>🌐</span>
              <span className={styles.langText}>{language === 'id' ? 'IDN' : 'ENG'}</span>
            </button>

            <a href={`mailto:${profile.email}`} className={styles.ctaBtn}>
              {language === 'id' ? 'Hubungi' : 'Hire Me'} {/* <── BILINGUAL */}
            </a>
          </div>

          {/* Hamburger — Mobile */}
          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </nav>
      </header>

      {/* CINEMATIC MOBILE MENU (Overlay) */}
      <div className={`${styles.mobileMenuOverlay} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        <ul className={styles.mobileNavLinks}>
          {navLinks.map((link, index) => (
            <li 
              key={link.href} 
              style={{ transitionDelay: menuOpen ? `${0.1 + (index * 0.1)}s` : '0s' }}
              className={menuOpen ? styles.linkIn : styles.linkOut}
            >
              <a
                href={link.href}
                className={activeSection === link.href ? styles.activeMobileLink : ''}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              >
                {link.label[language]} {/* <── BILINGUAL */}
              </a>
            </li>
          ))}
          
          <li 
            style={{ transitionDelay: menuOpen ? `${0.1 + (navLinks.length * 0.1)}s` : '0s' }}
            className={menuOpen ? styles.linkIn : styles.linkOut}
          >
            <a href={`mailto:${profile.email}`} className={styles.mobileCta}>
              {language === 'id' ? 'Hubungi Saya →' : 'Hire Me →'}
            </a>
          </li>

          {/* ── TOMBOL TOGGLE BAHASA MOBILE ── */}
          <li 
            style={{ transitionDelay: menuOpen ? `${0.1 + ((navLinks.length + 1) * 0.1)}s` : '0s' }}
            className={menuOpen ? styles.linkIn : styles.linkOut}
          >
            <button className={styles.mobileLangToggle} onClick={toggleLanguage}>
              🌐 Switch to {language === 'id' ? 'English' : 'Indonesian'}
            </button>
          </li>

        </ul>
      </div>
    </>
  );
}