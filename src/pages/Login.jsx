import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, reset } from "../features/authSlice";
import { Link } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isError, isSuccess, isLoading, message } = useSelector(
        (state) => state.auth
      );
    const handleAuth = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const obj = {
            email: formData.get("email"),
            password: formData.get("password"),
        };
        dispatch(loginUser(obj))
    }
    
    useEffect(() => {
        if (user || isSuccess) {
            navigate("/");
        }
        dispatch(reset());
    }, [user, isSuccess, dispatch, navigate]);
    return (
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body"
                        onSubmit={handleAuth}>
                        {isError && <p>{message}</p>}
                        <div className="form-control">
                            <label className="label" htmlFor='email'>
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text"
                                 name="email" 
                                 id="email" 
                                 placeholder="email" 
                                 className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label" htmlFor='password'>
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" 
                                placeholder="password" 
                                name='password' 
                                id="password" 
                                className="input input-bordered" />
                            <label className="label">
                                <Link to="/" className="label-text-alt link link-hover">Forgot password?</Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">{isLoading ? "Loading..." : "Login"}</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
    )
}
