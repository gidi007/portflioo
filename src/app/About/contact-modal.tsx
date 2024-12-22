import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Mail,
  ExternalLink,
  Github,
  Linkedin,
  X
} from "lucide-react";

interface SocialLink {
  title: string;
  icon: React.ReactNode;
  href: string;
  description: string;
  animation: string;
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  personalInfo: {
    email: string;
    linkedIn: string;
    github: string;
    X: string;
  };
  
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  personalInfo,
}) => {
  const socialLinks: SocialLink[] = [
    {
      title: "Email",
      icon: <Mail className="h-5 w-5" />,
      href: `mailto:${personalInfo.email}`,
      description: "Send me an email directly",
      animation: "fade-right",
    },
    {
      title: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      href: personalInfo.linkedIn,
      description: "Connect with me professionally",
      animation: "fade-left",
    },
    {
      title: "GitHub",
      icon: <Github className="h-5 w-5" />,
      href: personalInfo.github,
      description: "Check out my projects",
      animation: "flip-up",
    },
    {
      title: "Twitter",
      icon: <X className="h-5 w-5" />,
      href: personalInfo.X,
      description: "Follow me for updates",
      animation: "flip-down",
    },
  ];

  const handleSocialClick = (href: string) => {
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Let&apos;s Connect!
          </DialogTitle>
          <DialogDescription className="text-center px-4 sm:px-6">
            Feel free to reach out through any platform below.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 p-4 sm:p-6">
          {socialLinks.map((link) => (
            <div
              key={link.title}
              className="relative"
              data-aos={link.animation}
              data-aos-duration="800"
            >
              <Button
                variant="outline"
                onClick={() => handleSocialClick(link.href)}
                className="w-full group relative flex items-center justify-between px-4 py-6 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <div className="flex items-center space-x-3">
                  {link.icon}
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {link.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {link.description}
                    </p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </div>
          ))}
        </div>

        <div className="px-4 sm:px-6 py-4 bg-gray-50 flex justify-end rounded-b-lg">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Usage example:
{/* 
const personalInfo = {
  email: "your.email@example.com",
  linkedIn: "https://linkedin.com/in/yourprofile",
  github: "https://github.com/yourusername",
  twitter: "https://twitter.com/yourhandle"
};

<ContactModal 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)} 
  personalInfo={personalInfo} 
/> 
*/}