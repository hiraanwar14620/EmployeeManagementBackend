CREATE SCHEMA IF NOT EXISTS public;

CREATE TABLE IF NOT exists public.address (
    "Id" SERIAL PRIMARY KEY,
    "EmployeeId" integer NOT NULL,
    "Address1" text NOT NULL,
    "Address2" text NULL,
    "PostalCode" integer NOT NULL,
    "City" text NOT NULL,
    "Phone1" text NOT NULL,
    "Phone2" text NOT NULL,
    "Province" text NOT NULL    
);

CREATE TABLE IF NOT exists public.department (
    "Id" SERIAL PRIMARY KEY,
    "Name" text NOT NULL
);

CREATE TABLE IF NOT exists public.employee (
    "Id" SERIAL PRIMARY KEY ,
    "FirstName" text NOT NULL,
    "LastName" text NOT NULL,
    "Title" text NOT NULL,
    "DoB" date NOT NULL,
    "Gender" smallint NOT NULL,
    "DepartmentId" integer NOT NULL,
    "MobileNumber" text NULL
);

ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_employee_fk FOREIGN KEY ("EmployeeId") REFERENCES public.employee("Id");

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_department_fk FOREIGN KEY ("DepartmentId") REFERENCES public.department("Id");