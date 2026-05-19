'use client';
// hooks/useEasterEgg.js
import { useEffect } from 'react';

export default function useEasterEgg() {
  useEffect(() => {
    let inputSequence = '';
    const secretCode = 'ahnaf';

    const handleKeyDown = (e) => {
      // Abaikan jika menekan tombol khusus
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      
      inputSequence += e.key.toLowerCase();
      
      // Jaga panjang string agar memori tidak bengkak
      if (inputSequence.length > secretCode.length) {
        inputSequence = inputSequence.slice(1);
      }

      if (inputSequence === secretCode) {
        triggerCyberpunkMode();
      }
    };

    const triggerCyberpunkMode = () => {
      // Override CSS Global untuk efek Neon Cyberpunk
      const root = document.documentElement;
      root.style.setProperty('--color-gold', '#ff00ff'); // Neon Pink
      root.style.setProperty('--color-gold-dim', '#00ffff'); // Cyan
      root.style.setProperty('--color-text-primary', '#00ffcc');
      
      // Efek getar layar sebentar
      document.body.style.animation = 'glitchShake 0.4s ease-in-out';
      
      // Reset getaran agar bisa dipanggil lagi nanti
      setTimeout(() => {
        document.body.style.animation = 'none';
      }, 400);
      
      console.log("🔓 SYSTEM OVERRIDE: Cyberpunk Mode Activated!");
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}