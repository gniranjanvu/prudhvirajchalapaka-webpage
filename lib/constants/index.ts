export const OWNER_INFO = {
  name: 'Prudhvi Raj Chalapaka',
  title: 'Robotics & Automation Engineer',
  email: 'prudhvirajchalapaka07@gmail.com',
  phone: '+91 7995511692',
  location: 'Guntur, India',
  website: 'prudhvirajchalapaka.in',
  linkedin: 'prudhvirajchalapaka',
  github: 'prudhvirajchalapaka',
  bio: `Ambitious Robotics & Automation Engineer with strong foundation in ROS/ROS2, Industrial Automation and autonomous navigation. Proven research capability with Elsevier publication on robotic surgery and pharmacotherapy. Combining hands-on experience in simulation (Gazebo/Webots) and embedded systems, I aim to advance the field of autonomy technologies through rigorous academic research and practical innovation.`,
}

export const ROLES = [
  'Robotics & Automation Engineer',
  'ROS/ROS2 Developer',
  'Industrial Automation Specialist',
  'Research Enthusiast',
  'Embedded Systems Developer',
]

export const HERO_STICKERS = [
  '#ROS2 🤖',
  '#Embedded ⚡',
  '#AI 🧠',
  '#PLC 🔧',
  '#Debugging 🐛',
  '#NavStack 🗺️',
  '#Gazebo 🌐',
  '#Computer Vision 👁️',
]

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Certifications', href: '#certifications' },
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

// Default data from resume

export const EXPERIENCES = [
  {
    id: 1,
    role: 'Robotics Engineer Intern',
    company: 'Karthikesh Robotics',
    location: 'Chennai, India',
    startDate: 'May 2025',
    endDate: 'Nov 2025',
    isCurrent: true,
    description: 'Working on advanced robotics projects involving ROS2, autonomous navigation, and industrial automation systems. Developing solutions for mobile robots and implementing NavStack for navigation.',
    technologies: ['ROS2', 'Python', 'C++', 'NavStack', 'Gazebo', 'SLAM'],
    type: 'internship',
  },
  {
    id: 2,
    role: 'Teaching Assistantship Intern',
    company: "Vignan's University",
    location: 'Guntur, India',
    startDate: 'Jan 2025',
    endDate: 'Apr 2025',
    isCurrent: false,
    description: 'Assisted in teaching robotics and automation courses. Mentored students in ROS and embedded systems projects. Conducted lab sessions and helped with curriculum development.',
    technologies: ['ROS', 'Arduino', 'Python', 'Teaching', 'Mentoring'],
    type: 'internship',
  },
  {
    id: 3,
    role: 'ROS Intern',
    company: 'Karthikesh Robotics',
    location: 'Online',
    startDate: 'Jan 2025',
    endDate: 'Feb 2025',
    isCurrent: false,
    description: 'Focused on learning and implementing ROS concepts. Developed ROS-based applications and worked on simulation environments using Gazebo.',
    technologies: ['ROS', 'ROS2', 'Python', 'Gazebo', 'Linux'],
    type: 'internship',
  },
]

export const EDUCATION = [
  {
    id: 1,
    degree: 'Bachelor of Technology',
    field: 'Electronics and Communication Engineering',
    institution: "Vignan's Foundation for Science, Technology & Research",
    location: 'Guntur, India',
    startDate: '2021',
    endDate: '2025',
    isCurrent: true,
    grade: 'CGPA: 8.5/10',
    description: 'Specializing in Robotics and Embedded Systems. Active member of the Robotics Club and Research Cell.',
    highlights: [
      'Specialization in Robotics & Automation',
      'Member of Robotics Club',
      'Research Cell Member',
      'Technical Event Organizer',
    ],
  },
  {
    id: 2,
    degree: 'Intermediate (12th Grade)',
    field: 'MPC (Mathematics, Physics, Chemistry)',
    institution: 'Narayana Junior College',
    location: 'Guntur, India',
    startDate: '2019',
    endDate: '2021',
    isCurrent: false,
    grade: '95%',
    description: 'Completed intermediate education with focus on science and mathematics.',
    highlights: [
      'Top performer in Mathematics',
      'Science Olympiad participant',
    ],
  },
]

