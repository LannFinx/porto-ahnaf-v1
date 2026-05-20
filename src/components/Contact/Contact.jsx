'use client';
// components/Contact/Contact.js
import { useState, useEffect, useRef } from 'react';
import portfolioData from '@/data/portfolioData';
import styles from './Contact.module.css';

// ─── KOMPONEN: Magnetic Social Link ───
const MagneticSocial = ({ href, children }) => {
  const linkRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = linkRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px)`;
  };

  const handleMouseLeave = () => {
    if (linkRef.current) linkRef.current.style.transform = `translate(0px, 0px)`;
  };

  return (
    <a
      ref={linkRef}
      href={href}
      className={styles.socialLink}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </a>
  );
};

export default function Contact() {
  const { profile, social } = portfolioData;
  const [time, setTime] = useState('');
  
  // State untuk Modal & Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  // Logika: Live Local Time (WITA - Banjarbaru)
  useEffect(() => {
    const updateTime = () => {
      const options = { timeZone: 'Asia/Makassar', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      setTime(formatter.format(new Date()));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Logika: Submit API Resend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        // Auto-close modal after 3 seconds on success
        setTimeout(() => {
          setIsModalOpen(false);
          setStatus('idle');
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.container}>
        
        {/* ── CTA UTAMA ── */}
        <div className={styles.ctaWrapper}>
          <div className={styles.topInfo}>
            <p className={styles.subheading}>Mari Berkolaborasi</p>
            <div className={styles.localTime}>
              <span className={styles.pulseDot}></span>
              <span>Local Time (WITA): {time}</span>
            </div>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)} 
            className={styles.bigEmailBtn}
          >
            <span className={styles.defaultText}>
              Get In <em className={styles.italicAksent}>Touch.</em>
            </span>
          </button>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            © {new Date().getFullYear()} {profile.fullName}.
          </div>
          <div className={styles.socials}>
            {social.map((soc, idx) => (
              <MagneticSocial key={idx} href={soc.href}>
                {soc.label}
              </MagneticSocial>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTACT MODAL (GLASSMORPHISM) ── */}
      <div className={`${styles.modalOverlay} ${isModalOpen ? styles.showModal : ''}`}>
        <div className={styles.modalContent}>
          <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>×</button>
          
          <div className={styles.modalHeader}>
            <h3>Kirim Pesan</h3>
            <p>Tertarik bekerja sama? Isi form di bawah ini.</p>
          </div>

          {status === 'success' ? (
            <div className={styles.successState}>
              <div className={styles.checkIcon}>✓</div>
              <h4>Pesan Terkirim!</h4>
              <p>Terima kasih. Saya akan segera membalas email Anda.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <input 
                  type="text" 
                  placeholder="Nama Lengkap" 
                  required 
                  disabled={status === 'loading'}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className={styles.inputGroup}>
                <input 
                  type="email" 
                  placeholder="Alamat Email" 
                  required 
                  disabled={status === 'loading'}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className={styles.inputGroup}>
                <textarea 
                  placeholder="Ceritakan tentang proyek Anda..." 
                  rows="4" 
                  required
                  disabled={status === 'loading'}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              
              {status === 'error' && (
                <p className={styles.errorText}>Gagal mengirim pesan. Silakan coba lagi nanti.</p>
              )}

              <button type="submit" className={styles.submitBtn} disabled={status === 'loading'}>
                {status === 'loading' ? <span className={styles.spinner}></span> : 'Kirim Pesan ↗'}
              </button>
            </form>
          )}
        </div>
      </div>
    </footer>
  );
}