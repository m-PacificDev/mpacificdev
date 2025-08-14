"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Briefcase, MapPin, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const highlights = [
  {
    icon: Code,
    title: 'Software Engineer',
    description: 'React, React Native, Node.js, Next.js'
  },
  {
    icon: Briefcase,
    title: 'COO of Yepper Platform',
    description: 'Leading operations and strategy'
  },
  {
    icon: Target,
    title: 'Entrepreneur & Problem Solver',
    description: 'Building innovative digital solutions'
  },
  {
    icon: MapPin,
    title: 'Based in Kigali, Rwanda',
    description: 'Contributing to African tech ecosystem'
  }
];

export default function AboutSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="about" className="py-20 bg-muted/20" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-6">About Me</h2>
          
          <motion.p
            className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            I&apos;m a Rwandan-based software engineer and entrepreneur, passionate about building 
            impactful digital products. As the COO of Yepper, I lead operations and strategy while 
            actively contributing to product development. Skilled in React.js, React Native, Node.js, 
            and Next.js, I strive to create innovative solutions that empower people and businesses.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 group hover:border-primary/50">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <highlight.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{highlight.title}</h3>
                    <p className="text-sm text-muted-foreground">{highlight.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}