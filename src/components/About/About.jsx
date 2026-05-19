'use client';
// components/About/About.js
// ─── Seksi About Interaktif (3D Tilt, Scramble Text, Magnetic Tags, Staggered Reveal) ───

import { useEffect, useRef, useState } from 'react';
import portfolioData from '@/data/portfolioData';
import styles from './About.module.css';

// ==========================================
// KUMPULAN CUSTOM COMPONENTS & HOOKS
// ==========================================

// 1. SCRAMBLE TEXT COMPONENT (Efek Hacker)
const ScrambleText = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef(null);
  // Kumpulan karakter acak ala Matrix/Hacker
  const chars = '!<>-_\\/[]{}—=+*^?#_';

  const handleMouseEnter = () => {
    let iteration = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      // Kecepatan resolve huruf (semakin kecil penambahannya, semakin lama acaknya)
      iteration += 1 / 3; 
      if (iteration >= text.length) clearInterval(intervalRef.current);
    }, 30);
  };

  return (
    <span onMouseEnter={handleMouseEnter} className={styles.scrambleText}>
      {displayText}
    </span>
  );
};

// 2. 3D TILT CARD COMPONENT (Playable Cards)
const TiltCard = ({ children, className }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (window.innerWidth <= 768) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // Posisi X mouse di dalam kartu
    const y = e.clientY - rect.top;  // Posisi Y mouse di dalam kartu

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Kalkulasi rotasi (Maksimal rotasi 15 derajat)
    const rotateX = ((y - centerY) / centerY) * -15; 
    const rotateY = ((x - centerX) / centerX) * 15;

    // Terapkan langsung ke DOM (Bypass React State demi FPS tinggi)
    card.style.setProperty('--rx', `${rotateX}deg`);
    card.style.setProperty('--ry', `${rotateY}deg`);
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    // Kembalikan rotasi ke 0 dengan mulus saat mouse pergi
    card.style.setProperty('--rx', `0deg`);
    card.style.setProperty('--ry', `0deg`);
    card.style.setProperty('--mouse-x', `-1000px`); // Sembunyikan glare
    card.style.setProperty('--mouse-y', `-1000px`);
  };

  return (
    <div
      ref={cardRef}
      className={`${styles.tiltCard} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {/* Glare effect overlay */}
      <div className={styles.tiltGlare} />
    </div>
  );
};

// 3. MAGNETIC TAG COMPONENT (Bouncing Soft Skills)
const MagneticTag = ({ children, className }) => {
  const tagRef = useRef(null);

  const handleMouseMove = (e) => {
    if (window.innerWidth <= 768) return;
    const tag = tagRef.current;
    if (!tag) return;
    const rect = tag.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Tarik tag mengikuti mouse sebesar 40% dari jarak
    tag.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px)`;
  };

  const handleMouseLeave = () => {
    if (tagRef.current) tagRef.current.style.transform = `translate(0px, 0px)`;
  };

  return (
    <span
      ref={tagRef}
      className={`${styles.magneticTag} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </span>
  );
};

// ==========================================
// MAIN COMPONENT: ABOUT
// ==========================================

export default function About() {
  const { profile, education, softSkills } = portfolioData;
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // 4. SCROLL INTERSECTION OBSERVER (Staggered Reveal)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Berhenti mengamati setelah muncul sekali (agar tidak mengulang terus)
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 } // Trigger saat 20% bagian ini terlihat di layar
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.about} id="about" ref={sectionRef}>
      <div className={styles.container}>

        {/* Section Label */}
        <div className={styles.sectionLabel}>
          <span className={styles.labelNum}>01</span>
          <span className={styles.labelText}>About</span>
        </div>

        {/* Konten dua kolom (Tambahkan class isVisible jika terdeteksi scroll) */}
        <div className={`${styles.grid} ${isVisible ? styles.showGrid : ''}`}>

          {/* Kolom Kiri — Teks */}
          <div className={styles.colLeft}>
            <h2 className={`${styles.heading} ${styles.staggerItem}`}>
              <ScrambleText text="Merancang Kode," />
              <br />
              <em className={styles.headingAccent}>
                <ScrambleText text="Membangun Pengalaman." />
              </em>
            </h2>

            <p className={`${styles.summary} ${styles.staggerItem}`}>{profile.summary}</p>

            {/* Pendidikan */}
            {education.map((edu) => (
              <div className={`${styles.eduCard} ${styles.staggerItem}`} key={edu.institution}>
                <div className={styles.eduHeader}>
                  <span className={styles.institution}>{edu.institution}</span>
                  <span className={styles.period}>{edu.period}</span>
                </div>
                <p className={styles.major}>{edu.major}</p>
                <ul className={styles.achievements}>
                  {edu.achievements.map((ach, i) => (
                    <li key={i}>
                      <span className={styles.bullet}>◈</span>
                      {ach}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Kolom Kanan — Info + Soft Skills */}
          <div className={styles.colRight}>
            {/* Info Cards dengan 3D Tilt Playability */}
            <div className={`${styles.infoGrid} ${styles.staggerItem}`}>
              <TiltCard className={styles.infoCard}>
                <span className={styles.infoValue}>2+</span>
                <span className={styles.infoLabel}>Tahun Belajar</span>
              </TiltCard>
              <TiltCard className={styles.infoCard}>
                <span className={styles.infoValue}>5+</span>
                <span className={styles.infoLabel}>Proyek Selesai</span>
              </TiltCard>
              <TiltCard className={styles.infoCard}>
                <span className={styles.infoValue}>3</span>
                <span className={styles.infoLabel}>Tech Stacks</span>
              </TiltCard>
              <TiltCard className={styles.infoCard}>
                <span className={styles.infoValue}>1st</span>
                <span className={styles.infoLabel}>Juara Provinsi</span>
              </TiltCard>
            </div>

            {/* Soft Skills dengan Efek Magnetic/Membal */}
            <div className={`${styles.softSkillsBox} ${styles.staggerItem}`}>
              <h3 className={styles.boxTitle}>Soft Skills</h3>
              <div className={styles.tags}>
                {softSkills.map((skill) => (
                  <MagneticTag className={styles.tag} key={skill}>
                    {skill}
                  </MagneticTag>
                ))}
              </div>
            </div>

            {/* Kontak cepat */}
            <div className={`${styles.contactBox} ${styles.staggerItem}`}>
              <a href={`mailto:${profile.email}`} className={styles.emailLink}>
                <span className={styles.emailIcon}>✉</span>
                {profile.email}
              </a>
              <p className={styles.locationLine}>📍 {profile.location}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}