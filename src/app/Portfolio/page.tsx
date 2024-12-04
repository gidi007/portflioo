import React, { useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  ExternalLink, 
  Star, 
  Quote, 
  CodeIcon, 
  CheckCircle,
  X,
  Loader2
} from 'lucide-react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { SectionHeader } from '@/components/ui/section-header';

// Project data type with explicit image dimensions
interface ProjectImage {
  src: string;
  width: number;
  height: number;
  alt?: string;
}

interface Project {
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

// Sample projects with explicit image dimensions
const projects: Project[] = [
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
// Animated Background Component

// Enhanced Animated Background with performance considerations
const AnimatedBackground = React.memo(() => {
  const [particleCount, setParticleCount] = useState(10);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setParticleCount(document.hidden ? 5 : 20);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 -z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-2xl"
          animate={{
            x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
            y: [`-10vh`, `110vh`],
            scale: [0.5, 1.5],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 20 + i * 2,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut'
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${10 + Math.random() * 50}px`,
            height: `${10 + Math.random() * 50}px`,
            background: `radial-gradient(
              circle, 
              rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.3) 0%, 
              rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.1) 100%
            )`
          }}
        />
      ))}
    </motion.div>
  );
});

AnimatedBackground.displayName = 'AnimatedBackground';
// Project Modal Component with Enhanced Features
const ProjectModal: React.FC<{
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}> = ({ project, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

  // Swipe handlers for mobile
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      setCurrentImageIndex(prev => 
        prev < project.images.length - 1 ? prev + 1 : 0
      );
    },
    onSwipedRight: () => {
      setCurrentImageIndex(prev => 
        prev > 0 ? prev - 1 : project.images.length - 1
      );
    },
  });

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isOpen) return;

    switch (event.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        setCurrentImageIndex(prev => 
          prev > 0 ? prev - 1 : project.images.length - 1
        );
        break;
      case 'ArrowRight':
        setCurrentImageIndex(prev => 
          prev < project.images.length - 1 ? prev + 1 : 0
        );
        break;
    }
  }, [isOpen, onClose, project.images.length]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Handle image loading state
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        ref={modalRef}
        className="max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        aria-labelledby="project-modal-title"
        onPointerDownOutside={onClose}
      >
        <VisuallyHidden>
          <DialogTitle id="project-modal-title">{project.title} Project Details</DialogTitle>
        </VisuallyHidden>

        <DialogHeader>
          <DialogDescription>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-4 right-4 z-50"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X />
            </Button>

            <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
          </DialogDescription>
        </DialogHeader>
        
        
        
        {/* Enhanced Carousel with Swipe Gestures and Loading State */}
        <div className="relative" {...swipeHandlers}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <Loader2 className="animate-spin text-primary" size={48} />
            </div>
          )}
            <Carousel 
              className="w-full max-w-3xl mx-auto"
              opts={{
                startIndex: currentImageIndex,
              }}
              setApi={(api) => {
                if (api) {
                  
                  setCurrentImageIndex(api.selectedScrollSnap());
                }
              }}
            >
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 bg-black/50 text-white px-3 py-1 rounded-full">
              {currentImageIndex + 1} / {project.images.length}
            </div>
            <CarouselContent>
              {project.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative w-full aspect-video">
                    <Image
                      src={image.src}
                      alt={image.alt || `${project.title} - Screenshot ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover rounded-lg"
                      priority={index === 0}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      onLoadingComplete={index === currentImageIndex ? handleImageLoad : undefined}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious 
              aria-label="Previous image" 
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10" 
            />
            <CarouselNext 
              aria-label="Next image" 
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10" 
            />
          </Carousel>
        </div>

        {/* Project Details Section */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {/* Project Overview */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <CodeIcon className="mr-2 text-primary" />
              Project Overview
            </h3>
            <p className="text-muted-foreground">{project.description}</p>
            
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Technologies</h4>
            <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <Badge 
                    key={tech.name} 
                    variant="secondary"
                  >
                    {tech.name}
                  </Badge>
              ))}
              </div>
                </div>
          </motion.div>

          {/* Project Challenges & Solutions */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <CheckCircle className="mr-2 text-primary" />
              Challenges & Solutions
            </h3>
            <div>
              <h4 className="font-semibold mb-2">Challenges</h4>
              <ul className="list-disc pl-5 text-muted-foreground">
                {project.details.challenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
              <h4 className="font-semibold mt-4 mb-2">Solutions</h4>
              <ul className="list-disc pl-5 text-muted-foreground">
                {project.details.solutions.map((solution, index) => (
                  <li key={index}>{solution}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Client Reviews */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <Quote className="mr-2 text-primary" />
            Client Reviews
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {project.reviews.map((review, index) => (
              <Card key={index} className="p-6 bg-secondary/10">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className={`w-5 h-5 ${
                        starIndex < Math.floor(review.rating)
                          ? 'text-yellow-500'
                          : 'text-gray-300'
                      }`}
                      fill={starIndex < Math.floor(review.rating) ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
                <p className="italic mb-2">&quot;{review.text}&quot;</p>
                <p className="font-semibold text-muted-foreground">- {review.author}</p>
              </Card>
            ))}
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};


// Main Portfolio Component with Enhanced Features
export default function AdvancedPortfolioSection() {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const categories = ['All', 'Web Application', 'Dashboard Design', 'Cross-Platform Development'];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(project => project.category === filter);

  return (
    <TooltipProvider>
      <LayoutGroup>
        <section className="relative min-h-screen py-16 bg-background">
          <AnimatedBackground />
          
          <motion.div 
            className="container mx-auto px-4 max-w-6xl relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <SectionHeader
              title="MY"
              highlight="PORTFOLIO"
              shadowText="WORKS"
            />

            {/* Sticky Category Filter with Enhanced Animations */}
            <motion.div 
              className="sticky top-4 z-20 bg-background/80 backdrop-blur-sm py-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ScrollArea className="w-full">
                <motion.div 
                  className="flex justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ staggerChildren: 0.1 }}
                >
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ 
                        scale: 1.05,
                        transition: { type: 'spring', stiffness: 300 }
                      }}
                      className={`
                        px-6 py-3 rounded-full transition-all duration-300
                        ${filter === category 
                          ? 'bg-primary text-primary-foreground shadow-lg'
                          : 'bg-secondary hover:bg-secondary/80'}
                      `}
                      onClick={() => setFilter(category)}
                    >
                      {category}
                      {filter === category && (
                        <motion.div 
                          layoutId="underline"
                          className="h-1 bg-primary-foreground mt-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                        />
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              </ScrollArea>
            </motion.div>

            {/* Projects Grid with Enhanced Responsiveness and Interactions */}
            <AnimatePresence>
              {filteredProjects.length > 0 ? (
                <motion.div 
                  layout 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-8"
                >
                  {filteredProjects.map(project => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ 
                        scale: 1.05,
                        transition: { 
                          type: 'spring', 
                          stiffness: 300,
                          damping: 10
                        }
                      }}
                      className="group"
                    >
                      <Card className="overflow-hidden h-full flex flex-col">
                        {/* Carousel implementation remains similar to previous version */}
                        <Carousel>
                          <CarouselContent>
                            {project.images.map((image, index) => (
                              <CarouselItem key={index}>
                                <div className="relative w-full aspect-video">
                                  <Image
                                    src={image.src}
                                    alt={`${project.title} - Screenshot ${index + 1}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    priority={index === 0}
                                    loading={index === 0 ? 'eager' : 'lazy'}
                                  />
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious 
                            aria-label="Previous project image" 
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-10" 
                          />
                          <CarouselNext 
                            aria-label="Next project image" 
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-10" 
                          />
                        </Carousel>

                        {/* Project card details */}
                        <div className="p-6 flex-grow flex flex-col">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-bold">{project.title}</h3>
                            <div className="flex items-center gap-1 text-yellow-500">
                              <Star size={16} fill="currentColor" />
                              <span>{project.clientSatisfaction}</span>
                            </div>
                          </div>

                          <p className="text-muted-foreground mb-4 flex-grow">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.map(tech => (
                              <Tooltip key={tech.name}>
                                <TooltipTrigger asChild>
                                  <Badge variant="secondary">{tech.name}</Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {tech.description || 'No additional information'}
                                </TooltipContent>
                              </Tooltip>
                            ))}
                          </div>

                          <div className="flex gap-3 mt-auto">
                            <Button 
                              onClick={() => window.open(project.upworkLink, '_blank')}
                              className="flex-1"
                              variant="default"
                            >
                              <ExternalLink size={16} className="mr-2" />
                              Upwork Project
                            </Button>
                            <Button 
                              variant="outline" 
                              className="flex-1"
                              onClick={() => setSelectedProject(project)}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 text-muted-foreground"
                >
                  No projects found in this category.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {selectedProject && (
            <ProjectModal 
              project={selectedProject} 
              isOpen={!!selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </section>
      </LayoutGroup>
    </TooltipProvider>
  );
}