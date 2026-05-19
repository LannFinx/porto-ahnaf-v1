'use client';
// components/Projects/Projects.jsx
// ─── Interaksi Hover, Filter Kategori, & Cursor-Attached Image ───

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image'; // IMPORT NEXT IMAGE
import styles from './Projects.module.css';

export default function Projects() {
  const projectsData = [
    {
      id: "p1",
      title: "Sistem Informasi INFOUKS",
      category: "Web Engineering",
      tech: "PHP · MySQL · Pure CSS",
      desc: "Perancangan arsitektur database relasional dan validasi form dinamis untuk pengelolaan data terpusat.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
      link: "https://github.com/username-anda" 
    },
    {
      id: "p2",
      title: "Project: Forever",
      category: "Web Engineering", 
      tech: "Phaser.js · JavaScript",
      desc: "Implementasi mekanik battle dan perancangan antarmuka visual novel interaktif.",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
      link: "https://project-forever.vercel.app/"
    },
    {
      id: "p3",
      title: "Block Master",
      category: "Game Development",
      tech: "Phaser.js · JavaScript",
      desc: "Game gabut untuk membujuk sang pacar kesayangan.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop", 
      link: "https://game-gabut-lemon.vercel.app/"
    },
  ];

  const [activeFilter, setActiveFilter] = useState('All');
  const [clickedCard, setClickedCard] = useState(null);
  
  const [activeImage, setActiveImage] = useState(null);
  const cursorImageRef = useRef(null);

  const categories = ['All', ...new Set(projectsData.map(item => item.category))];
  
  const filteredProjects = activeFilter === 'All' 
    ? projectsData 
    : projectsData.filter(proj => proj.category === activeFilter);

  const handleCardClick = (id) => {
    setClickedCard(id);
    setTimeout(() => setClickedCard(null), 500);
  };

  // ─── LOGIKA CURSOR-ATTACHED IMAGE ───
  useEffect(() => {
    const moveImage = (e) => {
      // SABUK PENGAMAN MOBILE (Matikan efek kursor di layar kecil/HP)
      if (window.innerWidth <= 768) return;

      if (cursorImageRef.current) {
        const x = e.clientX;
        const y = e.clientY;
        
        cursorImageRef.current.animate({
          left: `${x}px`,
          top: `${y}px`
        }, { duration: 400, fill: "forwards", easing: "ease-out" });
      }
    };
    window.addEventListener('mousemove', moveImage);
    return () => window.removeEventListener('mousemove', moveImage);
  }, []);

  return (
    <section className={styles.projects} id="projects">
      <div className={styles.container}>
        
        <div className={styles.sectionLabel}>
          <span className={styles.labelNum}>03</span>
          <span className={styles.labelText}>Selected Works</span>
        </div>

        <div className={styles.filterContainer}>
          {categories.map((category, index) => (
            <button 
              key={index}
              onClick={() => setActiveFilter(category)}
              className={`${styles.filterBtn} ${activeFilter === category ? styles.activeFilter : ''}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filteredProjects.map((proj) => (
            <div 
              className={styles.card} 
              key={proj.id}
              onClick={() => handleCardClick(proj.id)}
              onMouseEnter={() => setActiveImage(proj.image)}
              onMouseLeave={() => setActiveImage(null)}
            >
              <div className={styles.cardHeader}>
                <span className={styles.category}>{proj.category}</span>
                <span className={styles.tech}>{proj.tech}</span>
              </div>
              
              <h3 className={styles.title}>
                {proj.link ? (
                  <a href={proj.link} target="_blank" rel="noopener noreferrer" className={styles.titleLink}>
                    {proj.title}
                    <span className={`${styles.arrow} ${clickedCard === proj.id ? styles.arrowClicked : ''}`}>↗</span>
                  </a>
                ) : (
                  <div className={styles.titleNoLink}>
                    {proj.title}
                    <span className={`${styles.arrow} ${clickedCard === proj.id ? styles.arrowClicked : ''}`}>↗</span>
                  </div>
                )}
              </h3>
              
              <p className={styles.desc}>{proj.desc}</p>
              
              {/* GAMBAR STATIS MOBILE MENGGUNAKAN NEXT/IMAGE */}
              <Image 
                src={proj.image} 
                alt={proj.title} 
                width={800} // Resolusi optimal
                height={500} // Rasio aspek 8:5
                className={styles.mobileImage} 
              />

              <div className={styles.accentLine} />
            </div>
          ))}
        </div>

      </div>

      {/* ─── ELEMEN GAMBAR MELAYANG (Khusus Desktop) ─── */}
      <div 
        ref={cursorImageRef} 
        className={`${styles.floatingImageContainer} ${activeImage ? styles.showImage : ''}`}
      >
        <Image 
          src={activeImage || projectsData[0].image} 
          alt="Project Preview" 
          width={600}  // Render resolusi lebih kecil sedikit agar ringan untuk kursor
          height={400}
          className={styles.floatingImg} 
          priority // Prioritaskan loading untuk gambar pertama agar animasi kursor instan
        />
      </div>
    </section>
  );
}