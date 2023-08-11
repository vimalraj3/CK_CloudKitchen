import { IconButton } from "@mui/material";
import { memo } from "react";

export const CloseIconBtn = memo(({ className }: { className?: string }) => {
  return (
    <IconButton aria-label="Close" size="small">
      <i className={`fa-solid fa-xmark cursor-pointer ${className || ""}`}></i>
    </IconButton>
  );
});
