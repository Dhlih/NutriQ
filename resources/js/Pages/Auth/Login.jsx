import React, { useEffect, useState } from "react";
import { router, useForm } from "@inertiajs/react";
import { Eye, EyeOff } from "lucide-react";
import { Spinner } from "@/Components/ui/spinner";

export default function Login() {
    const [isNotFilled, setIsNotFilled] = useState(false);
    const [hidePassword, setHidePassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    const handeLogin = (e) => {
        e.preventDefault();
        if (!data.email && !data.password) {
            setIsNotFilled(true);
            return;
        }

        post("/login");
    };

    useEffect(() => {
        console.log(isNotFilled);
    }, [isNotFilled]);

    return (
        <div className="h-screen flex flex-col  justify-center items-center gap-[2rem]">
            <div className="logo">
                <h1 className="font-bold text-4xl">NutriQ</h1>
            </div>
            <div className="card md:max-w-[320px] border border-gray-200 max-w-xs w-full p-[1.5rem] rounded-xl fill-secondary shadow-lg">
                <form onSubmit={handeLogin} className="flex flex-col">
                    <div className="flex flex-col gap-[0.5rem]">
                        <label htmlFor="" className="font-medium">
                            Email
                        </label>
                        <input
                            type="text"
                            onChange={(e) => setData("email", e.target.value)}
                            className="outline-none rounded-lg bg-white border border-gray-200"
                        />
                    </div>
                    <div className="flex flex-col gap-[0.5rem] mt-[1rem]">
                        <label htmlFor="" className="font-medium">
                            Password
                        </label>
                        <div className="flex items-center bg-white border border-gray-200 rounded-lg focus-within:outline-none focus-within:ring-0 focus-within:border-none overflow-hidden ">
                            <input
                                type={hidePassword ? "password" : "text"}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className="w-full outline-none border-none focus:outline-none focus:ring-0 "
                            />
                            {/* hide password button */}
                            <button
                                onClick={() => setHidePassword(!hidePassword)}
                                className="mr-[1rem] w-6 h-6 cursor-pointer opacity-60"
                                type="button"
                            >
                                {hidePassword ? <Eye className="w-full h-full"/> : <EyeOff className="h-full w-full" />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`mt-[2rem] fill-quartenary text-white p-[0.6rem] rounded-lg font-semibold hover:bg-quartenary/80  flex items-center justify-center`}
                        disabled={processing}
                    >
                        {!processing ? (
                            "Login"
                        ) : (
                            <Spinner className="w-7 h-7 " />
                        )}
                    </button>
                </form>

                <p className="text-center mt-[1rem] ">
                    Belum punya akun?
                    <span
                        className="text-quartenary font-semibold hover:underline cursor-pointer ml-[0.2rem]"
                        onClick={() => router.visit("/register")}
                    >
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
}
