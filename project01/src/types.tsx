import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable,
} from "kysely";

export interface Database {
  user: UsersTable; // see github.com/kysely-org/kysely
  product: ProductsTable;
}

export interface ProductsTable {
  id: Generated<number>;
  name: string;
  description: string | null;
  size: string;
  price: number;
  category: "clothing" | "footwear" | "accessories";
  image: string;
  status: string;
  userID: number;
}
export type Product = Selectable<ProductsTable>;
export type NewProduct = Insertable<ProductsTable>;
export type ProductUpdate = Updateable<ProductsTable>;

interface UsersTable {
  id: Generated<number>;
  username: string;
  email: string;
  password: string;
  created_at: ColumnType<Date, string | undefined, never>;
  metadata: JSONColumnType<{
    login_at: string;
    ip: string | null;
    agent: string | null;
    plan: "free" | "premium";
  }>;
}

export type User = Selectable<UsersTable>;
export type NewUser = Insertable<UsersTable>;
export type UserUpdate = Updateable<UsersTable>;
