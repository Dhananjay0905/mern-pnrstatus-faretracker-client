import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import './PNRStatus.css';

const PNRStatusPage = () => {
    const [pnr, setPNR] = useState('');
    const [status, setStatus] = useState(null);
    const [error, setError] = useState('');

    const handlePNRChange = (event) => {
        setPNR(event.target.value);
    };

    const fetchPNRStatus = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/pnr/${pnr}`);
            console.log('Response:', response.data);
            const responseData = response.data;

            if (responseData.status && !responseData.status.errors) {
                setStatus(responseData.status);
                setError('');
            } else if (responseData.status && responseData.status.errors.length > 0) {
                setError('PNR number is invalid');
                setStatus(null);
            } else {
                setError('Failed to fetch PNR status');
                setStatus(null);
            }
        } catch (error) {
            console.error('Error fetching PNR status:', error);
            setError('Failed to fetch PNR status');
            alert('Failed to fetch PNR status');
            setStatus(null);
        }
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFont('helvetica', 'bold');
        doc.text('PNR Details', 10, 10);
        doc.setFont('helvetica', 'normal');
    
        if (status && status.data) {
            const { data } = status;
            doc.text('These are actual details for current status of your ticket', 10, 20);
            doc.text('but this pdf is not a valid ticket', 10, 30);
            doc.text(`PNR: ${data.Pnr}`, 10, 40);
            doc.text(`Train No: ${data.TrainNo}`, 10, 50);
            doc.text(`Train Name: ${data.TrainName}`, 10, 60);
            doc.text(`Date of Journey: ${data.Doj}`, 10, 70);
            doc.text(`Booking Date: ${data.BookingDate}`, 10, 80);
            doc.text(`Quota: ${data.Quota}`, 10, 90);
            doc.text(`Destination DOJ: ${data.DestinationDoj}`, 10, 100);
            doc.text(`Source DOJ: ${data.SourceDoj}`, 10, 110);
            doc.text(`Class: ${data.Class}`, 10, 120);
            doc.text(`Chart Prepared: ${data.ChartPrepared ? 'Yes' : 'No'}`, 10, 130);
            doc.text(`Boarding Station: ${data.BoardingStationName}`, 10, 140);
            doc.text(`Reservation Upto: ${data.ReservationUptoName}`, 10, 150);
            doc.text(`Departure Time: ${data.DepartureTime}`, 10, 160);
            doc.text(`Arrival Time: ${data.ArrivalTime}`, 10, 170);
    
            if (data.PassengerStatus) {
                doc.setFont('helvetica', 'bold');
                doc.text('Passenger Details:', 10, 180);
                doc.setFont('helvetica', 'normal');
    
                let yOffset = 190;
                data.PassengerStatus.forEach((passenger, index) => {
                    if (yOffset > 270) { 
                        doc.addPage();
                        yOffset = 10; 
                        doc.setFont('helvetica', 'bold');
                        doc.text('Passenger Details (continued):', 10, yOffset);
                        doc.setFont('helvetica', 'normal');
                        yOffset += 10;
                    }
                    doc.text(`Passenger Number: ${passenger.Number}`, 10, yOffset);
                    doc.text(`Booking Status: ${passenger.BookingStatus}`, 10, yOffset + 10);
                    doc.text(`Current Status: ${passenger.CurrentStatus}`, 10, yOffset + 20);
                    yOffset += 30; 
                });
            }
        }
        doc.save('PNR_Details.pdf');
    };
    
    

    const gotoFare = () => {
        window.location.href = '/fare';
    }

    return (
        <div className='BG'>
            <div className="container">
                <h2>Check PNR Status</h2>
                <input
                    id="pnr-input"
                    type="text"
                    placeholder="Enter PNR Number"
                    value={pnr}
                    onChange={handlePNRChange}
                />
                <button id="check-status-button" onClick={fetchPNRStatus}>Check Status</button>
                <button className='button-fetch' id="farebtn" onClick={gotoFare}>Check Fare Details</button>
                <button className='button-fetch' id="logoutbtn" onClick={() => window.location.href = '/'}>Logout</button>
            </div>
            {status && (
                <div className="table-container">
                    <h3>PNR Details</h3>
                    <div className="t1">
                        <table className="horizontal-table">
                            <thead>
                                <tr>
                                    <th>PNR</th>
                                    <th>Train No</th>
                                    <th>Train Name</th>
                                    <th>Date of Journey</th>
                                    <th>Booking Date</th>
                                    <th>Quota</th>
                                    <th>Destination DOJ</th>
                                    <th>Source DOJ</th>
                                    <th>Class</th>
                                    <th>Chart Prepared</th>
                                    <th>Boarding Station</th>
                                    <th>Reservation Upto</th>
                                    <th>Departure Time</th>
                                    <th>Arrival Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{status.data.Pnr}</td>
                                    <td>{status.data.TrainNo}</td>
                                    <td>{status.data.TrainName}</td>
                                    <td>{status.data.Doj}</td>
                                    <td>{status.data.BookingDate}</td>
                                    <td>{status.data.Quota}</td>
                                    <td>{status.data.DestinationDoj}</td>
                                    <td>{status.data.SourceDoj}</td>
                                    <td>{status.data.Class}</td>
                                    <td>{status.data.ChartPrepared ? 'Yes' : 'No'}</td>
                                    <td>{status.data.BoardingStationName}</td>
                                    <td>{status.data.ReservationUptoName}</td>
                                    <td>{status.data.DepartureTime}</td>
                                    <td>{status.data.ArrivalTime}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {status.data && status.data.PassengerStatus && (
                        <div>
                            <h3>Passenger Details</h3>
                            <div className="t2">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Passenger Number</th>
                                            <th>Booking Status</th>
                                            <th>Current Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {status.data.PassengerStatus.map((passenger, index) => (
                                            <tr key={index}>
                                                <td>{passenger.Number}</td>
                                                <td>{passenger.BookingStatus}</td>
                                                <td>{passenger.CurrentStatus}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    <button id="download-pdf-button" onClick={downloadPDF}>Download as PDF</button>
                </div>
            )}
            {error && (
                <div id="error-message">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default PNRStatusPage;
