import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { MyContext } from '../contextapi/Context_api';
import { useContext } from 'react';
export default function Login() {

    const [email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const navigate=useNavigate()
    const backgroundImage = useContext(MyContext);
    const handlesubmit=(e)=>{

      e.preventDefault()
      axios.post('http://localhost:3001/api/auth/login', {
        email: email,
        password: password
    })
    .then(response => {
        // Handle the response data here
        console.log(response.data);
        navigate('/trackingpage', { state: { email } });
        //localStorage.setItem('token'+email,response.data)
    })
    .catch(error => {
        // Handle any errors here
        console.error('Error:', error);
    });

    }
  return (
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" onSubmit={(e)=>handlesubmit(e)} >
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900 float-left">Email address</label>
        <div class="mt-2">
          <input id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e)=>setEmail(e.target.value)}/>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div class="text-sm">
            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
        </div>
        <div class="mt-2">
          <input id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e)=>setPassword(e.target.value)}/>
        </div>
      </div>

      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
      </div>
      <div class='flex flex-row justify-center'>
        <div>Don't have an account <span class='font-bold mx-2'>Register</span></div>
      </div>
    </form>

    
  </div>
</div>
  )
}
