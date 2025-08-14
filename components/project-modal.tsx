"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useProjectContext } from '@/contexts/project-context';
import { X, ChevronLeft, ChevronRight, Eye, Heart, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function ProjectModal() {
  const { selectedProject, isModalOpen, closeProject, likeProject } = useProjectContext();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Reset state when modal opens
  useEffect(() => {
    if (isModalOpen) {
      setCurrentImageIndex(0);
      setIsLiked(false);
    }
  }, [isModalOpen]);

  // Keyboard navigation and close
  useEffect(() => {
    if (!isModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      if (e.key === "Escape") closeProject();
      if (e.key === "ArrowLeft") previousImage();
      if (e.key === "ArrowRight") nextImage();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line
  }, [isModalOpen, selectedProject, currentImageIndex]);

  // Focus trap for accessibility
  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isModalOpen]);

  const nextImage = () => {
    if (!selectedProject) return;
    setCurrentImageIndex((prev) =>
      prev === selectedProject.images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    if (!selectedProject) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedProject.images.length - 1 : prev - 1
    );
  };

  const handleLike = () => {
    if (!selectedProject || isLiked) return;
    likeProject(selectedProject.id);
    setIsLiked(true);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeProject();
    }
  };

  if (!selectedProject) return null;

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          aria-modal="true"
          role="dialog"
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
            onClick={handleOverlayClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            className="fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-card shadow-2xl overflow-hidden flex flex-col outline-none"
            style={{
              borderRadius: 0,
              minHeight: '60vh',
              maxHeight: '100vh',
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              type: 'spring',
              damping: 22,
              stiffness: 180,
              duration: 0.5,
            }}
          >
            {/* Drag handle */}
            <div className="w-12 h-1.5 bg-muted-foreground/40 rounded-full mx-auto mt-3 mb-2" />

            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={closeProject}
              className="absolute top-4 right-4 z-10 bg-background/80 hover:bg-background rounded-full shadow-lg"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </Button>

            {/* Image Slider */}
            <div
              className="relative w-full bg-muted flex items-center justify-center flex-shrink-0"
              style={{
                height: 'clamp(220px, 35vw, 420px)',
                minHeight: 180,
                maxHeight: 420,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={selectedProject.images[currentImageIndex]}
                      alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                      fill
                      className="object-contain transition-all duration-300"
                      priority
                      sizes="(max-width: 768px) 90vw, 800px"
                      style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        background: '#f3f4f6',
                      }}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              {selectedProject.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={previousImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}

              {/* Image Indicators */}
              {selectedProject.images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
                  {selectedProject.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentImageIndex
                          ? 'bg-white scale-125'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 pb-8 overflow-y-auto flex-1" style={{ maxHeight: 'calc(100vh - 18rem)' }}>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-2xl font-bold mb-2">{selectedProject.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    {selectedProject.description}
                  </p>
                  {/* Second description */}
                  <p className="text-muted-foreground/80 leading-relaxed mb-4">
                    {selectedProject.description2}
                  </p>
                </div>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Stats and Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm font-medium">{selectedProject.views}</span>
                  </div>
                  <motion.button
                    onClick={handleLike}
                    disabled={isLiked}
                    className={`flex items-center space-x-2 transition-colors ${
                      isLiked
                        ? 'text-red-500'
                        : 'text-muted-foreground hover:text-red-500'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Like project"
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                    <span className="text-sm font-medium">{selectedProject.likes}</span>
                  </motion.button>
                </div>
                <Button
                  onClick={() => window.open(selectedProject.website, '_blank')}
                  className="gradient-bg hover:shadow-lg transition-all duration-300"
                  aria-label="Visit website"
                >
                  Visit Website
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}