import { SubmitButton } from "./form-submit-button";
import type { User } from "@clerk/backend";
import { bid } from "./server-actions";

type Props = {
  user: User;
  productId: string;
};

function Bid(props: Props) {
  async function handleBid(formData: FormData) {
    "use server";

    await bid({
      userId: props.user.id,
      productId: props.productId,
      bid: Number(formData.get("bid")),
    });
  }

  return (
    <>
      <header>
        <h2>Hey, make a bid!</h2>
        <p className=" my-3">
          Send to the owner how much you would pay for his product. Give him
          your best shot!
        </p>
      </header>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises -- ServerActions vs ESLint */}
      <form action={handleBid}>
        <label className="text-sm text-muted-foreground" htmlFor="bid">
          Fill your bid below:
        </label>
        <div className="flex items-center space-x-3 my-1">
          <h3>$</h3>
          <input className="lg:max-w-xs" id="bid" name="bid" type="number" />
          <SubmitButton>Bid</SubmitButton>
        </div>
      </form>
    </>
  );
}

export { Bid };
