"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/blog`);
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return <p>Loading blogs...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-10">My Blog</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map(blog => (
          <div key={blog._id} className="border rounded-lg overflow-hidden shadow-lg">
            <Link href={`/blog/${blog._id}`}>
              <Image 
                src={blog.image || 'https://i.ibb.co/6ZHAD3q/placeholder.jpg'} 
                alt={blog.title}
                width={500}
                height={300}
                className="w-full h-48 object-cover" 
              />
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
                <p className="text-gray-400">{new Date(blog.createdAt).toLocaleDateString()}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage; 