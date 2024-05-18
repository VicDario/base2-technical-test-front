import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-item',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.scss'
})
export class NavItemComponent {
  @Input({ required: true }) navData!: NavItem;
  public faChevronRight = faChevronRight;
}

export interface NavItem {
  name: string;
  route: string;
  icon: IconDefinition;
}

