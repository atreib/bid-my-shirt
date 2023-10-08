"use server";

import { revalidatePath } from "next/cache";
import { data } from "../data";

function findProductById(productId: string) {
  return data.find((product) => product.productId === productId);
}

async function bid(props: { bid: number; productId: string; userId: string }) {
  // eslint-disable-next-line no-promise-executor-return -- debug loading time
  await new Promise((resolve) => setTimeout(resolve, 3000));
  // eslint-disable-next-line no-console -- debug
  console.log("bid: ", props);
  revalidatePath("/shop");
  return props;
}

export { findProductById, bid };
