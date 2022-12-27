import { ListComponent } from '@ams/feature/people/list/list.component';
import { RandomComponent } from '@ams/feature/people/random/random.component';
import { type Routes } from '@angular/router';
import { render, screen, type RenderComponentOptions } from '@testing-library/angular';
import { HeaderComponent } from './header.component';

const TEST_ROUTES: Routes = [
  { path: 'peoples/random', component: RandomComponent },
  { path: 'peoples/list', component: ListComponent },
];

const COMMON_OPTIONS: RenderComponentOptions<HeaderComponent> = {
  imports: [RandomComponent, ListComponent],
  routes: TEST_ROUTES,
};

describe('HeaderComponent', () => {
  test('should create an instance of HeaderComponent', async () => {
    const { fixture } = await render(HeaderComponent, COMMON_OPTIONS);
    expect(fixture.componentInstance).toBeTruthy();
  });

  test('should display an image with the logo-sfeir', async () => {
    await render(HeaderComponent, COMMON_OPTIONS);
    expect(screen.findByAltText('sfeir-logo')).toBeTruthy();
  });

  test('should display two links for the menu, one random and the other one list', async () => {
    await render(HeaderComponent, COMMON_OPTIONS);
    const items = await screen.findAllByRole('item');
    expect(items.length).toEqual(2);
    expect(items[0].textContent).toContain('Random');
    expect(items[1].textContent).toContain('List');
  });

  test('should add the class active when the user is on path /peoples/random', async () => {
    const { navigate, fixture } = await render(HeaderComponent, COMMON_OPTIONS);
    await navigate('/peoples/random');
    fixture.detectChanges();
    expect(screen.getByText(/Random/).classList.contains('active')).toBeTruthy();
    expect(screen.getByText(/List/).classList.contains('active')).toBeFalsy();
  });

  test('should add the class active when the user is on path /peoples/random', async () => {
    const { navigate, fixture } = await render(HeaderComponent, COMMON_OPTIONS);
    await navigate('/peoples/list');
    fixture.detectChanges();
    expect(screen.getByText(/Random/).classList.contains('active')).toBeFalsy();
    expect(screen.getByText(/List/).classList.contains('active')).toBeTruthy();
  });
});
