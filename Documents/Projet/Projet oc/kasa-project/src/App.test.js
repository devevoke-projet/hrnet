import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';

test('renders logo', () => {
  render(<App />);
  const logo = screen.getByAltText('logo');
  expect(logo).toBeInTheDocument();
});

test('renders navigation links', () => {
  render(<App />);
  const homeLink = screen.getByText('Accueil');
  const aboutLink = screen.getByText('A propos');
  expect(homeLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
});

test('navigates to home page', () => {
  render(<App />);
  const homeLink = screen.getByText('Accueil');
  userEvent.click(homeLink);
  const homePage = screen.getByText('Chez vous, partout et ailleurs');
  expect(homePage).toBeInTheDocument();
});

test('navigates to about page', () => {
  render(<App />);
  const aboutLink = screen.getByText('A propos');
  userEvent.click(aboutLink);
  const aboutPage = screen.getByText('Fiabilité');
  expect(aboutPage).toBeInTheDocument();
});

test('applies active style to active link', () => {
  render(<App />);
  const homeLink = screen.getByText('Accueil');
  const aboutLink = screen.getByText('A propos');
  userEvent.click(homeLink);
  expect(homeLink).toHaveStyle('text-decoration: underline');
  expect(aboutLink).not.toHaveStyle('text-decoration: underline');
});
