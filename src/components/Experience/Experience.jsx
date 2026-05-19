'use client';
import React, { useState, useEffect, useRef } from 'react';
import portfolioData from '@/data/portfolioData';
import styles from './Experience.module.css';

// ─── Komponen ExperienceItem Individual ───
// Dipisah agar setiap item bisa mengelola state 'isOpen' (Accordion) 
// dan observasinya sendiri (Intersection Observer)
const ExperienceItem = ({ exp, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef(null);

  // 1. Hook useEffect untuk Intersection Observer (Scroll Reveal)
  useEffect(() => {
    // Observer untuk mendeteksi kapan elemen masuk ke viewport
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entries[0].target); // Stop observasi setelah terlihat
        }
      },
      {
        threshold: 0.1, // Trigger saat 10% elemen terlihat
        rootMargin: '0px 0px -50px 0px' // Sedikit offset
      }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) observer.unobserve(itemRef.current);
    };
  }, []);

  // 2. Fungsi Toggle untuk Accordion
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    // Tambahkan class 'visible' dari CSS Modules saat state isVisible true
    // Tambahkan delay berdasarkan index agar animasi muncul berurutan (staggered)
    <div 
      className={`${styles.item} ${isVisible ? styles.visible : ''}`} 
      style={{ transitionDelay: `${index * 150}ms` }}
      ref={itemRef}
    >
      {/* 3. Active Timeline Indicator */}
      <div className={`${styles.timelineIndicator} ${isOpen ? styles.indicatorActive : ''}`}></div>

      {/* Kolom Meta (Tahun, Perusahaan & Tipe) */}
      <div className={styles.meta}>
        <span className={styles.period}>{exp.period}</span>
        <h3 className={styles.company}>{exp.company}</h3>
        <span className={styles.typeTag}>
          {exp.type}
        </span>
      </div>

      {/* Kolom Detail (Peran, Deskripsi & Highlights) */}
      <div className={styles.details}>
        <h4 className={styles.title}>{exp.role}</h4>
        
        <p className={styles.descriptionText}>
          {exp.description}
        </p>

        {/* 4. Interactive Accordion (Tombol Toggle) */}
        <button 
          className={styles.accordionToggle} 
          onClick={toggleAccordion}
          aria-expanded={isOpen}
        >
          {isOpen ? '[-] Tutup Detail' : '[+] Baca Detail'}
        </button>

        {/* 
          Bungkus ul (highlights) dalam div dengan class accordionContent.
          CSS transisi max-height akan diaplikasikan di sini berdasarkan class 'open'
        */}
        <div className={`${styles.accordionContent} ${isOpen ? styles.open : ''}`}>
          <ul className={styles.descriptionList}>
            {exp.highlights.map((highlight, i) => (
              <li key={i}>
                <span className={styles.bullet}>◈</span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// ─── Komponen Utama Experience ───
export default function Experience() {
  const { experience } = portfolioData;

  return (
    <section className={styles.experience} id="experience">
      <div className={styles.container}>
        
        {/* Section Label */}
        <div className={styles.sectionLabel}>
          <span className={styles.labelNum}>02</span>
          <span className={styles.labelText}>Experience</span>
        </div>

        <div className={styles.list}>
          {experience.map((exp, index) => (
            <ExperienceItem key={exp.id || index} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}