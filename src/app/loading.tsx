import React from "react";

type Props = {};

function Loading({}: Props) {
  return (
    <div
      style={{
        width: "100dvw",
        height: "100dvh",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Loading</h1>
    </div>
  );
}

export default Loading;
