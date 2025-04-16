export type User = {
  name: string;
  email: string;
  password: string;
  role: string;
  address: string;
  //   orders: Order[];
};

export type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  signIn: (email: string, password: string) => void;
};
