import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github } from 'lucide-react';

const socialLinks = [
  { 
    Icon: Linkedin,
    href: "https://www.linkedin.com/in/favourbawa",
    color: "bg-blue-100/80 dark:bg-blue-900/30",
    hoverColor: "hover:bg-blue-200 dark:hover:bg-blue-900/50",
    iconColor: "text-blue-600 dark:text-blue-300",
    name: "LinkedIn"
  },
  { 
    Icon: Github,
    href: "https://github.com/FavourB",
    color: "bg-gray-100/80 dark:bg-gray-900/30",
    hoverColor: "hover:bg-gray-200 dark:hover:bg-gray-900/50",
    iconColor: "text-gray-800 dark:text-gray-300",
    name: "GitHub"
  },
];

export const SocialLinks: React.FC = () => {
  return (
    <motion.div 
      className="flex flex-wrap gap-4 justify-center lg:justify-start mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      {socialLinks.map(({ Icon, href, color, hoverColor, iconColor, name }) => (
        <motion.a 
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            ${color} ${hoverColor}
            rounded-2xl p-3 sm:p-4 flex items-center justify-center
            transition-all duration-300
            hover:scale-110 hover:shadow-lg group
            relative overflow-hidden backdrop-blur-sm
          `}
          whileHover={{ 
            scale: 1.1,
            rotate: [0, -5, 5, 0],
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.95 }}
          aria-label={name}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${iconColor} relative z-10`} />
          <span className="sr-only">{name}</span>
        </motion.a>
      ))}
    </motion.div>
  );
};

