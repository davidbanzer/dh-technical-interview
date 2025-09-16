import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'recent-searches',
  imports: [],
  templateUrl: './recent-searches.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentSearchesComponent {
  userService = inject(UserService);
  router = inject(Router);

  selectSearch = output<string>();

  onRecentClick(term: string) {
    this.selectSearch.emit(term);
  }
}
