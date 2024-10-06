import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';




export const Create = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isloading, setIsloading] = useState(false)
    const [apiresponce, setApiresponce] = useState("")

    const URL = "http://localhost:5000/create"



    // To create a  account
    const res = async () => {
        try {
            setIsloading(true)
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ username, password })

            })
            const result = await response.json();
            setIsloading(false)

            if (response.ok) {
                setApiresponce(result)


            }
            else {
                setApiresponce(result.message)
            }
        }

        catch (error) {
            setApiresponce(error.message);

        }


    }

    function usernamecheck(e) {
        setUsername(e.target.value)
    }
    function passwordcheck(e) {
        setPassword(e.target.value)
    }
    async function inputcheck(e) {
        e.preventDefault()
        //Checking the username password
        if (!username || !password) {
            return alert("Username,Password wanted...")
        }


        await res()
        setTimeout(() => {
            navigate("/")
        }, 3000)

    }





    return (

        <>
            <div className='w-full h-screen flex flex-col items-center justify-center'>
                <form className='bg-slate-500 w-64 h-max flex flex-col items-center rounded-md' onSubmit={inputcheck}>
                    <p className='text-white font-bold text-2xl'>Create Account</p>
                    <input className='border px-1 py-2 rounded-md my-10 mx-3' type="text" placeholder='Username...' onChange={usernamecheck} value={username} />
                    <input className='border px-1 py-2 rounded-md  mx-3  mb-10' type="password" placeholder='password...' onChange={passwordcheck} value={password} />
                    <button className='bg-blue-900 px-10 py-2 rounded-md text-white mb-3' >Create account</button>
                </form>
                {apiresponce && (
                    <div className='bg-blue-600 rounded-md text-white px-4 py-2 mt-4'>
                        {apiresponce}
                    </div>
                )}
            </div>
            {isloading && <Loading />}
        </>






    )
}
export default Create;