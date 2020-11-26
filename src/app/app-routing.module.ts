import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './heroes/hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';


const routes: Routes = [
  {path: '', redirectTo:'/dashboard', pathMatch: "full"},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'heroes', component: HeroesComponent},
  {path: 'details/:id', component: HeroDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 