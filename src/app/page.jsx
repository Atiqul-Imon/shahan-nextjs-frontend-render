"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogRes, projectRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/blog`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/project`),
        ]);
        setBlogs(blogRes.data.slice(0, 3));
        setProjects(projectRes.data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <section className="text-center my-10">
        <h1 className="text-4xl font-bold">Welcome to My Portfolio</h1>
        <p className="text-xl mt-2">I build things for the web.</p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-5">Latest Blogs</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {blogs.map(blog => (
            <div key={blog._id} className="border p-4 rounded">
              <h3 className="text-xl font-bold">{blog.title}</h3>
              <Link href={`/blog/${blog._id}`} className="text-blue-500">Read More</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="my-10">
        <h2 className="text-3xl font-bold mb-5">Recent Projects</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {projects.map(project => (
            <div key={project._id} className="border p-4 rounded">
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p>{project.description.substring(0, 100)}...</p>
              <Link href={`/project/${project._id}`} className="text-blue-500">View Project</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage; 