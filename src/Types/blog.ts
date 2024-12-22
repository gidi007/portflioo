export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    image: string;
    readTime: string;
    date: string;
    tags: string[];
    mediumUrl?: string;
  }
  
  export const TAG_COLORS: Record<string, string> = {
    'Productivity': 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100',
    'Hacks': 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100',
    'AI': 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
    'Technology': 'bg-red-100 text-cyan-800 dark:bg-red-800 dark:text-cyan-100',
    'Web Development': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100',
    'UI/UX': 'bg-pink-100 text-pink-800 dark:bg-pink-800 dark:text-pink-100'
  };
  
  