import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";

const Coupon = ({ coupon }) => {
    const { post, processing, data, setData } = useForm({
        code: coupon?.code || "",
    });
    const [isAnyCoupon, setIsAnyCoupon] = useState(false);
    const [error, setError] = useState(false);
    const verifyCoupon = (e) => {
        e.preventDefault();

        if (!data.code) {
            setError("Veuillez ajouté un code promo!");
        }
        post(route("coupon.add"));
    };

    useEffect(() => {
        if (coupon) {
            setIsAnyCoupon(true);
        }
    }, [coupon]);

    return (
        <>
            {processing && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary-50 w-full overflow-hidden">
                    <div className="progress-bar-value"></div>
                </div>
            )}
            <form onSubmit={verifyCoupon}>
                <div className="w-full inline-flex">
                    <input
                        placeholder="Coupon"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-s-[2rem] focus:ring-2 focus:ring-info-400 block w-full p-2.5 "
                        value={data.code}
                        onChange={(e) => setData("code", e.target.value)}
                        disabled={processing || isAnyCoupon}
                    />
                    <button
                        disabled={processing || isAnyCoupon}
                        className="inline-flex items-center text-white border border-gray-700 focus:ring-2 focus:ring-gray-400 font-medium rounded-e-[2rem] text-sm px-5 py-2.5 focus:outline-none  disabled:opacity-25 transition ease-in-out duration-150 bg-gray-700 hover:bg-gray-800"
                    >
                        Ajouter
                    </button>
                </div>
                {error && (
                    <p className="text-sm text-red-600 mt-1 ms-3">{error}</p>
                )}
            </form>
        </>
    );
};

export default Coupon;
