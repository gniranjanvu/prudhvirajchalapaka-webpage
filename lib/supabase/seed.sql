-- Seed data for Prudhvi Raj Chalapaka's portfolio

-- Insert skill categories
INSERT INTO skill_categories (id, name, slug, icon, "order") VALUES
('a1b2c3d4-e5f6-4a4a-8b8b-1c1c1c1c1c1c', 'Programming Languages', 'programming-languages', 'code', 1),
('b2c3d4e5-f6a1-4b4b-9c9c-2d2d2d2d2d2d', 'Frameworks & Libraries', 'frameworks-libraries', 'layers', 2),
('c3d4e5f6-a1b2-4c4c-0d0d-3e3e3e3e3e3e', 'Hardware & Boards', 'hardware-boards', 'cpu', 3),
('d4e5f6a1-b2c3-4d4d-1e1e-4f4f4f4f4f4f', 'Tools & Software', 'tools-software', 'wrench', 4),
('e5f6a1b2-c3d4-4e4e-2f2f-5a5a5a5a5a5a', 'CAD/CAM', 'cad-cam', 'box', 5),
('f6a1b2c3-d4e5-4f4f-3a3a-6b6b6b6b6b6b', 'Technologies', 'technologies', 'zap', 6);

-- Insert skills
INSERT INTO skills (name, category_id, rating, "order") VALUES
-- Programming Languages
('Python', 'a1b2c3d4-e5f6-4a4a-8b8b-1c1c1c1c1c1c', 5, 1),
('C', 'a1b2c3d4-e5f6-4a4a-8b8b-1c1c1c1c1c1c', 5, 2),
('C++', 'a1b2c3d4-e5f6-4a4a-8b8b-1c1c1c1c1c1c', 4, 3),
('MATLAB', 'a1b2c3d4-e5f6-4a4a-8b8b-1c1c1c1c1c1c', 4, 4),
('Java', 'a1b2c3d4-e5f6-4a4a-8b8b-1c1c1c1c1c1c', 2, 5),

-- Frameworks & Libraries
('ROS', 'b2c3d4e5-f6a1-4b4b-9c9c-2d2d2d2d2d2d', 5, 1),
('ROS2', 'b2c3d4e5-f6a1-4b4b-9c9c-2d2d2d2d2d2d', 5, 2),
('YOLO', 'b2c3d4e5-f6a1-4b4b-9c9c-2d2d2d2d2d2d', 4, 3),
('TensorFlow', 'b2c3d4e5-f6a1-4b4b-9c9c-2d2d2d2d2d2d', 3, 4),
('Arduino', 'b2c3d4e5-f6a1-4b4b-9c9c-2d2d2d2d2d2d', 5, 5),
('Isaac Sim', 'b2c3d4e5-f6a1-4b4b-9c9c-2d2d2d2d2d2d', 3, 6),

-- Hardware & Boards
('Arduino', 'c3d4e5f6-a1b2-4c4c-0d0d-3e3e3e3e3e3e', 5, 1),
('Raspberry Pi', 'c3d4e5f6-a1b2-4c4c-0d0d-3e3e3e3e3e3e', 4, 2),
('STM32', 'c3d4e5f6-a1b2-4c4c-0d0d-3e3e3e3e3e3e', 3, 3),
('FPGA', 'c3d4e5f6-a1b2-4c4c-0d0d-3e3e3e3e3e3e', 2, 4),
('Jetson Nano', 'c3d4e5f6-a1b2-4c4c-0d0d-3e3e3e3e3e3e', 4, 5),

-- Tools & Software
('Git', 'd4e5f6a1-b2c3-4d4d-1e1e-4f4f4f4f4f4f', 4, 1),
('Linux', 'd4e5f6a1-b2c3-4d4d-1e1e-4f4f4f4f4f4f', 5, 2),
('Gazebo', 'd4e5f6a1-b2c3-4d4d-1e1e-4f4f4f4f4f4f', 5, 3),
('Webots', 'd4e5f6a1-b2c3-4d4d-1e1e-4f4f4f4f4f4f', 4, 4),
('TIA Portal', 'd4e5f6a1-b2c3-4d4d-1e1e-4f4f4f4f4f4f', 3, 5),
('ROBOGUIDE', 'd4e5f6a1-b2c3-4d4d-1e1e-4f4f4f4f4f4f', 3, 6),

