"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useProjectContext } from '@/contexts/project-context';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Eye } from 'lucide-react';
import Image from 'next/image';

const projects = [
	{
		id: 1,
		title: 'Yepper Platform',
		description: 'A comprehensive digital platform for business operations and management.',
		description2: 'Yepper Platform empowers businesses to streamline their daily operations, manage resources, and analyze performance with ease. With a user-friendly interface and robust analytics, it is trusted by hundreds of organizations. This project involved complex backend integrations, real-time data processing, and a scalable architecture to support thousands of users. The platform also features advanced reporting tools and customizable workflows, making it adaptable to various industries. Whether you are a small business or a large enterprise, Yepper Platform provides the tools you need to succeed in a digital world.',
		thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
		images: [
			'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200',
			'https://images.pexels.com/photos/3184464/pexels-photo-3184464.jpeg?auto=compress&cs=tinysrgb&w=1200',
			'https://images.pexels.com/photos/3184463/pexels-photo-3184463.jpeg?auto=compress&cs=tinysrgb&w=1200',
		],
		views: 1250,
		likes: 89,
		website: 'https://yepper.com',
		technologies: ['React', 'Node.js', 'MongoDB']
	},
	{
		id: 2,
		title: 'E-Commerce Mobile App',
		description: 'React Native application with seamless user experience and payment integration.',
		description2: 'This mobile app delivers a smooth shopping experience with real-time inventory, secure payments, and personalized recommendations. Built with React Native and integrated with Stripe for payments, it supports push notifications, order tracking, and user reviews. The project required careful attention to cross-platform performance and accessibility. With a scalable backend and intuitive UI, it has helped merchants increase sales and customer retention. The app also features a robust admin dashboard for managing products, orders, and analytics.',
		thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
		images: [
			'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1200',
			'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1200',
			'https://images.pexels.com/photos/3184337/pexels-photo-3184337.jpeg?auto=compress&cs=tinysrgb&w=1200',
		],
		views: 890,
		likes: 64,
		website: 'https://github.com/muhirepacifique',
		technologies: ['React Native', 'Firebase', 'Stripe']
	},
	{
		id: 3,
		title: 'Corporate Website',
		description: 'Modern responsive website built with Next.js and optimized for performance.',
		description2: 'This corporate website project focused on delivering a fast, accessible, and SEO-friendly experience. Leveraging Next.js for server-side rendering, the site achieves excellent performance scores and is fully responsive across devices. The design emphasizes brand identity and clear calls to action. Advanced features include dynamic content management, localization, and integration with marketing tools. The project also included automated testing and CI/CD pipelines for reliable deployments.',
		thumbnail: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
		images: [
			'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200',
			'https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg?auto=compress&cs=tinysrgb&w=1200',
			'https://images.pexels.com/photos/3184420/pexels-photo-3184420.jpeg?auto=compress&cs=tinysrgb&w=1200',
		],
		views: 654,
		likes: 42,
		website: 'https://example.com',
		technologies: ['Next.js', 'Tailwind', 'Vercel']
	},
	{
		id: 4,
		title: 'Task Management System',
		description: 'Full-stack application for project and task management with real-time updates.',
		description2: 'This system enables teams to collaborate efficiently, assign tasks, and track progress in real time. Built with React, Express, and Socket.io, it supports notifications, file attachments, and role-based access. The UI is designed for clarity and speed, with drag-and-drop task boards and detailed analytics. The backend is optimized for scalability and security, ensuring reliable performance for organizations of any size. The project also features automated reminders and integration with third-party tools.',
		thumbnail: 'https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg?auto=compress&cs=tinysrgb&w=800',
		images: [
			'https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg?auto=compress&cs=tinysrgb&w=1200',
			'https://images.pexels.com/photos/3184312/pexels-photo-3184312.jpeg?auto=compress&cs=tinysrgb&w=1200',
			'https://images.pexels.com/photos/3184313/pexels-photo-3184313.jpeg?auto=compress&cs=tinysrgb&w=1200',
		],
		views: 567,
		likes: 38,
		website: 'https://github.com/muhirepacifique',
		technologies: ['React', 'Express', 'Socket.io']
	},
];

export default function ProjectsSection() {
	const [ref, inView] = useInView({
		threshold: 0.1,
		triggerOnce: true,
	});

	const { openProject } = useProjectContext();

	return (
		<section id="projects" className="py-20 bg-muted/20" ref={ref}>
			<div className="container mx-auto px-6">
				<motion.div
					className="max-w-6xl mx-auto"
					initial={{ opacity: 0, y: 50 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8 }}
				>
					<div className="text-center mb-12">
						<h2 className="text-4xl font-bold mb-6">Featured Projects</h2>
						<p className="text-lg text-muted-foreground">
							A showcase of my recent work and contributions
						</p>
					</div>

					<div className="grid md:grid-cols-2 gap-8">
						{projects.map((project, index) => (
							<motion.div
								key={project.id}
								initial={{ opacity: 0, y: 50 }}
								animate={inView ? { opacity: 1, y: 0 } : {}}
								transition={{ duration: 0.8, delay: index * 0.1 }}
							>
								<Card className="h-full hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden">
									<div
										className="relative h-48 overflow-hidden"
										onClick={() => openProject(project)}
									>
										<Image
											src={project.thumbnail}
											alt={project.title}
											fill
											className="object-cover transition-transform duration-300 group-hover:scale-110"
										/>
										<div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
										<div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
											<div className="bg-black/50 rounded-full p-2">
												<Eye className="h-4 w-4 text-white" />
											</div>
										</div>
									</div>

									<CardContent className="p-6">
										<h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
											{project.title}
										</h3>
										<p className="text-muted-foreground mb-4 line-clamp-2">
											{project.description}
										</p>

										<div className="flex flex-wrap gap-2 mb-4">
											{project.technologies.map((tech) => (
												<span
													key={tech}
													className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
												>
													{tech}
												</span>
											))}
										</div>

										<div className="flex items-center justify-between">
											<Button
												onClick={() => openProject(project)}
												className="hover:shadow-md transition-shadow"
											>
												View Project
											</Button>

											<Button
												variant="ghost"
												size="sm"
												onClick={(e) => {
													e.stopPropagation();
													window.open(project.website, '_blank');
												}}
												className="text-muted-foreground hover:text-foreground"
											>
												<ExternalLink className="h-4 w-4" />
											</Button>
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