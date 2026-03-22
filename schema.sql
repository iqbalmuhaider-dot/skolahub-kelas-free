-- D1 Database Schema for Skolahub Kelas Permula Percuma Webapp Registrations

CREATE TABLE IF NOT EXISTS registrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nama TEXT NOT NULL,
  email TEXT NOT NULL,
  telefon TEXT NOT NULL,
  jawatan TEXT NOT NULL,
  institusi TEXT,
  tahap TEXT NOT NULL,
  tujuan TEXT NOT NULL,
  projek TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_email ON registrations(email);
CREATE INDEX IF NOT EXISTS idx_timestamp ON registrations(timestamp);
CREATE INDEX IF NOT EXISTS idx_status ON registrations(status);
