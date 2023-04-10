import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import BarChart from '../components/BarChart';
import { useForm } from "react-hook-form";
import useAuth from '../hooks/useAuth';

const SelfCare = () => {

    const { user, water, setWater } = useAuth()
    const [waterError, setWaterError] = useState('');
    const [waterSuccess, setWaterSuccess] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {

        const details = {
            count: parseInt(data.count),
            date: data.date,
            // date: new Date().toISOString().split('T')[0],
            email: user.email
        }

        fetch('https://healthcare-hthc.onrender.com/water', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(details)
        })
            .then(res => res.json())
            .then(result => {
                if (result.status === false) {
                    setWaterError(result.message)
                    setWaterSuccess("")
                }
                else {
                    setWaterError("")
                    setWater([...water, details])
                    setWaterSuccess(result.message)
                    document.getElementById('water-form').reset()
                }
            })
    }

    return (
        <div className='bg-brand'>
            <Navbar />
            <div className="container mt-5">
                <h2 className='text-brand fs-5'>Your Daily Glass of Water Tracker</h2>
                <div className="row justify-content-between align-items-center">
                    <div className="col-md-8">
                        <BarChart label='Water Consumed' title='Water Consumed' bg='rgba(255, 99, 132, 0.5)' chartData={water} />
                    </div>

                    <div className="col-md-4 mt-3">
                        <h2 className='fs-5'>Input Today's Data</h2>
                        <form id='water-form' onSubmit={handleSubmit(onSubmit)}>
                            <div className="my-3">
                                <input type='date' placeholder='Date' className='form-control' {...register("date", { required: true })} />
                                <p>{errors.date && <span className='text-danger'>*This field is required</span>}</p>
                            </div>

                            <div className="my-3">
                                <input min='0' type='number' placeholder='Glass of Water' className='form-control' {...register("count", { required: true })} />
                                <p>{errors.count && <span className='text-danger'>*This field is required</span>}</p>
                            </div>

                            <p className='text-danger fw-bold'>{waterError}</p>
                            <p className='text-success fw-bold'>{waterSuccess}</p>

                            <button className='btn btn-success w-100'>Submit</button>
                        </form>
                    </div>
                </div>

                <div className="row mt-5 col-md-4">
                    <h2 className="fs-5">Previous History</h2>
                    <table className="table table-striped table-success table-hover">
                        <thead>
                            <tr>
                                <th style={{ fontSize: '13px' }}>Date</th>
                                <th style={{ fontSize: '13px' }}>Count</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                water.length > 0 &&
                                water.map((water, index) =>
                                    <tr style={{ border: '1px solid lightgray' }} key={index}>
                                        <td style={{ width: '120px' }}>{new Date(water.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                        <td style={{ width: '117px' }}>{water.count}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SelfCare;