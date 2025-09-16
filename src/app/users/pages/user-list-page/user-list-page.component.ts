import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RecentSearchesComponent } from '../../components/recent-searches/recent-searches.component';
@Component({
  selector: 'app-user-list-page',
  imports: [ReactiveFormsModule, UserListComponent, RecentSearchesComponent],
  templateUrl: './user-list-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListPageComponent {
  userService = inject(UserService);
  formBuilder = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  userForm = this.formBuilder.group({
    search: this.formBuilder.control(''),
  });

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      const page = Number(params['page']) || 1;
      const name = params['name'] || '';
      this.userService.loadUsers(page, name);
    });
  }

  onSubmit() {
    if (this.userForm.invalid) return;
    const name = this.userForm.controls.search.value as string;

    this.router.navigate([], {
      queryParams: {
        name: name || null,
        page: 1,
      },
      queryParamsHandling: 'merge',
    });
    this.userService.loadUsers(1, name);

    this.userService.addSearchTerm(name || '');
  }

  onRecentSearch(term: string) {
    this.userForm.controls.search.setValue(term);

    this.router.navigate([], {
      queryParams: {
        name: term || null,
        page: 1,
      },
      queryParamsHandling: 'merge',
    });
    this.userService.loadUsers(1, term);
  }

  clearFilters() {
    this.userForm.controls.search.setValue('');

    this.router.navigate([], {
      queryParams: { name: null, page: 1 },
      queryParamsHandling: 'merge',
    });

    this.userService.loadUsers(1);
  }
}
