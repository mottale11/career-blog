-- Migration: Remove image and imageHint columns from opportunities table
-- Run this in your Supabase SQL editor

ALTER TABLE public.opportunities DROP COLUMN IF EXISTS image;
ALTER TABLE public.opportunities DROP COLUMN IF EXISTS "imageHint";
