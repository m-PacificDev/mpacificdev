"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const experiences = [
  {
    role: 'Chief Operating Officer (COO)',
    company: 'Yepper Platform',
    period: '2023 - Present',
    location: 'Kigali, Rwanda',
    description: 'Leading operations and strategic initiatives while contributing to product development. Overseeing business processes, team coordination, and growth strategies.',
    achievements: [
      'Streamlined operational processes resulting in 40% efficiency improvement',
      'Led cross-functional teams across development and business units',
      'Implemented data-driven decision making processes'
    ]
  },
  {
    role: 'Senior Software Engineer',
    company: 'Freelance & Contract Work',
    period: '2021 - 2023',
    location: 'Remote',
    description: 'Developed custom web and mobile applications for various clients across different industries. Specialized in React, React Native, and Node.js technologies.',
    achievements: [
      'Delivered 15+ successful projects with 100% client satisfaction',
      'Built scalable applications handling 10k+ users',
      'Established long-term partnerships with 8 recurring clients'
    ]
  },
  {
    role: 'Full Stack Developer',
    company: 'Multiple Client Projects',
    period: '2020 - 2021',
    location: 'Kigali, Rwanda',
    description: 'Worked on diverse projects ranging from e-commerce platforms to business management systems. Gained expertise in database design and API development.',
    achievements: [
      'Developed 10+ web applications from concept to deployment',
      'Integrated payment systems and third-party APIs',
      'Mentored junior developers and conducted code reviews'
    ]
  }
];

export default function ExperienceSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="experience" className="py-20" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">Professional Experience</h2>
            <p className="text-lg text-muted-foreground">
              My journey in software engineering and entrepreneurship
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

            <div className="space-y-8">
              {experiences.map((experience, index) => (
                <motion.div
                  key={index}
                  className="relative flex items-start"
                  initial={{ opacity: 0, x: -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  {/* Timeline dot */}
                  <div className="hidden md:block absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10" />
                  
                  <div className="md:ml-16 w-full">
                    <Card className="hover:shadow-lg transition-shadow duration-300 hover:border-primary/50">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-primary mb-1">
                              {experience.role}
                            </h3>
                            <h4 className="text-lg font-medium mb-2">
                              {experience.company}
                            </h4>
                          </div>
                          <div className="flex flex-col md:items-end text-sm text-muted-foreground">
                            <div className="flex items-center mb-1">
                              <Calendar className="h-4 w-4 mr-1" />
                              {experience.period}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {experience.location}
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-4">
                          {experience.description}
                        </p>
                        
                        <div>
                          <h5 className="font-medium mb-2">Key Achievements:</h5>
                          <ul className="space-y-1">
                            {experience.achievements.map((achievement, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start">
                                <span className="text-primary mr-2">•</span>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}