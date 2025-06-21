"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import toast from 'react-hot-toast';

const EditBlogPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/${id}`);
          const { title, content, image } = res.data;
          setTitle(title);
          setContent(content);
          setImage(image);
        } catch (error) {
          console.error("Error fetching blog", error);
        }
      };
      fetchBlog();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedBlog = { title, content, image };
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/${id}`, updatedBlog, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      toast.success('Blog post updated successfully!');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Failed to update blog post.');
      console.error('Error updating blog post', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-5">Edit Blog Post</h1>
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
            <label htmlFor="content" className="block mb-1">Content (HTML)</label>
            <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows="10" className="w-full p-2 rounded bg-gray-700"></textarea>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update Blog Post</button>
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default EditBlogPage;
