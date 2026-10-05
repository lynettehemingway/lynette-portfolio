import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../App';
import { createPondScene } from './pondScene';

jest.mock('./pondScene', () => ({ createPondScene: jest.fn() }));

let engine;
beforeEach(() => {
  window.matchMedia = jest.fn().mockReturnValue({ matches: false });
  engine = { feed: jest.fn(), setPaused: jest.fn(), setMoonlight: jest.fn(), resetView: jest.fn(), dispose: jest.fn() };
  createPondScene.mockReset().mockReturnValue(engine);
});

test('the intro opens an interactive pond, traps focus, and cleans up on exit', async () => {
  const { container } = render(<App />);
  const trigger = screen.getByRole('button', { name: 'Open interactive koi pond' });
  trigger.focus();
  fireEvent.click(trigger);
  const dialog = screen.getByRole('dialog', { name: 'stay a little. drift a little.' });
  const close = within(dialog).getByRole('button', { name: 'Close koi pond' });
  expect(close).toHaveFocus();
  expect(container.querySelector('.pond-site')).toHaveAttribute('inert');
  expect(document.body.style.overflow).toBe('hidden');
  const feed = within(dialog).getByRole('button', { name: 'Feed the koi' });
  await waitFor(() => expect(feed).toBeEnabled());
  expect(within(dialog).getByText('INFJ / an inner world')).toBeInTheDocument();
  fireEvent.click(within(dialog).getByRole('button', { name: /Another thought/ }));
  expect(within(dialog).getByText('Virgo / the little things')).toBeInTheDocument();
  fireEvent.click(feed);
  expect(engine.feed).toHaveBeenCalledTimes(1);
  fireEvent.click(within(dialog).getByRole('button', { name: 'Moonlight' }));
  expect(engine.setMoonlight).toHaveBeenCalledWith(true);
  fireEvent.click(within(dialog).getByRole('button', { name: 'Pause', exact: true }));
  expect(engine.setPaused).toHaveBeenCalledWith(true);
  expect(feed).toBeDisabled();
  fireEvent.click(within(dialog).getByRole('button', { name: 'Resume swimming' }));
  expect(engine.setPaused).toHaveBeenLastCalledWith(false);
  fireEvent.click(within(dialog).getByRole('button', { name: 'Reset view' }));
  expect(engine.resetView).toHaveBeenCalledTimes(1);
  act(() => createPondScene.mock.calls[0][1].onSelect(1));
  expect(within(dialog).getByText('Who makes you feel most like yourself?')).toBeInTheDocument();
  close.focus();
  fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
  expect(within(dialog).getByRole('button', { name: 'Comet' })).toHaveFocus();
  fireEvent.keyDown(document, { key: 'Tab' });
  expect(close).toHaveFocus();
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(engine.dispose).toHaveBeenCalledTimes(1);
  expect(trigger).toHaveFocus();
  expect(container.querySelector('.pond-site')).not.toHaveAttribute('inert');
  expect(document.body.style.overflow).toBe('');
});

test('reduced motion starts paused and can be resumed explicitly', async () => {
  window.matchMedia.mockReturnValue({ matches: true });
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Open interactive koi pond' }));
  await waitFor(() => expect(screen.getByRole('button', { name: 'Resume swimming' })).toBeEnabled());
  expect(createPondScene.mock.calls[0][1].reducedMotion).toBe(true);
  expect(screen.getByRole('button', { name: 'Feed the koi' })).toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: 'Resume swimming' }));
  expect(screen.getByRole('button', { name: 'Feed the koi' })).toBeEnabled();
});

test('a browser without WebGL keeps reflections and a working way back', async () => {
  createPondScene.mockImplementationOnce(() => { throw new Error('No WebGL'); });
  render(<App />);
  const trigger = screen.getByRole('button', { name: 'Open interactive koi pond' });
  fireEvent.click(trigger);
  expect(await screen.findByText(/This browser couldn’t open the 3D pond/)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Feed the koi' })).toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: 'Luna' }));
  expect(screen.getByText('What part of your inner world would you like someone to understand?')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
  await waitFor(() => expect(screen.getByRole('button', { name: 'Feed the koi' })).toBeEnabled());
  fireEvent.click(screen.getByRole('button', { name: 'Close koi pond' }));
  expect(trigger).toHaveFocus();
});
