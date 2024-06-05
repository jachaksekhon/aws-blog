import React from 'react';
import { Heading, RadioGroupField, Radio } from "@aws-amplify/ui-react";
import { Titles, CategoryTypes } from '../../utils/constants';

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <>
      <Heading level={4} className="text-tan">
        {Titles.categoryFilterTitle}
      </Heading>
      <RadioGroupField
        direction="column"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <Radio value="All">{CategoryTypes.all}</Radio>
        <Radio value="Technology">{CategoryTypes.technology}</Radio>
        <Radio value="Finance">{CategoryTypes.finance}</Radio>
        <Radio value="Gaming">{CategoryTypes.gaming}</Radio>
      </RadioGroupField>
    </>
  );
};

export default CategoryFilter;
