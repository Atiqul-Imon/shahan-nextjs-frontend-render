"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import toast from 'react-hot-toast';

const AddProjectPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [liveLink, setLiveLink] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProject = { 
      title, 
      description, 
      image, 
      technologies: technologies.split(',').map(t => t.trim()), 
      liveLink, 
      githubLink 
    };
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/project`, newProject, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      toast.success('Project created successfully!');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Failed to create project.');
      console.error('Error creating project', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-5">Add New Project</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block mb-1">Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 rounded bg-gray-700" />
          </div>
          <div>
            <label htmlFor="image" className="block mb-1">Image URL</label>
            <input type="text" id="image" value={image} onChange={(e) => setImage(e.target.value)} className="w-full p-2 rounded bg-gray-700" />
          </div>
          <div>
            <label htmlFor="technologies" className="block mb-1">Technologies (comma separated)</label>
            <input type="text" id="technologies" value={technologies} onChange={(e) => setTechnologies(e.target.value)} className="w-full p-2 rounded bg-gray-700" />
          </div>
          <div>
            <label htmlFor="description" className="block mb-1">Description (HTML)</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="10" className="w-full p-2 rounded bg-gray-700"></textarea>
          </div>
          <div>
            <label htmlFor="liveLink" className="block mb-1">Live Demo Link</label>
            <input type="text" id="liveLink" value={liveLink} onChange={(e) => setLiveLink(e.target.value)} className="w-full p-2 rounded bg-gray-700" />
          </div>
          <div>
            <label htmlFor="githubLink" className="block mb-1">GitHub Link</label>
            <input type="text" id="githubLink" value={githubLink} onChange={(e) => setGithubLink(e.target.value)} className="w-full p-2 rounded bg-gray-700" />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create Project</button>
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default AddProjectPage; 