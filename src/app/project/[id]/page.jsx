"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const ProjectDetailsPage = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/project/${id}`);
          setProject(res.data);
        } catch (error) {
          console.error("Error fetching project details", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProject();
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!project) {
    return <p>Project not found.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold my-5">{project.title}</h1>
      <Image 
        src={project.image || 'https://i.ibb.co/6ZHAD3q/placeholder.jpg'} 
        alt={project.title}
        width={800}
        height={400}
        className="w-full h-96 object-cover rounded-lg"
      />
      <div className="my-5">
        <h2 className="text-2xl font-bold">Technologies</h2>
        <p>{project.technologies.join(', ')}</p>
      </div>
      <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: project.description }}></div>
      <div className="my-5 flex space-x-4">
        <Link href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          Live Demo
        </Link>
        <Link href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          GitHub Repository
        </Link>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
