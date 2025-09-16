import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from '../../services/user.service';
import { Gender, Status } from '../../interfaces/User';

const mockUserService = {
  isLoading: () => false,
  users: () => [
    { id: 1, name: 'Juan', email: 'juan@test.com', gender: Gender.Male, status: Status.Active },
    { id: 2, name: 'Ana', email: 'ana@test.com', gender: Gender.Female, status: Status.Inactive },
  ],
  currentPage: () => 1,
  prevPage: jasmine.createSpy('prevPage'),
  nextPage: jasmine.createSpy('nextPage'),
};

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar la lista de usuarios', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.card').length).toBe(2);
    expect(compiled.textContent).toContain('Juan');
    expect(compiled.textContent).toContain('Ana');
  });

  it('debe mostrar el número de página actual', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Página 1');
  });
});
