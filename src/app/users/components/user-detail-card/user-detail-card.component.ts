import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'user-detail-card',
  imports: [],
  templateUrl: './user-detail-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailCardComponent {
  userService = inject(UserService);
}
