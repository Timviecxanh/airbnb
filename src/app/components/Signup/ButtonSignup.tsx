"use client";

import { Anchor } from "@mantine/core";

export default function ButtonSingup() {
  return (
    <>
      <Anchor href="#" fw={500} onClick={(event) => event.preventDefault()}>
        Register
      </Anchor>
    </>
  );
}
