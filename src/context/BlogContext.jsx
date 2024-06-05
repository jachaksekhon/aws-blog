import React, { createContext, useContext, useState, useEffect } from 'react';
import { getBlogsFromApi } from '../utils/dbhelpers';

const BlogContext = createContext();

export const useBlogs = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await getBlogsFromApi();
      setBlogs(blogs);
    };

    fetchBlogs();
  }, []);

  return (
    <BlogContext.Provider value={{ blogs, setBlogs }}>
      {children}
    </BlogContext.Provider>
  );
};
