import {act} from 'react';
import {fireEvent, render, screen, within} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

beforeEach(()=>{
 window.history.replaceState(null,'','#home');
 window.matchMedia=jest.fn().mockReturnValue({matches:false});
 jest.spyOn(HTMLCanvasElement.prototype,'getContext').mockReturnValue(null);
});
const navigate=hash=>act(()=>{window.history.pushState(null,'',hash);window.dispatchEvent(new Event('hashchange'));});

test('uses one four-link navigation and fills the browser without laptop controls',()=>{
 const {container}=render(<App/>);
 const nav=screen.getByRole('navigation',{name:'Main navigation'});
 expect(within(nav).getAllByRole('link')).toHaveLength(4);
 expect(screen.getAllByRole('navigation')).toHaveLength(1);
 expect(screen.getByRole('link',{name:'View selected work'})).toHaveAttribute('href','#projects');
 expect(container.querySelector('.laptop-scene')).not.toBeInTheDocument();
 expect(container.querySelector('.taskbar')).not.toBeInTheDocument();
 expect(container.querySelector('.pond-background')).toHaveAttribute('aria-hidden','true');
 expect(container.querySelector('.about-portrait figcaption')).not.toBeInTheDocument();
 expect(screen.queryByRole('button')).not.toBeInTheDocument();
 expect(screen.getByText('CS @ UF · studying product design')).toBeInTheDocument();
});
test('navigation changes sections and tracks the active page',()=>{
 render(<App/>);
 navigate('#work');
 expect(screen.getByRole('heading',{name:/^Work experience/})).toBeInTheDocument();
 expect(screen.getByRole('heading',{name:'Esri'})).toBeInTheDocument();
 expect(screen.getByRole('link',{name:'Experience'})).toHaveAttribute('aria-current','page');
 navigate('#contact');
 expect(screen.getByLabelText('Your name')).toBeInTheDocument();
 expect(screen.getByLabelText('Your email')).toHaveAttribute('type','email');
 expect(screen.getByRole('button',{name:/Send message/})).toBeInTheDocument();
});
test('legacy quiz links fall back to the portfolio',()=>{
 window.history.replaceState(null,'','#quizzes');
 render(<App/>);
 expect(screen.getByRole('heading',{name:/^Lynette/})).toBeInTheDocument();
 expect(screen.queryByText('quizzes.exe')).not.toBeInTheDocument();
 expect(screen.queryByText('now_playing.mp3')).not.toBeInTheDocument();
});
test('projects have one card action each, moving previews and accessible expanded details',()=>{
 window.history.replaceState(null,'','#projects');
 render(<App/>);
 expect(screen.getByRole('heading',{name:/^Selected projects/})).toBeInTheDocument();
 expect(screen.getAllByRole('button',{name:/^View .* project$/})).toHaveLength(10);
 expect(screen.queryByRole('group',{name:'Project layout'})).not.toBeInTheDocument();
 fireEvent.click(screen.getByRole('button',{name:'Pause project strip'}));
 expect(screen.getByRole('button',{name:'Resume project strip'})).toHaveAttribute('aria-pressed','true');
 screen.getByRole('button',{name:'View PicklePortal project'}).focus();
 fireEvent.click(screen.getByRole('button',{name:'View PicklePortal project'}));
 let dialog=screen.getByRole('dialog',{name:'PicklePortal'});
 expect(within(dialog).getByRole('link',{name:/Open source/})).toHaveAttribute('href','https://github.com/RJ-Tabelon/PicklePortal');
 expect(screen.getByRole('button',{name:'Close project preview'})).toHaveFocus();
 fireEvent.keyDown(document,{key:'Escape'});
 expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
 expect(screen.getByRole('button',{name:'View PicklePortal project'})).toHaveFocus();
 fireEvent.click(screen.getByRole('button',{name:'View CARTograph project'}));
 dialog=screen.getByRole('dialog',{name:'CARTograph'});
 fireEvent.click(within(dialog).getByRole('button',{name:'Read full case study'}));
 expect(screen.getByRole('heading',{name:'The challenge'})).toBeInTheDocument();
 fireEvent.keyDown(document,{key:'Escape'});
 expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('contact prompts browse topics, preserve drafts, and focus the message field',()=>{
 window.history.replaceState(null,'','#contact');
 window.matchMedia=jest.fn().mockReturnValue({matches:true});
 render(<App/>);
 const message=screen.getByRole('textbox',{name:/on your mind/});
 const topics=screen.getByRole('group',{name:'Message examples'});
 expect(within(topics).getByRole('button',{name:'a role'})).toHaveAttribute('aria-pressed','true');
 fireEvent.change(message,{target:{value:'Hello!'}});
 fireEvent.click(screen.getByRole('button',{name:/Use example:.*product design role/}));
 expect(message.value).toMatch(/^Hello!\n\nHey Lynette/);
 expect(message).toHaveFocus();
 const draft=message.value;
 fireEvent.click(screen.getByRole('button',{name:/Use example:.*product design role/}));
 expect(message.value).toBe(draft);
 fireEvent.click(screen.getByRole('button',{name:'Next message example'}));
 expect(within(topics).getByRole('button',{name:'a project'})).toHaveAttribute('aria-pressed','true');
 const example=screen.getByRole('button',{name:/Use example:.*CARTograph/});
 fireEvent.keyDown(example,{key:'ArrowRight'});
 expect(within(topics).getByRole('button',{name:'say hello'})).toHaveAttribute('aria-pressed','true');
 fireEvent.click(screen.getByRole('button',{name:'Previous message example'}));
 expect(within(topics).getByRole('button',{name:'a project'})).toHaveAttribute('aria-pressed','true');
 fireEvent.click(screen.getByRole('button',{name:/Use example:.*CARTograph/}));
 expect(message.value).toContain('CARTograph');
 expect(message.value).toContain('Hello!');
});
