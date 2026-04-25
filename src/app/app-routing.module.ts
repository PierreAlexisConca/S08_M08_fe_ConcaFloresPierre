import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnrollmentsComponent } from './pages/enrollments/enrollments.component';
import { HomeComponent } from './pages/home/home.component';
import { CoursesComponent } from './components/courses/courses.component';
import { BenefitsComponent } from './components/benefits/benefits.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'enrollments', component: EnrollmentsComponent },
  { path: 'mascotas', component: CoursesComponent },
  { path: 'razas', component: BenefitsComponent },
  { path: 'duenos', component: ContactComponent },
  { path: 'contact', component: ContactComponent },
  // Redirecciones para rutas antiguas
  { path: 'courses', redirectTo: 'mascotas', pathMatch: 'full' },
  { path: 'benefits', redirectTo: 'razas', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
