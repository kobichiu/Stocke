import * as React from "react";
import {useState} from "react";
import {Link} from "react-router-dom";
import {LuEye, LuEyeClosed} from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (email === "xxx@gmail.com" && password === "1233211234567§§§") {
            navigate("/dashboard");
            setLoginError(false);
        } else {
            setLoginError(true);
        }
    }

    return (
        <div className="p-10 flex flex-col gap-10 md:py-20">
            <h1 className="text-center text-4xl font-bold leading-tight">
                Welcome Back
            </h1>
            <h3 className="text-center text-xl font-light">
                Enter your email and password to access your account.
            </h3>
            <form
                onSubmit={handleSubmit}
                className="mx-auto w-full max-w-md rounded-lg p-8 shadow-lg bg-white"
            >
                <label htmlFor="email" className="mt-3 block text-left">
                    Email address*
                </label>

                <input
                    required
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter email"
                    className="mt-1 block w-full box-border rounded-lg border border-gray-300 p-4 focus:outline-purple-500"
                />

                <label htmlFor="password" className="mt-3 block text-left">
                    Password*
                </label>

                <div className="relative w-full">
                    <input
                        required
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        className="mt-1 block w-full box-border rounded-lg border border-gray-300 p-4 pr-10 focus:outline-purple-500"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 flex -translate-y-1/2 cursor-pointer items-center border-none bg-transparent outline-none hover:outline-none focus:outline-none active:outline-none"
                    >
                        {showPassword ? <LuEye/> : <LuEyeClosed/>}
                    </button>
                </div>

                {loginError ? <p className="text-rose-600 mt-3">Failed to sign in. Please try again.</p> : null}

                <button
                    type="submit"
                    className="my-5 block w-full rounded-lg border-none bg-purple-400 p-2.5 text-white transition hover:bg-purple-300 active:bg-[#7a4691] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
                >
                    Log In
                </button>

                <p className="flex flex-col text-center sm:flex-row sm:justify-center sm:gap-1">
                    <span>Don't have an account?</span>

                    <Link
                        to="/signup"
                        className="text-purple-600 hover:underline"
                    >
                        Sign up here
                    </Link>
                </p>
            </form>
        </div>
    );
}