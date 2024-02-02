'use client';

import { useState } from 'react';
import Modal from './Modal';
import useUploadModal from '@/hooks/useUploadModal';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import uniqid from 'uniqid';
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZUploadSchema, uploadSchema } from '@/types';
import Input from './Input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { toast } from 'sonner';

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadModal = useUploadModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      producer: 'WavyBoyJodii',
      title: '',
      genre: '',
      bpm: undefined,
      beat: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = await values.image?.[0];
      const beatFile = await values.beat?.[0];
      if (!imageFile || !beatFile || !user) {
        toast.error('missing image or beat');
        return;
      }

      const uniqueId = uniqid();

      // upload Beat
      const { data: beatData, error: beatError } = await supabaseClient.storage
        .from('beats')
        .upload(`beat-${values.title}-${uniqueId}`, beatFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (beatError) {
        setIsLoading(false);
        return toast.error('Failed beat upload');
      }

      // Upload image
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from('images')
          .upload(`image-${values.title}-${uniqueId}`, imageFile, {
            cacheControl: '3600',
            upsert: false,
          });

      if (imageError) {
        setIsLoading(false);
        return toast.error('Failed image upload');
      }

      // Create Beat in database
      const { error: supabaseError } = await supabaseClient
        .from('beats')
        .insert({
          user_id: user.id,
          title: values.title,
          producer: values.producer,
          genre: values.genre,
          bpm: values.bpm,
          image_path: imageData.path,
          beat_path: beatData.path,
        });

      if (supabaseError) {
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success('Song created!');
      reset();
      uploadModal.onClose();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add a song"
      description="Upload an mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-1 flex flex-col gap-y-4"
      >
        <Input
          id="producer"
          placeholder="Jodii"
          disabled={isLoading}
          {...register('producer', { required: true })}
        />

        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder="Song title"
        />
        <Label htmlFor="genre">Genre</Label>

        <Input
          id="genre"
          placeholder="Trap"
          disabled={isLoading}
          {...register('genre', { required: true })}
        />

        <Label htmlFor="bpm">BPM</Label>
        <Input
          id="bpm"
          type="number"
          disabled={isLoading}
          {...register('bpm', { required: true })}
        />

        <Label htmlFor="beat">Upload Beat</Label>
        <Input
          id="beat"
          type="file"
          accept="audio/*"
          disabled={isLoading}
          required={true}
          {...register('beat', { required: true })}
        />

        <Label htmlFor="image">Upload Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          disabled={isLoading}
          required={true}
          {...register('image', { required: true })}
        />

        <Button disabled={isLoading} type="submit">
          Submit
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
