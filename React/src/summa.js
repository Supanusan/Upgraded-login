import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [apiresponce, setApiresponce] = useState('');
    const [isloading, setIsloading] = useState(false);
    const navigate = useNavigate();

    const URL = "http://localhost:5000/login";

    async function res() {
        setIsloading(true);
        try {
            const responce = await fetch(URL, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const result = await responce.json();
            setIsloading(false); // Set loading to false immediately after response

            if (responce.ok) {
                setApiresponce(result);
                // Navigate after a successful response
                navigate("/main");
            } else {
                setApiresponce(result);
            }
        } catch (error) {
            setIsloading(false); // Ensure loading is set to false in case of error
            setApiresponce(error.message); // Use error.message instead of res.message
        }
    }

    function inputcheck(e) {
        e.preventDefault();
        if (!username || !password) {
            return alert("Username and password are required...");
        }
        res();
    }

    const navigatepage = () => {
        navigate('/create');
    }

    function usernamecheck(e) {
        setUsername(e.target.value);
    }

    function passwordcheck(e) {
        setPassword(e.target.value);
    }

    return (
        <div className='w-full h-screen flex flex-col items-center justify-center'>
            <form onSubmit={inputcheck} className='bg-slate-500 w-64 h-max flex flex-col items-center rounded-md'>
                <p className='text-white font-bold text-2xl'>Login account</p>
                <input onChange={usernamecheck} value={username} placeholder='Username' className='border px-1 py-2 rounded-md my-10 mx-3'></input>
                <input onChange={passwordcheck} value={password} placeholder='Password' className='border px-1 py-2 rounded-md mb-10'></input>
                <button className='bg-blue-900 px-10 py-2 rounded-md text-white mb-3'>Submit</button>
                <p className='text-sm text-white cursor-pointer' onClick={navigatepage}>I haven't an account</p>
            </form>
            {apiresponce && <div className='bg-blue-600 rounded-md text-white mt-4 py-2 px-4'>{apiresponce}</div>}
            {isloading && (
                <div className='w-full h-screen flex justify-center items-center'>
                    <ReactLoading type={'spinningBubbles'} color={'blue'} height={100} width={100} />
                </div>
            )}
        </div>
    );
}

export default Login;
