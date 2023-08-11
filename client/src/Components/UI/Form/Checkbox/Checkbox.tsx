import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Select your address" } };
export const TickCheckbox = ({
  checked,
  square,
}: {
  checked: boolean;
  square?: boolean;
}) => {
  return (
    <div>
      <Checkbox
        {...label}
        icon={
          square ? (
            <i className="fa-regular fa-square-check"></i>
          ) : (
            <i className="fa-regular fa-circle-check"></i>
          )
        }
        checkedIcon={
          square ? (
            <i className="fa-solid fa-square-check"></i>
          ) : (
            <i className="fa-solid fa-circle-check"></i>
          )
        }
        color="success"
        checked={checked}
      />
    </div>
  );
};
