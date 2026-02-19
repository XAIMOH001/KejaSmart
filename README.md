# KejaSmart - Smart Property Management Platform

> A modern property management system designed for Kenyan landlords and tenants to streamline rent collection, property management, and tenant-landlord communication.

## 🎯 Project Overview

**KejaSmart** is a full-stack web application that simplifies property management for landlords and provides tenants with an easy way to pay rent, request maintenance, and track their payment history. Built with React, Express, Node.js, and PostgreSQL.

### Key Features

#### For Landlords 🏢
- **Property Management** - Add properties, generate units, and manage tenant assignments
- **Financial Dashboard** - Track rent collection, pending payments, and occupancy rates
- **Payment Tracking** - Monitor all tenant payments with M-Pesa reference codes
- **Billing Management** - Set rent amounts and utility charges per property/unit
- **Maintenance Requests** - View and manage tenant maintenance requests

#### For Tenants 🏠
- **Rent Payment** - Pay rent via M-Pesa (Lipa na M-Pesa STK Push integration planned)
- **Payment Progress** - Track monthly rent payment progress with partial payment support
- **Maintenance Requests** - Submit and track maintenance issues
- **Payment Receipts** - View and download payment history and receipts
- **Utility Breakdown** - View detailed billing including water, garbage, and service charges

---

## 🏗️ Tech Stack

- **Frontend**: React (JSX) + Vite
- **Backend**: Node.js + Express.js
- **Database**: PostgreSQL
- **UI Library**: shadcn/ui + Tailwind CSS
- **Payment Integration**: M-Pesa Daraja API (to be implemented)

---

## 📁 Project Structure

```
kejasmart/
├── client/                      # React Frontend
│   ├── public/
│   │   └── assets/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/              # shadcn/ui components
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── NavLink.jsx
│   │   │   └── StatCard.jsx
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── LandlordDashboard.jsx
│   │   │   ├── LandlordProperties.jsx
│   │   │   ├── AddProperty.jsx
│   │   │   ├── LandlordBilling.jsx
│   │   │   ├── TenantDashboard.jsx
│   │   │   ├── TenantPay.jsx
│   │   │   ├── TenantMaintenance.jsx
│   │   │   └── TenantReceipts.jsx
│   │   ├── services/
│   │   │   ├── api.js           # API client configuration
│   │   │   ├── authService.js   # Authentication services
│   │   │   ├── propertyService.js
│   │   │   ├── paymentService.js
│   │   │   └── maintenanceService.js
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useMobile.jsx
│   │   ├── lib/
│   │   │   └── utils.js         # Utility functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                      # Express Backend
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js      # PostgreSQL connection config
│   │   │   └── env.js           # Environment variables
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── propertyController.js
│   │   │   ├── tenantController.js
│   │   │   ├── paymentController.js
│   │   │   └── maintenanceController.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Property.js
│   │   │   ├── Unit.js
│   │   │   ├── Tenant.js
│   │   │   ├── Payment.js
│   │   │   └── MaintenanceRequest.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── propertyRoutes.js
│   │   │   ├── tenantRoutes.js
│   │   │   ├── paymentRoutes.js
│   │   │   └── maintenanceRoutes.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   ├── errorHandler.js
│   │   │   └── validation.js
│   │   ├── utils/
│   │   │   ├── logger.js
│   │   │   └── helpers.js
│   │   └── server.js            # Express app entry point
│   ├── package.json
│   └── .env.example
│
├── database/
│   ├── migrations/
│   │   ├── 001_create_users.sql
│   │   ├── 002_create_properties.sql
│   │   ├── 003_create_units.sql
│   │   ├── 004_create_tenants.sql
│   │   ├── 005_create_payments.sql
│   │   └── 006_create_maintenance_requests.sql
│   └── seeds/
│       └── sample_data.sql
│
├── .gitignore
├── README.md
└── package.json                 # Root package.json for monorepo scripts
```

---

## 🚀 API Endpoints

### Authentication Routes
**Base URL**: `/api/auth`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new landlord | No |
| POST | `/login` | Login (landlord/tenant) | No |
| POST | `/logout` | Logout current user | Yes |
| GET | `/me` | Get current user profile | Yes |

---

### Property Routes
**Base URL**: `/api/properties`

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/` | Get all properties for landlord | Yes | Landlord |
| GET | `/:id` | Get single property details | Yes | Landlord |
| POST | `/` | Create new property | Yes | Landlord |
| PUT | `/:id` | Update property details | Yes | Landlord |
| DELETE | `/:id` | Delete property | Yes | Landlord |
| POST | `/:id/units` | Add units to property | Yes | Landlord |
| GET | `/:id/units` | Get all units in property | Yes | Landlord |

---

### Tenant Routes
**Base URL**: `/api/tenants`

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/` | Get all tenants for landlord | Yes | Landlord |
| GET | `/:id` | Get single tenant details | Yes | Both |
| POST | `/` | Add new tenant to unit | Yes | Landlord |
| PUT | `/:id` | Update tenant information | Yes | Landlord |
| DELETE | `/:id` | Remove tenant from unit | Yes | Landlord |
| GET | `/unit/:unitId` | Get tenant by unit ID | Yes | Landlord |
| GET | `/dashboard` | Get tenant dashboard data | Yes | Tenant |

