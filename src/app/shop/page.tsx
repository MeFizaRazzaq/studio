import type { Metadata } from "next";
import ShopClient from "./ShopClient";

export const metadata: Metadata = {
  title: "Shop",
};

export default function ShopPage() {
  return <ShopClient />;
}
