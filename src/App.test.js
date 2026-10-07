import { act, fireEvent, render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

beforeEach(() => {
  window.scrollTo = jest.fn();
  localStorage.clear();
  global.ResizeObserver = class { observe() {} disconnect() {} };
  window.location.hash = '#projects';
  window.matchMedia = jest.fn().mockReturnValue({ matches: false });
});

test('selected projects show three previews and adjacent case-study links', () => {
  const {container} = render(<App />);
  expect(screen.getByRole('heading', {level: 1, name: 'Projects'})).toBeInTheDocument();
  expect(document.documentElement).toHaveClass('portfolio-viewport-fixed');
  expect(container.querySelectorAll('.project-editorial-card')).toHaveLength(3);
  expect(screen.getByText('Functional proof of concept')).toBeInTheDocument();
  expect(screen.getByText('Interactive MVP prototype')).toBeInTheDocument();
  expect(screen.getByText('IoT project · Source available')).toBeInTheDocument();
  expect(screen.getByRole('button', {name: 'Index', exact: true})).toHaveAttribute('aria-pressed', 'true');
  expect(container.querySelector('.selected-project-grid')).toHaveClass('selected-project-grid--index');
  fireEvent.click(screen.getByRole('button', {name: 'Plates', exact: true}));
  expect(container.querySelector('.selected-project-grid')).toHaveClass('selected-project-grid--plates');
  expect(container.querySelectorAll('.project-editorial-card')).toHaveLength(3);
  expect(screen.queryByRole('button', {name: /Next project/})).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', {name: 'Spotlight', exact: true}));
  expect(screen.getByRole('button', {name: 'Spotlight', exact: true})).toHaveAttribute('aria-pressed', 'true');
  expect(container.querySelectorAll('.project-editorial-card')).toHaveLength(1);
  expect(screen.getByRole('button', {name: 'Read CARTograph case study'})).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', {name: 'Next project →'}));
  expect(screen.getByRole('button', {name: 'Read ClassMail case study'})).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', {name: '← Previous project'}));
  expect(screen.getByRole('button', {name: 'Read CARTograph case study'})).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', {name: 'Index', exact: true}));
  expect(screen.getByRole('link', {name: 'View more projects'})).toHaveAttribute('href', '#project-journal');
  expect(screen.getByRole('link', {name: 'View PicklePortal project'})).toHaveAttribute('href', expect.stringContaining('github.com'));
  for (const name of ['CARTograph', 'ClassMail']) {
    const actions = screen.getByRole('button', {name: 'Read ' + name + ' case study'}).parentElement;
    expect(within(actions).getByRole('link', {name: 'View ' + name + ' project'})).toHaveAttribute('href', expect.stringContaining('https://'));
  }
  expect(screen.queryByText(/food diary/i)).not.toBeInTheDocument();
});

test('view more opens a separate journal containing the other seven projects and a way back', () => {
  const {container} = render(<App />);
  window.location.hash = screen.getByRole('link', {name: 'View more projects'}).getAttribute('href');
  fireEvent(window, new HashChangeEvent('hashchange'));
  expect(screen.getByRole('heading', {name: 'More projects'})).toBeInTheDocument();
  expect(document.documentElement).not.toHaveClass('portfolio-viewport-fixed');
  expect(container.querySelectorAll('.project-journal-entry')).toHaveLength(7);
  for (const name of ['NaviGator', 'UFFSA', 'Centsible', 'uweather ☁', 'Deadbeat', 'CostCompass', 'Lion Dance Team']) {
    expect(screen.getByRole('link', {name: 'View ' + name + ' project'})).toHaveAttribute('href', expect.stringContaining('https://'));
  }
  expect(screen.getByRole('link', {name: 'Projects', exact: true})).toHaveAttribute('aria-current', 'page');
  window.location.hash = screen.getByRole('link', {name: 'Back to selected projects'}).getAttribute('href');
  fireEvent(window, new HashChangeEvent('hashchange'));
  expect(screen.getByRole('heading', {name: 'Projects'})).toBeInTheDocument();
  expect(document.documentElement).toHaveClass('portfolio-viewport-fixed');
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
  const summary = within(dialog).getByLabelText('Project at a glance');
  for (const label of ['Problem', 'My contribution', 'Result']) expect(within(summary).getByText(label, {exact: true})).toBeInTheDocument();
  expect(within(dialog).getByRole('heading', {name: 'Existing workflow'})).toBeInTheDocument();
  expect(within(dialog).getByRole('heading', {name: 'Proposed experience'})).toBeInTheDocument();
  expect(within(dialog).getByText('Validation so far.')).toBeInTheDocument();
  if (name === 'CARTograph') expect(within(dialog).getByRole('link', {name: 'View project on Devpost'})).toHaveAttribute('href', 'https://devpost.com/software/cartograph');
  expect(within(dialog).getByRole('link', { name: /Figma/ })).toHaveAttribute('href', expect.stringContaining('figma.com'));
  fireEvent.keyDown(close, { key: 'Tab', shiftKey: true });
  expect(close).not.toHaveFocus();
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(card).toHaveFocus();
  expect(container.querySelector('.pond-site')).not.toHaveAttribute('inert');
  expect(document.body.style.overflow).toBe('');
});

test('navigation links lead to separate pages', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: 'Work', exact: true })).toHaveAttribute('href', '#work');
  expect(screen.getByRole('link', { name: 'Projects', exact: true })).toHaveAttribute('href', '#projects');
});

