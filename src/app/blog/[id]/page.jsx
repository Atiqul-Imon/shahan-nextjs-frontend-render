"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Image from 'next/image';

const BlogDetailsPage = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/${id}`);
          setBlog(res.data);
        } catch (error) {
          console.error("Error fetching blog details", error);
        } finally {
          setLoading(false);
        }
      };
      fetchBlog();
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!blog) {
    return <p>Blog not found.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold my-5">{blog.title}</h1>
      <p className="text-gray-400 mb-4">Published on {new Date(blog.createdAt).toLocaleDateString()}</p>
      <Image 
        src={blog.image || 'https://i.ibb.co/6ZHAD3q/placeholder.jpg'} 
        alt={blog.title}
        width={800}
        height={400}
        className="w-full h-96 object-cover rounded-lg"
      />
      <div className="prose dark:prose-invert max-w-none mt-8" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
    </div>
  );
};

export default BlogDetailsPage; 