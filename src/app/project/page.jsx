"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/project`);
        setProjects(res.data);
      } catch (error) {
        console.error("Error fetching projects", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return <p>Loading projects...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-10">My Projects</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(project => (
          <div key={project._id} className="border rounded-lg overflow-hidden shadow-lg">
            <Link href={`/project/${project._id}`}>
              <Image 
                src={project.image || 'https://i.ibb.co/6ZHAD3q/placeholder.jpg'} 
                alt={project.title}
                width={500}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
                <p className="text-gray-400">{project.technologies.join(', ')}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage; 