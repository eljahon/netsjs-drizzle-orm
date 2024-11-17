import { pgEnum } from 'drizzle-orm-pg';

export const userRole = pgEnum('user_role', ['admin', 'user', 'superAdmin']);

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}
