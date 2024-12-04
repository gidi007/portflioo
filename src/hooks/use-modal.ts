//USE-MODAL.ts
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useCallback } from 'react'

// Define an optional generic type for additional modal state
export function useModal<T = undefined>() {
  const [isOpen, setIsOpen] = useState(false)
  
  // Optional state to store additional context or data
  const [modalData, setModalData] = useState<T | null>(null)

  // Open modal with optional data
  const openModal = useCallback((data?: T) => {
    setIsOpen(true)
    if (data !== undefined) {
      setModalData(data)
    }
  }, [])

  // Close modal and optionally clear data
  const closeModal = useCallback(() => {
    setIsOpen(false)
    setModalData(null)
  }, [])

  // Toggle modal state
  const toggleModal = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  // Reset modal to initial state
  const resetModal = useCallback(() => {
    setIsOpen(false)
    setModalData(null)
  }, [])

  return { 
    isOpen, 
    modalData, 
    openModal, 
    closeModal, 
    toggleModal,
    resetModal,
    setModalData 
  }
}

// Example usage with type inference
interface ProjectModalData {
  id: string;
  title: string;
  description: string;
}

// Demonstration of typed usage
function ExampleComponent() {
  // Modal with specific project data type
  const { 
    isOpen, 
    modalData, 
    openModal, 
    closeModal 
  } = useModal<ProjectModalData>()

  const handleProjectClick = (project: ProjectModalData) => {
    // Open modal and pass project-specific data
    openModal(project)
  }

  return null // Placeholder
}