import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

// Angular docs: https://angular.io/tutorial/toh-pt5

// Configure an Angular Route
const routes: Routes = [
  // Traveling to 4200/heroes goes to the HeroesComponent
  { path: 'heroes', component: HeroesComponent },
  // Add a route to the dashboard component
  { path: 'dashboard', component: DashboardComponent },
  // Add a default route to the dashboard
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // Add a parameterized route to the AppRoutingModule that
  // matches the path pattern to the hero detail view
  { path: 'detail/:id', component: HeroDetailComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
