import {act} from 'react';
import {fireEvent, render, screen, within} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

beforeEach(() => {
  window.history.replaceState(null, '', '#home');
  window.matchMedia = jest.fn().mockReturnValue({matches: false});
  window.scrollTo = jest.fn();
  jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
});

test('introduces the designer and keeps decorative sky text out of the accessibility tree', () => {
  const {container} = render(<App />);
  expect(screen.getByRole('heading', {level: 1, name: 'Lynette Hemingway'})).toBeInTheDocument();
  expect(screen.getByText('Product Designer')).toBeInTheDocument();
  expect(container.querySelector('.ascii-sky')).toHaveAttribute('aria-hidden', 'true');
  const nav = screen.getByRole('navigation', {name: 'Main navigation'});
  expect(within(nav).getAllByRole('link')).toHaveLength(3);
  expect(within(nav).queryByRole('link', {name: 'Home'})).not.toBeInTheDocument();
  expect(within(nav).getByRole('link', {name: 'Projects'})).toHaveAttribute('href', '#projects');
});

test('reveals the name without changing its accessible label or showing removed controls', () => {
  jest.useFakeTimers();
  const {container, unmount} = render(<App />);
  expect(screen.getByRole('heading', {name: 'Lynette Hemingway'})).toBeInTheDocument();
  expect(container.querySelectorAll('.typing-ink')[0]).toHaveTextContent('');
  act(() => {jest.advanceTimersByTime(1800);});
  expect(container.querySelectorAll('.typing-ink')[0]).toHaveTextContent('Lynette');
  expect(container.querySelectorAll('.typing-ink')[1]).toHaveTextContent('Hemingway');
  expect(container.querySelector('.name-caret')).not.toBeInTheDocument();
  expect(screen.queryByRole('button', {name: /atmosphere|about me/i})).not.toBeInTheDocument();
  unmount();
  jest.useRealTimers();
});

test('shows the complete name immediately when reduced motion is enabled', () => {
  window.matchMedia = jest.fn().mockReturnValue({matches: true});
  const {container} = render(<App />);
  expect(container.querySelectorAll('.typing-ink')[0]).toHaveTextContent('Lynette');
  expect(container.querySelectorAll('.typing-ink')[1]).toHaveTextContent('Hemingway');
  expect(container.querySelector('.name-caret')).not.toBeInTheDocument();
});

test('mobile navigation opens, closes with Escape, and closes when returning home', () => {
  render(<App />);
  const toggle = screen.getByRole('button', {name: 'Open navigation'});
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
  fireEvent.keyDown(toggle, {key: 'Escape'});
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(toggle);
  fireEvent.click(screen.getByRole('link', {name: 'Projects'}));
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

test('existing hash routes still navigate out of the starfield and back', async () => {
  const {container} = render(<App />);
  act(() => {
    window.history.pushState(null, '', '#work');
    window.dispatchEvent(new Event('hashchange'));
  });
  expect(screen.getByRole('link', {name: 'Work'})).toHaveAttribute('aria-current', 'page');
  expect(container.querySelector('.ascii-sky')).toBeInTheDocument();
  act(() => {
    window.history.pushState(null, '', '#home');
    window.dispatchEvent(new Event('hashchange'));
  });
  expect(screen.getByRole('heading', {name: 'Lynette Hemingway'})).toBeInTheDocument();
});
