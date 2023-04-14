CREATE DATABASE ContractorsTenants;

CREATE TABLE Contractors (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    tenant_id NUMBER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE Tenants (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);