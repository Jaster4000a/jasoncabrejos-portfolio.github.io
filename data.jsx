// All project + page data sourced from Jason's resume + PortfolioV4 deck
const PROJECTS = [
  {
    id: 'bnsf',
    title: 'BNSF — Real-Time Inventory Tracking',
    role: 'Robotic Embedded SW Engineer',
    year: '2023 — Present',
    tags: ['IoT', 'Jetson', 'Docker', 'Azure', 'GPS+RTK', 'ML Vision'],
    blurb: [
      '• Implemented a low-cost real-time inventory tracking system for under $10K per unit, merging IoT, Networking, Power over Ethernet (PoE), and edge computing using the Nvidia Jetson',
      '• Achieved 92% accuracy at production scale by integrating GPS, RTK, and Machine Vision models — saving ~$5M per year',
      '• Scaled to multiple hardware stacks nationwide using Docker and Azure IoT Hub to manage the fleet',
    ].join('\n'),
    image: 'uploads/projects/inventoryTrackingSystem-BNSF/Thumbnail.jpg',
    featured: true,
    prize: null,
    media: [
      { type: 'image',   src: 'uploads/projects/inventoryTrackingSystem-BNSF/Thumbnail.jpg',          caption: 'Thumbnail' },
      { type: 'image',   src: 'uploads/projects/inventoryTrackingSystem-BNSF/friendlyAlex.jpg',                   caption: 'Hey, that Alex guy seems pretty friendly' }
    ],
  },
  {
    id: 'trackathon',
    title: 'BNSF Trackathon — Predictive Track Health',
    role: 'Pitch + ML model',
    year: '2023',
    tags: ['ML', 'Big Data', 'Business Pitch'],
    blurb: [
      '• Pitched and conceptualized a Machine Learning Model that predicts track health based on existing track maintenance data.',
      '• The goal being to preemptively identify when repairs or inspections are needed, reducing Infrastructure-Related Service Interruptions.',
      '• Created the financial pitch and project timeline for the product to come to market'
    ].join('\n'),
    image: 'uploads/projects/trackathon/Thumbnail.jpg',
    featured: false,
    prize: '1st Place',
  },
  {
    id: 'nissan',
    title: 'SHPE Nissan Design Challenge — Eagle Eye',
    role: 'Team Lead (3)',
    year: '2022',
    tags: ['Pitch', 'Camera Vision', 'Auto Safety'],
    blurb: [
      '• Selective application process, only 24 students were chosen to compete',
      '• Lead a team of 3 to pitch an idea to improve infant/child safety for Nissan/Infiniti Vehicles',
      '• Pitched a camera that would pick up excessive movement in the backseat and alert the driver to prevent them from constantly turning around to check on children, leading to safer driving and reduced distracted driving.'
    ].join('\n'),
    image: 'uploads/projects/nissan/Thumbnail.jpg',
    featured: true,
    prize: '1st Place — Grand Prize',
    media: [
      { type: 'image', src: 'uploads/projects/nissan/Thumbnail.jpg', caption: 'Thumbnail' },
      { type: 'slides', src: 'https://docs.google.com/presentation/d/e/2PACX-1vTB3f5C1cbuD6yLVTwDCYjg8nfEPVLCbCoywjmPs0tGdJ-FGnBvGJvQZLtupVMY6_q5ke5DP88Q0EZl/pubembed?start=false&loop=false&delayms=3000', caption: 'Eagle Eye Pitch Deck' },
    ],
  },
  {
    id: 'rover-pres',
    title: 'UTA Rover Team — President',
    role: 'President / Arm Captain / Member',
    year: '2017 — 2021',
    tags: ['Team of 30', 'URC', 'SolidWorks', 'Arduino'],
    blurb: 'Led 30 students to the University Rover Challenge — 15th of 88 teams. Designed a 5-DOF arm with a PID joint-space controller (±0.4 in).',
    image: 'uploads/projects/roverTeam/Thumbnail.jpg',
    featured: true,
    prize: null,
    media: [
      { type: 'image',   src: 'uploads/projects/roverTeam/Thumbnail.jpg',          caption: 'UTA Rover Team' },
      { type: 'youtube', src: 'https://www.youtube.com/watch?v=TvmhHQHWhO4',        caption: 'Rover arm demo' },
      { type: 'image',   src: 'uploads/projects/roverTeam/roverPullingme.png',                   caption: 'Rover Pulling Me' }
    ],
  },
  {
    id: 'rover-sim',
    title: 'Rover Arm — Dynamic Simulation & Controls',
    role: 'President / Engineer',
    year: '2020 — 2021',
    tags: ['AutoLev', 'MATLAB', 'C#', 'Arduino'],
    blurb: [
            ' • Improved the robotic arm design to be easier to model dynamically', 
            ' • Created a dynamic model with AutoLev and generated Equations of Motion for Joint Space and Operational Space Controllers (Sometimes called Task Space)',
            ' • Simulated robotic arm using Matlab to ensure it moved as intended and used the torque-speed curve for motor selection',
            ' • Created a Windows Forms program in Visual Studios to communicate with an Arduino and manually control the Arm by sending commands to the on-board Arduino'
          ].join('\n'),
    featured: false,
    image: 'uploads/projects/rover-sim/Thumbnail.png',
    prize: null,
    media: [
      { type: 'image',   src: 'uploads/projects/rover-sim/Thumbnail.png',          caption: 'Arm Design' },
      { type: 'image', src: 'uploads/projects/rover-sim/Arm diagram1.PNG',        caption: 'Arm Diagram' },
      { type: 'image',   src: 'uploads/projects/rover-sim/movement-sim-1.gif',                    caption: 'simulation of joint space movement following a path' }
    ],
  },
  {
    id: 'utari',
    title: 'UTA Research Institute — Baxter',
    role: 'Researcher',
    year: '2022 — 2023',
    tags: ['ROS', 'OpenCV', 'Baxter', 'Rapid Prototyping'],
    blurb: ['• Worked on a various robotic systems such ReThink Robotics’ Baxter and a road scanning robot',
            '• Trained Baxter to recognize and retrieve soda cans using its cameras, robotic limbs, Robotic Operating System (ROS), and OpenCV'
          ].join('\n'),
    image: 'uploads/projects/utari/Thumbnail.png',
    featured: false,
    prize: null,
    media: [
      { type: 'image',   src: 'uploads/projects/utari/Thumbnail.png',          caption: 'Baxter Robot' },
      { type: 'youtube',   src: 'https://www.youtube.com/watch?v=rf07NCEZbcg',          caption: 'Baxter picking a can' },
    ],
  },
  {
    id: 'crown-castle',
    title: 'Crown Castle — Fiber Trenching Automation',
    role: 'Robotic Development Intern',
    year: '2022',
    tags: ['ROS', 'Jetson', 'CAN Bus', 'Python'],
    blurb: 'Automated curb-following + cable drift correction. Cut operating crew from 6 → 4 people (30% reduction).',
    featured: false,
    prize: null,
  },
  {
    id: 'afp',
    title: 'Automated Fiber Placement — KUKA',
    role: 'Researcher',
    year: '2021 — 2022',
    tags: ['KUKA', 'PLC', 'EtherNet/IP', 'Rhino + AddPath'],
    blurb: 'Built an AFP tool for a KUKA arm; wrote a slicer that drives both the tool and the robot. Force-flow-aware nonlinear layups.',
    featured: false,
    prize: null,
  },
  {
    id: 'beumer',
    title: 'Beumer Group — CAD/PLM Macros',
    role: 'CAD/PLM Intern',
    year: '2019 — 2021',
    tags: ['C#', 'WinForms', 'SolidWorks', 'PLM'],
    blurb: 'WinForms macros to auto-format drafts, sort PDFs by part number, build families of parts, and auto-fill PLM metadata.',
    featured: false,
    prize: null,
  },
  {
    id: 'nasa',
    title: 'NASA L\u2019Space — THANOS Submarine for Titan',
    role: 'Deputy Project Manager',
    year: '2019',
    tags: ['Mission Concept'],
    blurb: [
      '• Contributed as Deputy Project Manager and Science Team Member to the design and development of a Titan descent lander mission, featuring a submersible vehicle (THANOS) to explore and analyze the hydrocarbon sea Kraken Mare on Saturn\'s moon Titan.',
      '• Led efforts in mechanical engineering design, utilizing skills in SolidWorks and MATLAB to support the integration of scientific instruments and ensure the submarine\'s structural integrity for cryogenic and high-pressure environments.',
      '• Collaborated on mission planning, payload selection, and verification processes, helping to define and prioritize experiments such as liquid composition analysis, life detection, and lakebed mapping, while ensuring project milestones and risk management were met.'
    ].join('\n'),
    featured: false,
    prize: null,
  },
  {
  id: 'nasa',
  title: 'NASA L\u2019Space — ISS Canadarm/Dextre Robotics Modification',
  role: 'Project Manager',
  year: '2019',
  tags: ['Mission Concept'],
  blurb: [
    '• Contributed as Deputy Project Manager and Science Team Member to the design and development of a Titan descent lander mission, featuring a submersible vehicle (THANOS) to explore and analyze the hydrocarbon sea Kraken Mare on Saturn\'s moon Titan.',
    '• Led efforts in mechanical engineering design, utilizing skills in SolidWorks and MATLAB to support the integration of scientific instruments and ensure the submarine\'s structural integrity for cryogenic and high-pressure environments.',
    '• Collaborated on mission planning, payload selection, and verification processes, helping to define and prioritize experiments such as liquid composition analysis, life detection, and lakebed mapping, while ensuring project milestones and risk management were met.'
  ].join('\n'),
  featured: false,
  prize: null,
  },
  {
    id: 'extreme',
    title: 'SHPE Extreme Engineering — LEO Robot',
    role: 'Team Lead (11)',
    year: '2022',
    tags: ['Pitch', 'Commercial Space', 'LEO'],
    blurb: 'Pitched an hourly-rental robot that lets Earth customers roam the ISS and play games. 99 of 400 applicants selected.',
    featured: false,
    prize: 'Tied 1st — Semi-Finals',
  },
  {
    id: 'aeromavs',
    title: 'AeroMavs — Structural Rocketry',
    role: 'Structural Division Member',
    year: '2017 — 2018',
    tags: ['Composites', 'OpenRocket', 'L1 HPR Cert', 'IREC'],
    blurb: 'Designed body + fins, dialed in fiberglass/epoxy mixes, made carbon-fiber composite fins. Earned L1 High Power Rocketry cert.',
    featured: false,
    prize: null,
  },
  {
    id: 'hack-waste',
    title: 'Hackathon — Robotic Waste Sorter',
    role: 'Team Member',
    year: 'Hackathon',
    tags: ['TensorFlow', 'CV', 'Robotics'],
    blurb: 'Trained a TensorFlow CV model + robot to recognize and sort waste.',
    featured: false,
    prize: '3rd Place',
  },
  {
    id: 'hack-ag',
    title: 'Hackathon — Agricultural IoT',
    role: 'Team Member',
    year: 'Hackathon',
    tags: ['IoT', 'Azure', 'Raspberry Pi', 'CV'],
    blurb: 'Sensor + action node network to count fruit, detect field health, and schedule irrigation from soil + climate data.',
    featured: false,
    prize: '3rd Place',
  },
  {
    id: 'hack-llm',
    title: 'Hackathon — Mock Interviewer LLM',
    role: 'Team Member',
    year: 'Hackathon',
    tags: ['Copilot Studio', 'Power Automate', 'LLM'],
    blurb: 'Trained a mock-interviewer LLM with Microsoft Copilot Studio + Power Automate for practice + feedback.',
    featured: false,
    prize: '2nd Place',
  },
];

