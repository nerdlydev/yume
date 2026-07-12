import { useMutation } from '@tanstack/react-query';
import { communityApi } from '../api';

export function useCreateCommunity() {
  return useMutation({
    mutationFn: communityApi.create,
    onSuccess: () => {
      // Logic for invalidating queries or showing toast notifications goes here
    },
  });
}