test('contact displays a usable form immediately without a dialog', () => {
  window.location.hash = '#contact';
  const {container} = render(<App />);
  expect(screen.getByRole('heading', {level:1, name:/contact me!/i})).toBeInTheDocument();
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(container.querySelector('.pond-site')).not.toHaveAttribute('inert');
  const form = screen.getByRole('form', {name:'Send Lynette a message'});
  expect(form).toHaveAttribute('method','POST');
  expect(form).toHaveAttribute('action','https://formsubmit.co/lynette.hemingway@gmail.com');
  expect(form.checkValidity()).toBe(false);
  fireEvent.change(screen.getByLabelText('Your name'), {target:{value:'Test visitor'}});
  fireEvent.change(screen.getByLabelText('Your email'), {target:{value:'invalid-email'}});
  fireEvent.change(screen.getByLabelText(/on your mind/), {target:{value:'Local test only; never submitted.'}});
  expect(form.checkValidity()).toBe(false);
  fireEvent.change(screen.getByLabelText('Your email'), {target:{value:'visitor@example.com'}});
  expect(form.checkValidity()).toBe(true);
  fireEvent.keyDown(document,{key:'Escape'});
  expect(form).toBeInTheDocument();
});

test('contact examples browse by keyboard and preserve an existing draft', () => {
  window.location.hash = '#contact';
  window.matchMedia = jest.fn().mockReturnValue({matches: true});
  render(<App />);
  const first = screen.getByRole('button', {name: /Use example: Hey Lynette, I’d love to talk/});
  fireEvent.keyDown(first, {key: 'ArrowRight'});
  const project = screen.getByRole('button', {name: /Use example: Hey Lynette, your CARTograph/});
  const message = screen.getByLabelText(/on your mind/);
  fireEvent.change(message, {target: {value: 'My existing draft.'}});
  fireEvent.click(project);
  expect(message).toHaveFocus();
  expect(message.value).toBe('My existing draft.\n\nHey Lynette, your CARTograph case study caught my eye. Let’s chat!');
  fireEvent.click(project);
  expect(message.value.match(/CARTograph/g)).toHaveLength(1);
  fireEvent.click(screen.getByRole('button', {name: 'say hello', exact: true}));
  expect(screen.getByRole('button', {name: /Use example: Hey Lynette, I found a matcha/})).toHaveTextContent('Hey Lynette, I found a matcha spot you might love!');
});

test('work has no résumé link and the copyright is visible', () => {
  window.location.hash = '#work';
  render(<App />);
  expect(screen.queryByRole('link', {name:/résumé|resume/i})).not.toBeInTheDocument();
  expect(screen.getByText('© 2026 LYNETTE')).toBeInTheDocument();
});

test('work timeline contains EduTrend, TechSol, and Esri with Esri selected at the right', () => {
  window.location.hash = '#work';
  render(<App />);
  const tabs = screen.getAllByRole('tab');
  expect(tabs.map(tab => tab.textContent)).toEqual([
    expect.stringContaining('EduTrend'),
    expect.stringContaining('TechSol'),
    expect.stringContaining('Esri')
  ]);
  expect(document.documentElement).toHaveClass('portfolio-viewport-fixed');
  expect(tabs[2]).toHaveAttribute('aria-selected', 'true');
  expect(screen.getByRole('tabpanel').querySelectorAll('.work-role-contributions>li')).toHaveLength(3);
  expect(screen.queryByRole('group', {name: 'Read each contribution'})).not.toBeInTheDocument();
  expect(screen.getByRole('tabpanel')).toHaveTextContent('interactive strand-identification tool');
  tabs[2].focus();
  fireEvent.keyDown(tabs[2], {key: 'ArrowLeft'});
  expect(tabs[1]).toHaveFocus();
  expect(screen.getByRole('tabpanel')).toHaveTextContent('7,000+ users');
  fireEvent.keyDown(tabs[1], {key: 'Home'});
  expect(tabs[0]).toHaveFocus();
  expect(screen.getByRole('tabpanel')).toHaveTextContent('Elevated responsive interfaces across desktop and mobile');
  fireEvent.keyDown(tabs[0], {key: 'End'});
  expect(tabs[2]).toHaveFocus();
});

