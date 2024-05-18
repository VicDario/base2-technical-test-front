import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { faTags, faStore } from '@fortawesome/free-solid-svg-icons';
import { NavItem, NavItemComponent } from '../nav-item/nav-item.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenavModule, RouterModule, NavItemComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  public faTags = faTags;
  public faStore = faStore;

  public navItems: NavItem[] = [
    {
      name: 'Products',
      route: '/products',
      icon: this.faStore
    },
    {
      name: 'Categories',
      route: '/categories',
      icon: this.faTags
    }
  ]
}

