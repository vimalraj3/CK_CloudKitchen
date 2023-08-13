import { useAppDispatch } from "../../../../hooks";
import {
  setDialogBoxIsBtn,
  setDialogBoxOpen,
  setDialogBoxTitle,
} from "../../../../state/slices/dialog.slice";

export const AddAddress = () => {
  const dispatch = useAppDispatch();

  const handleAddressDialogBox = () => {
    dispatch(setDialogBoxOpen(true));
    dispatch(setDialogBoxIsBtn(false));
    dispatch(setDialogBoxTitle("Add you address"));
  };

  return (
    <div
      className="flex aspect-video  h-full w-[100%] cursor-pointer items-center justify-center rounded-xl border border-primary p-3 md:max-w-[250px] md:p-5"
      onClick={() => handleAddressDialogBox()}
    >
      <div className="flex items-center justify-center gap-2 text-primary">
        <i className="fa-solid fa-location-dot"></i> <p>Add address</p>
      </div>
    </div>
  );
};
