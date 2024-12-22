export interface ProjectImage {
    src: string;
    width: number;
    height: number;
    alt?: string;
  }
  
  export interface Project {
    id: number;
    title: string;
    category: string;
    images: ProjectImage[];
    description: string;
    technologies: {
      name: string;
      description?: string;
    }[];
    upworkLink: string;
    clientSatisfaction: number;
    details: {
      duration: string;
      challenges: string[];
      solutions: string[];
    };
    reviews: {
      text: string;
      author: string;
      rating: number;
    }[];
  }
  
  export const projects: Project[] = [
    {
      id: 1,
      title: 'Video Conferencing App For Teams',
      category: 'Web Application ',
      images: [
        { 
          src: '/images/job 1/image_original2.png', 
          width: 1200, 
          height: 800,
          alt: 'A video conferencing app for small group learning'
        },
        { 
          src: '/images/job 1/image_original.png', 
          width: 1200, 
          height: 800 
        },
        { 
          src: '/images/job 1/image_original1.png', 
          width: 1200, 
          height: 800 
        }
      ],
      description: 'GOAL : The client wanted a solution to small group learning with video conferencing. There needed to be interesting functionalities as to how the facilitators would communicate with members of small rooms(groups), and the entire members of a particular session.',
      technologies: [
        { 
          name: 'React', 
          description: 'used a JavaScript library for building interactive user interfaces' 
        },
        { 
          name: 'TypeScript', 
          description: 'had my work typed superset of JavaScript for enhanced code reliability' 
        },
        // ... other technologies
      ],
      upworkLink: 'https://www.upwork.com/freelancers/~01a6f25e401b07c37c?p=1545480525390082048',
      clientSatisfaction: 5.0,
      details: {
        duration: '4 weeks',
        challenges: [
          'Needed Real-time Communication',
          'A Scalable Architecture',
          'Cross-browser Compatibility'
        ],
        solutions: [
          'Implemented WebRTC for Low-latency Communication',
          'Developed Modular Responsive Design',
          'Optimized Performance for Multiple Concurrent Users'
        ]
      },
      reviews: [
        {
          text: "Favour has proven to be highly capable and I am pleased to be working with her. She has met deadlines and is attentive to the project needs",
          author: "John",
          rating: 5.0
        },
        {
          text: "Incredible attention to detail and technical expertise. What a pleasant experience using this app!",
          author: "Sara",
          rating: 5.0
        }
      ]
    },
    {
      id: 2,
      title: 'Admin Dashboard for a sports betting application',
      category: 'Web Application',
      images: [
        { 
          src: '/images/job2/image_original.png', 
          width: 1200, 
          height: 800,
          alt: 'a sports betting application'
        },
        { 
          src: '/images/job2/image_original2.png', 
          width: 1200, 
          height: 800 
        },
        { 
          src: '/images/job2/image_original1.png', 
          width: 1200, 
          height: 800 
        },
        { 
          src: '/images/job2/image_original3.png', 
          width: 1200, 
          height: 800 
        }
      ],
      description: 'Overview: I built the admin portal for the football and formula one betting application. The admin had a lot of roles to fulfil, it was a case of fitting it all into the simplest possible frames. This was a fun project, as a lot of brainstorming was needed to produce good results.',
  
      technologies: [
        { 
  
          name: 'React', 
          description: 'Modern JavaScript library for building interactive user interfaces' 
        },
        {
          name: 'Html5', 
          description: 'Markup language for building websites' 
        },
        { 
          name: 'TypeScript', 
          description: 'Typed superset of JavaScript for enhanced code reliability' 
        },
        { 
          name: 'CSS', 
          description: 'Design and styling for web components' 
        },
        // ... other technologies
      ],
      upworkLink: 'https://www.upwork.com/freelancers/~01a6f25e401b07c37c?p=1545477973299273728',
      clientSatisfaction: 5.0,
      details: {
        duration: '6 weeks',
        challenges: [
          'Keeping track of bets and transactions as they happen without missing a beat',
          'Making sure data is locked down and we don’t break any laws',
          'Surviving the madness when everyone bets during the finals',
          'Turning boring numbers into cool, easy-to-read visuals',
          'Letting different admins do their job without stepping on each other’s toes'
        ],
        solutions: [
          'Added real-time updates with WebSockets – so nothing slips through',
          'Set up strong encryption and double-checked everything is by the book',
          'Built a system that handles traffic spikes like a pro (even on finals night!)',
          'Created snazzy graphs and charts that actually make sense',
          'Made an access system that gives the right tools to the right people'
        ]
      },
      reviews: [
        {
          text: "Wow, Favour! This actually exceeded all our expectations and vision for the app. Top Job",
          author: "David",
          rating: 5
        },
        {
          text: "Technical expertise is evident through out the betting platform. This is exactly what i wanted",
          author: "Ahmed",
          rating: 5.0
        }
      ]
    },
    {
      id: 3,
      title: 'A PWA for mobile and desktop views',
      category: 'Cross-Platform Development',
      images: [
        { 
          src: '/images/job3/image_original.png', 
          width: 1200, 
          height: 800,
          alt: 'A progressive web application for mobile and desktop views'
        },
        { 
          src: '/images/job3/image_original1.png', 
          width: 1200, 
          height: 800 
        },
        { 
          src: '/images/job2/image_original2.png', 
          width: 1200, 
          height: 800 
        },
        { 
          src: '/images/job2/image_original3.png', 
          width: 1200, 
          height: 800 
        },
      ],
      description: 'Project: This App was targeted at building a solution for the informal sector, linking consumers to vendors without the hassle of trust issues, delivery problems and ease of payment. The solution entailed building a PWA, where users could have both vendor and a customer account.',
      technologies: [
        {
          name: 'Next.js',
          description: 'The go-to framework for building fast, server-side rendered React apps'
        },
        {
          name: 'Web Application',
          description: 'An interactive, browser-based app that works seamlessly across devices'
        },
        {
          name: 'JavaScript',
          description: 'The bread and butter of the web – making things dynamic and alive'
        },
        {
          name: 'Redux',
          description: 'The trusty sidekick for managing app state, especially in complex setups'
        }
        // ... other technologies
      ],
      upworkLink: 'https://www.upwork.com/freelancers/~01a6f25e401b07c37c?p=1545476514331340800',
      clientSatisfaction: 5.0,
      details: {
        duration: '4 weeks',
        challenges: [
      'Making it feel fast and snappy on both mobile and desktop',
      'Ensuring it scales up smoothly as more users join in',
      'Keeping it consistent and bug-free across all browsers',
      'Adding offline support for users on the go',
      'Balancing a sleek design with functionality for all screen sizes'
        ],
        solutions: [
      'Built it as a PWA for speed and offline capabilities',
      'Designed a responsive layout that adapts seamlessly to different devices',
      'Tested rigorously to iron out cross-browser quirks (yes, even that one browser)',
      'Implemented caching strategies to keep things running smooth, even offline',
      'Used scalable architecture to handle growing traffic like a champ'
        ]
      },
      reviews: [
        {
          text: "Favour's greatest strength is her attitude and desire to take on difficult tasks. I challenged her a lot while we were working together and she rose up to challenge most of the time. Highly recommended for front-end developer jobs.",
          author: "hourly client",
          rating: 5
        },
      ]
    },
    {
      id: 4,
      title: 'Responsive Landing page with Animation',
      category: 'Dashboard Design + Cross-Platform Development + Web Application',
      images: [
        { 
          src: '/images/job4/image_original4.png', 
          width: 1200, 
          height: 800,
          alt: 'Responsive Landing page'
        },
        { 
          src: '/images/job4/image_original3.png', 
          width: 1200, 
          height: 800,
          alt: 'Responsive Landing page'
        },
        { 
          src: '/images/job4/image_original2.png', 
          width: 1200, 
          height: 800,
          alt: 'Responsive Landing page'
        },
        { 
          src: '/images/job4/image_original1.png', 
          width: 1200, 
          height: 800 
        },
        { 
          src: '/images/job4/image_original.png', 
          width: 1200, 
          height: 800 
        }
      ],
      description: 'Project Description & Aim Was creating a responsive landing page that showcases pertinent company information, using minimal animation. Accurately transforming the page into a visually appealing and user-friendly interface; UX Design from Figma to Website.',
      technologies: [
        {
          name: 'Material UI',
          description: 'A sleek library of React components that makes your app look polished out of the box'
        },
        {
          name: 'CSS',
          description: 'The magic wand for styling your web pages and making them look fabulous'
        },
        {
          name: 'Git',
          description: 'Your ultimate version control sidekick – keeping your code history safe and sound'
        },
        {
          name: 'Business with 1-9 Employees',
          description: 'Small but mighty teams that need tech solutions tailored to their size and pace'
        },
        {
          name: 'React',
          description: 'The heart of interactive UIs – building components that bring your app to life'
        },
        {
          name: 'JavaScript',
          description: 'The lifeblood of modern web apps – making everything dynamic and engaging'
        },
        {
          name: 'Bootstrap',
          description: 'The trusty framework that helps you build responsive and clean layouts fast'
        },
        {
          name: 'Web Development',
          description: 'The art and science of creating functional, visually appealing websites and apps'
        },
        {
          name: 'Next.js',
          description: 'The go-to framework for building fast, server-side rendered React apps'
        }
        // ... other technologies
      ],
      upworkLink: 'https://www.upwork.com/freelancers/~01a6f25e401b07c37c?p=1394835641430519808',
      clientSatisfaction: 5.0,
      details: {
        duration: '7 weeks',
        challenges: [
          'Making animations smooth and buttery across all devices',
          'Ensuring the design looks perfect on every screen size',
          'Keeping load times short even with fancy visuals',
          'Handling browser quirks so the page behaves consistently',
          'Balancing creative animations with usability and accessibility'
        ],
        solutions: [
          'Used CSS animations and lightweight JavaScript libraries for seamless motion',
          'Created a fully responsive layout that adapts beautifully to any device',
          'Optimized image sizes and animation assets for faster load times',
          'Tested rigorously on multiple browsers to squash any inconsistencies',
          'Designed animations with user focus in mind – keeping them fun but functional'
        ]
      },
      reviews: [
        {
          text: "I was thoroughly impressed with Favour on our React JS App bug fix. She quickly identified and fixed the bug, communicated effectively throughout the project, and suggested additional improvements. I would highly recommend Favour for any React JS project because she is worth her salt",
          author: "Sanjay",
          rating: 5
        },
        {
          text: "Favour is an amazing designer and a true pleasure to work with. I intend to contract her services on all projects moving forward",
          author: "Moses, hourly pay",
          rating: 5
        }
      ]
    },
    {
      id: 5,
      title: 'Meeting & To-do Application',
      category: 'Dashboard Design + Cross-Platform Development + Web Application',
      images: [
        { 
          src: '/images/job5/image_original2.png', 
          width: 1200, 
          height: 800,
          
        },
        { 
          src: '/images/job5/image_original.png', 
          width: 1200, 
          height: 800 
        },
        { 
          src: '/images/job5/image_original1.png', 
          width: 1200, 
          height: 800 
        }
      ],
      description: 'Project description: I built a meeting and to-do application that allows users to schedule meetings, add tasks, and set reminders. The app was designed to be user-friendly and efficient, with a focus on simplicity and ease of use. With a beautiful minimal design, the todo application tracks meetings, agendas, and creates reminders to this effect.',
      technologies: [
        {
          name: 'Web Application',
          description: 'A dynamic and interactive app that runs in your browser, offering functionality on any device'
        },
        {
          name: 'CSS',
          description: 'The styling powerhouse that makes your web pages beautiful, flexible, and modern'
        },
        {
          name: 'HTML',
          description: 'The building blocks of the web, creating the structure for your app’s content'
        },
        {
          name: 'JavaScript',
          description: 'The engine that powers interactivity and logic, making your web app alive and engaging'
        },
        {
          name: 'React',
          description: 'The superstar JavaScript library for building reusable UI components quickly and effectively'
        },
        {
          name: 'Git',
          description: 'The essential tool for version control – tracking changes and collaborating with ease'
        },
        {
          name: 'Material UI',
          description: 'A stylish React component library that brings Google’s Material Design to your project'
        },
        {
          name: 'React Bootstrap',
          description: 'The perfect mix of Bootstrap’s power and React’s flexibility for responsive UIs'
        },
        {
          name: 'AJAX',
          description: 'The behind-the-scenes hero for fetching and sending data without refreshing the page'
        },
        {
          name: 'Business with 1-9 Employees',
          description: 'Small teams that need effective and efficient web solutions to scale their business quickly'
        }
        // ... other technologies
      ],
      upworkLink: 'https://www.upwork.com/freelancers/~01a6f25e401b07c37c?p=1394830725962084352',
      clientSatisfaction: 5,
      details: {
        duration: '3 weeks',
        challenges: [
          'Keeping meetings and tasks synced in real-time across devices',
          'Creating an intuitive interface that’s easy for everyone to use',
          'Handling recurring meetings and complex task dependencies',
          'Ensuring data security and user privacy',
          'Integrating seamlessly with calendars and productivity tools'
        ],
        solutions: [
          'Implemented WebSocket-based real-time updates for instant synchronization',
          'Designed a clean, user-friendly interface with clear navigation and visuals',
          'Built robust logic for recurring events and task relationships',
          'Added encryption and secure authentication to protect user data',
          'Integrated APIs for popular tools like Google Calendar and Slack for smooth workflows'
            ]
      },
      reviews: [
        {
          text: "Excellent work! Very clean and efficient Website! I will definitely use her again.",
          author: 'Mary Jones',
          rating: 5
        },
      ]
    },
    {
      id: 6,
      title: 'E-commerce site for furniture',
      category: 'Dashboard Design + Cross-Platform Development + Web Application',
      images: [
        { 
          src: '/images/job6/image_original1.png', 
          width: 1200, 
          height: 800,
        },
        { 
          src: '/images/job6/image_original.png', 
          width: 1200, 
          height: 800 
        },
        { 
          src: '/images/job6/image_original2.png', 
          width: 1200, 
          height: 800 
        }
      ],
      description: 'Project description: I created an E-commerce website for furniture, showing top deals , including a cart where customers can purchase items.',
      technologies: [
        {
          name: 'CSS',
          description: 'The styling language that makes your landing page visually appealing and easy to navigate'
        },
        {
          name: 'Landing Page',
          description: 'A focused, attention-grabbing page that introduces your business and drives action'
        },
        {
          name: 'Git',
          description: 'Version control for tracking changes and collaborating efficiently on your project'
        },
        {
          name: 'Business with 1-9 Employees',
          description: 'Small businesses that need a simple yet effective web presence to grow and engage customers'
        },
        {
          name: 'HTML',
          description: 'The skeleton of your landing page, structuring the content and layout'
        },
        {
          name: 'JavaScript',
          description: 'Adds interactivity to your landing page, making it dynamic and user-friendly'
        },
        {
          name: 'Bootstrap',
          description: 'A front-end framework for building responsive and mobile-first landing pages fast'
        },
        // ... other technologies
      ],
      upworkLink: 'https://www.upwork.com/freelancers/~01a6f25e401b07c37c?p=1394826502532837376',
      clientSatisfaction: 5.0,
      details: {
        duration: '5 weeks',
        challenges: [
          'Managing a large product catalog with detailed specifications',
          'Providing a smooth and secure checkout process',
          'Handling high traffic during sales and promotions',
          'Ensuring an intuitive and user-friendly shopping experience',
          'Supporting various payment methods and currencies for a global audience'
        ],
        solutions: [
            'Built a dynamic product catalog with filters and search for easy navigation',
        'Implemented a streamlined, secure checkout flow with SSL encryption and multiple payment options',
        'Optimized server performance and integrated load balancing for high traffic spikes',
        'Designed a user-friendly interface with simple navigation and intuitive product details',
        'Integrated support for multiple payment gateways and currencies to cater to a global market'
          ]
      },
      reviews: [
        {
          text: "I had the pleasure of working with Favour, an exceptional web developer. Her professionalism was evident from the start, and they consistently met deadlines with high-quality work. Communication was excellent as they kept me informed and addressed any concerns promptly. Their technical expertise and attention to detail resulted in a visually appealing and functional website. I highly recommend this web developer for their timeliness, professionalism, and exceptional communication skills. It was a pleasure working with them, and I look forward to future collaborations",
          author: "Esther",
          rating: 5
        },
        
      ]
    },
    // Add more projects with similar structure...
  ];
  
  export const categories = ['All', 'Web Application', 'Dashboard Design', 'Cross-Platform Development'];
  
  