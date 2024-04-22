import User from "./User";

export interface UserState {
  user: User | null;
}

export interface RootState {
  user: UserState;
}