-- CAD/CAM
('SolidWorks', 'e5f6a1b2-c3d4-4e4e-2f2f-5a5a5a5a5a5a', 4, 1),
('Fusion 360', 'e5f6a1b2-c3d4-4e4e-2f2f-5a5a5a5a5a5a', 5, 2),
('NX CAD', 'e5f6a1b2-c3d4-4e4e-2f2f-5a5a5a5a5a5a', 3, 3),

-- Technologies
('CNC', 'f6a1b2c3-d4e5-4f4f-3a3a-6b6b6b6b6b6b', 3, 1),
('3D Printing', 'f6a1b2c3-d4e5-4f4f-3a3a-6b6b6b6b6b6b', 5, 2),
('PLCs', 'f6a1b2c3-d4e5-4f4f-3a3a-6b6b6b6b6b6b', 4, 3);

-- Insert experiences
INSERT INTO experiences (slug, role, company, location, start_date, end_date, is_current, description, technologies, achievements, published, "order") VALUES
('robotics-engineer-intern-karthikesh', 
 'Robotics Engineer Intern', 
 'Karthikesh Robotics', 
 'Chennai, India',
 '2025-05-01',
 '2025-11-30',
 false,
 'Working on advanced robotics projects involving ROS2, autonomous navigation, and industrial automation systems.',
 ARRAY['ROS2', 'Python', 'C++', 'NavStack', 'Gazebo', 'Linux'],
 ARRAY['Developed autonomous navigation solutions', 'Implemented path planning algorithms', 'Integrated sensors and actuators'],
 true,
 1),
 
('teaching-assistant-vignans', 
 'Teaching Assistantship Intern', 
 'Vignans University', 
 'Guntur, India',
 '2025-01-01',
 '2025-04-30',
 false,
 'Assisted in teaching robotics and automation courses, mentored students in ROS and embedded systems projects.',
 ARRAY['ROS', 'Arduino', 'Python', 'Teaching', 'Mentoring'],
 ARRAY['Mentored 20+ students in robotics projects', 'Conducted practical sessions on ROS', 'Assisted in lab setup and maintenance'],
 true,
 2),
 
('ros-intern-karthikesh', 
 'ROS Intern', 
 'Karthikesh Robotics', 
 'Online',
 '2025-01-01',
 '2025-02-28',
 false,
 'Focused on learning and implementing ROS (Robot Operating System) concepts and developing ROS-based applications.',
 ARRAY['ROS', 'ROS2', 'Python', 'C++', 'Gazebo'],
 ARRAY['Completed ROS training program', 'Built multiple ROS packages', 'Implemented sensor integration'],
 true,
 3);

-- Insert education
INSERT INTO education (slug, degree, major, institution, location, start_date, end_date, is_current, grade, description, achievements, published, "order") VALUES
('btech-robotics-vignans',
 'B.Tech',
 'Robotics & Automation',
 'Vignans University',
 'Guntur, India',
 '2021-09-01',
 '2025-06-30',
 false,
 'CGPA: 7.62/10',
 'Comprehensive program covering robotics, automation, control systems, and industrial automation with focus on ROS/ROS2 and embedded systems.',
 ARRAY['Published research paper in Elsevier', 'Vice-President of Robotics Club (SPARC)', 'Multiple project awards and recognitions'],
 true,
 1),
 
('intermediate-nri',
 'Intermediate (MPC)',
 'Mathematics, Physics, Chemistry',
 'NRI Junior College',
 'Guntur, India',
 '2019-06-01',
 '2021-05-31',
 false,
 '804/1000',
 'Pre-university education with focus on Mathematics, Physics, and Chemistry.',
 ARRAY[],
 true,
 2),
 
('ssc-gretnaltes',
 'SSC (10th Grade)',
 null,
 'Gretnaltes Public School',
 'Guntur, India',
 '2018-06-01',
 '2019-05-31',
 false,
 'GPA: 9.2/10',
 'Secondary school education with strong academic performance.',
 ARRAY[],
 true,
 3);

-- Insert project categories
INSERT INTO project_categories (id, name, slug, description) VALUES
('p1a2b3c4-d5e6-4f7a-8b9c-0d1e2f3a4b5c', 'Robotics', 'robotics', 'Robotics and autonomous systems projects'),
('p2b3c4d5-e6f7-4a8b-9c0d-1e2f3a4b5c6d', 'Automation', 'automation', 'Industrial automation and control systems'),
('p3c4d5e6-f7a8-4b9c-0d1e-2f3a4b5c6d7e', 'Embedded', 'embedded', 'Embedded systems and hardware projects');

