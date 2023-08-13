import { memo } from "react";
import { useAppDispatch } from "../../../../hooks";
import { setAddressId } from "../../../../state/slices/checkout.slice";
import { EditBtn } from "../../../UI/IconBtn/EditBtn";
import { DeleteBtn } from "../../../UI/IconBtn/DeleteBtn";
import { TickCheckbox } from "../../../UI/Form/Checkbox/Checkbox";
import { IAddress } from "../../../../types/user.types";

type IUserAddress = IAddress & {
  handleEvents?: (addressId: string, isEditEvent: boolean) => void;
  selector?: boolean;
  handleSelector?: (addressId: string) => void;
  selectedId?: string;
};
export const Address: React.FC<IUserAddress> = memo(
  ({
    houseNo,
    streetName,
    city,
    state,
    addressName,
    zipCode,
    handleEvents,
    _id,
    area,
    selector,
    selectedId,
  }) => {
    const dispatch = useAppDispatch();

    return (
      <div
        className={`aspect-video w-[100%] rounded-lg  p-3 md:max-w-[250px] md:p-5 ${
          selector && "cursor-pointer"
        } border ${
          selectedId === _id
            ? "border-green-400 bg-secondary"
            : " border-primary "
        }`}
        onClick={() => {
          dispatch(setAddressId(_id));
        }}
      >
        <div className="flex items-center justify-between gap-2">
          <h5 className="font-head text-lg font-medium capitalize">{`${addressName} `}</h5>
          {!selector ? (
            <div className="flex gap-2">
              <div onClick={() => handleEvents && handleEvents(_id, true)}>
                <EditBtn />
              </div>
              <div onClick={() => handleEvents && handleEvents(_id, false)}>
                <DeleteBtn />
              </div>
            </div>
          ) : (
            <TickCheckbox checked={selectedId === _id} />
          )}
        </div>
        <div className="font-para">
          <p>{`${houseNo}, ${streetName},`}</p>
          <p className="capitalize">{`${area},`}</p>
          <p className="capitalize">{`${city},`}</p>
          <p className="capitalize">{`${state} - ${zipCode}.`}</p>
        </div>
      </div>
    );
  },
);
