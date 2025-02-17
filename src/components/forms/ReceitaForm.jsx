import React from "react";
import { useForm } from "react-hook-form";

function ReceitaForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    console.log("Form Submitted", formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input {...register("name", { required: true })} />
        {errors.name && <span>This field is required</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ReceitaForm;
