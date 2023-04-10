import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Navbar from '../components/Navbar';
import loginImage from '../images/login.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'

const Login = () => {

    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const { setUser, user } = useAuth()

    user?.email && navigate(from, { replace: true })

    const [loginError, setLoginError] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        fetch('http://localhost:5001/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result.status === false) {
                    setLoginError(result.message)
                }
                else {
                    setUser(result.user)
                    setLoginError('')
                    localStorage.setItem('uId', result.user._id)
                }
            })
    }

    return (
        <div className='bg-brand'>
            <Navbar />
            <div className="container mt-5">
                <div className="row justify-content-center align-items-center">

                    <div className="col-sm-3">
                        <h2 className='fs-4 text-brand text-center'>Sign In</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="my-3">
                                <input type='email' placeholder='Email' className='form-control' {...register("email", { required: true })} />
                                <p>{errors.email && <span className='text-danger'>*This field is required</span>}</p>
                            </div>

                            <div className="my-3">
                                <input type="password" placeholder='Password' className='form-control' {...register("password", { required: true })} />
                                <p>{errors.password && <span className='text-danger'>*This field is required</span>}</p>
                            </div>

                            <p className='text-danger fw-bold'>{loginError}</p>

                            <input type="submit" value="Login" className='btn btn-primary w-100' />
                        </form>

                        <p className='mt-3'><Link to='/sign-up'>Don't have an account? Sign Up here</Link></p>
                    </div>

                    <div className="col-sm-9">
                        <img className='img-fluid float-end' src={loginImage} alt="login" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;