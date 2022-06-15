import { AbstractResource } from "@/api/core";

export enum AuthType {
  None,
  Local,
}

export interface User {
  id: number;
  name: string; // 显示名
  avatar?: string;
  auth: AuthType;
}

export interface  LoginParams{
  username: string; // 登录名
  password: string;
  remember: boolean;
}

export default class UserResource extends AbstractResource {
  login(form: LoginParams) {
    return this.server.post("/account/login", form);
  }
  logout() {
    return this.server.delete("/user");
  }

  getCurrent() {
    return this.server.get<User>("/user");
  }
}