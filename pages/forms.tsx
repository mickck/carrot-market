import { useForm } from "react-hook-form";
import { FieldErrors } from "react-hook-form/dist/types";

interface LoginForm {
  username: string;
  password: string;
  email: string;
  errors?: string;
}

function Forms() {
  // Less code (c)
  // Better validation
  // Better Erros (set, clear, display)
  // Have control over inputs
  // Dont deal with events (c)
  // Easier Inputs (c)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, touchedFields },
    watch,
    setError,
    setValue,
    reset,
    resetField,
  } = useForm<LoginForm>({
    mode: "onChange",
  });
  //register - value, onChange
  //watch - watch all of your form
  //handleSubmit - event.PreventDefault ,onValid, onInValid.
  //formState:{erros} - show you errors on the browser.
  //setError - show error to users when backend or same username ...
  //resetField - reset what set the field
  const onValid = (data: LoginForm) => {
    console.log("I'm valid bby");
    setError("username", { message: "This username is already used." });
    // reset();
    // resetField("password");
  };
  const onInValid = (errors: FieldErrors) => {
    console.log(errors);
  };
  return (
    <form onSubmit={handleSubmit(onValid, onInValid)} className='mt-2'>
      <input
        {...register("username", {
          required: "Username is required.",
          minLength: {
            value: 5,
            message: "The username should be longer than 5 chars.",
          },
        })}
        type='text'
        placeholder='Username'
      />
      {touchedFields.username ? "" : "Please write"} {errors.username?.message}
      <input
        {...register("email", {
          required: "Email is required.",
          validate: {
            noGmail: (value) => !value.includes("@gmail.com") || "Gmail is not allowed.",
          },
        })}
        type='email'
        placeholder='Email'
        className={`${Boolean(errors.email) ? " border-red-500" : ""}`}
      />
      {errors.email?.message}
      <input
        {...register("password", {
          required: "Password is required.",
        })}
        type='password'
        placeholder='Password'
      />
      {errors.password?.message}
      <input className='block' type='submit' value='Create Account' />
      {isSubmitSuccessful ? "Thank you." : ""}
    </form>
  );
}

export default Forms;
