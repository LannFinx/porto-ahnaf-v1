'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext'; // <── IMPORT CONTEXT
import portfolioData from '@/data/portfolioData';
import styles from './Experience.module.css';

// ─── Komponen ExperienceItem Individual ───
const ExperienceItem = ({ exp, index }) => {
  const { language } = useLanguage(); // <── STATE BAHASA
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entries[0].target); 
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (itemRef.current) observer.observe(itemRef.current);
    return () => { if (itemRef.current) observer.unobserve(itemRef.current); };
  }, []);

  const toggleAccordion = () => setIsOpen(!isOpen);

  // Teks Tombol Accordion Bilingual
  const btnText = isOpen 
    ? (language === 'id' ? '[-] Tutup Detail' : '[-] Close Details')
    : (language === 'id' ? '[+] Baca Detail' : '[+] Read Details');

  return (
    <div 
      className={`${styles.item} ${isVisible ? styles.visible : ''}`} 
      style={{ transitionDelay: `${index * 150}ms` }}
      ref={itemRef}
    >
      <div className={`${styles.timelineIndicator} ${isOpen ? styles.indicatorActive : ''}`}></div>

      <div className={styles.meta}>
        <span className={styles.period}>{exp.period[language]}</span> {/* BILINGUAL */}
        <h3 className={styles.company}>{exp.company}</h3>
        <span className={styles.typeTag}>{exp.type[language]}</span> {/* BILINGUAL */}
      </div>

      <div className={styles.details}>
        <h4 className={styles.title}>{exp.role[language]}</h4> {/* BILINGUAL */}
        
        <p className={styles.descriptionText}>{exp.description[language]}</p> {/* BILINGUAL */}

        <button 
          className={styles.accordionToggle} 
          onClick={toggleAccordion}
          aria-expanded={isOpen}
        >
          {btnText}
        </button>

        <div className={`${styles.accordionContent} ${isOpen ? styles.open : ''}`}>
          <ul className={styles.descriptionList}>
            {/* BILINGUAL Array Map */}
            {exp.highlights[language].map((highlight, i) => (
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