export const PROJECTS = [
  {
    id: 1,
    title: 'Autonomous Mobile Robot (AMR)',
    slug: 'autonomous-mobile-robot',
    description: 'Developed an autonomous mobile robot using ROS2 with SLAM and navigation capabilities. The robot can map unknown environments and navigate autonomously.',
    longDescription: 'A fully autonomous mobile robot platform built using ROS2. Features include simultaneous localization and mapping (SLAM), path planning, obstacle avoidance, and autonomous navigation. The project uses LiDAR sensors for mapping and a depth camera for obstacle detection.',
    technologies: ['ROS2', 'Python', 'C++', 'SLAM', 'NavStack', 'Gazebo'],
    category: 'Robotics',
    featured: true,
    image: '/images/projects/amr.jpg',
    github: 'https://github.com/prudhvirajchalapaka/amr-ros2',
    demo: '',
    status: 'completed',
  },
  {
    id: 2,
    title: 'Industrial PLC Automation System',
    slug: 'plc-automation-system',
    description: 'Designed and implemented PLC-based automation system for manufacturing line. Includes HMI interface and SCADA integration.',
    longDescription: 'A comprehensive industrial automation solution using Siemens PLCs. The system automates a complete manufacturing line with multiple stations, conveyor systems, and robotic arms. Features real-time monitoring through SCADA and touchscreen HMI panels.',
    technologies: ['Siemens PLC', 'Ladder Logic', 'HMI', 'SCADA', 'Industrial IoT'],
    category: 'Automation',
    featured: true,
    image: '/images/projects/plc.jpg',
    github: '',
    demo: '',
    status: 'completed',
  },
  {
    id: 3,
    title: 'Computer Vision Quality Inspection',
    slug: 'cv-quality-inspection',
    description: 'Machine learning-based quality inspection system using computer vision for detecting manufacturing defects.',
    longDescription: 'An AI-powered quality inspection system that uses deep learning models for real-time defect detection in manufacturing. The system processes images from industrial cameras and classifies defects with high accuracy.',
    technologies: ['Python', 'OpenCV', 'TensorFlow', 'YOLOv8', 'Edge AI'],
    category: 'AI/ML',
    featured: true,
    image: '/images/projects/cv.jpg',
    github: 'https://github.com/prudhvirajchalapaka/cv-inspection',
    demo: '',
    status: 'completed',
  },
  {
    id: 4,
    title: 'Robotic Arm Control System',
    slug: 'robotic-arm-control',
    description: '6-DOF robotic arm with inverse kinematics control and trajectory planning using MoveIt2.',
    longDescription: 'A 6 degrees of freedom robotic arm project featuring forward and inverse kinematics, motion planning using MoveIt2, and real-time control through ROS2. The arm can perform pick-and-place operations with high precision.',
    technologies: ['ROS2', 'MoveIt2', 'Python', 'Inverse Kinematics', 'Motion Planning'],
    category: 'Robotics',
    featured: false,
    image: '/images/projects/arm.jpg',
    github: 'https://github.com/prudhvirajchalapaka/robotic-arm',
    demo: '',
    status: 'in-progress',
  },
  {
    id: 5,
    title: 'IoT-based Smart Agriculture',
    slug: 'smart-agriculture',
    description: 'Smart farming solution with automated irrigation, soil monitoring, and crop health prediction.',
    longDescription: 'An IoT-based smart agriculture system that monitors soil conditions, weather data, and plant health. Features automated irrigation, fertilizer dispensing, and AI-based crop disease prediction.',
    technologies: ['Arduino', 'ESP32', 'Python', 'MQTT', 'Machine Learning'],
    category: 'IoT',
    featured: false,
    image: '/images/projects/agriculture.jpg',
    github: 'https://github.com/prudhvirajchalapaka/smart-agri',
    demo: '',
    status: 'completed',
  },
  {
    id: 6,
    title: 'Drone Navigation System',
    slug: 'drone-navigation',
    description: 'Autonomous drone navigation using GPS waypoints and computer vision for obstacle avoidance.',
    longDescription: 'A drone navigation project featuring autonomous flight using GPS waypoints, real-time obstacle avoidance using depth cameras, and mission planning capabilities. Built using PX4 and ROS2.',
    technologies: ['PX4', 'ROS2', 'Computer Vision', 'GPS', 'Python'],
    category: 'Robotics',
    featured: false,
    image: '/images/projects/drone.jpg',
    github: '',
    demo: '',
    status: 'in-progress',
  },
]

