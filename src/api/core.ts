export enum AuthType {
  None,
  Local,
}

export interface User {
  id: number;
  name: string;
  avatar?: string;
  auth: AuthType;
}