const BACKGROUND = {
  education: [
    { school: 'University of Texas at Arlington', date: 'Aug 2025', items: ['M.S. Computer Science — Intelligent Systems & Computer Networks', 'B.S. Mechanical Engineering, Minor in Computer Science'] },
  ],
  experience: [
    { org: 'BNSF Railway', role: 'Robotic Embedded SW Engineer (Contract)', date: 'Mar 2023 — Present' },
    { org: 'UTA Research Institute — AISL', role: 'Researcher', date: 'Oct 2022 — Feb 2023' },
    { org: 'Crown Castle', role: 'Robotic Development Intern', date: 'Jan 2022 — Aug 2022' },
    { org: 'Lab of Adv. Materials Manufacturing & Analysis', role: 'Researcher', date: 'Jun 2021 — Jan 2022' },
    { org: 'Beumer Group', role: 'CAD/PLM Intern', date: '2019 — 2021' },
  ],
  skills: {
    Programming: ['Python', 'C++', 'MATLAB', 'ROS', 'C#', 'LabVIEW'],
    Tools: ['Git', 'Docker', 'RabbitMQ', 'TensorFlow', 'Roboflow', 'MongoDB', 'Azure', 'AWS'],
    Modeling: ['SolidWorks (CSWA)', 'Solid Edge', 'Rhino + AddPath'],
  },
};

