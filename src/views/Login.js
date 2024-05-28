import React, { useState } from 'react';
import backgroundImage from '../pic/blck.jpg';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        // Check if username and password are valid
        if (username === 'admin' && password === 'password') {
            // Assuming login is successful, navigate to the dashboard
            navigate('/admin/dashboard');
        } else {
            // Display error message near the input fields
            setError('Incorrect username or password. Please try again.');
        }
    };

    return (
        <section className="vh-100 gradient-custom" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{ borderRadius: '1rem', opacity: '0.8' }}>
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-5">
                                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                    <p className="text-white-50 mb-5"></p>
                                    <div className="form-outline form-white mb-4">
                                        <input type="text" id="username" className="form-control form-control-lg" value={username} onChange={(e) => setUsername(e.target.value)} />
                                        <label className="form-label" htmlFor="username">Username</label>
                                    </div>
                                    <div className="form-outline form-white mb-4">
                                        <input type="password" id="password" className="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        <label className="form-label" htmlFor="password">Password</label>
                                    </div>
                                    {error && <p className="text-danger mb-3">{error}</p>}
                                    <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot Password?</a></p>
                                    <button className="btn btn-outline-light btn-lg px-5" type="button" onClick={handleLogin}>Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