-- Insert projects
INSERT INTO projects (slug, title, description, long_description, category_id, technologies, features, github_url, is_featured, published, "order") VALUES
('iravath-autonomous-rover',
 'Iravath - Autonomous Rover',
 'Advanced autonomous rover with ROS, NavStack, and ML capabilities for outdoor navigation.',
 'Iravath is a sophisticated autonomous rover designed for outdoor navigation using ROS, NavStack, and machine learning. The rover features advanced path planning, obstacle avoidance, and real-time decision-making capabilities powered by Jetson Nano.',
 'p1a2b3c4-d5e6-4f7a-8b9c-0d1e2f3a4b5c',
 ARRAY['ROS', 'NavStack', 'Jetson Nano', 'Python', 'C++', 'Machine Learning', 'OpenCV'],
 ARRAY['Autonomous navigation', 'Real-time path planning', 'Obstacle detection and avoidance', 'ML-based decision making', 'Sensor fusion'],
 'https://github.com/prudhvirajchalapaka',
 true,
 true,
 1),
 
('dwa-local-planner',
 'DWA Local Planner',
 'Implementation of Dynamic Window Approach for local path planning in ROS2.',
 'Custom implementation of the Dynamic Window Approach (DWA) algorithm for local path planning in ROS2. This project demonstrates advanced understanding of motion planning and control for mobile robots.',
 'p1a2b3c4-d5e6-4f7a-8b9c-0d1e2f3a4b5c',
 ARRAY['ROS2', 'C++', 'Python', 'Gazebo', 'RViz'],
 ARRAY['DWA algorithm implementation', 'Real-time trajectory generation', 'Collision avoidance', 'Simulation in Gazebo'],
 'https://github.com/prudhvirajchalapaka',
 true,
 true,
 2),
 
('mecanum-wheeled-robot',
 'Mecanum Wheeled Mobile Robot',
 'Omnidirectional mobile robot with mecanum wheels controlled via Arduino and ROS.',
 'A mecanum wheeled mobile robot capable of omnidirectional movement. The robot is controlled using Arduino and integrated with ROS for advanced control and navigation capabilities. Simulated in Gazebo for testing and validation.',
 'p1a2b3c4-d5e6-4f7a-8b9c-0d1e2f3a4b5c',
 ARRAY['Arduino', 'ROS', 'Gazebo', 'C++', 'Python'],
 ARRAY['Omnidirectional movement', 'ROS integration', 'Gazebo simulation', 'Custom motor control'],
 'https://github.com/prudhvirajchalapaka',
 false,
 true,
 3),
 
('modular-manufacturing-system',
 'Modular Manufacturing System',
 'Industrial automation system using pneumatics, PLC, and Arduino for modular manufacturing.',
 'A comprehensive modular manufacturing system demonstrating industrial automation principles. The system uses pneumatic actuators controlled by PLC and Arduino, showcasing integration of different automation technologies.',
 'p2b3c4d5-e6f7-4a8b-9c0d-1e2f3a4b5c6d',
 ARRAY['PLC', 'Arduino', 'Pneumatics', 'TIA Portal', 'Ladder Logic'],
 ARRAY['Modular design', 'PLC programming', 'Pneumatic control', 'Industrial automation'],
 null,
 true,
 true,
 4),
 
('6dof-robotic-arm',
 '6DOF Robotic Arm',
 'Six degrees of freedom robotic arm with custom PCB and Android control.',
 'A 6-axis robotic arm designed and built from scratch. Features custom PCB design, Arduino-based control system, and Android app for wireless control. Demonstrates mechanical design, electronics, and software integration.',
 'p3c4d5e6-f7a8-4b9c-0d1e-2f3a4b5c6d7e',
 ARRAY['Arduino', 'Android', 'PCB Design', 'Servo Motors', 'Java'],
 ARRAY['6 degrees of freedom', 'Custom PCB', 'Android app control', 'Inverse kinematics'],
 null,
 false,
 true,
 5);

-- Insert achievements
INSERT INTO achievements (title, description, date, issuer, type, published, "order") VALUES
('Vice-President of Robotics Club',
 'Appointed as Vice-President of SPARC (Robotics Club) at Vignans University. Led team initiatives, organized workshops, and mentored junior students in robotics projects.',
 '2024-01-15',
 'SPARC - Vignans University',
 'leadership',
 true,
 1),
 
