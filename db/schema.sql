-- user table   
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    user_type VARCHAR(10) NOT NULL CHECK (user_type IN ('tenant', 'landlord')),
    phone_no VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_users_user_type ON users (user_type);

-- property table
CREATE TABLE property(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    landlord_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    floors INTEGER CHECK (floors IS NULL OR floors > 0),
    units_per_floor INTEGER CHECK (units_per_floor IS NULL OR units_per_floor > 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_prop_name ON property(name);
CREATE INDEX idx_prop_landlord ON property(landlord_id);
CREATE INDEX idx_prop_location ON property(location);

-- units table
CREATE TABLE unit(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES property(id) ON DELETE CASCADE,
    unit_name VARCHAR(255) NOT NULL,
    tenant_id UUID REFERENCES users(id) ON DELETE SET NULL,
    rent NUMERIC(10,2) NOT NULL CHECK (rent > 0),
    unit_status VARCHAR(10) NOT NULL DEFAULT 'vacant' CHECK (unit_status IN ('vacant','booked','occupied')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(property_id, unit_name)
);

CREATE INDEX idx_unit_property ON unit(property_id);
CREATE INDEX idx_unit_tenant ON unit(tenant_id);
CREATE INDEX idx_unit_status ON unit(unit_status);


-- utilities table
CREATE TABLE utilities(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    unit_id UUID NOT NULL REFERENCES unit(id) ON DELETE CASCADE,
    utility_name VARCHAR(255) NOT NULL,
    amount NUMERIC(10,2) NOT NULL CHECK(amount >= 0),
    month_bill DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(unit_id, utility_name, month_bill)
);


CREATE INDEX idx_utilities_unit ON utilities(unit_id);
CREATE INDEX idx_utilities_month ON utilities(month_bill);
CREATE INDEX idx_utilities_name ON utilities(utility_name);