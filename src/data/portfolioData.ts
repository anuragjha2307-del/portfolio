export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: 'AI / ML' | 'Full-Stack' | 'Mobile';
  domain: string;
  techStack: string[];
  status: 'online' | 'active' | 'beta';
  uptime: string;
  latency: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  github?: string;
  demoUrl?: string;
  appWindowId: string;
  features: string[];
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface Education {
  institution: string;
  degree: string;
  location: string;
  period: string;
  standing: string;
  coursework: string[];
}

export const PERSONAL_INFO = {
  name: 'Anurag Jha',
  title: 'AI Systems Engineer & Full-Stack / Mobile Architect',
  shortBio: 'MCA candidate at Galgotias University specializing in Deep Learning, NLP Document Intelligence, Biometric Security Systems, and Cross-Platform Mobile Architectures.',
  location: 'Greater Noida, UP, India',
  phone: '+91 8595648167',
  email: 'ajha5678910@gmail.com',
  linkedin: 'https://linkedin.com/in/anurag-jha-379520257',
  github: 'https://github.com/anuragjha2307-del',
  whatsapp: 'https://wa.me/918595648167?text=Hi%20Anurag,%20saw%20your%20interactive%20developer%20portfolio%20and%20would%20love%20to%20connect!',
  resumePdfName: 'Anurag_Jha_Resume.pdf',
  status: 'Open to AI Engineer, Full-Stack, and Mobile Developer Roles',
};

export const PROJECTS: Project[] = [
  {
    id: 'ai-assistant',
    title: 'AI Research Assistant Suite',
    subtitle: 'NLP Document Intelligence & Literature Exploration System',
    tagline: 'Streamlit Cloud, PyTorch, PyPDF, and automated contextual literature Q&A',
    category: 'AI / ML',
    domain: 'NLP & Large Language Models',
    techStack: ['Python', 'PyTorch', 'PyPDF', 'Streamlit', 'NLP', 'CI/CD', 'GitHub Actions'],
    status: 'online',
    uptime: '99.9%',
    latency: '34ms',
    appWindowId: 'ai-assistant',
    github: 'https://github.com/anuragjha2307-del/AI-Assistant',
    demoUrl: 'https://streamlit.io',
    metrics: [
      { label: 'Summarization Speed', value: '4.2x faster' },
      { label: 'Format Compatibility', value: 'IEEE LaTeX' },
      { label: 'Uptime (Streamlit)', value: '99.9%' },
    ],
    highlights: [
      'Developed an NLP document intelligence suite supporting automated literature exploration, document summarization, and contextual Q&A capabilities.',
      'Architected a high-throughput parsing pipeline via PyPDF to efficiently process scientific papers and generate structured IEEE-format LaTeX outputs.',
      'Deployed production application on Streamlit Cloud, managing secure API authentication and implementing GitHub Actions CI/CD for automated testing and delivery.',
    ],
    features: [
      'Multi-document semantic parsing & literature exploration',
      'Context-aware Q&A with retrieved citation evidence',
      'One-click automated structured IEEE LaTeX paper export',
      'Automated CI/CD pipeline via GitHub Actions to Streamlit Cloud',
    ],
  },
  {
    id: 'smart-presence',
    title: 'Smart Presence',
    subtitle: 'AI Biometric & Geofenced Verification Platform',
    tagline: 'OpenCV Deep Learning Face Embeddings + Haversine GPS Geofencing + TOTP Tokens',
    category: 'Full-Stack',
    domain: 'Computer Vision & Security Architecture',
    techStack: ['Python', 'OpenCV', 'Deep Learning', 'Flask REST API', 'Haversine GPS', 'TOTP', 'PostgreSQL'],
    status: 'online',
    uptime: '99.8%',
    latency: '68ms',
    appWindowId: 'smart-presence',
    github: 'https://github.com/anuragjha2307-del/qr-attendance',
    demoUrl: 'https://render.com',
    metrics: [
      { label: 'Inference Latency', value: '< 280ms' },
      { label: 'Geofence Precision', value: '± 5 meters' },
      { label: 'Proxy Fraud Rate', value: '0.0%' },
    ],
    highlights: [
      'Engineered an automated biometric verification pipeline integrating OpenCV Deep Learning face embeddings to enhance security and eliminate proxy attendance.',
      'Designed a dual-verification workflow combining dynamic Time-based One-Time Token (TOTP) generation with Haversine GPS geofencing for precise location check-ins.',
      'Constructed client-server REST APIs for sub-second real-time model inference, automated record synchronization, and scheduled CSV report generation.',
    ],
    features: [
      'Real-time OpenCV facial landmarking and deep feature extraction',
      'Haversine mathematical geofencing to prevent remote spoofing',
      'Dynamic rolling TOTP QR generation refreshed every 30 seconds',
      'Automated batch attendance report export in CSV and encrypted logs',
    ],
  },
  {
    id: 'spark-mobile',
    title: 'Spark Dating App',
    subtitle: 'High-Performance React Native & Expo Mobile Experience',
    tagline: '60fps gesture-driven card matchmaking with real-time push architecture and instant APK builds',
    category: 'Mobile',
    domain: 'Cross-Platform Mobile Architecture',
    techStack: ['React Native', 'Expo', 'TypeScript', 'Redux Toolkit', 'Reanimated 3', 'REST APIs'],
    status: 'online',
    uptime: '99.95%',
    latency: '22ms',
    appWindowId: 'spark-mobile',
    github: 'https://github.com/anuragjha2307-del/spark-mobile-app',
    demoUrl: '#',
    metrics: [
      { label: 'Frame Rate', value: '60 FPS' },
      { label: 'Match Latency', value: '< 120ms' },
      { label: 'Build Architecture', value: 'Expo EAS' },
    ],
    highlights: [
      'Architected a high-throughput mobile dating platform using React Native and Expo with buttery-smooth 60fps swipe physics.',
      'Designed modular component state using Redux Toolkit and dynamic WebSocket channels for instant match notifications and responsive chat.',
      'Configured automated Expo EAS cloud build pipelines providing one-click standalone Android APK binaries and instant Expo Go QR previews.',
    ],
    features: [
      'Gesture-driven interactive swipe physics (Like / Pass / SuperLike)',
      'Instant Match celebration modal with interactive chat teaser',
      'Direct fast APK download and scannable Expo Go development QR',
      'Dark/Light themed mobile UI with fluid responsive layouts',
    ],
  },
];

