import React, { useState } from 'react';
import axios from 'axios';
import './Fare.css';

function Fare() {
    const [trainNo, setTrainNo] = useState('');
    const [fromStationCode, setFromStationCode] = useState('');
    const [toStationCode, setToStationCode] = useState('');
    const [fareDetails, setFareDetails] = useState(null);

    const fetchFareDetails = async () => {
        try {
            const response = await axios.get('https://mern-pnrstatus-faretracker-server.onrender.com/fare', {
                params: {
                    trainNo,
                    fromStationCode,
                    toStationCode
                }
            });
            setFareDetails(response.data.fare.data);
        } catch (error) {
            console.error('Error fetching fare details:', error);
        }
    };

    const gotoPNR = async () => {
        window.location.href = '/pnr';
    }

    return (
        <div className="BG">
            <div className="Fare">
                <h1>Fare Details</h1>
                <div className="form-group">
                    <label htmlFor="trainNo">Train Number:</label>
                    <input
                        type="text"
                        id="trainNo"
                        value={trainNo}
                        onChange={(e) => setTrainNo(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fromStationCode">From Station Code:</label>
                    <input
                        type="text"
                        id="fromStationCode"
                        value={fromStationCode}
                        onChange={(e) => setFromStationCode(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="toStationCode">To Station Code:</label>
                    <input
                        type="text"
                        id="toStationCode"
                        value={toStationCode}
                        onChange={(e) => setToStationCode(e.target.value)}
                    />
                </div>
                <button className="button-fetch" onClick={fetchFareDetails}>Fetch Fare Details</button>
                <button className='button-fetch' id="pnrbtn" onClick={gotoPNR}>Check PNR Status</button>
                <button className='button-fetch' id="logoutbtn2" onClick={() => window.location.href = '/'}>Logout</button>
                {fareDetails && (
                    <>
                        <h2>General Fare</h2>
                        <table className="fare-table">
                            <thead>
                                <tr>
                                    <th>Class Type</th>
                                    {fareDetails.general.map((fare, index) => (
                                        <th key={index}>{fare.classType}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Fare</td>
                                    {fareDetails.general.map((fare, index) => (
                                        <td key={index}>{fare.fare}</td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>

                        <h2>Tatkal Fare</h2>
                        <table className="fare-table">
                            <thead>
                                <tr>
                                    <th>Class Type</th>
                                    {fareDetails.tatkal.map((fare, index) => (
                                        <th key={index}>{fare.classType}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Fare</td>
                                    {fareDetails.tatkal.map((fare, index) => (
                                        <td key={index}>{fare.fare}</td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                        <p className='note'>Note: The above fare details are in INR. We cannot fetch the details which are left blank</p>
                    </>
                )}
            </div>
        </div>
    );
}

export default Fare;
