-- Add industries and fields columns to opportunities table
ALTER TABLE opportunities 
ADD COLUMN industries text[] DEFAULT '{}',
ADD COLUMN fields text[] DEFAULT '{}';
