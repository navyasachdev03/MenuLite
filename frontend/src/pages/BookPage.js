import React, { useState, useEffect } from "react";
import { IoCalendarOutline, IoTimeOutline, IoPersonOutline, IoMailOutline } from "react-icons/io5";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import API_BASE_URL from "../ApiBaseUrl";
import { Link } from 'react-router-dom';

const BookPage = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [guests, setGuests] = useState(1);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [time, setTime] = useState("12:00");

    const today = new Date().toISOString().split('T')[0];
    const [currentTime, setCurrentTime] = useState("");

    const updateTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        setCurrentTime(`${hours}:${minutes}`);
    };

    useEffect(() => {
        updateTime();
        const intervalId = setInterval(updateTime, 60000);
        return () => clearInterval(intervalId);
    }, []);

    const handleIncrementGuests = () => {
        if (guests < 10) {
            setGuests(guests + 1);
        }
    };

    const handleDecrementGuests = () => {
        if (guests > 1) {
            setGuests(guests - 1);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${API_BASE_URL}appointment/book`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                name: name,
                guests: guests,
                date: date,
                time: time,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Booking response:", data);
                if (data.statusCode === 201) {
                    alert("Your table has been booked!");
                } else if (data.statusCode === 409) {
                    alert("Time slot not available");
                } else {
                    console.error("Booking failed:", data.message);
                }
            })
            .catch((error) => console.error("Error booking:", error));

    };

    const handleViewAppointment = () => {
        if (!email) {
            alert("Please enter an email to view your appointments.");
            return;
        }

        fetch(`${API_BASE_URL}appointment/view/${email}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.statusCode === 200) {
                    const bookeddate = new Date(data.bookedAppointment.date).toLocaleDateString()
                    const bookedtime = data.bookedAppointment.time;
                    alert(`Appointment booked at ${bookeddate} on ${bookedtime}`);
                } else {
                    alert("No appointments found for this email.");
                }
            })
            .catch((error) => console.error("Error fetching appointments:", error));
    };

    const handleDeleteAppointment = () => {
        if (!email) {
            alert("Please enter an email to delete your appointments.");
            return;
        }

        fetch(`${API_BASE_URL}appointment/delete/${email}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.statusCode === 200) {
                    alert("Your appointment has been deleted.");
                } else {
                    alert("No appointments found to delete.");
                }
            })
            .catch((error) => console.error("Error deleting appointments:", error));
    };

    return (
        <div className="bg-blue-100 p-10 flex flex-col gap-10 min-h-screen">

            <div className="absolute md:top-12 md:left-12 top-8 left-6 hover:scale-110">
                <Link to="/user-home" className="flex flex-row">
                    <img
                        src="back.png"
                        alt="Back"
                        className="md:w-10 md:h-9 w-8 h-7"
                    />
                </Link>
            </div>
            <h1 className="text-4xl font-semibold text-blue-800 text-center mb-6 mt-20 md:mt-5">Reserve a Table!</h1>

            <div className="flex flex-row justify-start justify-center items-center">
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4 md:w-1/4 w-full">

                    <div className="flex items-center border-b border-gray-300 pb-2">
                        <IoMailOutline className="text-xl text-blue-700 mr-2" />
                        <input
                            type="email"
                            className="flex-1 bg-transparent border-none py-1 px-3 focus:outline-none"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex items-center border-b border-gray-300 pb-2">
                        <IoPersonOutline className="text-xl text-blue-700 mr-2" />
                        <input
                            type="text"
                            className="flex-1 bg-transparent border-none py-1 px-3 focus:outline-none"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between border-b border-gray-300 pb-2">
                        <IoPersonOutline className="text-xl text-blue-700 mr-2" />
                        <div className="flex items-center space-x-3">
                            <button
                                type="button"
                                onClick={handleDecrementGuests}
                                className="text-2xl text-blue-700 hover:text-blue-800"
                            >
                                <CiCircleMinus />
                            </button>
                            <span className="font-semibold">{guests}</span>
                            <button
                                type="button"
                                onClick={handleIncrementGuests}
                                className="text-2xl text-blue-700 hover:text-blue-800"
                            >
                                <CiCirclePlus />
                            </button>
                        </div>
                        <span className="text-gray-500">{guests === 1 ? "Guest" : "Guests"}</span>
                    </div>

                    <div className="flex items-center border-b border-gray-300 pb-2">
                        <IoCalendarOutline className="text-xl text-blue-700 mr-2" />
                        <input
                            type="date"
                            className="flex-1 bg-transparent border-none py-1 px-3 focus:outline-none"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            min={today}
                            required
                        />
                    </div>

                    <div className="flex items-center border-b border-gray-300 pb-2">
                        <IoTimeOutline className="text-xl text-blue-700 mr-2" />
                        <input
                            type="time"
                            className="flex-1 bg-transparent border-none py-1 px-3 focus:outline-none"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            min={date === today ? currentTime : "00:00"}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 rounded-lg w-full mt-4"
                    >
                        Book Now
                    </button>
                </form>

                <div className="md:mr-4 md:flex mt-5 md:ml-20 w-1/2 hidden md:block">
                    <img src="book.png" alt="book" className="w-196" />
                </div>
            </div>

            <div className="p-6 w-full md:w-1/2 mx-auto flex-col">
                <h2 className="text-4xl font-semibold text-blue-800 mb-10 text-center">
                    View/Delete your appointment
                </h2>
                <div className="flex items-center space-x-4">
                    <IoMailOutline className="text-xl text-blue-700" />
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 bg-transparent border-b border-gray-300 py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="flex space-x-4 mt-7">
                    <button
                        onClick={handleViewAppointment}
                        className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 rounded-lg"
                    >
                        View
                    </button>
                    <button
                        onClick={handleDeleteAppointment}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookPage;