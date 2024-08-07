import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignUp } from "./useSignUp";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm({
    defaultValues: "",
  });
  const { errors } = formState;
  const { signup, isLoading: isSignUping } = useSignUp();

  function onSubmit({ full_name, email, password }) {
    signup(
      { full_name, email, password },
      {
        onSuccess: () => {
          !isSignUping ? reset() : null;
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.full_name?.message}>
        <Input
          type="text"
          id="full_name"
          {...register("full_name", { require: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            require: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please, provide a valid email address",
            },
          })}
        />
      </FormRow>
      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            require: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimun if 8 characteres",
            },
          })}
        />
      </FormRow>
      <FormRow
        label="Repeat password"
        error={errors?.confirm_password?.message}
      >
        <Input
          type="password"
          id="confirm_password"
          {...register("confirm_password", {
            require: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isSignUping}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
