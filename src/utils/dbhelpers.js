import { API, Storage } from 'aws-amplify';
import { listBlogPosts } from '../graphql/queries';
import { Errors } from './constants';

export const getBlogsFromApi = async () => {
    try {
      const apiData = await API.graphql({ query: listBlogPosts }); 
      const blogsFromApi = apiData.data.listBlogPosts.items;
  
      await Promise.all(
        blogsFromApi.map(async (blog) => {
          if (blog.postImage) {
            const url = await Storage.get(blog.postTitle);
            blog.postImage = url;
          }
          return blog;
        })
      );
  
      return blogsFromApi;

    } catch (error) {
      throw new Error(Errors.ERROR_FETCHING_BLOGS);
    }
  };