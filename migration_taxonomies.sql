-- Industries Table
CREATE TABLE IF NOT EXISTS industries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  parent_id UUID REFERENCES industries(id) ON DELETE SET NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Fields Table
CREATE TABLE IF NOT EXISTS fields (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  parent_id UUID REFERENCES fields(id) ON DELETE SET NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies (Assuming similar to categories if strict, but public read/admin write)
ALTER TABLE industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE fields ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON industries FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON fields FOR SELECT USING (true);

-- Assuming authenticated users can insert/update/delete for now, or service_role only
-- For simplicity in this script, we'll allow anon/authenticated insert if the app uses service role for admin actions, 
-- but usually you bind to a specific role. 
-- Copying typical permissive dev policies:

CREATE POLICY "Enable insert for authenticated users only" ON industries FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON industries FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users only" ON industries FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users only" ON fields FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON fields FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users only" ON fields FOR DELETE USING (auth.role() = 'authenticated');
