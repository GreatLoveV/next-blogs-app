"use client";

import { useActionState } from "react";
import { registerUser } from "../actions/users";
import { type FormState } from "../actions/users";
const initialState: FormState = {
  errors: {},
  values: { username: "", name: "", password: "", confirmPassword: "" },
};
export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, initialState);
  return (
    <div>
      <h2>Register</h2>
      <form action={formAction} noValidate>
        <div>
          <label>
            Username
            <input
              type="text"
              name="username"
              required
              defaultValue={state.values?.username}
            />
            {state.errors?.username && (
              <p style={{ color: "red" }}>{state.errors.username}</p>
            )}
          </label>
        </div>
        <div>
          <label>
            Name
            <input
              type="text"
              name="name"
              required
              defaultValue={state.values?.name}
            />
            {state.errors?.name && (
              <p style={{ color: "red" }}>{state.errors.name}</p>
            )}
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              required
              defaultValue={state.values?.password}
            />
            {state.errors?.password && (
              <p style={{ color: "red" }}>{state.errors.password}</p>
            )}
          </label>
        </div>
        <div>
          <label>
            Confirm password
            <input
              type="password"
              name="confirmpassword"
              required
              defaultValue={state.values?.confirmPassword}
            />
          </label>
          {state.errors?.confirmPassword && (
            <p style={{ color: "red" }}>{state.errors.confirmPassword}</p>
          )}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
