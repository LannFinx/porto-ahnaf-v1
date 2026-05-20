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
      title: "LuxurySneakers",
      category: "E-Commerce",
      tech: "Web Development",
      desc: "Aplikasi berbasis web E-commerce premium yang dirancang untuk kurasi dan penjualan produk high-end dengan pengalaman visual yang mewah.",
      image: "/luxury.jpg", // Mengambil dari folder public
      link: "" // Kosongkan jika tidak ada link live
    },
    {
      id: "p2",
      title: "InfoUKS",
      category: "Health Integration",
      tech: "Web Engineering",
      desc: "Integrasi sistem informasi kesehatan siswa dan manajemen rekam medis terpadu ke dalam satu platform web yang responsif dan dinamis.",
      image: "/infouk.jpg", // Sesuai dengan nama file Anda
      link: ""
    },
    {
      id: "p3",
      title: "Spotbanua",
      category: "Mobile App Design",
      tech: "UI/UX Design",
      desc: "Perancangan antarmuka (UI/UX) aplikasi destinasi wisata interaktif untuk mempermudah eksplorasi tempat menarik di Banjarbaru dan wilayah Kalimantan Selatan.",
      image: "/spotbanua.jpg",
      link: ""
    },
    {
      id: "p4",
      title: "Bimbel Smart",
      category: "Information System",
      tech: "Web Platform",
      desc: "Platform sistem informasi manajemen bimbingan belajar cerdas untuk optimalisasi administrasi pendidikan dan monitoring akademik siswa.",
      image: "/bimbel.png",
      link: "https://bimbel-smart.neumediradev.my.id/"
    },
    {
      id: "p5",
      title: "Project: Forever",
      category: "Creative Web Design",
      tech: "Front-End Integration",
      desc: "Eksplorasi antarmuka web interaktif yang menerapkan teknik digital storytelling dengan tata letak editorial asimetris dan animasi berbasis scroll.",
      image: "/projectforever.png", // Pastikan Anda memasukkan screenshot web ini ke folder public dengan nama ini
      link: "https://project-forever.vercel.app/"
    },
    {
      id: "p6",
      title: "Block Master",
      category: "Experimental Game Dev",
      tech: "Phaser.js · JavaScript",
      desc: "Proyek eksperimen game 2D arcade untuk menguji kalkulasi fisika (collision detection), penanganan input real-time, dan state management pada browser.",
      image: "/blockmaster.png", // Pastikan Anda memasukkan screenshot game ini ke folder public dengan nama ini
      link: "https://game-gabut-lemon.vercel.app/"
    },
    {
      id: "p7",
      title: "Rental Random Platform",
      category: "Management System",
      tech: "Laravel · Web Engineering",
      desc: "Sistem manajemen persewaan berbasis web yang mengimplementasikan sistem autentikasi aman, kontrol akses multi-role, serta perancangan arsitektur database relasional untuk pelacakan inventaris dan riwayat transaksi.",
      image: "/rental.png", // Ambil screenshot halaman login/dashboard, beri nama rental.jpg, masukkan ke folder public
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