import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { environment } from '../../../environments/environment';
import { Gender, Status, User } from '../interfaces/User';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const mockUsers: User[] = [
    { id: 1, name: 'Juan', email: 'juan@test.com', gender: Gender.Male, status: Status.Active },
    { id: 2, name: 'Ana', email: 'ana@test.com', gender: Gender.Female, status: Status.Inactive },
  ];
  const mockUser: User = {
    id: 1,
    name: 'Juan',
    email: 'juan@test.com',
    gender: Gender.Male,
    status: Status.Active,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe cargar usuarios y actualizar signals', () => {
    service.loadUsers(1);
    const req = httpMock.expectOne(`${environment.API_URL}?page=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);

    expect(service.users()).toEqual(mockUsers);
    expect(service.currentPage()).toBe(1);
    expect(service.isLoading()).toBeFalse();
  });

  it('debe buscar usuarios por nombre', () => {
    service.loadUsers(1, 'Juan');
    const req = httpMock.expectOne(`${environment.API_URL}?page=1&name=Juan`);
    expect(req.request.method).toBe('GET');
    req.flush([mockUser]);

    expect(service.users()).toEqual([mockUser]);
    expect(service.searchTerm()).toBe('Juan');
  });

  it('debe avanzar y retroceder página', () => {
    service.loadUsers(1);
    httpMock.expectOne(`${environment.API_URL}?page=1`).flush(mockUsers);

    service.nextPage();
    httpMock.expectOne(`${environment.API_URL}?page=2`).flush(mockUsers);
    expect(service.currentPage()).toBe(2);

    service.prevPage();
    httpMock.expectOne(`${environment.API_URL}?page=1`).flush(mockUsers);
    expect(service.currentPage()).toBe(1);
  });

  it('debe obtener usuario por id', () => {
    service.getUserById(1);
    const req = httpMock.expectOne(`${environment.API_URL}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);

    expect(service.selectedUser()).toEqual(mockUser);
    expect(service.isLoading()).toBeFalse();
  });

  it('debe manejar error al obtener usuario por id', () => {
    service.getUserById(999);
    const req = httpMock.expectOne(`${environment.API_URL}/999`);
    req.flush({}, { status: 404, statusText: 'Not Found' });

    expect(service.selectedUser()).toBeNull();
    expect(service.isLoading()).toBeFalse();
  });
});