export const WORK_EXPERIENCES: Experience[] = [
  {
    company: 'EduSkills Academy',
    role: 'Machine Learning & Data Science Intern',
    location: 'Remote',
    period: 'June 2026 – August 2026',
    bullets: [
      'Architected and optimized automated data pipelines using Python and SQL for preprocessing, feature extraction, and statistical model evaluation, reducing data processing time by 40%.',
      'Engineered and deployed robust predictive machine learning models via Flask REST APIs, streamlining backend integration and sustaining a 90% customer satisfaction rate.',
      'Conducted hyperparameter tuning and model optimization on NLP/sentiment datasets, enhancing classification reliability and system performance by 25%.',
      'Developed interactive dashboards with Power BI and Python visualization libraries, translating complex analytical findings into actionable business insights that drove user engagement up by 30%.',
    ],
  },
];

export const EDUCATION: Education[] = [
  {
    institution: 'Galgotias University',
    degree: 'Master of Computer Applications (MCA)',
    location: 'Greater Noida, India',
    period: '2025 – 2027',
    standing: 'First Class with Distinction (Zero active backlogs)',
    coursework: [
      'Advanced Data Structures & Algorithms',
      'Machine Learning',
      'Deep Learning',
      'DBMS',
      'Object-Oriented Programming',
    ],
  },
  {
    institution: 'DPGITM (DPG Institute of Technology and Management)',
    degree: 'Bachelor of Computer Applications (BCA)',
    location: 'Gurugram, India',
    period: '2022 – 2025',
    standing: 'First Class with Distinction (>60% aggregate)',
    coursework: [
      'Software Engineering',
      'Database Management Systems',
      'Computer Networks',
      'C & Java Programming',
    ],
  },
];

