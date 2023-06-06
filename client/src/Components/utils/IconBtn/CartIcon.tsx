import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { NavLink } from "react-router-dom";

export default function CartIcon() {
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