test('home matches the Figma introduction and does not stack the other pages', () => {
  window.location.hash = '#home';
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: 'hello, i’m lynette.' })).toBeInTheDocument();
  expect(screen.getByText('I’m Lynette Hemingway, a product designer at the University of Florida.')).toBeInTheDocument();
  expect(screen.getByRole('link', {name: 'View selected work'})).toHaveAttribute('href', '#projects');
  expect(screen.getByAltText('Hand-drawn sage green koi fish')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Home', exact: true })).toHaveAttribute('aria-current', 'page');
  expect(screen.queryByRole('button', { name: 'Read CARTograph case study' })).not.toBeInTheDocument();
});



test('the theme choice persists after navigation and can return to light', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', {name: 'Switch to dark mode'}));
  expect(document.documentElement).toHaveAttribute('data-portfolio-theme', 'dark');
  expect(localStorage.getItem('portfolio-theme')).toBe('dark');
  window.location.hash = '#work';
  fireEvent(window, new HashChangeEvent('hashchange'));
  expect(screen.getByRole('button', {name: 'Switch to light mode'})).toHaveAttribute('aria-pressed', 'true');
  fireEvent.click(screen.getByRole('button', {name: 'Switch to light mode'}));
  expect(document.documentElement).toHaveAttribute('data-portfolio-theme', 'light');
});

test('the greeting types once and reduced motion shows it immediately', () => {
  window.location.hash = '#home';
  jest.useFakeTimers();
  const {container, unmount} = render(<App />);
  expect(container.querySelector('.typing-visible').textContent).toBe('');
  act(() => jest.advanceTimersByTime(190));
  expect(container.querySelector('.typing-visible').textContent).toBe('he');
  act(() => jest.advanceTimersByTime(2000));
  expect(container.querySelector('.typing-visible').textContent).toBe('hello, i’m lynette.');
  unmount();
  jest.useRealTimers();
  window.matchMedia.mockReturnValue({matches:true});
  const reduced = render(<App />);
  expect(reduced.container.querySelector('.typing-visible').textContent).toBe('hello, i’m lynette.');
});

test('homepage illustration can replay and opens the ClassMail story directly', () => {
  window.location.hash = '#home';
  render(<App />);
  const toggle = screen.getByRole('button', {name: 'Find the important stuff'});
  expect(toggle).toHaveAttribute('aria-pressed', 'false');
  fireEvent.click(toggle);
  expect(screen.getByRole('button', {name: 'Replay the before'})).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByText('A small illustration of the ClassMail concept.')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', {name: 'Replay the before'}));
  expect(screen.getByRole('button', {name: 'Find the important stuff'})).toHaveAttribute('aria-pressed', 'false');
  window.location.hash = screen.getByRole('link', {name: 'Read the design story'}).getAttribute('href');
  fireEvent(window, new HashChangeEvent('hashchange'));
  expect(screen.getByRole('dialog', {name: 'ClassMail'})).toBeInTheDocument();
  fireEvent.keyDown(document, {key: 'Escape'});
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(window.location.hash).toBe('#projects');
  expect(screen.getByRole('heading', {name: 'Projects', exact: true})).toHaveFocus();
});

test('mobile navigation hides the page while open and Escape returns focus', () => {
  window.matchMedia.mockReturnValue({matches:true});
  const {container}=render(<App />);
  const open=screen.getByRole('button',{name:'Open navigation',exact:true});
  fireEvent.click(open);
  expect(screen.getByRole('button',{name:'Close navigation',exact:true})).toHaveAttribute('aria-expanded','true');
  expect(container.querySelector('main')).toHaveAttribute('inert');
  fireEvent.keyDown(document,{key:'Escape'});
  expect(screen.getByRole('button',{name:'Open navigation',exact:true})).toHaveFocus();
  expect(container.querySelector('main')).not.toHaveAttribute('inert');
  fireEvent.click(open);
  fireEvent.click(screen.getByRole('link',{name:'Work',exact:true}));
  expect(open).toHaveAttribute('aria-expanded','false');
});
