import React from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import useToken from "../../hooks/useToken";
import googleIcon from "../../images/google.png";
import Loading from "../Shared/Loading";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  let signInErrorMessage;

  //Email and password signin
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  // Social Login google
  const [signInWithGoogle, googleUser, googlLoading, googleError] =
    useSignInWithGoogle(auth);

  const [token] = useToken(user || googleUser);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  if (loading || googlLoading) return <Loading></Loading>;
  if (error || googleError) {
    signInErrorMessage = (
      <p className="font-bold text-red-500">
        {error?.message || googleError?.message}
      </p>
    );
  }
  if (token) {
    navigate(from, { replace: true });
  }

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };

  return (
    <div className="hero min-h-screen bg-gradient-to-r from-slate-500 to-emerald-100 rounded-2xl">
      <div className="hero-content flex-col ">
        <div className="card  w-96 max-w-sm shadow-2xl bg-gradient-to-r from-red-200 to-emerald-100">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-center">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered w-full max-w-xs"
                  {...register("email", {
                    required: { value: true, message: "Email is Required" },
                    pattern: {
                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                      message: "Provide a valid Email",
                    },
                  })}
                />
                <label className="label">
                  {errors.email?.type === "required" && (
                    <span className="label-text-alt text-red-700">
                      {errors.email.message}
                    </span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span className="label-text-alt text-red-700">
                      {errors.email.message}
                    </span>
                  )}
                </label>
              </div>
              {/* Password */}

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Your password"
                  className="input input-bordered w-full max-w-xs"
                  {...register("password", {
                    required: { value: true, message: "Password is Required" },
                    minLength: {
                      value: 1,
                      message: "Password length must be 6 character or longer",
                    },
                  })}
                />

                <label className="label">
                  {errors.password?.type === "required" && (
                    <span className="label-text-alt text-red-700">
                      {errors.password.message}
                    </span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="label-text-alt text-red-700">
                      {errors.password.message}
                    </span>
                  )}
                </label>
              </div>

              <p className="text-left mb-2">
                <Link className="text-primary" to="/resetpassword">
                  Forget Password
                </Link>
              </p>
              {signInErrorMessage}
              <input
                type="submit"
                value="Login"
                className="btn btn-outline w-full "
              />
            </form>

            <p>
              New to Doctos portal?{" "}
              <Link className="text-primary" to="/signup">
                Create New Account
              </Link>{" "}
            </p>

            <div className="divider">OR</div>
            <button
              className="btn btn-outline "
              onClick={() => signInWithGoogle()}
            >
              <img className="w-8 mx-2" src={googleIcon} alt="" /> Countinue
              With Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
