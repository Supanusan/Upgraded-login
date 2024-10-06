import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading';

export const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [apiresponce, setApiresponce] = useState('')
  const [isloading, setIsloading] = useState(false)
  const navigate = useNavigate()

  const URL = "http://localhost:5000/login"

  async function res() {
    setIsloading(true)
    try {
      const responce = await fetch(URL, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });
      const result = await responce.json();
      setIsloading(false)
      if (responce.ok) {
        setApiresponce(result)
        setTimeout(() => {
          navigate("/main")
        }, 2000)
      }
      else {
        setApiresponce(result)
      }

    } catch (error) {
      setIsloading(false)
      setApiresponce(res.message)

    }
  }
  function inputcheck(e) {
    e.preventDefault()
    if (!username || !password) {
      return alert("username and passeord wanted...")
    }
    res()
  }
  const navigatepage = () => {
    navigate('/create')
  }
  function usernamecheck(e) {
    setUsername(e.target.value)
  }
  function passwordcheck(e) {
    setPassword(e.target.value)
  }
  return (
    <>'
      <div className='w-full h-screen flex flex-col items-center justify-center relative'>
        <form onSubmit={inputcheck} className='bg-slate-500 w-64 H-max flex flex-col items-center rounded-md'>
          <p className='text-white font-bold text-2xl'>Login account</p>
          <input onChange={usernamecheck} value={username} placeholder='Username' className='border px-1 py-2 rounded-md my-10 mx-3'></input>
          <input onChange={passwordcheck} value={password} placeholder='password' className='border px-1 py-2 rounded-md mb-10'></input>
          <button className='bg-blue-900 px-10 py-2 rounded-md text-white mb-3' >Submit</button>
          <p className='text-sm text-white cursor-pointer' onClick={navigatepage}>I haven't an account</p>
        </form>
        {apiresponce &&
          <div className='bg-blue-600 rounded-md text-white mt-4 py-2 px-4'>{apiresponce}</div>}
      </div >
      {isloading &&
        <Loading />
      }

    </>

  )
}
export default Login;