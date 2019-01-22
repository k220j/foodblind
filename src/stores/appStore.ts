import User from '../models/User';
import { observable, action } from 'mobx';

import { AsyncStorage } from "react-native"

import { signIn } from '../apis/user';

class ObservableListStore {
  @observable private _user: User;
  @observable private _token: String;

  @action signIn = (email: String, password: String) => {
    signIn(email, password);
    
  }

  constructor() {
    this._user = new User();
    this._token = '';
  }

  public get user(): User {
    return this._user;
  }

  public set user(value: User) {
    this._user = value;
  }

  public get token(): String {
    return this._token;
  }

  public set token(value: String) {
    this.token = value;
  }
}

const observableListStore = new ObservableListStore();
export default observableListStore;
