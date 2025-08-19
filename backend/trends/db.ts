import { SQLDatabase } from "encore.dev/storage/sqldb";

export const trendsDB = new SQLDatabase("trends", {
  migrations: "./migrations",
});
