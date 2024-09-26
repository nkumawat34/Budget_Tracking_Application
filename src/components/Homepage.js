import React from 'react'
import { MyContext } from '../contextapi/Context_api';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
export default function Homepage() {

    const navigate=useNavigate()
    const backgroundImage = useContext(MyContext);
  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, width:"100%" }} className='text-white h-[100%] xl:h-[100vh]'>

        <div class='flex flex-row text-white justify-center mr-20'>
            <h1 class='mt-3 text-4xl'>Expense Management Tracking System</h1>
           
        </div>
        <button class='bg-red-500 p-3  rounded-full mx-2 md:mx-4 float-right mt-5' onClick={()=>navigate("/signup")}>Register</button>
           <button class='bg-red-500 p-3  rounded-full mx-2 md:mx-4 float-right mt-5' onClick={()=>navigate("/login")}>Login</button>
           
          
        <div className='flex flex-col justify-center items-center'>
            <div class='mt-5 w-[50%]'>An Expense Management Tracking System (EMTS) is designed to help individuals or organizations manage and track their expenses efficiently. It involves various components and theories from information systems, data management, and financial management. Here’s an overview of the key aspects and components</div>
            <div class='text-3xl mt-5'>Testimonials</div>
        </div>
        <div class='flex flex-row gap-12 mt-16 flex-wrap justify-center items-center'>
            

<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-4">
    <a href="#">
        <img class="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Application UI is very good</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">The application's UI is excellent, offering both a visually appealing and user-friendly design. The layout and interactions feel intuitive, making the overall experience smooth and enjoyable</p>
        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            rahul@gmail.com
        </a>
    </div>
</div>


<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">I love the simple Design</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">I absolutely love the design! The dark theme is visually striking and adds a sleek, modern feel. It not only looks fantastic but is also highly intuitive, making it easy to navigate and perfectly suited for the project.</p>
        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            nkumawat34@gmail.com
             
        </a>
    </div>
</div>


<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Great Functionalities</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">This platform offers a wide range of advanced functionalities, including the ability to filter data based on specific dates and categorize it by type. These features provide users with greater flexibility and control, enabling them to easily access and organize the information they need.</p>
        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
           rajendrakumar@gmail.com
        </a>
    </div>
</div>

        </div>
        
    </div>
  )
}
