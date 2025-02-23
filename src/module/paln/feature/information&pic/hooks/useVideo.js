import { useMutation } from '@tanstack/react-query';
import videoPatch from './videoPatch';

 const useVideo = (trace_code) => {
  const { mutate, isPending, isError } = useMutation({
    mutationKey: ['video'],
    mutationFn: (data) => videoPatch(trace_code, data),
  });

  return { mutate, isPending, isError };
};

export default useVideo;
