import { useBlogs } from '../context/BlogContext';
import { useState } from 'react';
import "@aws-amplify/ui-react/styles.css";
import { Heading, View, Flex, RadioGroupField, Radio, Button } from "@aws-amplify/ui-react";
import BlogSnippet from './BlogSnippet';
import SubscriptionForm from './SubscriptionForm';
import CategoryFilter from './partials/CategoryFilter';

export const HomePage = () => {
  const { blogs } = useBlogs();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);

  const handleSubscribeClick = () => {
    setIsSubscriptionOpen(true);
  };

  const handleSubscriptionClose = () => {
    setIsSubscriptionOpen(false);
  };

  return (
    <>
      <Flex direction="row" gap="2rem" justifyContent="center">
        <View>
          <CategoryFilter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
        </View>

        <View>
          {Array.isArray(blogs) && blogs
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .filter(
              (blog) =>
                selectedCategory === 'All' || blog.postCategory === selectedCategory
            )
            .map((blog) => (
              <BlogSnippet
                key={blog.id || blog.postTitle}
                post={blog}
                showDelButton={false}
                showEditButton={false}
              />
            ))}
        </View>

        <View>
          <Button onClick={handleSubscribeClick}>Subscribe to Posts</Button>
          <SubscriptionForm isOpen={isSubscriptionOpen} onRequestClose={handleSubscriptionClose} />
        </View>
      </Flex>
    </>
  );
};

export default HomePage;
