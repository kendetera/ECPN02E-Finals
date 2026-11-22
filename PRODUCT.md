# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary: the course instructor (ECPN02E finals).** Grades the project by opening the public link, logging in, and checking each required page against the brief. They judge both function and how much care went into it.
- **Demo roles, played by the student and classmates:**
  - **Admin:** registers employees, runs payroll, manages user accounts, reads all reports.
  - **Cashier:** rings up sales on the POS only.
- Roles are expected to grow (more may be added later); the roles list lives in `server/roles.js`.
- No real customers, employees, or sales. All data is made-up sample data.

## Product Purpose

SukiMart is the back-office system for a fictional neighborhood grocery/retail store: staff log in, register employees, compute payroll, ring up sales, and search saved records in reports.

It exists to pass the ECPN02E finals brief. Success means:
1. It runs on the student's **own AWS EC2 web server** (not web hosting), with console screenshots as proof.
2. It is reachable online by typing an address.
3. Every required page works against the database.
4. It **looks like a lot of effort went into it**, i.e. reads as a finished product, not a class exercise.

## Positioning

A complete, believable store back-office built and self-hosted by one student on their own server. Not a template: every required page is real and saves to a real database.

## Operating Context

- **Grading demo:** the instructor or student opens `http://<EC2 public DNS>` (plain HTTP, browser shows "Not secure"), logs in as admin, and walks the pages in front of the class.
- **Devices:** laptop/desktop browser, phones (instructor or classmates opening the link), and tablets or touchscreens (POS shown like a real register). All three must work.
- **Locale:** Philippines. Currency is Philippine peso (₱). Payroll deductions use SSS, PhilHealth, Pag-IBIG and withholding tax.
- **Deadline:** due within a week of 2026-11-22.

## Capabilities and Constraints

Required pages (from the instructor's brief):
- **Login:** user accounts come from the database.
- **Admin (strict requirement):** Employee Registration with **Save** and **Cancel**. Save stores the record, clears the form, and shows a "saved" pop-up. Cancel clears the form.
- **Payroll form:** same Save/Cancel behavior. Gross and net pay are computed automatically; deductions are typed in by hand.
- **Reports (Employee, Payroll, Sales, User Account):** search box plus Search button, showing only records saved in the database. Read-only.
- **User Account:** Find by username, then Save (create or update), Cancel, and Delete (with an "Are you sure?" confirmation). No list of users on this page; the User Account Report lists them.
- **POS:** must integrate the student's **5 POS pages from prelim**. Not yet found. The current POS is a working placeholder that saves sales.

Stack and hosting (existing codebase): React (Vite) client + Node.js (Express) API in one app, Supabase (Postgres) database, one EC2 instance in `ap-southeast-2` behind Caddy, deployed by GitHub Actions on push to `main`.

Terminology: "employee", "payroll", "sale" / "receipt" (`OR-000001`), "user account", "role" (`admin`, `cashier`).

Open / undecided:
- Contents and technology of the 5 prelim POS pages.
- Extra employee and payroll fields from the student's prelim work.
- Whether a short domain name with HTTPS (DuckDNS) gets added.

## Brand Commitments

- **Store name shown in the UI: SukiMart.** "Suki" is Filipino for a loyal regular customer. Fictional; must not imitate any real store chain (an earlier "Shopwise" idea was dropped for that reason).
- **Project / repository name: ElectiveFinals** (`kendetera/ECPN02E-Finals`). It stays the technical name and is not the store's brand.

## Evidence on Hand

- The instructor's brief, quoted in this project's planning conversation (pages and rules listed above).
- No real employees, products, sales, logos, or photos exist. Use clearly fictional sample data. Never invent real people, real companies, or real government ID numbers.
- Prelim POS work: not yet available.

## Product Principles

1. **Every requirement works for real.** Each page in the brief saves to and reads from the database. No fake screens.
2. **Finished, not "student project".** Consistent, careful details everywhere, because the grade rewards visible effort.
3. **Obvious to a grader at first look.** Each required feature is easy to find and clearly labelled with the words the brief uses.
4. **Usable on any device in the room:** desktop, phone, and touchscreen.
5. **Fictional but believable.** A real-feeling Filipino neighborhood store, without copying any real brand.

## Accessibility & Inclusion

No formal standard required. Must be usable by touch on phones and tablets as well as with mouse and keyboard.
