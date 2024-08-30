import React from 'react';
import { render, screen } from '@testing-library/react';
import { CatCard } from 'components/CatCard'; 
import '@testing-library/jest-dom';
import { CatImage } from 'types/CatImage'; 

// An example of a test in React Testing Library, the test doesn't work due to Typescript configuration mismatch - needs more investigation. 
const mockCat = {
  id: '1',
  url: 'https://example.com/cat.jpg',
  width: 200,
  height: 200
};

const mockOnVote = jest.fn();

describe('CatCard Component', () => {
  it('should render the cat image', () => {
    render(<CatCard cat={mockCat} score={10} onVote={mockOnVote} isFavourite={false} favouriteId={null} />);

    const catImage = screen.getByAltText('A random cat');
    expect(catImage).toBeInTheDocument();
    expect(catImage).toHaveAttribute('src', mockCat.url);
  });

  it('should render the favourite button with "Add to favourite" and HeartOutlined icon', () => {
    render(<CatCard cat={mockCat} score={10} onVote={mockOnVote} isFavourite={false} favouriteId={null} />);

    const favouriteButton = screen.getByRole('button', { name: /Add to favourite/i });
    expect(favouriteButton).toBeInTheDocument();

    expect(screen.getByLabelText('heart-outlined')).toBeInTheDocument();
  });
});
