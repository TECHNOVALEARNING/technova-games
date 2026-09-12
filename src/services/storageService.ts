import { supabase, isSupabaseConfigured } from '../lib/supabase';

const BUCKET_NAME = 'game-covers';

export const storageService = {
  /**
   * Upload an image file to Supabase Storage 'game-covers'
   * Returns the public URL of the uploaded image
   */
  async uploadGameCover(file: File): Promise<string> {
    if (!file) {
      throw new Error('Aucun fichier sélectionné.');
    }

    // Validation: only image files
    if (!file.type.startsWith('image/')) {
      throw new Error('Le fichier doit être une image (PNG, JPG, WEBP, etc.).');
    }

    // Size limit: 5MB
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      throw new Error('La taille de l\'image ne doit pas dépasser 5 Mo.');
    }

    // When Supabase is configured
    if (isSupabaseConfigured) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Supabase storage upload error:', uploadError);
        throw new Error(`Échec du téléversement vers Supabase Storage: ${uploadError.message}`);
      }

      const { data } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);

      return data.publicUrl;
    }

    // Fallback mode: convert to base64 data URL for local persistence
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        reject(new Error('Erreur lors de la lecture locale du fichier image.'));
      };
      reader.readAsDataURL(file);
    });
  },

  /**
   * Delete cover image from Supabase storage if it was hosted there
   */
  async deleteGameCover(imageUrl: string): Promise<void> {
    if (!isSupabaseConfigured || !imageUrl) return;

    try {
      if (imageUrl.includes(BUCKET_NAME)) {
        const parts = imageUrl.split(`/${BUCKET_NAME}/`);
        if (parts.length > 1) {
          const filePath = parts[1];
          await supabase.storage.from(BUCKET_NAME).remove([filePath]);
        }
      }
    } catch (err) {
      console.warn('Avertissement lors de la suppression de l\'image de couverture:', err);
    }
  }
};
