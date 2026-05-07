import { varchar } from "drizzle-orm/pg-core";
import { foreignKey } from "drizzle-orm/pg-core";
import { unique } from "drizzle-orm/pg-core";
import { boolean } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

const usersTable = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().notNull().primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().$onUpdate(() => new Date()).notNull(),
    email: varchar("email", { length: 300 }).unique().notNull(),
    password: varchar("password", { length: 100 }).notNull(),
    refreshToken: varchar("refresh_token", { length: 500 })
  }
);

const rolesTable = pgTable(
  "roles",
  {
    id: uuid("id").defaultRandom().notNull().primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().$onUpdate(() => new Date()).notNull(),
    role: varchar("role", { length: 100 }).notNull(),
    organizationId: uuid("organization_id").notNull()
  },
  (table) => {
    return [
      unique("uq_role_orgid").on(table.role, table.organizationId)
    ]
  }
);

const organizationsTable = pgTable(
  "organizations",
  {
    id: uuid("id").defaultRandom().notNull().primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().$onUpdate(() => new Date()).notNull(),
    name: varchar("name", { length: 300 }).notNull(),
    address: varchar("address", { length: 1024 }).notNull(),
    subdomainName: varchar("sub_domain_name", { length: 100 }).unique().notNull()
  }
);

const userRoleMapTable = pgTable(
  "user_role_map",
  {
    id: uuid("id").defaultRandom().notNull().primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().$onUpdate(() => new Date()).notNull(),
    userId: uuid("user_id").notNull(),
    roleId: uuid("role_id").notNull(),
    organizationId: uuid("organization_id").notNull()
  },
  (table) => {
    return [
      foreignKey({
        name: "fk_user_id",
        columns: [table.userId],
        foreignColumns: [usersTable.id]
      }),
      foreignKey({
        name: "fk_role_id",
        columns: [table.roleId],
        foreignColumns: [rolesTable.id]
      }),
      foreignKey({
        name: "fk_org_id",
        columns: [table.organizationId],
        foreignColumns: [organizationsTable.id]
      })
    ]
  }
);

const featureFlagsTable = pgTable(
  "feature_flags",
  {
    id: uuid("id").defaultRandom().notNull().primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().$onUpdate(() => new Date()).notNull(),
    organizationId: uuid("organization_id").notNull(),
    isEnabled: boolean("is_enabled").notNull()
  },
  (table) => {
    return [
      foreignKey({
        name: "fk_org_id",
        columns: [table.id],
        foreignColumns: [organizationsTable.id]
      })
    ]
  }
)

export {
  usersTable,
  rolesTable,
  organizationsTable,
  userRoleMapTable,
  featureFlagsTable
}
