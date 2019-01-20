import { observable } from 'mobx';

class User {
  @observable private _email: string;
  @observable private _password: string;
  @observable private _age: number;
  @observable private _gender: string;
  @observable private _company: string;

  public values() {
    this._email;
  }

  public get email(): string {
    return this._email;
  }

  public set email(value: string) {
    this._email = value;
  }

  public get password(): string {
    return this._password;
  }

  public set password(value: string) {
    this._password = value;
  }

  public get age(): number {
    return this._age;
  }

  public set age(value: number) {
    this._age = value;
  }

  public get gender(): string {
    return this._gender;
  }

  public set gender(value: string) {
    this._gender = value;
  }

  public get company(): string {
    return this._company;
  }

  public set company(value: string) {
    this._company = value;
  }
  
}

export default User;
