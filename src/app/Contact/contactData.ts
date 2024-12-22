import { Facebook, Github, Youtube, Dribbble, MapPin, Mail, Phone } from 'lucide-react';

export const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook', color: 'text-blue-600 dark:text-blue-400' },
  { icon: Github, href: '#', label: 'Github', color: 'text-gray-800 dark:text-gray-200' },
  { icon: Youtube, href: '#', label: 'Youtube', color: 'text-red-600 dark:text-red-400' },
  { icon: Dribbble, href: '#', label: 'Dribbble', color: 'text-pink-500 dark:text-pink-400' },
];

export const contactInfo = [
  {
    icon: MapPin,
    title: 'ADDRESS POINT',
    content: '123 Street Ohio, OH, United States Of America 750065, ',
    color: 'text-green-500 dark:text-green-400'
  },
  {
    icon: Mail,
    title: 'MAIL ME!',
    content: 'favourbawa04@gmail.com',
    color: 'text-blue-500 dark:text-blue-400'
  },
  {
    icon: Phone,
    title: 'CALL ME!',
    content: '+234 808 683 1929',
    color: 'text-purple-500 dark:text-purple-400'
  },
];

