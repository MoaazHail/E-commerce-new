export interface Categories {
  _id: string;
  name: string;
  slog: string;
  deletedAt: null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CategoryForm {
  name: string;
  slog: string;
  image?: string;
  isDeleted: boolean;
  deletedAt: null | any; // Date
}
