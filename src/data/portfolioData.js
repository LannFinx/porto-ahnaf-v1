// ============================================================
//  portfolioData.js — Sumber data BILINGUAL (ID/EN)
// ============================================================

const portfolioData = {
  // ── PROFIL ──────────────────────────────────────────────
  profile: {
    name: "Muhammad Ahnaf",
    fullName: "Muhammad Ahnaf Isa Hammam Lisualla",
    tagline: { 
      id: "Software Engineer & UI/UX Designer", 
      en: "Software Engineer & UI/UX Designer" 
    },
    summary: {
      id: "Software Engineer dan UI/UX Designer yang berdedikasi dengan fokus pada pengembangan website modern dan interaktif. Memiliki keahlian kuat dalam merancang antarmuka menggunakan Pure CSS dan JavaScript, serta membangun arsitektur sistem backend yang efisien. Proaktif, teliti dalam menulis kode yang terstruktur, dan mampu memimpin tim proyek.",
      en: "Dedicated Software Engineer and UI/UX Designer focused on developing modern, interactive websites. Highly skilled in crafting interfaces using Pure CSS and JavaScript, and architecting efficient, scalable backend systems. Proactive, meticulous in writing structured code, and capable of leading project teams."
    },
    location: { 
      id: "Banjarbaru, Kalimantan Selatan", 
      en: "Banjarbaru, South Kalimantan" 
    },
    email: "ahnafisa02@gmail.com",
    phone: "+6281257366106",
    availableForWork: true,
  },

  // ── HERO UI TEXT (Untuk komponen Hero) ──────────────────
  heroUI: {
    badge: { id: "Tersedia untuk bekerja", en: "Available for work" },
    locationPrefix: { id: "Berbasis di", en: "Based in" },
    btnPrimary: { id: "Lihat Proyek", en: "View Projects" },
    btnSecondary: { id: "Hubungi Saya", en: "Contact Me" },
    scroll: { id: "Gulir", en: "Scroll" }
  },

  // ── NAVIGASI ────────────────────────────────────────────
  navLinks: [
    { label: { id: "Tentang", en: "About" }, href: "#about" },
    { label: { id: "Keahlian", en: "Skills" }, href: "#skills" },
    { label: { id: "Pengalaman", en: "Experience" }, href: "#experience" },
    { label: { id: "Proyek", en: "Projects" }, href: "#projects" },
    { label: { id: "Kontak", en: "Contact" }, href: "#contact" },
  ],

  // ── KEAHLIAN TEKNIS ──────────────────────────────────────
  skills: [
    {
      category: { id: "Frontend", en: "Frontend" },
      icon: "◈",
      items: [
        { name: "HTML5 / CSS3", level: 95 },
        { name: "JavaScript Modern", level: 88 },
        { name: "React / Next.js", level: 80 },
        { name: "UI/UX & Figma", level: 85 },
      ],
    },
    {
      category: { id: "Backend", en: "Backend" },
      icon: "◇",
      items: [
        { name: "PHP / Laravel", level: 78 },
        { name: "MySQL (Relational)", level: 82 },
        { name: "REST API Design", level: 75 },
        { name: "AI API Integration", level: 70 },
      ],
    },
    {
      category: { id: "Tools & DevOps", en: "Tools & DevOps" },
      icon: "◉",
      items: [
        { name: "Git / GitHub", level: 80 },
        { name: "Vercel Deployment", level: 85 },
        { name: "Canva / Desain Aset", level: 80 },
        { name: "Project Management", level: 75 },
      ],
    },
  ],

  // ── PENGALAMAN KERJA ─────────────────────────────────────
  experience: [
    {
      id: "exp-01",
      role: { id: "Software Engineer Intern", en: "Software Engineer Intern" },
      company: "Neumedira",
      period: { id: "Juli 2025 — November 2025", en: "July 2025 — November 2025" },
      type: { id: "Magang", en: "Internship" },
      description: {
        id: "Memimpin dan mengkoordinasikan tim pengembangan untuk memastikan target sprint dan fitur harian tercapai dengan disiplin.",
        en: "Led and coordinated the development team to ensure sprint targets and daily feature implementations were achieved with high discipline."
      },
      highlights: {
        id: [
          "Project Management: Koordinasi tim & sprint planning",
          "Code Review dasar & pembagian tugas teknis",
          "Penyelesaian bug operasional secara cepat",
          "Memastikan sistem berjalan optimal"
        ],
        en: [
          "Project Management: Team coordination & sprint planning",
          "Basic Code Review & technical task delegation",
          "Rapid resolution of operational bugs",
          "Ensuring optimal system performance"
        ]
      }
    },
    {
      id: "exp-02",
      role: { id: "Web Developer", en: "Web Developer" },
      company: "Proyek Web INFOUKS",
      period: { id: "Agustus 2024 — Desember 2024", en: "August 2024 — December 2024" },
      type: { id: "Proyek", en: "Project" },
      description: {
        id: "Membangun sistem informasi berbasis web dengan arsitektur database relasional yang terstruktur dan sistem validasi yang ketat.",
        en: "Built a web-based information system featuring a structured relational database architecture and strict validation systems."
      },
      highlights: {
        id: [
          "Database Architecture: Relasi One-to-Many dengan Foreign Key",
          "Form Validation & Security: Validasi 8-char ID precision",
          "Pengelolaan data terpusat",
          "Dokumentasi teknis sistem"
        ],
        en: [
          "Database Architecture: One-to-Many relations with Foreign Keys",
          "Form Validation & Security: 8-char ID precision validation",
          "Centralized data management",
          "Technical system documentation"
        ]
      }
    },
  ],

  // ── PROYEK ───────────────────────────────────────────────
  projects: [
    {
      id: "proj-01",
      title: "Remnant of Memory",
      subtitle: { id: "Game Roblox", en: "Roblox Game" },
      description: {
        id: "Visual novel interaktif dengan mekanik battle orisinal dan antarmuka dinamis. Merancang seluruh UI/UX dalam lingkungan game engine serta sistem dialog dan narasi.",
        en: "Interactive visual novel featuring original battle mechanics and a dynamic interface. Designed all UI/UX within the game engine, alongside the dialogue and narrative systems."
      },
      tags: ["Game Dev", "Storyboard", "Lua Script", "Roblox"],
      accent: "#c8a96e",
      featured: true,
      year: "2024",
    },
    {
      id: "proj-02",
      title: "AI Virtual Assistant Bot",
      subtitle: { id: "Integrasi AI API", en: "AI API Integration" },
      description: {
        id: "Bot asisten virtual yang dibangun dengan integrasi Groq dan Google Gemini API. Memiliki kemampuan percakapan kontekstual dan pemrosesan bahasa alami.",
        en: "A virtual assistant bot built utilizing Groq and Google Gemini API integration. Features contextual conversation capabilities and natural language processing."
      },
      tags: ["Groq API", "Gemini API", "JavaScript", "AI Integration"],
      accent: "#4a9eff",
      featured: true,
      year: "2024",
    },
    {
      id: "proj-03",
      title: "Sistem Informasi INFOUKS",
      subtitle: { id: "Sistem Web Full-Stack", en: "Full-Stack Web System" },
      description: {
        id: "Sistem informasi lengkap dengan desain database relasional, panel admin, dan sistem validasi input yang ketat untuk akurasi data.",
        en: "Comprehensive information system equipped with relational database design, an admin panel, and strict input validation for high data accuracy."
      },
      tags: ["PHP", "Laravel", "MySQL", "Full-Stack"],
      accent: "#a8d8a8",
      featured: false,
      year: "2024",
    },
  ],

  // ── PENDIDIKAN & ORGANISASI ──────────────────────────────
  education: [
    {
      institution: "SMK Telkom Banjarbaru",
      major: { id: "Rekayasa Perangkat Lunak (RPL)", en: "Software Engineering" },
      period: "2023 — 2026",
      achievements: {
        id: [
          "Juara 1 Video RSPS — JUMPA PMR Tingkat Provinsi (2023)",
          "Divisi Lapangan MPK — OSIS/MPK SMK Telkom Banjarbaru"
        ],
        en: [
          "1st Place in RSPS Video — Provincial Level PMR JUMPA (2023)",
          "MPK Field Division — OSIS/MPK SMK Telkom Banjarbaru"
        ]
      }
    },
  ],

  // ── SOFT SKILLS ──────────────────────────────────────────
  softSkills: [
    { id: "Analisis Kebutuhan Klien", en: "Client Requirements Analysis" },
    { id: "Manajemen Waktu & Deadline", en: "Time & Deadline Management" },
    { id: "Komunikasi Tim Transparan", en: "Transparent Team Communication" },
    { id: "Pemecahan Masalah (Problem Solving)", en: "Problem Solving" },
    { id: "Kepemimpinan (Leadership)", en: "Leadership" },
    { id: "Manajemen Proyek Freelance", en: "Freelance Project Management" },
  ],

  // ── SOCIAL / LINKS ────────────────────────────────────────
  social: [
    { label: "GitHub", href: "https://github.com/LannFinx", icon: "GH" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/m-ahnaf-isa-hammam-lisualla-896887330/", icon: "LI" },
    { label: "Email", href: "mailto:ahnafisa02@gmail.com", icon: "EM" },
  ],
};

export default portfolioData;