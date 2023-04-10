import React from 'react';
import Navbar from '../components/Navbar';
import hospitalData from '../data/hospital.json'

const Contact = () => {
    return (
        <div className='bg-brand'>
            <Navbar />
            <div className="container">
                <div className="row mt-5">
                    <h2 className="fs-5 text-brand">Hospital Information</h2>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th style={{ fontSize: '13px' }}>Name</th>
                                <th style={{ fontSize: '13px' }}>Address</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                hospitalData.length > 0 &&
                                hospitalData.map((data, index) =>
                                    <tr style={{ border: '1px solid lightgray' }} key={index}>
                                        <td style={{ width: '117px' }}>{data.name}</td>
                                        <td style={{ width: '117px' }}>{data.address}</td>
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

export default Contact;