('Outstanding Student Publication Award',
 'Received Outstanding Student Publication Award for research paper on "Integrating robotic surgery and pharmacotherapy: A dual approach to lung cancer management" published in Elsevier.',
 '2024-01-10',
 'Elsevier',
 'award',
 true,
 2),
 
('First Prize - Project Presentation',
 'Won first prize in project presentation competition at Srujanankura technical fest for innovative robotics project.',
 '2024-03-20',
 'Srujanankura',
 'competition',
 true,
 3),
 
('JASC 2024 - Top 5',
 'Secured position in Top 5 at JASC 2024 (Janatics Automation System Competition) for excellence in automation system design.',
 '2024-11-15',
 'Janatics',
 'competition',
 true,
 4);

-- Insert publications
INSERT INTO publications (title, authors, venue, publication_type, date, abstract, url, published, "order") VALUES
('Integrating robotic surgery and pharmacotherapy: A dual approach to lung cancer management',
 ARRAY['Prudhvi Raj Chalapaka', 'Co-authors'],
 'Elsevier',
 'journal',
 '2024-01-01',
 'This research paper explores the integration of robotic surgery and pharmacotherapy as a dual approach to lung cancer management. The study demonstrates how combining advanced surgical robotics with targeted drug therapy can improve patient outcomes and treatment efficacy.',
 'https://www.elsevier.com',
 true,
 1);

-- Insert certifications
INSERT INTO certifications (title, issuer, issue_date, credential_url, description, published, "order") VALUES
('ROS 2 For Beginners',
 'Udemy',
 '2024-06-15',
 'https://udemy.com',
 'Comprehensive course on Robot Operating System 2 (ROS2) covering fundamentals, publishers/subscribers, services, and action servers.',
 true,
 1),
 
('Python (Basic)',
 'HackerRank',
 '2023-09-20',
 'https://hackerrank.com',
 'Certification demonstrating proficiency in Python programming fundamentals.',
 true,
 2),
 
('Business English Certificate',
 'Cambridge',
 '2023-12-10',
 'https://cambridge.org',
 'Cambridge Business English Certification for professional communication.',
 true,
 3),
 
('OpenCV Bootcamp',
 'OpenCV University',
 '2024-02-28',
 'https://opencv.org',
 'Intensive bootcamp on computer vision using OpenCV library.',
 true,
 4),
 
('Problem Solving',
 'HackerRank',
 '2023-10-15',
 'https://hackerrank.com',
 'Certification in data structures and algorithms problem solving.',
 true,
 5),
 
('Metal Additive Manufacturing',
 'NPTEL',
 '2024-04-20',
 'https://nptel.ac.in',
 'Course on metal 3D printing and additive manufacturing technologies.',
 true,
 6),
 
('Data Analyst',
 'Accenture',
 '2023-11-30',
 'https://accenture.com',
 'Data analytics and visualization certification.',
 true,
 7),
 
('Front-End Development',
 'FreeCodeCamp',
 '2023-08-15',
 'https://freecodecamp.org',
 'Certification in HTML, CSS, JavaScript, and responsive web design.',
 true,
 8),
 
('Fusion 360 CAD',
 'Aylin',
 '2024-01-25',
 'https://aylin.com',
 'Autodesk Fusion 360 CAD design certification.',
 true,
 9),
 
('Siemens NX CAD',
 'Aylin',
 '2024-03-10',
 'https://aylin.com',
 'Siemens NX CAD software proficiency certification.',
 true,
 10),
 
('Pneumatics & Automation',
 'Janatics',
 '2024-05-18',
 'https://janatics.com',
 'Industrial pneumatics and automation systems certification.',
 true,
 11);

-- Insert default site settings
INSERT INTO site_settings (key, value, type) VALUES
('site_title', '"Prudhvi Raj Chalapaka - Robotics & Automation Engineer"', 'string'),
('site_description', '"Personal portfolio website of Prudhvi Raj Chalapaka, Robotics & Automation Engineer"', 'string'),
('contact_email', '"prudhvirajchalapaka07@gmail.com"', 'string'),
('contact_phone', '"+91 7995511692"', 'string'),
('linkedin_url', '"https://linkedin.com/in/prudhvirajchalapaka"', 'string'),
('github_url', '"https://github.com/prudhvirajchalapaka"', 'string'),
('show_contact_form', 'true', 'boolean'),
('enable_comments', 'true', 'boolean'),
('enable_likes', 'true', 'boolean');
