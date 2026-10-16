import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
export default function AuthPage({ register = false }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    localStorage.setItem("authUser", JSON.stringify({ email }));
    navigate("/");
  };
  return (
    <main className="site-main grid place-items-center bg-gray-50 px-4 py-16">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white border rounded-2xl p-8 shadow-sm"
      >
        <h1 className="text-2xl font-extrabold">
          {register ? "Create your account" : "Welcome back"}
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          {register
            ? "Save favorites and continue exploring Hanoi."
            : "Sign in to access your saved heritage sites."}
        </p>
        <label className="block text-sm font-semibold mt-6">
          Email
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 border rounded-lg p-3"
          />
        </label>
        <label className="block text-sm font-semibold mt-4">
          Password
          <input
            required
            minLength="6"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-2 border rounded-lg p-3"
          />
        </label>
        <button className="w-full bg-black text-white rounded-lg py-3 mt-6 font-semibold">
          {register ? "Register" : "Log in"}
        </button>
        <p className="text-sm text-center mt-5">
          {register ? "Already registered?" : "New here?"}{" "}
          <Link
            className="font-semibold underline"
            to={register ? "/login" : "/register"}
          >
            {register ? "Log in" : "Create an account"}
          </Link>
        </p>
      </form>
    </main>
  );
}
