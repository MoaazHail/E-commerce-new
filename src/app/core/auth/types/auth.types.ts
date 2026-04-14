interface LoginForm {
  email: string;
  password: string;
}

interface RegisterForm {
  firstName: string;
  maidenName: string;
  lastName: string;
  gender?: 'male' | 'female';
  email: string;
  password: string;
  age: number;
}

interface ForgotPasswordForm {
  email: string;
}
