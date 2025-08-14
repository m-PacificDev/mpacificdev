"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  description2: string;
  thumbnail: string;
  images: string[];
  views: number;
  likes: number;
  website: string;
  technologies: string[];
}

interface ProjectContextType {
  selectedProject: Project | null;
  isModalOpen: boolean;
  openProject: (project: Project) => void;
  closeProject: () => void;
  likeProject: (projectId: number) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectLikes, setProjectLikes] = useState<Record<number, number>>({});

  const openProject = (project: Project) => {
    // Initialize likes if not already set
    if (!(project.id in projectLikes)) {
      setProjectLikes(prev => ({ ...prev, [project.id]: project.likes }));
    }
    
    setSelectedProject({
      ...project,
      likes: projectLikes[project.id] || project.likes
    });
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeProject = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const likeProject = (projectId: number) => {
    setProjectLikes(prev => ({
      ...prev,
      [projectId]: (prev[projectId] || 0) + 1
    }));
    
    if (selectedProject && selectedProject.id === projectId) {
      setSelectedProject({
        ...selectedProject,
        likes: (projectLikes[projectId] || selectedProject.likes) + 1
      });
    }
  };

  return (
    <ProjectContext.Provider value={{
      selectedProject,
      isModalOpen,
      openProject,
      closeProject,
      likeProject
    }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjectContext() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return context;
}