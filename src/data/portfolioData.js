// ============================================================
//  portfolioData.js — Satu sumber data statis untuk seluruh UI
// ============================================================

const portfolioData = {
  // ── PROFIL ──────────────────────────────────────────────
  profile: {
    name: "Muhammad Ahnaf",
    fullName: "Muhammad Ahnaf Isa Hammam Lisualla",
    tagline: "Software Engineer & UI/UX Designer",
    summary:
      "Software Engineer dan UI/UX Designer yang berdedikasi dengan fokus pada pengembangan website modern dan interaktif. Memiliki keahlian kuat dalam merancang antarmuka menggunakan Pure CSS dan JavaScript, serta membangun arsitektur sistem backend yang efisien. Proaktif, teliti dalam menulis kode yang terstruktur, dan mampu memimpin tim proyek.",
    location: "Banjarbaru, Kalimantan Selatan",
    email: "ahnafisa02@gmail.com",
    phone: "+6281257366106",
    availableForWork: true,
  },

  // ── NAVIGASI ────────────────────────────────────────────
  navLinks: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],

  // ── KEAHLIAN TEKNIS ──────────────────────────────────────
  skills: [
    {
      category: "Frontend",
      icon: "◈",
      items: [
        { name: "HTML5 / CSS3", level: 95 },
        { name: "JavaScript Modern", level: 88 },
        { name: "React / Next.js", level: 80 },
        { name: "UI/UX & Figma", level: 85 },
      ],
    },
    {
      category: "Backend",
      icon: "◇",
      items: [
        { name: "PHP / Laravel", level: 78 },
        { name: "MySQL (Relational)", level: 82 },
        { name: "REST API Design", level: 75 },
        { name: "AI API Integration", level: 70 },
      ],
    },
    {
      category: "Tools & DevOps",
      icon: "◉",
      items: [
        { name: "Git / GitHub", level: 90 },
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
      role: "Software Engineer Intern",
      company: "Neumedira",
      period: "Juli 2025 — November 2025",
      type: "Internship",
      description:
        "Memimpin dan mengkoordinasikan tim pengembangan untuk memastikan target sprint dan fitur harian tercapai dengan disiplin.",
      highlights: [
        "Project Management: Koordinasi tim & sprint planning",
        "Code Review dasar & pembagian tugas teknis",
        "Penyelesaian bug operasional secara cepat",
        "Memastikan sistem berjalan optimal",
      ],
    },
    {
      id: "exp-02",
      role: "Web Developer",
      company: "Proyek Web INFOUKS",
      period: "Agustus 2024 — Desember 2024",
      type: "Project",
      description:
        "Membangun sistem informasi berbasis web dengan arsitektur database relasional yang terstruktur dan sistem validasi yang ketat.",
      highlights: [
        "Database Architecture: Relasi One-to-Many dengan Foreign Key",
        "Form Validation & Security: Validasi 8-char ID precision",
        "Pengelolaan data terpusat",
        "Dokumentasi teknis sistem",
      ],
    },
  ],

  // ── PROYEK ───────────────────────────────────────────────
  projects: [
    {
      id: "proj-01",
      title: "RETORIKA DI BALIK BEL SEKOLAH",
      subtitle: "Visual Novel Game",
      description:
        "Visual novel interaktif dengan mekanik battle orisinal dan antarmuka dinamis. Merancang seluruh UI/UX dalam lingkungan game engine serta sistem dialog dan narasi.",
      tags: ["Game Dev", "UI Design", "JavaScript", "Visual Novel"],
      accent: "#c8a96e",
      featured: true,
      year: "2024",
    },
    {
      id: "proj-02",
      title: "AI Virtual Assistant Bot",
      subtitle: "Integrasi AI API",
      description:
        "Bot asisten virtual yang dibangun dengan integrasi Groq dan Google Gemini API. Memiliki kemampuan percakapan kontekstual dan pemrosesan bahasa alami.",
      tags: ["Groq API", "Gemini API", "JavaScript", "AI Integration"],
      accent: "#4a9eff",
      featured: true,
      year: "2024",
    },
    {
      id: "proj-03",
      title: "Sistem Informasi INFOUKS",
      subtitle: "Full-Stack Web System",
      description:
        "Sistem informasi lengkap dengan desain database relasional, panel admin, dan sistem validasi input yang ketat untuk akurasi data.",
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
      major: "Rekayasa Perangkat Lunak (RPL)",
      period: "2023 — 2026",
      achievements: [
        "Juara 1 Video RSPS — JUMPA PMR Tingkat Provinsi (2023)",
        "Divisi Lapangan MPK — OSIS/MPK SMK Telkom Banjarbaru",
      ],
    },
  ],

  // ── SOFT SKILLS ──────────────────────────────────────────
  softSkills: [
    "Analisis Kebutuhan Klien",
    "Manajemen Waktu & Deadline",
    "Komunikasi Tim Transparan",
    "Problem Solving",
    "Leadership",
    "Freelance Project Mgmt",
  ],

  // ── SOCIAL / LINKS ────────────────────────────────────────
  social: [
    { label: "GitHub", href: "https://github.com/", icon: "GH" },
    { label: "LinkedIn", href: "https://linkedin.com/", icon: "LI" },
    { label: "Email", href: "mailto:ahnafisa02@gmail.com", icon: "EM" },
  ],
};

export default portfolioData;