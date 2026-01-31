import { supabase } from './supabase';

export async function uploadImage(file: File, bucketParam: string = 'images'): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from(bucketParam)
        .upload(filePath, file);

    if (uploadError) {
        throw new Error(`Error uploading image: ${uploadError.message}`);
    }

    const { data } = supabase.storage.from(bucketParam).getPublicUrl(filePath);

    return data.publicUrl;
}
