export type UserState = {
  isLoggedIn: boolean;
  username?: string;
  apiKey?: string;
};

export const initialUser: UserState = {
  isLoggedIn: false,
};
