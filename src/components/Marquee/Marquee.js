'use client';
// components/Marquee/Marquee.js
import { useEffect, useRef } from 'react';
import styles from './Marquee.module.css';

export default function Marquee() {
  const textRef = useRef(null);
  const positionRef = useRef(0);
  const directionRef = useRef(-1); // -1 kiri, 1 kanan
  const requestRef = useRef(null);

  // ─── PENGATURAN KECEPATAN (Ubah angka ini jika masih kurang pas) ───
  // 0.05 = Sangat pelan & elegan (Editorial Style)
  // 0.1  = Agak santai
  const baseSpeed = 0.05; 

  useEffect(() => {
    // Pindahkan lastScrollY ke dalam useEffect agar aman saat SSR di Next.js
    let lastScrollY = window.scrollY;

    const animate = () => {
      // 1. Cek kecepatan & arah scroll
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      
      // Jika scroll ke atas, ubah arah ke kanan (1). Jika ke bawah, ke kiri (-1).
      if (delta < 0) directionRef.current = 1;
      else if (delta > 0) directionRef.current = -1;
      
      lastScrollY = currentScrollY;

      // 2. Majukan posisi menggunakan baseSpeed yang sudah diperlambat
      positionRef.current += baseSpeed * directionRef.current;

      // 3. Seamless Loop Logic (Reset jika mentok)
      // Karena kita pakai 4 copy teks, looping terjadi di -50% agar mulus
      if (positionRef.current <= -50) positionRef.current = 0;
      if (positionRef.current >= 0) positionRef.current = -50;

      // 4. Render ke DOM
      if (textRef.current) {
        textRef.current.style.transform = `translateX(${positionRef.current}%)`;
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const text = "✦ AVAILABLE FOR FREELANCE ✦ PENAMPILANNYA TAMPAN ✦ BACKEND SPECIALIST ✦ ";

  return (
    <div className={styles.marqueeContainer}>
      {/* Kita kalikan teks agar cukup panjang untuk seamless loop */}
      <div className={styles.marqueeText} ref={textRef}>
        {text}{text}{text}{text}
      </div>
    </div>
  );
}