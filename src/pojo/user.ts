export class UserDto {
  constructor(
    public username: string,
    public password: string,
  ) {}
}

export class User {
  constructor(
    public id: number,
    public username: string,
    public token: string
  ) {
  }
}