export const TECH_RADAR = [
  {
    category: 'AI, ML & Data',
    skills: [
      { name: 'PyTorch', level: 'Advanced', description: 'Deep learning models, tensor math, neural pipelines' },
      { name: 'TensorFlow', level: 'Intermediate', description: 'Model training, serialization, evaluation' },
      { name: 'OpenCV', level: 'Advanced', description: 'Biometric face embeddings, computer vision algorithms' },
      { name: 'Scikit-learn', level: 'Advanced', description: 'Classification, clustering, hyperparameter tuning' },
      { name: 'Pandas & NumPy', level: 'Expert', description: 'High-throughput data manipulation and analytics' },
      { name: 'Power BI', level: 'Intermediate', description: 'Interactive telemetry dashboards & KPIs' },
    ],
  },
  {
    category: 'Backend & Databases',
    skills: [
      { name: 'Python', level: 'Expert', description: 'Core system programming, REST services, algorithms' },
      { name: 'Flask', level: 'Advanced', description: 'Lightweight microservices, inference endpoints' },
      { name: 'REST APIs', level: 'Expert', description: 'JSON architecture, sub-second latency, security' },
      { name: 'PostgreSQL / MySQL', level: 'Advanced', description: 'Relational schema design, ACID, indexing' },
      { name: 'MongoDB', level: 'Intermediate', description: 'Document storage, aggregation queries' },
      { name: 'CI/CD & Git', level: 'Advanced', description: 'GitHub Actions, automated testing, delivery pipelines' },
    ],
  },
  {
    category: 'Mobile & Frontend',
    skills: [
      { name: 'React Native', level: 'Advanced', description: 'Cross-platform native mobile apps (Spark)' },
      { name: 'Expo', level: 'Advanced', description: 'EAS build system, fast mobile iteration' },
      { name: 'JavaScript / TypeScript', level: 'Advanced', description: 'Type-safe client-side application logic' },
      { name: 'HTML5 & CSS3', level: 'Expert', description: 'Modern semantic web layouts, responsive systems' },
      { name: 'Streamlit', level: 'Advanced', description: 'Rapid AI tool prototyping & cloud deployment' },
      { name: 'Linux / Bash', level: 'Advanced', description: 'CLI scripting, server environments, terminal ops' },
    ],
  },
];

export const ATS_PROFILES = {
  ai_engineer: {
    label: 'AI / ML Engineer',
    headline: 'AI & Machine Learning Engineer | Deep Learning, NLP & Computer Vision',
    summary:
      'Innovative AI Engineer with proven expertise in architecting NLP literature exploration systems, OpenCV deep learning biometric pipelines, and predictive ML models via Flask REST APIs. Reduced data processing latency by 40% during ML internship at EduSkills Academy.',
    topSkills: ['Python', 'PyTorch', 'OpenCV', 'NLP / LLM', 'Scikit-learn', 'TensorFlow', 'Flask REST APIs', 'Pandas & NumPy'],
    priorityProjects: ['ai-assistant', 'smart-presence'],
  },
  full_stack: {
    label: 'Full-Stack Developer',
    headline: 'Full-Stack Systems Developer | Python, Flask, REST APIs, SQL & Modern UI',
    summary:
      'Results-driven Full-Stack Developer specializing in secure client-server architectures, TOTP authentication, Haversine geospatial calculations, and responsive web applications. Experienced in PostgreSQL/MongoDB database design and CI/CD pipelines.',
    topSkills: ['Python', 'JavaScript/TypeScript', 'Flask', 'REST APIs', 'PostgreSQL', 'MongoDB', 'HTML5/CSS3', 'Git CI/CD'],
    priorityProjects: ['smart-presence', 'ai-assistant', 'spark-mobile'],
  },
  mobile_dev: {
    label: 'Mobile App Developer',
    headline: 'React Native & Mobile Engineer | Expo Architecture & Interactive UX',
    summary:
      'Mobile Application Developer skilled in React Native, Expo EAS workflows, 60fps gesture physics, and cross-platform Android/iOS architectures. Built Spark dating app featuring real-time state management, instant APK downloads, and responsive design.',
    topSkills: ['React Native', 'Expo & EAS', 'TypeScript', 'Redux Toolkit', 'Mobile UI/UX', 'REST API Integration', 'Android APK Packaging'],
    priorityProjects: ['spark-mobile', 'smart-presence'],
  },
};
