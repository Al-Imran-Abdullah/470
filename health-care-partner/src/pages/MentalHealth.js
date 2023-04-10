import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import BarChart from '../components/BarChart';

const MentalHealth = () => {

    const { user, mood, setMood } = useAuth()
    const [moodMeter, setMoodMeter] = useState(5)

    const [moodError, setMoodError] = useState('');
    const [moodSuccess, setMoodSuccess] = useState('');

    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const details = {
            meter: parseInt(data.meter),
            note: data.note,
            email: user.email,
            date: data.date
            // date: new Date().toISOString().split('T')[0]
        }
        fetch('https://healthcare-hthc.onrender.com/mood', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(details)
        })
            .then(res => res.json())
            .then(result => {
                if (result.status === false) {
                    setMoodError(result.message)
                    setMoodSuccess("")
                }
                else {
                    setMood([...mood,details])
                    setMoodError("")
                    setMoodSuccess(result.message)
                    document.getElementById('mood-form').reset()
                    setMoodMeter(5)
                    randomQuote()
                }
            })
    }

    const randomQuote = () => {
        fetch('https://api.quotable.io/random')
        .then(res => res.json())
        .then(data => {
            setQuote(data.content)
            setAuthor(data.author)
        })
    }

    return (
        <div className='bg-brand'>
            <Navbar />
            <div className="container mt-5">
                <h5 className="text-brand">Submit your mood meter today</h5>
                <div className="row justify-content-between align-items-center">
                    <div className="col-md-4">
                        <form id='mood-form' onSubmit={handleSubmit(onSubmit)}>
                            <div className="my-3">
                                <input onChangeCapture={(e) => setMoodMeter(e.target.value)} defaultValue={5} type="range" min='1' max='10' name="" id="" {...register("meter", { required: true })} />
                            </div>
                            <p>{errors.meter && <span className='text-danger'>*This field is required</span>}</p>
                            <p className='fs-5 mt-3'>Your Mood Meter: <span className='text-brand fw-bold'>{moodMeter}</span></p>

                            <div className="my-3">
                                <input type='date' placeholder='Date' className='form-control' {...register("date", { required: true })} />
                                <p>{errors.date && <span className='text-danger'>*This field is required</span>}</p>
                            </div>

                            <div className="mb-3">
                                <input type='text' placeholder="Note" {...register("note", { required: true })} className='form-control' />
                                <p>{errors.note && <span className='text-danger'>*This field is required</span>}</p>
                            </div>

                            <p className='text-danger fw-bold'>{moodError}</p>
                            <p className='text-success fw-bold'>{moodSuccess}</p>

                            <button className='btn btn-primary w-100'>Submit</button>
                        </form>
                        {quote && <p className='mt-3'>{quote} <br />- {author}</p>}
                    </div>

                    <div className="col-md-8 mt-3"><BarChart label='Mental Health' title='Mental Health Meter' bg='rgba(53, 162, 235, 0.5)' chartData={mood} /></div>
                </div>

                <div className="row mt-5 col-md-4">
                    <h2 className="fs-5">Previous History</h2>
                    <table className="table table-striped table-primary table-hover">
                        <thead>
                            <tr>
                                <th style={{ fontSize: '13px' }}>Date</th>
                                <th style={{ fontSize: '13px' }}>Count</th>
                                <th style={{ fontSize: '13px' }}>Remark</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                mood.length > 0 &&
                                mood.map((mood, index) =>
                                    <tr style={{ border: '1px solid lightgray' }} key={index}>
                                        <td style={{ width: '120px' }}>{new Date(mood.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                        <td style={{ width: '117px' }}>{mood.meter}</td>
                                        <td style={{ width: '117px' }}>{mood.note}</td>
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

export default MentalHealth;