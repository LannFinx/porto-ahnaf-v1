'use client';
// components/Preloader/Preloader.js
import { useEffect, useState, useRef } from 'react';
import styles from './Preloader.module.css';

export default function Preloader() {
  const [isFinished, setIsFinished] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const numberRef = useRef(null);

  useEffect(() => {
    // 1. Cek sesi agar tidak berulang
    const hasVisited = sessionStorage.getItem('preloaderShown');
    if (hasVisited) {
      setShouldRender(false);
      return;
    }

    // Kunci scroll
    document.body.style.overflow = 'hidden';

    // 2. Animasi Angka menggunakan manipulasi DOM langsung (Bebas Lag)
    let startTimestamp = null;
    const duration = 1200; // Total waktu animasi (1.2 detik)

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Kalkulasi angka 0 - 100 dengan efek easing (melambat di akhir)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentVal = Math.floor(easeOutQuart * 100);

      if (numberRef.current) {
        numberRef.current.innerText = currentVal;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        // Jika sudah 100%
        setTimeout(() => setIsFinished(true), 200);
        setTimeout(() => {
          document.body.style.overflow = ''; // Lepas kunci scroll
          setShouldRender(false);
          sessionStorage.setItem('preloaderShown', 'true');
        }, 1000); // Tunggu transisi slideUp selesai
      }
    };

    requestAnimationFrame(step);

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div className={`${styles.preloader} ${isFinished ? styles.slideUp : ''}`}>
      <div className={styles.counter}>
        <span className={styles.number} ref={numberRef}>0</span>
        <span className={styles.percent}>%</span>
      </div>
      <div className={styles.brand}>AHNAF.</div>
    </div>
  );
}