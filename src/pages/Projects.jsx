import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "Project 1",
      description: "A full-stack web application built with React.js and Node.js",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      githubUrl: "#",
      liveUrl: "#",
      image: "project1.jpg"
    },
    {
      title: "Project 2",
      description: "An e-commerce platform with real-time features",
      technologies: ["React", "Node.js", "Socket.io", "PostgreSQL"],
      githubUrl: "#",
      liveUrl: "#",
      image: "project2.jpg"
    },
    // Add more projects as needed
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center" style={{background: 'transparent'}}>
      <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-4">
        {projects.map((project, index) => (
          <div key={index} className="rounded-lg shadow-xl overflow-hidden bg-opacity-0" style={{background: 'transparent'}}>
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">{project.title}</h2>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex space-x-4">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                >
                  <Github size={20} />
                  <span>Code</span>
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                >
                  <ExternalLink size={20} />
                  <span>Live Demo</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects; 