'use client'
import Image from 'next/image'  // Explicitly import Image from next/image
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Modal from '../Hero/Modal'  // Ensure this import path is correct
import { useModal } from '../../hooks/use-modal'

// Define an interface for the image type to improve type safety
interface ProjectImage {
  src: string;
  alt: string;
  link: string;
}

const images: ProjectImage[] = [
  { src: '/placeholder.svg', alt: 'Project 1', link: 'https://example.com/project1' },
  { src: '/placeholder.svg', alt: 'Project 2', link: 'https://example.com/project2' },
  { src: '/placeholder.svg', alt: 'Project 3', link: 'https://example.com/project3' },
  { src: '/placeholder.svg', alt: 'Project 4', link: 'https://example.com/project4' },
  { src: '/placeholder.svg', alt: 'Project 5', link: 'https://example.com/project5' },
]

// Define the props for the Modal component to resolve type issues
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
  images?: ProjectImage[];
}

export default function ModalDemo() {
  const { isOpen, openModal, closeModal } = useModal()
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  const handleProjectClick = (projectLink: string) => {
    setSelectedProject(projectLink)
    openModal()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-background to-muted">
      <h1 className="text-4xl font-bold mb-8 text-foreground">Our Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={300}
              height={200}
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <Button onClick={() => handleProjectClick(image.link)}>
                View Project
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="Project Gallery"
        description="Explore our latest projects and designs."
        images={images}
      >
        <div className="text-center">
          <p className="text-foreground mb-4">
            These images showcase our portfolio of innovative projects.
          </p>
          {selectedProject && (
            <Button
              className="mr-4"
              onClick={() => window.open(selectedProject, '_blank')}
            >
              View Project Details
            </Button>
          )}
          <Button variant="outline" onClick={closeModal}>
            Close Gallery
          </Button>
        </div>
      </Modal>
    </div>
  )
}