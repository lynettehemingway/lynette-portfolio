import {fireEvent, render, screen, within} from '@testing-library/react';
import '@testing-library/jest-dom';
import Experience from './experience';

test('each timeline dot shows only the matching job and its two bullets', () => {
  render(<Experience />);
  for (const company of ['Esri', 'EduTrend', 'TechSol']) {
    const tab = screen.getByRole('tab', {name: new RegExp(company)});
    fireEvent.click(tab);
    expect(tab).toHaveAttribute('aria-selected', 'true');
    const panels = screen.getAllByRole('tabpanel');
    expect(panels).toHaveLength(1);
    expect(panels[0]).toHaveAccessibleName(new RegExp(company));
    expect(within(panels[0]).getAllByRole('listitem')).toHaveLength(2);
  }
});

test('arrow keys switch jobs and keep focus on the selected timeline dot', () => {
  render(<Experience />);
  fireEvent.keyDown(screen.getByRole('tab', {name: /Esri/}), {key: 'ArrowLeft'});
  const tab = screen.getByRole('tab', {name: /TechSol/});
  expect(tab).toHaveFocus();
  expect(tab).toHaveAttribute('aria-selected', 'true');
  expect(screen.getByRole('tabpanel')).toHaveAccessibleName(/TechSol/);
});
