import { useMutation, useQueryClient,  } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      navigate("/dashboard", {replace: true})
      queryClient.setQueryData(["user"], data.user)
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { login, isLoading }
}