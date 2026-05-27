import * as React from "react";
import {useState} from "react";
import {LuEye, LuEyeClosed} from "react-icons/lu";
import {Link} from "react-router-dom";

export default function SignupForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pwdError, setPwdError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (password !== confirmPassword) {
            setPwdError(true);
            return;
        }

        setPwdError(false);

        console.log(email);
    }

    return (
        <div className="py-5 flex flex-col gap-10 px-2 md:py-20">
            <h1 className="text-center text-4xl font-bold leading-tight">
                Create an account
            </h1>
            <h3 className="text-center text-xl font-light">
                Enter your email and password to create your account.
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
                    placeholder="Enter your email"
                    className="mt-1 block w-full rounded-lg border border-gray-300 p-4 box-border focus:outline-purple-500"
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
                        placeholder="Enter your password"
                        className="mt-1 block w-full rounded-lg border border-gray-300 p-4 pr-10 box-border focus:outline-purple-500"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 flex -translate-y-1/2 cursor-pointer items-center border-none bg-transparent outline-none"
                    >
                        {showPassword ? <LuEye/> : <LuEyeClosed/>}
                    </button>
                </div>

                <label htmlFor="confirmpassword" className="mt-3 block text-left">
                    Confirm password*
                </label>

                <div className="relative w-full">
                    <input
                        required
                        id="confirmpassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password again"
                        className="mt-1 block w-full rounded-lg border border-gray-300 p-4 pr-10 box-border focus:outline-purple-500"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 flex -translate-y-1/2 cursor-pointer items-center border-none bg-transparent outline-none"
                    >
                        {showPassword ? <LuEye/> : <LuEyeClosed/>}
                    </button>
                </div>

                {pwdError && (
                    <p className="mt-3 text-sm text-red-500">
                        Passwords do not match
                    </p>
                )}

                <button
                    type="submit"
                    className="my-5 block w-full rounded-lg border-none bg-purple-400 p-2.5 text-white transition hover:bg-purple-300 active:bg-[#7a4691] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
                >
                    Sign Up
                </button>

                <p className="flex flex-col text-center sm:flex-row sm:justify-center sm:gap-1">
                    <span>Have an account already?</span>

                    <Link
                        to="/login"
                        className="text-purple-600 hover:underline"
                    >
                        Log in here
                    </Link>
                </p>
            </form>
        </div>
    );
}