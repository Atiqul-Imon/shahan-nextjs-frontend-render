"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import toast from 'react-hot-toast';

const DashboardPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [projects, setProjects] = useState([]);

  const fetchData = async () => {
    try {
      const [blogRes, projectRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/blog`),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/project`),
      ]);
      setBlogs(blogRes.data);
      setProjects(projectRes.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  const handleDelete = async (type, id) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/${type}/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            toast.success(`${type} deleted successfully`);
            fetchData();
        } catch (error) {
            toast.error(`Failed to delete ${type}`);
            console.error(`Error deleting ${type}`, error);
        }
    }
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-5">Dashboard</h1>
        <div className="flex space-x-4 mb-5">
            <Link href="/dashboard/add-blog" className="bg-blue-500 text-white px-4 py-2 rounded">Add New Blog</Link>
            <Link href="/dashboard/add-project" className="bg-blue-500 text-white px-4 py-2 rounded">Add New Project</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
                <h2 className="text-2xl font-bold mb-3">Blogs</h2>
                <ul>
                    {blogs.map(blog => (
                        <li key={blog._id} className="mb-2 flex justify-between items-center">
                            <span>{blog.title}</span>
                            <div>
                                <Link href={`/dashboard/edit-blog/${blog._id}`} className="text-yellow-500 mr-2">Edit</Link>
                                <button onClick={() => handleDelete('blog', blog._id)} className="text-red-500">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-3">Projects</h2>
                <ul>
                    {projects.map(project => (
                        <li key={project._id} className="mb-2 flex justify-between items-center">
                            <span>{project.title}</span>
                            <div>
                                <Link href={`/dashboard/edit-project/${project._id}`} className="text-yellow-500 mr-2">Edit</Link>
                                <button onClick={() => handleDelete('project', project._id)} className="text-red-500">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage; 