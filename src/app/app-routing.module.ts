import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page.component'; // Main Component for navigation
import { VideoGamesComponent } from './pages/video-games/video-games.component'; // Video Games Component

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: 'video-games',
        component: VideoGamesComponent
      },
      {
        path: 'contact', 
        loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule)
      },
      { 
        path: '', 
        redirectTo: 'video-games', 
        pathMatch: 'full' 
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
