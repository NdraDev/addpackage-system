-- Migration for creating ip_addresses table
-- Run this with: wrangler d1 execute addpackage-api-ip-db --file=sql/001-create-ip-addresses-table.sql

CREATE TABLE IF NOT EXISTS ip_addresses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip TEXT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_ip_addresses_ip ON ip_addresses(ip);
CREATE INDEX IF NOT EXISTS idx_ip_addresses_created_at ON ip_addresses(created_at);
