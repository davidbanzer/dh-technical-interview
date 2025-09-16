import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'user-list',
  imports: [],
  templateUrl: './user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  userService = inject(UserService);
  router = inject(Router);

  goToDetail(id: number) {
    this.router.navigate(['/users', id]);
  }

  goToNextPage() {
    const next = this.userService.currentPage() + 1;
    this.router.navigate([], {
      queryParams: { page: next },
      queryParamsHandling: 'merge',
    });
    this.userService.nextPage();
  }

  goToPrevPage() {
    if (this.userService.currentPage() > 1) {
      const prev = this.userService.currentPage() - 1;
      this.router.navigate([], {
        queryParams: { page: prev },
        queryParamsHandling: 'merge',
      });
      this.userService.prevPage();
    }
  }
}
