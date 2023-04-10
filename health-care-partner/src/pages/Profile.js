import React from 'react';
import Navbar from '../components/Navbar';
import useAuth from '../hooks/useAuth';

const Profile = () => {

    const { user, logOut } = useAuth()

    return (
        <div className='bg-brand'>
            <Navbar />
            <div className="container mt-5">
                <div style={{ borderRadius: '10px', boxShadow: '0 5px 15px #c4c4c44d' }} className="bg-white col-md-4 p-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2 className="text-brand fs-5">User Information</h2>
                        <button onClick={() => logOut()} className="btn btn-sm btn-danger mb-1">Log Out</button>
                    </div>
                    <div className="row justify-content-center align-items-center mt-3">
                        {/* <div className="col-md-4">
                            <img style={{ height: '150', width: '150px', borderRadius: '50%' }} className='img-fluid mx-auto d-block' src="https://media.licdn.com/dms/image/C5603AQEn-zsG84oP7w/profile-displayphoto-shrink_800_800/0/1644162914859?e=2147483647&v=beta&t=u7v04WC5CE5NjpjuDHlv5BFkzHug3ZxdUBzJbR_Zk-w" alt="eftykhar rahman" />
                        </div> */}
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h3 style={{ fontSize: '13px' }} className='mt-3'>Name<br />{user.name}</h3>

                                    <h3 style={{ fontSize: '13px' }} className='mt-3'>Phone<br />{user.phone}</h3>
                                    {/* <h3 style={{ fontSize: '13px' }} className='mt-3'>Age<br />{user.age}</h3> */}
                                    <h3 style={{ fontSize: '13px' }} className='mt-3'>Age<br />{Math.abs(new Date(Date.now() - new Date(user.age.split("-")[0], user.age.split("-")[1] - 1, user.age.split("-")[2]).getTime()).getUTCFullYear() - 1970)}</h3>
                                </div>
                                <div className="col-sm-6">
                                    <h3 style={{ fontSize: '13px' }} className='mt-3'>Email<br />{user.email}</h3>
                                    <h3 style={{ fontSize: '13px' }} className='mt-3'>Weight<br />{user.weight}</h3>
                                    <h3 style={{ fontSize: '13px' }} className='mt-3'>Blood Group<br />{user.blood}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;