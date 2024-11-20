import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { signUpSchema } from "./validations";
import { SignUpFormValues } from "../../types/forms";
import Spinner from "../../components/Spinner";

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: joiResolver(signUpSchema),
  });

  const handleSignUp = handleSubmit(async (data) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
    } catch (error) {
      setError("Failed to sign up. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors?.email && (
              <p className="text-red-600 font-bold mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors?.password && (
              <p className="text-red-600 font-bold mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">
              Repeat Password
            </label>
            <input
              type="password"
              {...register("repeatPassword")}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors?.repeatPassword && (
              <p className="text-red-600 font-bold mt-1">
                {errors.repeatPassword.message}
              </p>
            )}
          </div>
          {error && <p className="text-red-600 font-bold mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-bold hover:bg-blue-600 transition duration-300 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <Spinner />
                Signing Up...
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
