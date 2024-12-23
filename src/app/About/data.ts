// Define interfaces for your data structures
interface Skill {
  label: string;
  value: number;
}

interface PersonalInfo {
  firstName: string;
  lastName: string;
  age: string;
  nationality: string;
  freelance: string;
  address: string;
  phone: string;
  email: string;
  linkedIn: string;
  github: string;
  twitter: string;
  languages: string;
}

interface Stat {
  value: string;
  label: string;
}

interface TimelineItem {
  date: string;
  title: string;
  organization: string;
  description: string;
}

// Export your data
export const skills: Skill[] = [
  { label: 'HTML', value: 98 },
  { label: 'JAVASCRIPT', value: 95 },
  { label: 'CSS', value: 98 },
  { label: 'TYPESCRIPT', value: 90 },
  { label: 'WORDPRESS', value: 92 },
  { label: 'FRAMEWORKS', value: 92 },
  { label: 'LIBRARIES', value: 92 },
  { label: 'REACT', value: 95 },
];

export const personalInfo: PersonalInfo = {
  firstName: 'FAVOUR',
  lastName: 'BAWA',
  age: '26 YEARS',
  nationality: 'NIGERIAN',
  freelance: 'AVAILABLE',
  address: 'Ohio, OH',
  phone: '+234 808 683 1929',
  email: 'favourbawa04@mail.com',
  linkedIn: 'https://www.linkedin.com/in/favour-bawa-884445173/',
  github: 'https://github.com/your-profile',
  twitter: 'https://twitter.com/your-profile',
  languages: 'English',
};

export const stats: Stat[] = [
  { value: '6+', label: 'YEARS OF EXPERIENCE' },
  { value: '20+', label: 'COMPLETED PROJECTS' },
  { value: '40+', label: 'HAPPY CUSTOMERS' },
  { value: '10+', label: 'AWARDS AND CERTIFICATIONS' },
];

export const experience: TimelineItem[] = [
  {
    date: '2020 - PRESENT',
    title: 'Co-founder, Front-End Developer',
    organization: 'N&S Tech (Nigeria)',
    description:
      '• Built the tech service agency in frontend, backend development, mobile development, content writing and video editing in collaboration with 6 diversely-skilled freelancers. Led 20 staff to deliver 12 end-to-end 5-star projects. Developed strong skills in leadership and task management with cross-functional collaboration via Slack, Clickup, and Trello.',
  },
  {
    date: 'Apr. 2022 – Jan. 2023',
    title: 'Front-End Developer',
    organization: 'Metrodao (U.S.A)',
    description:
      '• Worked on a team to develop a tool for accessing services in any African language using deep learning and artificial intelligence. Collaborated with the CTO, Product Designer, Backend, and DevOps developers to test and launch the product. Added a voice bot to the language console.',
  },
  {
    date: 'Dec. 2020 – Mar. 2021',
    title: 'Front-End Developer (Remote Workspace)',
    organization: 'Quin.Video (U.S.A)',
    description:
      '• Developed an EdTech video conferencing web application MVP. Strengthened agile development, debugging, competitive analysis, and reusable JavaScript, HTML, and CSS code. Collaborated with the backend team to resolve architectural design challenges. Reduced bug frequency to 3%.',
  },
  {
    date: 'Apr. 2021 – Jul. 2021',
    title: 'Front-End Developer (Remote Job)',
    organization: 'Frontendlabs (United Kingdom)',
    description:
      '• Gained expertise in leadership, communication, and project management. Coordinated ideas and specifications between clients and developers from ideation to launch. Improved workflows to address structural gaps, enhancing project turnaround time by over 60%.',
  },
];

export const education: TimelineItem[] = [
  {
    date: 'Nov 2014 – Nov 2019',
    title: 'CHEMICAL ENGINEERING DEGREE',
    organization: 'UNIVERSITY OF LAGOS (Lagos, Nigeria)',
    description: '• Bachelor of Science in Chemical Engineering, First Class Honours.',
  },
  {
    date: '2022 – Present',
    title: 'MASTER’S DEGREE',
    organization: 'OHIO STATE UNIVERSITY (Ohio, U.S.A)',
    description: '• Master of Science in Chemical Engineering, First Class Honours.',
  },
];
