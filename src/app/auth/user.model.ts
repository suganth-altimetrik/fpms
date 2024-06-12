export class User {
  constructor(
    public user_id: string,
    public email: string,
    public name: string,
    private _token: string
  ) {}

  get token() {
    return this._token;
  }
}
