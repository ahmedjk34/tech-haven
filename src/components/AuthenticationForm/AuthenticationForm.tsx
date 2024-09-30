import React from "react";
import styles from "./authenticationForm.module.scss";
import Link from "next/link";

type Props = {
  type: "Sign Up" | "Login";
  fields: string[];
};

function AuthenticationForm({ type, fields }: Props) {
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
    <form className={styles.form}>
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
