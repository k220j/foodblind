import { observable } from 'mobx';

class Post {
  @observable private _title: string;
  @observable private _content: string;
  @observable private _user_id: number;

  public get title(): string {
    return this._title;
  }

  public set title(value: string) {
    this._title = value;
  }

  public get content(): string {
    return this._content;
  }

  public set content(value: string) {
    this._content = value;
  }

  public get user_id(): number {
    return this._user_id;
  }

  public set user_id(value: number) {
    this._user_id = value;
  }
}

export default Post;
