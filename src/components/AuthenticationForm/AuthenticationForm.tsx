"use client";
import React, { useState } from "react";
import styles from "./authenticationForm.module.scss";
import Link from "next/link";

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
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const renderInputType = (field: string) => {
    if (field.toLowerCase() === "email") {
      return "email";
    }
    if (field.toLowerCase() === "password") {
      return "password";
    }
    return "text";
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    try {
      const result = await action(formData);
      if (result?.err) {
        throw result.err;
      }
    } catch (err: unknown) {
      setError((err as Error).message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>{type}</h2>
      {error && <p className={styles.errorMessage}>{error}</p>}
      {fields.map((field) => (
        <div key={field} className={styles.field}>
          <label htmlFor={field}>{field}:</label>
          <input
            id={field}
            name={field.toLowerCase()}
            type={renderInputType(field)}
            disabled={isSubmitting}
          />
        </div>
      ))}
      <div className={styles.actionsHolder}>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : type}
        </button>
        <Link href={type == "Login" ? "/register" : "/login"}>
          {type == "Login" ? "Sign Up" : "Login"}
        </Link>
      </div>
    </form>
  );
}

export default AuthenticationForm;
