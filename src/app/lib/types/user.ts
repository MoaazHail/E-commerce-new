export interface User {
  accessToken: string;
  email: string;
  firstName: string;
  gender: string;
  id: 1;
  image: string;
  lastName: string;
  refreshToken: string;
  username: string;
  role: 'admin' | null;
}
