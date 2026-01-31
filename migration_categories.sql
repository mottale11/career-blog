-- Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  parent_id UUID REFERENCES public.categories(id),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add category_id to opportunities
ALTER TABLE public.opportunities 
ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES public.categories(id);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public read access" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Authenticated insert access" ON public.categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated update access" ON public.categories FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated delete access" ON public.categories FOR DELETE USING (auth.role() = 'authenticated');
