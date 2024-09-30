import React from "react";
import styles from "./authenticationForm.module.scss";
import Link from "next/link";
import { login, register } from "@/actions/user";

type Props = {
  type: "Sign Up" | "Login";
  fields: string[];
  action: (
    formData: FormData
  ) => Promise<
    (Record<string, unknown> & { err?: Error | undefined }) | undefined
  >;
};

function AuthenticationForm({ type, fields, action }: Props) {
  const renderInputType = (field: string) => {
    if (field.toLowerCase() === "email") {
      return "email";
    }
    if (field.toLowerCase() === "password") {
      return "password";
    }
    return "text";
  };

  return (
    <form className={styles.form} action={action}>
      <h2>{type}</h2>
      {fields.map((field) => (
        <div key={field} className={styles.field}>
          <label htmlFor={field}>{field}:</label>
          <input
            id={field}
            name={field.toLowerCase()}
            type={renderInputType(field)}
          />
        </div>
      ))}
      <div className={styles.actionsHolder}>
        <button type="submit" className={styles.submitButton}>
          {type}
        </button>
        <Link href={type == "Login" ? "/register" : "/login"}>
          {type == "Login" ? "Sign Up" : "Login"}
        </Link>
      </div>
    </form>
  );
}

export default AuthenticationForm;
