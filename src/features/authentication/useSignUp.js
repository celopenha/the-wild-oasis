import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({email, password, full_name}) => signupApi({email, password, full_name}),
    onSuccess: () => {
      toast.success("User created successfully")
    }, onError: (error) => {
      console.error(error)
      toast.error(error.message)
    }
  })
  return { signup, isLoading }
}