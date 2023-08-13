import Container from "../../Container";
import { useAppSelector } from "../../../hooks";
import { CardItemLoading } from "../Loading/Loading";
import { CartItem } from "./CardItem";
import { CheckoutBox } from "../Checkout/CheckoutBox";
import { AddressSelector } from "../Address/AddressSelector";
import { NotFoundCart } from "../NotFound/NotFoundCart";

const Cart: React.FC = () => {
  const { loading, cart, error } = useAppSelector((state) => state.cartState);

  const tempArrayLoading: string[] = [...Array(5).fill("fdsfafdsa")];

  return (
    <div>
      <Container>
        <div className="min-h-[70svh]">
          {
            <div className="mx-auto flex flex-col gap-8 md:w-[100%] md:gap-8">
              <div className="flex flex-col gap-3 md:gap-4">
                <div className="flex flex-col gap-3 md:gap-8">
                  {loading && cart.length == 0 ? (
                    tempArrayLoading.map((v, i) => {
                      return <CardItemLoading key={i} />;
                    })
                  ) : cart.length == 0 ? (
                    <NotFoundCart />
                  ) : (
                    cart.map((v, i) => {
                      return <CartItem key={i} id={v._id} {...v} />;
                    })
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-8 md:gap-8">
                {cart.length !== 0 && (
                  <>
                    <div className="w-[100%] md:w-[100%]">
                      <AddressSelector />
                    </div>
                    <div className="w-[100%] md:w-[100%]">
                      <CheckoutBox />
                    </div>
                  </>
                )}
              </div>
            </div>
          }
        </div>
      </Container>
    </div>
  );
};

export default Cart;
