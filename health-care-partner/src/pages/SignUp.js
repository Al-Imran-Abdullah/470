import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import signUpImage from '../images/signup.png'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const SignUp = () => {

    const { setUser } = useAuth()
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        fetch('http://localhost:5001/addUser', {
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
                    navigate('/profile')
                }
            })
    }

    return (
        <div className='bg-brand'>
            <Navbar />
            <div className="container mt-5">
                <div className="row justify-content-center align-items-center">

                    <div className="col-sm-3">
                        <h2 className='fs-4 text-brand text-center'>Sign Up</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="my-3">
                                <input type='text' placeholder='Name' className='form-control' {...register("name", { required: true })} />
                                <p>{errors.name && <span className='text-danger'>*This field is required</span>}</p>
                            </div>

                            <div className="my-3">
                                <input type='email' placeholder='Email' className='form-control' {...register("email", { required: true })} />
                                <p>{errors.email && <span className='text-danger'>*This field is required</span>}</p>
                            </div>

                            <div className="my-3">
                                <input type="phone" placeholder='Phone' className='form-control' {...register("phone", { required: true })} />
                                <p>{errors.phone && <span className='text-danger'>*This field is required</span>}</p>
                            </div>

                            <div className="my-3">
                                <input type="text" placeholder='Weight' className='form-control' {...register("weight", { required: true })} />
                                <p>{errors.weight && <span className='text-danger'>*This field is required</span>}</p>
                            </div>

                            <div className="my-3">
                                <input type="text" placeholder='Blood Group' className='form-control' {...register("blood", { required: true })} />
                                <p>{errors.blood && <span className='text-danger'>*This field is required</span>}</p>
                            </div>

                            <div className="my-3">
                                <input type="date" placeholder='Age' className='form-control' {...register("age", { required: true })} />
                                <p>{errors.age && <span className='text-danger'>*This field is required</span>}</p>
                            </div>

                            <div className="my-3">
                                <input type="password" placeholder='Password' className='form-control' {...register("password", { required: true })} />
                                <p>{errors.password && <span className='text-danger'>*This field is required</span>}</p>
                            </div>

                            <p className='text-danger fw-bold'>{loginError}</p>

                            <input type="submit" value="Register" className='btn btn-primary w-100' />

                        </form>

                        <p className='mt-3'><Link to='/login'>Have an account? Login here</Link></p>
                    </div>

                    <div className="col-sm-9">
                        <img className='img-fluid float-end' src={signUpImage} alt="sign up" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;