export const SKILLS = [
  // Programming Languages
  { id: 1, name: 'Python', category: 'programming', level: 90, icon: 'python' },
  { id: 2, name: 'C++', category: 'programming', level: 85, icon: 'cpp' },
  { id: 3, name: 'C', category: 'programming', level: 80, icon: 'c' },
  { id: 4, name: 'JavaScript', category: 'programming', level: 70, icon: 'javascript' },
  { id: 5, name: 'MATLAB', category: 'programming', level: 75, icon: 'matlab' },

  // Frameworks & Libraries
  { id: 6, name: 'ROS/ROS2', category: 'frameworks', level: 90, icon: 'ros' },
  { id: 7, name: 'NavStack', category: 'frameworks', level: 85, icon: 'nav' },
  { id: 8, name: 'OpenCV', category: 'frameworks', level: 80, icon: 'opencv' },
  { id: 9, name: 'TensorFlow', category: 'frameworks', level: 75, icon: 'tensorflow' },
  { id: 10, name: 'MoveIt2', category: 'frameworks', level: 70, icon: 'moveit' },

  // Hardware & Boards
  { id: 11, name: 'Arduino', category: 'hardware', level: 90, icon: 'arduino' },
  { id: 12, name: 'Raspberry Pi', category: 'hardware', level: 85, icon: 'raspberrypi' },
  { id: 13, name: 'ESP32', category: 'hardware', level: 85, icon: 'esp32' },
  { id: 14, name: 'STM32', category: 'hardware', level: 75, icon: 'stm32' },
  { id: 15, name: 'NVIDIA Jetson', category: 'hardware', level: 70, icon: 'nvidia' },

  // Tools & Software
  { id: 16, name: 'Gazebo', category: 'tools', level: 85, icon: 'gazebo' },
  { id: 17, name: 'Git/GitHub', category: 'tools', level: 90, icon: 'git' },
  { id: 18, name: 'Linux', category: 'tools', level: 90, icon: 'linux' },
  { id: 19, name: 'Docker', category: 'tools', level: 75, icon: 'docker' },
  { id: 20, name: 'VS Code', category: 'tools', level: 90, icon: 'vscode' },

  // CAD/CAM
  { id: 21, name: 'SolidWorks', category: 'cad', level: 80, icon: 'solidworks' },
  { id: 22, name: 'Fusion 360', category: 'cad', level: 75, icon: 'fusion' },
  { id: 23, name: 'AutoCAD', category: 'cad', level: 70, icon: 'autocad' },

  // Technologies
  { id: 24, name: 'SLAM', category: 'technologies', level: 80, icon: 'slam' },
  { id: 25, name: 'Computer Vision', category: 'technologies', level: 80, icon: 'vision' },
  { id: 26, name: 'Machine Learning', category: 'technologies', level: 75, icon: 'ml' },
  { id: 27, name: 'Industrial IoT', category: 'technologies', level: 80, icon: 'iiot' },
  { id: 28, name: 'PLC Programming', category: 'technologies', level: 85, icon: 'plc' },
]

export const ACHIEVEMENTS = [
  {
    id: 1,
    title: 'Elsevier Publication',
    type: 'recognition',
    date: '2024',
    description: 'Published research paper on integrating robotic surgery and pharmacotherapy in Elsevier journal.',
    organization: 'Elsevier',
    icon: 'book',
  },
  {
    id: 2,
    title: 'Robotics Club Lead',
    type: 'leadership',
    date: '2023-2024',
    description: 'Led the university robotics club, organized workshops and technical events.',
    organization: "Vignan's University",
    icon: 'users',
  },
  {
    id: 3,
    title: 'Smart India Hackathon Finalist',
    type: 'competition',
    date: '2023',
    description: 'Reached finals in Smart India Hackathon with industrial automation project.',
    organization: 'Government of India',
    icon: 'trophy',
  },
  {
    id: 4,
    title: 'IEEE Paper Presentation',
    type: 'recognition',
    date: '2024',
    description: 'Presented research paper at IEEE conference on autonomous navigation.',
    organization: 'IEEE',
    icon: 'award',
  },
  {
    id: 5,
    title: 'Technical Event Winner',
    type: 'competition',
    date: '2023',
    description: 'Won first place in inter-college robotics competition.',
    organization: 'JNTU Kakinada',
    icon: 'trophy',
  },
]

export const PUBLICATIONS = [
  {
    id: 1,
    title: 'Integration of Robotic Surgery and Pharmacotherapy: A Comprehensive Review',
    authors: ['Prudhvi Raj Chalapaka', 'Dr. XYZ', 'Prof. ABC'],
    journal: 'Elsevier - Procedia Computer Science',
    year: 2024,
    doi: '10.1016/j.procs.2024.xxx',
    abstract: 'This paper presents a comprehensive review of integrating robotic surgery systems with pharmacotherapy protocols. We explore the synergies between precise robotic interventions and targeted drug delivery systems.',
    type: 'journal',
    link: '',
    citations: 5,
  },
  {
    id: 2,
    title: 'Autonomous Navigation in Dynamic Environments using ROS2',
    authors: ['Prudhvi Raj Chalapaka'],
    journal: 'IEEE Conference Proceedings',
    year: 2024,
    doi: '',
    abstract: 'A novel approach to autonomous robot navigation in dynamic environments using ROS2 and advanced SLAM techniques. The paper presents improvements in real-time obstacle avoidance and path planning.',
    type: 'conference',
    link: '',
    citations: 2,
  },
]

export const CERTIFICATIONS = [
  {
    id: 1,
    title: 'ROS2 Developer Certification',
    issuer: 'The Construct',
    date: '2024',
    credentialId: 'ROS2-2024-XXXXX',
    link: '',
  },
  {
    id: 2,
    title: 'Machine Learning Specialization',
    issuer: 'Coursera - Stanford University',
    date: '2023',
    credentialId: 'ML-STANFORD-XXXXX',
    link: '',
  },
  {
    id: 3,
    title: 'Industrial Automation with PLCs',
    issuer: 'Udemy',
    date: '2023',
    credentialId: 'PLC-UDEMY-XXXXX',
    link: '',
  },
]
