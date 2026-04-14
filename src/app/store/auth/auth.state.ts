import { User } from '../../lib/types/user';

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  user: {
    age: 0,
    createdAt: '',
    deletedAt: null,
    email: '',
    gender: undefined,
    nameDetails: { firstName: '', maidenName: '', lastName: '' },
    password: '',
    role: undefined,
    updatedAt: '',
    __v: NaN,
    _id: '',
  },
  token: '',
  loading: false,
  error: null,
};
