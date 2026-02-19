# KejaSmart - Property Management System 🚀

KejaSmart is a full-stack MERN (TypeScript) application designed for the Kenyan rental market. It streamlines property management, automated billing, and M-Pesa integration.

## 🛠 Tech Stack

???
## 🏗 System Architecture & Key Logic

### 1. Unit & Tenant Lifecycle

- **Batch Creation:** Landlords can auto-generate units (e.g., A101-A110) in one click.
- **Tenant Onboarding:** Linked via **Phone Number Matching**. No invite codes needed—if a tenant signs up with a number pre-registered to a unit, they are auto-linked.
- **Vacating:** Units are "permanent," while Tenants are "occupants." Vacating a tenant archives their history and marks the unit as `Vacant`.

### 💸 2. Consolidated Billing System

Tenants receive a single monthly invoice.

- `Total Invoice = Base Rent + Fixed Utilities (Trash/Security) + Variable Utilities (Water/Electricity)`.
- Support for **Partial Payments**: The dashboard tracks `Remaining Balance`.

### 📲 3. M-Pesa Integration Flow (STK Push)

1. Frontend triggers `POST /api/payments/stk-push`.
2. Backend communicates with Daraja API.
3. Tenant receives STK PIN Prompt on their phone.
4. Safaricom sends Callback to our Webhook.
5. Backend updates `Payment` status and reconciles the `Invoice` balance.

## 📂 Project Structure

- `/client`: React frontend. Run `npm run dev` to start UI.
- `/server`: Node/Express backend. Run `npm run dev` for the dev server.

