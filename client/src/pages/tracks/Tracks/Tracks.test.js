import { render, screen } from '@testing-library/react';
import React from 'react';
import Tracks from './Tracks';

test('renders learn react link', () => {
  render(<Tracks />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
