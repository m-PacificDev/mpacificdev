"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const skills = [
  { name: 'React.js', level: 95, category: 'Frontend' },
  { name: 'React Native', level: 90, category: 'Mobile' },
  { name: 'Node.js', level: 88, category: 'Backend' },
  { name: 'Next.js', level: 92, category: 'Frontend' },
  { name: 'MongoDB', level: 85, category: 'Database' },
  { name: 'Tailwind CSS', level: 93, category: 'Frontend' },
  { name: 'Firebase', level: 87, category: 'Backend' },
  { name: 'PL/SQL', level: 80, category: 'Database' },
  { name: 'Oracle DB', level: 78, category: 'Database' },
  { name: 'API Integrations', level: 90, category: 'Backend' },
];

const categories = ['Frontend', 'Backend', 'Mobile', 'Database'];

export default function SkillsSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const groupedSkills = categories.map(category => ({
    category,
    skills: skills.filter(skill => skill.category === category)
  }));

  return (
    <section id="skills" className="py-20" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">Technical Skills</h2>
            <p className="text-lg text-muted-foreground">
              Technologies and tools I use to bring ideas to life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {groupedSkills.map((group, groupIndex) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: groupIndex * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 text-primary">{group.category}</h3>
                    <div className="space-y-4">
                      {group.skills.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ duration: 0.5, delay: (groupIndex * 0.1) + (index * 0.05) }}
                        >
                          <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-muted-foreground">{skill.level}%</span>
                          </div>
                          <Progress 
                            value={inView ? skill.level : 0} 
                            className="h-2"
                          />
                        </motion.div>
                      ))}
                    </div>
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