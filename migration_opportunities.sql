-- Enable RLS on opportunities table
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to read opportunities (Public)
-- Dependent on status? Maybe we restrict drafts later, but for now public read is fine or we can filter by status in query.
-- Safest is "true" for select if we want public access.
CREATE POLICY "Public read access" ON public.opportunities FOR SELECT USING (true);

-- Policy: Allow authenticated users to insert
CREATE POLICY "Authenticated insert access" ON public.opportunities FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

-- Policy: Allow authenticated users to update
CREATE POLICY "Authenticated update access" ON public.opportunities FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Policy: Allow authenticated users to delete
CREATE POLICY "Authenticated delete access" ON public.opportunities FOR DELETE 
USING (auth.role() = 'authenticated');
