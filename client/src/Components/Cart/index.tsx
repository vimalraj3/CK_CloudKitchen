import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ICart } from "../../types/user.types";
import { NavLink } from "react-router-dom";

interface ICartProps {
  cartItems: ICart[];
}
export default function index() {
  return (
    <div>
      <NavLink to={"/cart"}>
        <div className='cursor-pointer px-1 py-1'>
          <ShoppingCartIcon sx={{ width: 24, height: 24 }} />
        </div>
      </NavLink>
    </div>
  );
}
