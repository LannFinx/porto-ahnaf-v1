'use client';
// components/Projects/Projects.jsx
// ─── Interaksi Hover, Filter Kategori, & Cursor-Attached Image ───

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext'; // <── IMPORT CONTEXT
import styles from './Projects.module.css';

export default function Projects() {
  const { language } = useLanguage(); // <── STATE BAHASA

  // ARRAY INTERNAL DIMODIFIKASI MENJADI BILINGUAL
  const projectsData = [
    {
      id: "p1",
      title: "LuxurySneakers",
      category: "E-Commerce",
      tech: "Web Development",
      desc: {
        id: "Aplikasi berbasis web E-commerce premium yang dirancang untuk kurasi dan penjualan produk high-end dengan pengalaman visual yang mewah.",
        en: "A premium E-commerce web application designed for curating and selling high-end products with a luxurious visual experience."
      },
      image: "/luxury.jpg", 
      link: "" 
    },
    {
      id: "p2",
      title: "InfoUKS",
      category: "Health Integration",
      tech: "Web Engineering",
      desc: {
        id: "Integrasi sistem informasi kesehatan siswa dan manajemen rekam medis terpadu ke dalam satu platform web yang responsif dan dinamis.",
        en: "Integration of student health information systems and unified medical records management into a responsive and dynamic web platform."
      },
      image: "/infouk.jpg", 
      link: ""
    },
    {
      id: "p3",
      title: "Spotbanua",
      category: "Mobile App Design",
      tech: "UI/UX Design",
      desc: {
        id: "Perancangan antarmuka (UI/UX) aplikasi destinasi wisata interaktif untuk mempermudah eksplorasi tempat menarik di Banjarbaru dan wilayah Kalimantan Selatan.",
        en: "UI/UX design for an interactive tourist destination app to facilitate the exploration of points of interest in Banjarbaru and South Kalimantan."
      },
      image: "/spotbanua.jpg",
      link: ""
    },
    {
      id: "p4",
      title: "Bimbel Smart",
      category: "Information System",
      tech: "Web Platform",
      desc: {
        id: "Platform sistem informasi manajemen bimbingan belajar cerdas untuk optimalisasi administrasi pendidikan dan monitoring akademik siswa.",
        en: "A smart tutoring management information system platform for optimizing educational administration and monitoring student academics."
      },
      image: "/bimbel.png",
      link: "https://bimbel-smart.neumediradev.my.id/"
    },
    {
      id: "p5",
      title: "Project: Forever",
      category: "Creative Web Design",
      tech: "Front-End Integration",
      desc: {
        id: "Eksplorasi antarmuka web interaktif yang menerapkan teknik digital storytelling dengan tata letak editorial asimetris dan animasi berbasis scroll.",
        en: "Exploration of interactive web interfaces applying digital storytelling techniques with asymmetrical editorial layouts and scroll-based animations."
      },
      image: "/projectforever.png", 
      link: "https://project-forever.vercel.app/"
    },
    {
      id: "p6",
      title: "Block Master",
      category: "Experimental Game Dev",
      tech: "Phaser.js · JavaScript",
      desc: {
        id: "Proyek eksperimen game 2D arcade untuk menguji kalkulasi fisika (collision detection), penanganan input real-time, dan state management pada browser.",
        en: "An experimental 2D arcade game project to test physics calculations (collision detection), real-time input handling, and state management in the browser."
      },
      image: "/blockmaster.png", 
      link: "https://game-gabut-lemon.vercel.app/"
    },
    {
      id: "p7",
      title: "Rental Random Platform",
      category: "Management System",
      tech: "Laravel · Web Engineering",
      desc: {
        id: "Sistem manajemen persewaan berbasis web yang mengimplementasikan sistem autentikasi aman, kontrol akses multi-role, serta perancangan arsitektur database relasional untuk pelacakan inventaris dan riwayat transaksi.",
        en: "A web-based rental management system implementing secure authentication, multi-role access control, and a relational database architecture for inventory and transaction tracking."
      },
      image: "/rental.png", 
      link: "https://rental-randoom.neumediradev.my.id/login"
    }
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

  useEffect(() => {
    const moveImage = (e) => {
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
          <span className={styles.labelText}>
            {language === 'id' ? 'Karya Pilihan' : 'Selected Works'}
          </span>
        </div>

        <div className={styles.filterContainer}>
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveFilter(category)}
              className={`${styles.filterBtn} ${activeFilter === category ? styles.activeFilter : ''}`}
            >
              {category === 'All' ? (language === 'id' ? 'Semua' : 'All') : category}
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

              {/* BILINGUAL: Deskripsi Proyek */}
              <p className={styles.desc}>{proj.desc[language]}</p>

              <Image
                src={proj.image}
                alt={proj.title}
                width={800} 
                height={500} 
                className={styles.mobileImage}
              />

              <div className={styles.accentLine} />
            </div>
          ))}
        </div>

      </div>

      <div
        ref={cursorImageRef}
        className={`${styles.floatingImageContainer} ${activeImage ? styles.showImage : ''}`}
      >
        <Image
          src={activeImage || projectsData[0].image}
          alt="Project Preview"
          width={600}  
          height={400}
          className={styles.floatingImg}
          priority 
        />
      </div>
    </section>
  );
}