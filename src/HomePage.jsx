import { useBlogs } from './context/BlogContext';
import { useState } from 'react';
import "@aws-amplify/ui-react/styles.css";
import { Heading, View, Flex, RadioGroupField, Radio, Button } from "@aws-amplify/ui-react";
import BlogSnippet from './BlogSnippet';
import SubscriptionForm from './SubscriptionForm';

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
          <Heading level={4} className="text-tan">
            Filter by Category:
          </Heading>
          <RadioGroupField
            direction="column"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <Radio value="All">All</Radio>
            <Radio value="Technology">Technology</Radio>
            <Radio value="Finance">Finance</Radio>
            <Radio value="Gaming">Gaming</Radio>
          </RadioGroupField>
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
