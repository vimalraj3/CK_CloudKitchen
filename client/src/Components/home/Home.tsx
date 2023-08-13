import Category from "./Category";
import Hero from "./Hero";
import OfferCard from "./OfferCard";
import Food from "../Food/Foods";

export default function Home() {
  return (
    <div>
      <Hero />
      <OfferCard />
      <Category />
      <Food />
    </div>
  );
}