const MEMBERSHIPS = [
  { kind: 'Leadership',  name: 'UTA Rover Team — President', date: '2020 — 2021', notes: 'Led 30 students to URC (15/88). Owned recruiting, budget, sponsor pitches, and arm-subsystem design.' },
  { kind: 'Leadership',  name: 'UTA Rover Team — Arm Captain', date: '2019 — 2020', notes: 'Captained the 5-DOF arm subsystem. Designed PID joint-space controller to ±0.4 in.' },
  { kind: 'Leadership',  name: 'SHPE Nissan Design Challenge — Team Lead', date: '2022', notes: 'Led 3-person team. 1st of 24 selected teams (Grand Prize).' },
  { kind: 'Leadership',  name: 'SHPE Extreme Engineering — Team Lead', date: '2022', notes: 'Led 11-person team. 99 of 400 applicants selected; tied 1st in semi-finals.' },
  { kind: 'Leadership',  name: 'NASA L\u2019Space — Project Manager', date: '2019', notes: 'Coordinated national 6-person team across Titan-Submarine and ISS Dextre/Canadarm tracks.' },
  { kind: 'Mentorship',  name: 'UTA Rover Team — Mentor', date: '2021 — Present', notes: 'Mentor 4+ underclassmen on PID controls, CAD, and team leadership transition.' },
  { kind: 'Mentorship',  name: 'SHPE Chapter — Peer Mentor', date: '2022 — Present', notes: 'Mentor Hispanic-engineering undergraduates through internship pipeline and pitch coaching.' },
  { kind: 'Committee',   name: 'UTA Rover Team — Recruiting & Budget Committee', date: '2019 — 2021', notes: 'Sat on the recruiting + budget committee; built the sponsor-deck pipeline.' },
  { kind: 'Committee',   name: 'SHPE Conference Delegate', date: '2022 — Present', notes: 'Delegate to SHPE National Convention. Career-fair representative.' },
  { kind: 'Membership',  name: 'SHPE — Society of Hispanic Professional Engineers', date: '2021 — Present', notes: 'Nissan Design Challenge (1st), Extreme Engineering (Tied 1st semis).' },
  { kind: 'Membership',  name: 'NASA L\u2019Space Academy — Alumnus', date: '2019', notes: 'Mission Concept + Proposal Writing tracks.' },
  { kind: 'Membership',  name: 'AeroMavs — Rocketry', date: '2017 — 2018', notes: 'Structural Division. L1 High Power Rocketry cert. IREC.' },
];

