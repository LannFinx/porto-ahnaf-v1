'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import portfolioData from '@/data/portfolioData';
import styles from './Skills.module.css';

// ─── Komponen Progress Bar Individual ───
const SkillProgressBar = ({ name, level }) => {
  const [isVisible, setIsVisible] = useState(false);
  const progressRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entries[0].target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (progressRef.current) {
      observer.observe(progressRef.current);
    }

    return () => {
      if (progressRef.current) observer.unobserve(progressRef.current);
    };
  }, []);

  return (
    <div className={styles.skillItem} ref={progressRef}>
      <div className={styles.skillInfo}>
        <span className={styles.skillName}>{name}</span>
        <span className={styles.skillLevel}>{level}%</span>
      </div>
      <div className={styles.progressTrack}>
        <div 
          className={styles.progressFill} 
          style={{ width: isVisible ? `${level}%` : '0%' }}
        />
      </div>
    </div>
  );
};

// ─── Komponen Kartu Kategori ───
const SkillCard = ({ group }) => {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  return (
    <div 
      className={`${styles.card} ${styles.spotlightCard}`} 
      ref={cardRef}
      onMouseMove={handleMouseMove}
    >
      <div className={styles.cardHeader}>
        <span className={styles.icon}>{group.icon}</span>
        <h3 className={styles.categoryTitle}>{group.category}</h3>
      </div>
      
      <div className={styles.skillList}>
        {group.items.map((item, i) => (
          <SkillProgressBar key={i} name={item.name} level={item.level} />
        ))}
      </div>
    </div>
  );
};

// ─── Komponen Utama Skills ───
export default function Skills() {
  const { skills } = portfolioData;
  const [activeTab, setActiveTab] = useState('All');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedSkills, setDisplayedSkills] = useState(skills);

  const categories = ['All', ...skills.map(s => s.category)];

  const handleTabChange = (category) => {
    if (category === activeTab) return;

    setIsTransitioning(true);
    
    setTimeout(() => {
      setActiveTab(category);
      if (category === 'All') {
        setDisplayedSkills(skills);
      } else {
        setDisplayedSkills(skills.filter(s => s.category === category));
      }
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <section className={styles.skillsSection} id="skills">
      <div className={styles.container}>
        
        {/* Section Label */}
        <div className={styles.sectionLabel}>
          <span className={styles.labelNum}>01.5</span>
          <span className={styles.labelText}>Skills & Expertise</span>
        </div>

        {/* Interactive Tabs */}
        <div className={styles.tabsContainer}>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`${styles.tabButton} ${activeTab === cat ? styles.active : ''}`}
              onClick={() => handleTabChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Wrapper untuk transisi Fade */}
        <div className={`${styles.gridWrapper} ${isTransitioning ? styles.transitioning : ''}`}>
          <div className={styles.grid}>
            {displayedSkills.map((skillGroup, index) => (
              <SkillCard key={`${skillGroup.category}-${index}`} group={skillGroup} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
