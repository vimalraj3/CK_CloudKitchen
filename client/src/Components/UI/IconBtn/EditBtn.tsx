import { IconButton } from "@mui/material";
import { memo } from "react";

export const EditBtn = memo(() => {
  return (
    <IconButton aria-label="delete" size="small">
      <i className="fa-regular fa-pen-to-square"></i>
    </IconButton>
  );
});
