-- ElectiveFinals database. Run once in Supabase: SQL Editor -> New query -> paste -> Run.
-- Row Level Security is ON with no policies, so the public "anon" key can read nothing.
-- Only the Node server (using the secret key) can access these tables.

create extension if not exists pgcrypto;

-- Employees ---------------------------------------------------------------
create sequence if not exists employee_code_seq;

create table if not exists employees (
  id uuid primary key default gen_random_uuid(),
  employee_code text unique not null default 'EMP-' || lpad(nextval('employee_code_seq')::text, 4, '0'),
  first_name text not null,
  last_name text not null,
  birthdate date,
  gender text,
  address text,
  contact_number text,
  email text,
  position text,
  department text,
  date_hired date,
  daily_rate numeric(12, 2) not null default 0,
  status text not null default 'Active',
  created_at timestamptz not null default now()
);

-- User accounts -------------------------------------------------------------
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  password_hash text not null,
  role text not null default 'cashier',   -- roles are listed in server/roles.js
  employee_id uuid references employees(id) on delete set null,
  created_at timestamptz not null default now()
);

-- Payroll -------------------------------------------------------------------
create table if not exists payroll (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references employees(id) on delete cascade,
  period_start date not null,
  period_end date not null,
  days_worked numeric(6, 2) not null default 0,
  overtime_hours numeric(6, 2) not null default 0,
  daily_rate numeric(12, 2) not null default 0,
  sss numeric(12, 2) not null default 0,
  philhealth numeric(12, 2) not null default 0,
  pagibig numeric(12, 2) not null default 0,
  tax numeric(12, 2) not null default 0,
  gross_pay numeric(12, 2) not null default 0,
  total_deductions numeric(12, 2) not null default 0,
  net_pay numeric(12, 2) not null default 0,
  created_at timestamptz not null default now()
);

-- POS sales -----------------------------------------------------------------
create sequence if not exists receipt_no_seq;

create table if not exists sales (
  id uuid primary key default gen_random_uuid(),
  receipt_no text unique not null default 'OR-' || lpad(nextval('receipt_no_seq')::text, 6, '0'),
  total numeric(12, 2) not null,
  cash numeric(12, 2) not null,
  change numeric(12, 2) not null,
  cashier text,
  created_at timestamptz not null default now()
);

create table if not exists sale_items (
  id uuid primary key default gen_random_uuid(),
  sale_id uuid not null references sales(id) on delete cascade,
  name text not null,
  price numeric(12, 2) not null,
  quantity integer not null check (quantity > 0)
);

-- Lock everything down to the server's secret key -----------------------------
alter table employees enable row level security;
alter table users enable row level security;
alter table payroll enable row level security;
alter table sales enable row level security;
alter table sale_items enable row level security;

-- Let the server's secret key (service_role) use the tables. Newer Supabase projects
-- do not grant this automatically. anon/authenticated get nothing.
grant usage on schema public to service_role;
grant all on all tables in schema public to service_role;
grant all on all sequences in schema public to service_role;
alter default privileges in schema public grant all on tables to service_role;
alter default privileges in schema public grant all on sequences to service_role;
