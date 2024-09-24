import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  currentComponent: string = 'video-games';  // Track which component is currently active

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }

  // Toggle between components
  setActiveComponent(component: string): void {
    this.currentComponent = component;
  }

}
