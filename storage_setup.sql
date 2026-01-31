-- Create the 'images' bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to the bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'images' );

-- Allow uploads to the bucket (Adjust logic as strictly as needed, e.g., only authenticated users)
-- For this demo, we'll allow anyone to insert (be careful in production!)
CREATE POLICY "Upload Access"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'images' );

-- Allow updates (optional, if you want to allow overwriting)
CREATE POLICY "Update Access"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'images' );
