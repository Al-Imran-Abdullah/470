import React from 'react';
import Navbar from '../components/Navbar';
import heroImage from '../images/hero.png'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <section className='bg-brand'>
            <Navbar />

            <div className="container">
                <div style={{ minHeight: '600px' }} className="row justify-content-between align-items-center">
                    <div className="col-md-8">
                        <h4 className='title'>We want to connect healthcare experiences<br />on mobile and the first step is to prescribe<br />materials to app.</h4>
                        <Link to='/profile'><button className='btn btn-primary px-3 mt-3'>Learn More</button></Link>
                    </div>
                    <div className="col-md-4"><img width={400} className='img-fluid mx-auto d-block' src={heroImage} alt="hero section" /></div>
                </div>
            </div>

        </section>
    );
};

export default Home;