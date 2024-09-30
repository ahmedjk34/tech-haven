import React from "react";
import styles from "../../styles/pages/authenticationPage.module.scss";
import AuthenticationForm from "@/components/AuthenticationForm/AuthenticationForm";
type Props = {};

function page({}: Props) {
  return (
    <div className={styles.authPage}>
      <AuthenticationForm
        type="Sign Up"
        fields={["Name", "Email", "Password"]}
      />
    </div>
  );
}

export default page;
