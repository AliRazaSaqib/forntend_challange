import React from "react";
import Characters from "../components/rickAndMorty/Characters";
import { Typography } from "@mui/material";

export default function characters() {
  return (
    <div>
      <Typography variant="h5">Filter by status: </Typography>
      <Characters />
    </div>
  );
}
