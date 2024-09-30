import React from "react";
import styles from "../../styles/pages/authenticationPage.module.scss";
import AuthenticationForm from "@/components/AuthenticationForm/AuthenticationForm";
import { login } from "@/actions/user";
type Props = {};

function page({}: Props) {
  return (
    <div className={styles.authPage}>
      <AuthenticationForm
        type="Login"
        fields={["Email", "Password"]}
        action={login}
      />
    </div>
  );
}

export default page;
