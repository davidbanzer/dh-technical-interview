export interface User {
  id: number;
  name: string;
  email: string;
  gender: Gender;
  status: Status;
}

export enum Gender {
  Female = 'female',
  Male = 'male',
}

export enum Status {
  Active = 'active',
  Inactive = 'inactive',
}
