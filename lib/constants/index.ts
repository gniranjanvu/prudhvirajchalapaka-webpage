export const OWNER_INFO = {
  name: 'Prudhvi Raj Chalapaka',
  title: 'Robotics & Automation Engineer',
  email: 'prudhvirajchalapaka07@gmail.com',
  phone: '+91 7995511692',
  location: 'Guntur, India',
  website: 'prudhvirajchalapaka.in',
  linkedin: 'prudhvirajchalapaka',
  github: 'prudhvirajchalapaka',
  bio: `Ambitious Robotics & Automation Engineer with strong foundation in ROS/ROS2, Industrial Automation and autonomous navigation. Proven research capability with Elsevier publication on robotic surgery and pharmacotherapy.`,
}

export const ROLES = [
  'Robotics Engineer',
  'ROS Developer',
  'Automation Engineer',
  'Embedded Systems Developer',
  'AI/ML Enthusiast',
]

export const HERO_STICKERS = [
  '#ROS2',
  '#Embedded',
  '#AI',
  '#PLC',
  '#Debugging',
  '#NavStack',
  '#Gazebo',
  '#Computer Vision',
]

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Publications', href: '#publications' },
  { label: 'Contact', href: '#contact' },
]

export const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    url: `https://linkedin.com/in/${OWNER_INFO.linkedin}`,
    icon: 'linkedin',
  },
  {
    name: 'GitHub',
    url: `https://github.com/${OWNER_INFO.github}`,
    icon: 'github',
  },
  {
    name: 'Email',
    url: `mailto:${OWNER_INFO.email}`,
    icon: 'mail',
  },
]

export const PROJECT_TYPES = [
  'Robotics',
  'Web Development',
  'Mobile App',
  'IoT',
  'AI/ML',
  'Automation',
  'Research',
  'Other',
]

export const SKILL_CATEGORIES = [
  { id: 'programming', name: 'Programming Languages', icon: 'code' },
  { id: 'frameworks', name: 'Frameworks & Libraries', icon: 'layers' },
  { id: 'hardware', name: 'Hardware & Boards', icon: 'cpu' },
  { id: 'tools', name: 'Tools & Software', icon: 'wrench' },
  { id: 'cad', name: 'CAD/CAM', icon: 'box' },
  { id: 'technologies', name: 'Technologies', icon: 'zap' },
]

export const ACHIEVEMENT_TYPES = [
  { value: 'award', label: 'Award', icon: 'award' },
  { value: 'recognition', label: 'Recognition', icon: 'star' },
  { value: 'competition', label: 'Competition', icon: 'trophy' },
  { value: 'leadership', label: 'Leadership', icon: 'users' },
  { value: 'milestone', label: 'Milestone', icon: 'flag' },
]

export const PUBLICATION_TYPES = [
  { value: 'journal', label: 'Journal' },
  { value: 'conference', label: 'Conference' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'preprint', label: 'Preprint' },
]

export const OTP_CONFIG = {
  length: 6,
  expiryMinutes: 5,
  maxAttempts: 3,
}

export const SESSION_CONFIG = {
  durationHours: 24,
}

export const PAGINATION_CONFIG = {
  defaultPerPage: 10,
  maxPerPage: 100,
}
