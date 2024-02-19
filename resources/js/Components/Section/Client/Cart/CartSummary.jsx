import { currencyFormat } from "@/Logic/helper";

const CartSummary = ({ subTotal, totalCart, coupon, couponAmount }) => {
    return (
        <>
            <div className="flex justify-between text-base text-gray-900">
                <p className="text-gray-600">Sous-total</p>
                <p className="font-medium">{currencyFormat(subTotal())}</p>
            </div>
            <div className="flex justify-between text-base text-gray-900">
                <p className="text-gray-600">Frais de livraison</p>
                <p className="font-medium">--- --- </p>
            </div>
            {coupon && (
                <div className="flex justify-between text-base text-gray-900">
                    <div className="flex items-center gap-2">
                        <p className="text-gray-600">Coupon</p>
                        <span className=" inline-flex items-center justify-center font-medium bg-indigo-100 text-indigo-800 text-base px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                            {coupon?.type == "percentage"
                                ? coupon.value + " %"
                                : currencyFormat(coupon.value)}
                        </span>
                    </div>
                    <p className="font-medium">
                        - {currencyFormat(couponAmount())}
                    </p>
                </div>
            )}
            <hr className="pb-2" />
            <div className="flex justify-between text-base text-gray-900">
                <p className="text-gray-600 font-medium">Total</p>
                <p className="font-semibold">{currencyFormat(totalCart())}</p>
            </div>

            {/* <div className="pt-2">
                <button onClick={() => setOrder(true)} className="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                    Passer la commande
                </button>
            </div>  */}
        </>
    );
};

export default CartSummary;
