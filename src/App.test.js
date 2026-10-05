import { act, fireEvent, render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

beforeEach(() => {
  window.matchMedia = jest.fn().mockReturnValue({ matches: false });
});

test('the introduction types Lynette’s name and respects reduced motion', () => {
  jest.useFakeTimers();
  const { unmount } = render(<App />);
  act(() => jest.advanceTimersByTime(1600));
  expect(screen.getByRole('heading', { level: 1, name: "hi, i'm lynette." }).querySelector('[aria-hidden="true"]')).toHaveTextContent("hi, i'm lynette.");
  unmount();
  jest.useRealTimers();
  window.matchMedia.mockReturnValue({ matches: true });
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: "hi, i'm lynette." }).querySelector('[aria-hidden="true"]')).toHaveTextContent("hi, i'm lynette.");
});

test.each(['CARTograph', 'ClassMail'])('%s opens its own case study and restores keyboard focus on close', (name) => {
  const { container } = render(<App />);
  const card = screen.getByRole('button', { name: `Read ${name} case study` });
  card.focus();
  fireEvent.click(card);
  const dialog = screen.getByRole('dialog', { name });
  const close = within(dialog).getByRole('button', { name: 'Close case study' });
  expect(close).toHaveFocus();
  expect(container.querySelector('.pond-site')).toHaveAttribute('inert');
  expect(document.body.style.overflow).toBe('hidden');
  expect(within(dialog).getByRole('link', { name: /Figma/ })).toHaveAttribute('href', expect.stringContaining('figma.com'));
  fireEvent.keyDown(close, { key: 'Tab', shiftKey: true });
  expect(close).not.toHaveFocus();
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(card).toHaveFocus();
  expect(container.querySelector('.pond-site')).not.toHaveAttribute('inert');
  expect(document.body.style.overflow).toBe('');
});

test('mobile menu closes after navigation and the theme control works', () => {
  const { container } = render(<App />);
  const menu = screen.getByRole('button', { name: 'Menu' });
  fireEvent.click(menu);
  expect(menu).toHaveAttribute('aria-expanded', 'true');
  fireEvent.click(screen.getByRole('link', { name: 'Work', exact: true }));
  expect(menu).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(screen.getByRole('button', { name: 'Switch to light theme' }));
  expect(container.querySelector('.pond-site')).toHaveAttribute('data-theme', 'light');
  expect(screen.getByRole('link', { name: 'Experience' })).toHaveAttribute('href', '#experience-title');
  expect(screen.getByRole('heading', { name: '// experience' }).closest('details')).toBeNull();
  expect(container.querySelector('a[href$=".pdf"]')).toBeNull();
  expect(screen.getByRole('heading', { level: 1, name: "hi, i'm lynette." })).toBeInTheDocument();
});

test('contact opens a themed form, traps focus, and closes without losing the page', () => {
  const { container } = render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Switch to light theme' }));
  const trigger = screen.getByRole('button', { name: 'Contact' });
  trigger.focus();
  fireEvent.click(trigger);
  const dialog = screen.getByRole('dialog', { name: 'let’s connect.' });
  expect(dialog.closest('[data-theme]')).toHaveAttribute('data-theme', 'light');
  expect(container.querySelector('.pond-site')).toHaveAttribute('inert');
  expect(container.querySelector('.contact-section')).toBeNull();
  expect(document.body.style.overflow).toBe('hidden');
  const close = within(dialog).getByRole('button', { name: 'Close contact form' });
  expect(close).toHaveFocus();
  const form = dialog.querySelector('form');
  expect(form).toHaveAttribute('method', 'POST');
  expect(form).toHaveAttribute('action', 'https://formsubmit.co/lynette.hemingway@gmail.com');
  expect(form.checkValidity()).toBe(false);
  fireEvent.change(within(dialog).getByLabelText('Your name'), { target: { value: 'Test visitor' } });
  fireEvent.change(within(dialog).getByLabelText('Your email'), { target: { value: 'invalid-email' } });
  fireEvent.change(within(dialog).getByLabelText('What’s on your mind?'), { target: { value: 'Local test only; never submitted.' } });
  expect(form.checkValidity()).toBe(false);
  fireEvent.change(within(dialog).getByLabelText('Your email'), { target: { value: 'visitor@example.com' } });
  expect(form.checkValidity()).toBe(true);
  fireEvent.keyDown(close, { key: 'Tab', shiftKey: true });
  expect(within(dialog).getByRole('link', { name: /Write to me directly/ })).toHaveFocus();
  fireEvent.keyDown(document, { key: 'Tab' });
  expect(close).toHaveFocus();
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
  expect(container.querySelector('.pond-site')).not.toHaveAttribute('inert');
  expect(document.body.style.overflow).toBe('');
});

test('contact closes the mobile menu and returns focus to its visible menu button', () => {
  render(<App />);
  const menu = screen.getByRole('button', { name: 'Menu' });
  fireEvent.click(menu);
  fireEvent.click(screen.getByRole('button', { name: 'Contact' }));
  expect(menu).toHaveAttribute('aria-expanded', 'false');
  const dialog = screen.getByRole('dialog');
  fireEvent.click(within(dialog).getByLabelText('Your name'));
  expect(dialog).toBeInTheDocument();
  fireEvent.click(dialog.parentElement);
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(menu).toHaveFocus();
});
