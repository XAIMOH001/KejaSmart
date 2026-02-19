

# KejaSmart: Property Management System

KejaSmart is a comprehensive property management platform designed specifically for the Kenyan rental market. It streamlines the lifecycle of property management through automated billing, bulk unit generation, and integrated M-Pesa payment reconciliation.

## Project Overview

This repository follows a full-stack architecture optimized for high-volume residential and commercial buildings.

* **Frontend:** React.js and Tailwind CSS.
* **Backend:** Scalable API layer [Partner Tech Stack Placeholder].
* **Payments:** Safaricom Daraja API (STK Push).
* **Database:** Relational PostgreSQL/MySQL with optimized indexing.

---

## User Journeys and Features

### Landlord Workflow

The Landlord interface focuses on administrative scale and real-time financial tracking.

* **Property Management:** Setup wizards to define property metadata, locations, and amenities.
* **Batch Unit Generation:** Logic-based generation for large buildings. Supports alpha-numeric naming patterns (e.g., A101 to E520) to eliminate manual entry for up to 100+ units.
* **Occupancy Lifecycle:** Tools to assign tenants to specific units via phone numbers and a "Vacate" function to archive historical data while resetting unit availability.
* **Consolidated Billing:** A centralized interface to input variable utility costs (Water/Electricity). Landlords can publish consolidated invoices to all tenants simultaneously.
* **Financial Analytics:** Real-time dashboard showing KES collected, pending balances, and occupancy percentages.

### Tenant Workflow

The Tenant portal is designed for frictionless payment and transparent account management.

* **Automated Onboarding:** Phone-number-based authentication that automatically links the tenant to their assigned unit upon registration.
* **Simplified Payments:** Integration of "Lipa na M-Pesa" STK Push, allowing tenants to trigger payment prompts directly to their mobile devices.
* **Financial Transparency:** A complete Statement of Account (SOA) showing a running ledger of charges, partial payments, and total balance.
* **Receipt Management:** Automated generation of digital receipts for every successful transaction.

---

## Technical Specifications

### Database Schema

The database is structured to ensure referential integrity and support partial payment logic.

| Table | Primary Responsibility |
| --- | --- |
| **Users** | Core identity and role-based access control (Admin, Landlord, Tenant). |
| **Properties** | Metadata for buildings owned by Landlords. |
| **Units** | Specific room/unit details linked to Properties. |
| **Tenants** | Link table managing active occupancy and running balances. |
| **Invoices** | Itemized monthly bills (Rent + Trash + Water + Security). |
| **Payments** | Audit trail for M-Pesa transactions and reconciliation status. |

**Database Optimization:**

* B-Tree indexes on `Users(phone_number)` and `Tenants(unit_id)`.
* Unique constraints on `Payments(mpesa_receipt)` to prevent duplicate reconciliation.

### API Architecture

The Backend is required to support the following key functional endpoints:

* **Authentication:** `POST /api/auth/register` and `POST /api/auth/login`.
* **Property Management:** `POST /api/units/batch` for high-volume unit creation.
* **Billing Engine:** `POST /api/billing/generate` to process monthly charges across a property.
* **Payment Integration:** `POST /api/payments/stk-push` for transaction initiation and `/api/payments/callback` for asynchronous M-Pesa webhook processing.

---

## Implementation Notes

* **Partial Payments:** The system architecture supports installment-based payments. The `Remaining Balance` is calculated dynamically after every confirmed transaction.
* **Manual Reconciliation:** A secondary flow exists to allow tenants to claim payments via M-Pesa Transaction IDs in the event of STK Push delays.

---

