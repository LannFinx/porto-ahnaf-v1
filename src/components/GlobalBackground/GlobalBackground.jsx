'use client';
// components/GlobalBackground/GlobalBackground.jsx
// ─── Native HTML5 Canvas Particle Network & Scroll Glow ───

import { useEffect, useRef } from 'react';
import styles from './GlobalBackground.module.css';

export default function GlobalBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let isAnimating = true; // Flag untuk status render

    // ── Variabel Interaksi ──
    // Menyimpan posisi kursor mouse relatif terhadap layar
    let mouse = { x: null, y: null, radius: 150 }; 
    // Menyimpan nilai scroll untuk efek parallax glow
    let scrollY = 0; 

// Optimasi: Kurangi jumlah partikel secara signifikan di layar kecil
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const particleCount = isMobile ? 30 : 70;

    // Atur ukuran kanvas agar tajam di layar Retina
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // ── Event Listeners (Tanpa State agar 60 FPS!) ──
    const handleMouseMove = (e) => {
        if (window.innerWidth <= 768) return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };
    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ── KELAS PARTIKEL (Objek Fisika) ──
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x; // Titik asal (jangkar)
        this.baseY = this.y;
        this.size = Math.random() * 2 + 1; // Ukuran 1px - 3px
        this.density = (Math.random() * 30) + 1; // Berat partikel (mempengaruhi seberapa kuat ia terpental)
        this.angle = Math.random() * 360;
        this.velocity = Math.random() * 0.3 + 0.1;  
        
        // Randomize warna (Emas vs Biru Gelap)
        const isGold = Math.random() > 0.5;
        this.color = isGold 
          ? `rgba(200, 169, 110, ${Math.random() * 0.5 + 0.2})` 
          : `rgba(74, 158, 255, ${Math.random() * 0.3 + 0.1})`;
        
        // Kecepatan melayang alami
        this.angle = Math.random() * 360;
        this.velocity = Math.random() * 0.5;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        // 1. Pergerakan Alami (Melayang pelan seperti debu kosmik)
        this.baseX += Math.cos(this.angle) * this.velocity;
        this.baseY += Math.sin(this.angle) * this.velocity;
        
        // Pantulkan jika menabrak dinding layar
        if (this.baseX < 0 || this.baseX > canvas.width) this.velocity *= -1;
        if (this.baseY < 0 || this.baseY > canvas.height) this.velocity *= -1;

        // 2. Interaksi Magnetik/Kinetik dengan Mouse
        if (mouse.x != null) {
          // Teorema Pythagoras untuk mencari jarak antara mouse dan partikel
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          // Jika partikel berada di dalam radius mouse
          if (distance < mouse.radius) {
            // Hitung kekuatan dorongan (semakin dekat, semakin kuat)
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            
            const directionX = forceDirectionX * force * this.density;
            const directionY = forceDirectionY * force * this.density;

            // Efek Menghindar (Tolak Menolak)
            this.x -= directionX;
            this.y -= directionY;
          } else {
            // Efek Pegas (Spring back): Jika mouse menjauh, kembali perlahan ke titik asal
            if (this.x !== this.baseX) {
              this.x -= (this.x - this.baseX) * 0.05; // 0.05 adalah kecepatan balik
            }
            if (this.y !== this.baseY) {
              this.y -= (this.y - this.baseY) * 0.05;
            }
          }
        } else {
          // Jika mouse di luar layar, ikuti titik base secara alami
          this.x = this.baseX;
          this.y = this.baseY;
        }

        this.draw();
      }
    }

    // Inisialisasi Array Partikel
    let particleArray = [];
    for (let i = 0; i < particleCount; i++) {
      particleArray.push(new Particle());
    }

    // ── FUNGSI JARINGAN KONSTELASI ──
    const connectParticles = () => {
      // Loop bersarang untuk membandingkan jarak antar partikel
      for (let a = 0; a < particleArray.length; a++) {
        for (let b = a; b < particleArray.length; b++) {
          let dx = particleArray[a].x - particleArray[b].x;
          let dy = particleArray[a].y - particleArray[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          // Jika partikel saling berdekatan (kurang dari 120px)
          if (distance < 120) {
            // Semakin dekat, garis semakin jelas
            let opacity = 1 - (distance / 120);
            ctx.strokeStyle = `rgba(200, 169, 110, ${opacity * 0.2})`; // Garis emas sangat tipis
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particleArray[a].x, particleArray[a].y);
            ctx.lineTo(particleArray[b].x, particleArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    // ── RENDER LOOP UTAMA (Berjalan 60x per detik) ──
    const animate = () => {
      // Bersihkan frame sebelumnya dengan memberikan sedikit efek bayangan
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Gambar Cinematic Ambient Glow (Berespons terhadap scroll)
      // Glow Kiri Atas (Emas)
      const glow1 = ctx.createRadialGradient(
        canvas.width * 0.2, (canvas.height * 0.2) - (scrollY * 0.3), // Parallax: scrollY * 0.3
        0, 
        canvas.width * 0.2, (canvas.height * 0.2) - (scrollY * 0.3), 
        800 // Radius pancaran
      );
      glow1.addColorStop(0, 'rgba(200, 169, 110, 0.05)');
      glow1.addColorStop(1, 'transparent');
      ctx.fillStyle = glow1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Glow Kanan Bawah (Biru)
      const glow2 = ctx.createRadialGradient(
        canvas.width * 0.8, (canvas.height * 0.8) - (scrollY * 0.15),
        0, 
        canvas.width * 0.8, (canvas.height * 0.8) - (scrollY * 0.15), 
        600
      );
      glow2.addColorStop(0, 'rgba(74, 158, 255, 0.04)');
      glow2.addColorStop(1, 'transparent');
      ctx.fillStyle = glow2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Update Partikel & Garis
      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
      }
      connectParticles();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // ── CLEANUP (Sangat Penting untuk Performa React) ──
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={styles.canvasContainer}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}