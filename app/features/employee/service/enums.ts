/**
 * enums.ts
 * Created On : 2025-29-01 16
 * Author : Diwash Pokhrel
 * Description : This file contains enumeration types used across the application.
 * The `Department` enum defines a set of predefined department names, 
 * while the `JobRole` enum provides standard roles or positions an employee can hold.
 * These enums ensure consistent usage of values throughout the codebase and minimize 
 * potential errors caused by hardcoding strings.
 */
export enum Department {
  HR = "HR",
  ENGINEERING = "ENGINEERING",
  MARKETING = "MARKETING",
  SALES = "SALES",
  FINANCE = "FINANCE",
  IT = "IT",
  LEGAL = "LEGAL",
  CUSTOMER_SUPPORT = "CUSTOMER_SUPPORT",
  PRODUCT = "PRODUCT",
  OPERATIONS = "OPERATIONS",
}

export enum JobRole {
  SUPERVISOR = "SUPERVISOR",
  KITCHEN = "KITCHEN",
  HELPER = "HELPER",
  TECHNICAL_SUPPORT = "TECHNICAL_SUPPORT",
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  CONTRACTOR = "CONTRACTOR",
  INTERN = "INTERN",
  FREELANCER = "FREELANCER",
  MAINTENANCE = "MAINTENANCE",
}