---

### Payment Routes
**Base URL**: `/api/payments`

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/` | Get all payments (landlord view) | Yes | Landlord |
| GET | `/tenant` | Get tenant payment history | Yes | Tenant |
| GET | `/:id` | Get single payment details | Yes | Both |
| POST | `/initiate` | Initiate M-Pesa payment | Yes | Tenant |
| POST | `/callback` | M-Pesa callback handler | No | System |
| POST | `/verify/:id` | Verify payment status | Yes | Both |
| GET | `/pending` | Get pending payments | Yes | Landlord |
| GET | `/receipt/:id` | Download payment receipt | Yes | Both |

---

### Maintenance Routes
**Base URL**: `/api/maintenance`

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/` | Get all maintenance requests | Yes | Landlord |
| GET | `/tenant` | Get tenant's maintenance requests | Yes | Tenant |
| GET | `/:id` | Get single request details | Yes | Both |
| POST | `/` | Create new maintenance request | Yes | Tenant |
| PUT | `/:id` | Update request status | Yes | Landlord |
| DELETE | `/:id` | Delete maintenance request | Yes | Both |

---

## 🗄️ Database Schema

### Users Table
```sql
- id (PK)
- email
- password_hash
- role (landlord/tenant)
- full_name
- phone_number
- created_at
- updated_at
```

### Properties Table
```sql
- id (PK)
- landlord_id (FK -> users.id)
- name
- location
- description
- total_units
- created_at
- updated_at
```

### Units Table
```sql
- id (PK)
- property_id (FK -> properties.id)
- unit_name
- floor_number
- base_rent
- status (occupied/vacant)
- created_at
- updated_at
```

### Tenants Table
```sql
- id (PK)
- user_id (FK -> users.id)
- unit_id (FK -> units.id)
- lease_start_date
- lease_end_date
- is_active
- created_at
- updated_at
```

### Payments Table
```sql
- id (PK)
- tenant_id (FK -> tenants.id)
- unit_id (FK -> units.id)
- amount
- payment_method
- mpesa_reference
- payment_date
- payment_for_month
- status (pending/completed/partial)
- created_at
- updated_at
```

### Utility Charges Table
```sql
- id (PK)
- unit_id (FK -> units.id)
- charge_type (water/garbage/service/other)
- amount
- billing_month
- created_at
```

### Maintenance Requests Table
```sql
- id (PK)
- tenant_id (FK -> tenants.id)
- unit_id (FK -> units.id)
- title
- description
- category (plumbing/electrical/appliance/general)
- status (pending/in_progress/resolved)
- created_at
- resolved_at
```

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd kejasmart
```

### 2. Database Setup
```bash
# Create PostgreSQL database
createdb kejasmart_db

# Run migrations
psql -U postgres -d kejasmart_db -f database/migrations/001_create_users.sql
psql -U postgres -d kejasmart_db -f database/migrations/002_create_properties.sql
# ... run all migration files in order

# (Optional) Seed sample data
psql -U postgres -d kejasmart_db -f database/seeds/sample_data.sql
```

### 3. Backend Setup
```bash
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure environment variables
# Edit .env with your database credentials and other config

# Start development server
npm run dev
```

### 4. Frontend Setup
```bash
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

### 5. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

---

## 🔐 Environment Variables

### Server (.env)
```env
# Server
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=kejasmart_db
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d

# M-Pesa (to be configured later)
MPESA_CONSUMER_KEY=
MPESA_CONSUMER_SECRET=
MPESA_SHORTCODE=
MPESA_PASSKEY=
MPESA_CALLBACK_URL=http://localhost:3000/api/payments/callback
```

---

## 🧪 Testing

```bash
# Run backend tests
cd server
npm test

# Run frontend tests
cd client
npm test
```

---

## 📝 Development Roadmap

### Phase 1: Core Features (Current)
- [x] UI/UX Design with shadcn/ui
- [ ] User authentication (landlord/tenant)
- [ ] Property and unit management
- [ ] Tenant management
- [ ] Basic payment tracking
- [ ] Maintenance request system

### Phase 2: Payment Integration
- [ ] M-Pesa Daraja API integration
- [ ] STK Push implementation
- [ ] Payment verification
- [ ] Receipt generation

### Phase 3: Advanced Features
- [ ] Email notifications
- [ ] SMS notifications (Africa's Talking)
- [ ] Rent payment reminders
- [ ] Analytics and reports
- [ ] Multi-currency support

### Phase 4: Mobile App
- [ ] React Native mobile app
- [ ] Push notifications

---

## 🤝 Contributing

This is a prototype project. Contributions, issues, and feature requests are welcome!

---

## 📄 License

MIT License - see LICENSE file for details

---

## 👨‍💻 Author

Built with ❤️ for Kenyan property managers and tenants

---

## 📞 Support

For support, email [your-email@example.com]

---

**Note**: This is a development prototype. M-Pesa integration and production features will be implemented in subsequent phases.
