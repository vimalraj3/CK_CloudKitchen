import { useLogout } from "../../hooks/useLogout";
import { DialogBox } from "../UI/DialogBox";

export const Logout: React.FC = () => {
  const { handleLogout, handleLogoutDialogBox } = useLogout();

  return (
    <div>
      <div
        className="mb-2 cursor-pointer text-blue-400 underline"
        onClick={() => {
          handleLogoutDialogBox();
        }}
      >
        Logout
      </div>
      <DialogBox handleConfirm={handleLogout}>
        <p>Are you sure you want to logout </p>
      </DialogBox>
    </div>
  );
};