const HEADSHOTS = [
  { id: 'hs1', caption: 'Headshot',         date: '2025' },
  { id: 'hs2', caption: 'BNSF Trackathon — 1st Place Team',          date: '2022' },
  { id: 'hs3', caption: 'URC field, UTA Rover Team',               date: '2021' },
  { id: 'hs4', caption: 'Nissan Design Challenge — Grand Prize',   date: '2022' },
  { id: 'hs5', caption: 'Volunteering at Noche de Ciencias',       date: '2026' },
];
window.HEADSHOTS = HEADSHOTS;

const AWARDS = [
  { title: '1st Place — SHPE Nissan Design Challenge', year: '2022', note: 'Grand Prize. Eagle Eye child-safety camera.' },
  { title: '1st Place — BNSF Trackathon', year: '2023', note: 'Predictive ML for track health.' },
  { title: '1st Place — Hackathon, Railway ML', year: '—', note: 'Big-data failure prediction model + business plan.' },
  { title: 'Tied 1st — SHPE Extreme Engineering (Semis)', year: '2022', note: '99 of 400 applicants. LEO commercial-space robot.' },
  { title: '2nd Place — Mock Interviewer LLM Hackathon', year: '—', note: 'Copilot Studio + Power Automate.' },
  { title: '3rd Place — Robotic Waste Sorter Hackathon', year: '—', note: 'TensorFlow CV.' },
  { title: '3rd Place — Agricultural IoT Hackathon', year: '—', note: 'Pi network + Azure.' },
  { title: 'University Rover Challenge — 15th of 88', year: '2021', note: 'Led team of 30.' },
  { title: 'Certified SolidWorks Associate (CSWA)', year: '2016', note: '' },
  { title: 'OSHA 10 — General Industry Safety & Health', year: '—', note: '' },
  { title: 'Dean\u2019s List', year: '2018', note: '' },
  { title: 'L1 High Power Rocketry Certification', year: '2017 — 2018', note: 'Via AeroMavs.' },
];

const CONTACT_ITEMS = [
  {
    id: 'email',
    label: 'Email',
    value: 'jasoncabrejos@hotmail.com',
    href: 'mailto:jasoncabrejos@hotmail.com',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/jasoncabrejos',
    href: 'https://www.linkedin.com/in/jasoncabrejos/',
    external: true,
  },
];

window.PROJECTS = PROJECTS;
window.BACKGROUND = BACKGROUND;
window.MEMBERSHIPS = MEMBERSHIPS;
window.AWARDS = AWARDS;
window.CONTACT_ITEMS = CONTACT_ITEMS;
