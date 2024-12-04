import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, ExternalLink, Github, Twitter } from "lucide-react";
import AOS from "aos"; // Import AOS

// Declare module to avoid TypeScript errors


interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  personalInfo: {
    email: string;
    LinkedIn: string;
  };
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  personalInfo,
}) => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-md bg-white shadow-lg rounded-lg"
        data-aos="zoom-in"
      >
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-extrabold text-gray-800">
            Let&apos;s Connect!
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            I&apos;m always excited to discuss new opportunities and
            collaborations.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            variant="outline"
            onClick={() => window.open(`mailto:${personalInfo.email}`)}
            className="w-full hover:bg-gray-100 focus:ring focus:ring-indigo-300"
            data-aos="fade-right"
          >
            <Mail className="mr-2 h-4 w-4 text-indigo-600" />
            Send Email
          </Button>
          <Button
            variant="outline"
            onClick={() => window.open(personalInfo.LinkedIn)}
            className="w-full hover:bg-gray-100 focus:ring focus:ring-indigo-300"
            data-aos="fade-left"
          >
            <ExternalLink className="mr-2 h-4 w-4 text-blue-500" />
            Connect on LinkedIn
          </Button>
          <Button
            variant="outline"
            onClick={() => window.open("https://github.com/FavourB")}
            className="w-full hover:bg-gray-100 focus:ring focus:ring-indigo-300"
            data-aos="flip-up"
          >
            <Github className="mr-2 h-4 w-4 text-black" />
            Follow on GitHub
          </Button>
          <Button
            variant="outline"
            onClick={() => window.open("https://twitter.com/FavourB")}
            className="w-full hover:bg-gray-100 focus:ring focus:ring-indigo-300"
            data-aos="flip-down"
          >
            <Twitter className="mr-2 h-4 w-4 text-blue-400" />
            Follow on Twitter
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
