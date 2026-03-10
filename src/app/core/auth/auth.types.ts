interface LoginForm {
  username: string;
  password: string;
  expiresInMins?: number;
}

interface RegisterForm {
  firstName: string;
  maidenName: string;
  lastName: string;
  gender?: 'male' | 'female';
  username: string;
  password: string;
  age: number;
}
