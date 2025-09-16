import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserDetailCardComponent } from "../../components/user-detail-card/user-detail-card.component";

@Component({
  selector: 'app-user-detail-page',
  imports: [UserDetailCardComponent],
  templateUrl: './user-detail-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailPageComponent implements OnInit {
  route = inject(ActivatedRoute);
  userService = inject(UserService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUserById(+id);
    }
  }

}
