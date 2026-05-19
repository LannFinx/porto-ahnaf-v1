'use client';
// app/page.js
import styles from './page.module.css';

// Komponen Lama
import Navbar           from '@/components/Navbar/Navbar';
import Hero             from '@/components/Hero/Hero';
import About            from '@/components/About/About';
import Skills           from '@/components/Skills/Skills';
import Experience       from '@/components/Experience/Experience';
import Contact          from '@/components/Contact/Contact';
import GlobalBackground from '@/components/GlobalBackground/GlobalBackground'; 

// Komponen Baru Upgrade Ekstrem
import Preloader        from '@/components/Preloader/Preloader';
import Marquee          from '@/components/Marquee/Marquee';
import Projects         from '@/components/Projects/Projects';

// Custom Hook Easter Egg
import useEasterEgg     from '@/hooks/useEasterEgg';

export default function Home() {
  // Panggil detektor mata-mata Easter Egg
  useEasterEgg();

  return (
    <>
      {/* Gerbang Masuk Mewah */}
      {/* <Preloader /> */}

      <main className={styles.main}>
        <GlobalBackground />
        
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Experience />
        
        {/* Pita Teks Berjalan diletakkan sebelum Projects */}
        <Marquee />
        
        {/* Projects yang sudah di-upgrade Hover effect-nya */}
        <Projects />
        
        <Contact />
      </main>
    </>
  );
}