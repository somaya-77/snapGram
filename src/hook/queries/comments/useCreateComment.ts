import { DOMAIN } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const createComment = async ({text, postId}: {text: string; postId: number;}) => {
  const response = await axios.post(`${DOMAIN}/api/comments`, {text, postId});
  return response.data;
};

const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,
    onSuccess: (_, {postId}) => {
      // queryClient.invalidateQueries({ queryKey: ["comments", text, postId] });
      queryClient.invalidateQueries({ queryKey: ["postDetails", String(postId)] });
    },
    onError: (error) => {
      console.error("Error creating comment:", error);
    },
  });
};

export default useCreateComment;



