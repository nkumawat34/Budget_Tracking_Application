import React from 'react'
import { MyContext } from '../contextapi/Context_api';
import { useContext } from 'react';
import { useState } from 'react';
import { GiButtonFinger } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import axios from 'axios';
import PieChart from './PieChart';
export default function TrackingPage() {
  const backgroundImage = useContext(MyContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const openModal1 = () => setIsOpen1(true);
  const closeModal1 = () => setIsOpen1(false);
  const navigate=useNavigate()
  const location = useLocation();
  const email = location.state.email;
  const [date,setDate]=useState(null)
  const [title,setTitle]=useState('')
  const [amount,setAmount]=useState(0)
  const [type,setType]=useState('')
  const [category,setCategory]=useState('')
  const [transactions,setTransactions]=useState([])
  const [transactionId,setTransactionId]=useState(0)
  const [defaulttransactions,setDefaultTransactions]=useState([])
  const [selectedType, setSelectedType] = useState('All'); // State for filter type
  const [startDate, setStartDate] = useState(''); // Start date for filtering
  const [endDate, setEndDate] = useState(''); // End date for filtering

  const[totalExpense,setTotalExpense]=useState(0)
  const [totalSaving,setTotalSaving]=useState(0)
  const[totalAmount,setTotalAmount]=useState(0)
  const[search,setSearch]=useState('')
  const [token,setToken]=useState('')
  const handlelogout=()=>{

    localStorage.removeItem('token'+email);
    navigate("/")
  }

  const calculatetotal=(transactions)=>{
    console.log(transactions)
    const expenses = transactions.filter(transaction => transaction.type === 'Expense');
    const savings = transactions.filter(transaction => transaction.type === 'Credit');

    const totalExpenses = expenses.reduce((total, transaction) => total + transaction.amount, 0);
    const totalSavings = savings.reduce((total, transaction) => total + transaction.amount, 0);

    setTotalExpense(totalExpenses);
    setTotalSaving(totalSavings);
    setTotalAmount(totalSavings-totalExpenses)
  }
  const formatDate = (dateTime) => {
    return dateTime.split('T')[0]; // Extract date part before 'T'
};
  useEffect(() => {
    
    const token1=localStorage.getItem('token'+email)
   
    const fetchTransactions = async () => {
        try {
            const response = await axios.get(`https://budget-tracking-application-backend.onrender.com/api/users/${email}/transactions`,
              {
                headers: {
                  'Authorization': `Bearer ${token1}`
                }
              }
            );
          
            // Map through transactions and update dateTime
const formattedTransactions = response.data.map(transaction => ({
  ...transaction,
  date: formatDate(transaction.date) // Update with formatted date
}));
            setTransactions(formattedTransactions);
            setDefaultTransactions(formattedTransactions)
            // Assuming transactionsData has a type property to distinguish between expenses and savings
             
             calculatetotal(response.data)
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };
    
    fetchTransactions(); // Call the async function

}, [email]); // Depend on email so the effect runs when email changes

// Filter transactions based on selected type
useEffect(() => {
 
  
  if (selectedType === 'All') {
    setTransactions(defaulttransactions);
   // calculatetotal(defaulttransactions)
  } else {
    
    const transaction1=defaulttransactions.filter(tx => tx.type === selectedType)
    setTransactions(transaction1);
    //calculatetotal(transaction1)
  }
  
}, [selectedType]);
const handleTypeChange = (e) => {
  setSelectedType(e.target.value); // Update the selected type
};
const handletransaction = async (e) => {
    e.preventDefault();

    // Perform form validation if needed
    if (!date || !title || amount <= 0 || !type || !category) {
        alert('Please fill in all fields correctly.');
        return;
    }

    // Replace with actual userId
    const userId = email; // You should replace this with the actual user ID, possibly from authentication context
    const isoDateString = date;
const date1 = new Date(isoDateString);

// Format date to YYYY-MM-DD
const formattedDate = date1.toISOString().split('T')[0];

    try {
    
        // Send form data to the server
        const response = await axios.post(`https://budget-tracking-application-backend.onrender.com/api/users/${userId}/transactions`, {
          date:formattedDate,  
          title:title,
            amount:amount,
            type:type,
            category:category
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
          
        )
        setTransactions([...transactions,response.data])
        calculatetotal([...transactions,response.data])
        // Handle successful response
        console.log('Transaction added:', response.data);
        setDate('');
        setTitle('');
        setAmount(0);
        setType('');
        setCategory('');
        alert('Transaction added successfully!');
        window.location.reload();
    } catch (error) {
        console.error('Error:', error);
        alert('Error adding transaction.');
    }
};
const handleEditTransaction=async (e)=>{

  e.preventDefault()
  const isoDateString = date;
const date = new Date(isoDateString);

// Format date to YYYY-MM-DD
const formattedDate = date.toISOString().split('T')[0];
    try{
      
    const response=await axios.put(`https://budget-tracking-application-backend.onrender.com/api/users/${email}/transactions/${transactionId}`,
      {
        date:formattedDate,  
    title:title,
      amount:amount,
      type:type,
      category:category
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    ).then(response=>{
      

    })
  }
  catch(err)
  {
    console.log(err)
  }
}

// Define the delete handler function
const handleDelete = async (transactionId) => {
  

  try {
    // Make an API call to delete the transaction
    await axios.delete(`https://budget-tracking-application-backend.onrender.com/api/users/${email}/transactions/${transactionId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    // Optionally, update the state to remove the deleted transaction from the UI
    
    setTransactions(prevTransactions => 
      prevTransactions.filter(transaction => transaction._id !== transactionId)
      
    );
    
  } catch (error) {
    console.error('Error deleting transaction:', error);
  }
};
const handleStartDateChange = (e) => {
  setStartDate(e.target.value); // Update the start date
};

const handleEndDateChange = (e) => {
  setEndDate(e.target.value); // Update the end date
};

const handlefilteredDateTransactions=()=>{

  let filtered = defaulttransactions;

  // Filter by date range
  if (startDate && endDate) {
    filtered = filtered.filter(tx => {
      const txDate = new Date(tx.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return txDate >= start && txDate <= end;
    });
  } else if (startDate) {
    filtered = filtered.filter(tx => new Date(tx.date) >= new Date(startDate));
  } else if (endDate) {
    filtered = filtered.filter(tx => new Date(tx.date) <= new Date(endDate));
  }
  if(selectedType!="All")
  {
  const transaction1=filtered.filter(tx => tx.type === selectedType)
  setTransactions(transaction1);
  }
  else
  setTransactions(filtered)
  //setTransactions(filtered)
}
  const searchFunctionality = () => {
    // Convert searchTerm to lowercase for case-insensitive comparison
    
    
    const lowercasedTerm = search.toLowerCase();
    
    if(search=="")
        setTransactions(defaulttransactions)
    // Filter items based on whether they include the search term
     setTransactions(defaulttransactions.filter(transaction =>
      transaction.title.toLowerCase().includes(lowercasedTerm)
    ));
  };
  useEffect(()=>{

    calculatetotal(transactions)
  },[transactions])
  return (
    <div>
      <div class='flex flex-row justify-between'>
      <h1 class='text-center font-bold text-2xl sm:text-4xl'>Expense Management System</h1>
      
      </div>
      <button
        className="p-1 sm:p-3 bg-blue-500 float-right text-white font-semibold rounded shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 mx-4 sm:mx-12"
        onClick={handlelogout}
      >
        Logout
      </button>
      <div className="mb-4 flex justify-center mt-5">
        <label className="block text-sm font-medium text-gray-700 ml-24 sm:ml-0">
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="border border-gray-400 px-4 py-2 mt-2 rounded"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700 mt-2 mx-4">
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            className="border border-gray-400 px-4 py-2 rounded"
          />
        </label>
        <button class='bg-blue-500 px-4 rounded-full mt-4 md:mt-0' onClick={()=>handlefilteredDateTransactions()}>Filter</button>
      </div>
      <div class="flex justify-center mt-6 mb-6 ml-24 sm:ml-0">
  <label for="type-select" class="mr-2">Type:</label>
  <select id="type-select" class="border border-gray-400 px-4 py-2 rounded" value={selectedType}
          onChange={handleTypeChange}>
    <option value="All">All</option>
    <option value="Expense">Expense</option>
    <option value="Credit">Credit</option>
    
  </select>
  <input class='border-2 border-gray-950 ml-12 w-28 sm:w-32' onChange={(e)=>setSearch(e.target.value)}></input>
  <button class='bg-slate-300 mx-2 rounded-full' onClick={()=>searchFunctionality()}>Search</button>
      {/* Button to Trigger Modal */}
      <button 
        onClick={openModal}
        className="p-3 bg-blue-500 text-white font-semibold rounded shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 mx-12"
      >
        Add New
      </button>
</div>
{/* Modal Structure */}
{isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded shadow-lg w-full max-w-md">
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">Enter Transaction Details</h2>
            <form onSubmit={handletransaction}>
              <div className="mb-4">
                <label className="block text-gray-700">Date:</label>
                <input type="date" className="w-full p-2 border border-gray-300 rounded" onChange={(e)=>setDate(e.target.value)}/>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Title:</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded" onChange={(e)=>setTitle(e.target.value)}/>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Amount:</label>
                <input type="number" className="w-full p-2 border border-gray-300 rounded" onChange={(e)=>setAmount(e.target.value)}/>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Type:</label>
                <select className="w-full p-2 border border-gray-300 rounded" onChange={(e)=>setType(e.target.value)} >
                 <option value="Choose">Choose</option>
                  <option value="Credit">Credit</option>
                  <option value="Expense">Expense</option>
                 
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Category:</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded" onChange={(e)=>setCategory(e.target.value)}/>
              </div>
              <div className="flex justify-end">
                <button 
                  type="submit" 
                  className="p-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Modal Structure */}
{isOpen1 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded shadow-lg w-full max-w-md">
            {/* Close Button */}
            <button 
              onClick={closeModal1}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">Enter Transaction Details</h2>
            <form onSubmit={handleEditTransaction}>
              <div className="mb-4">
                <label className="block text-gray-700">Date:</label>
                <input type="date" className="w-full p-2 border border-gray-300 rounded" onChange={(e)=>setDate(e.target.value)}/>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Title:</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded" onChange={(e)=>setTitle(e.target.value)}/>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Amount:</label>
                <input type="number" className="w-full p-2 border border-gray-300 rounded" onChange={(e)=>setAmount(e.target.value)}/>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Type:</label>
                <select className="w-full p-2 border border-gray-300 rounded" onChange={(e)=>setType(e.target.value)} >
                 <option value="Choose">Choose</option>
                  <option value="Credit">Credit</option>
                  <option value="Expense">Expense</option>
                 
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Category:</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded" onChange={(e)=>setCategory(e.target.value)}/>
              </div>
              <div className="flex justify-end">
                <button 
                  type="submit" 
                  className="p-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div class='flex justify-center'>
      <table class="table-auto mx-12 border-collapse border border-gray-300">
  <thead class='bg-gray-100'>
    <tr>
      <th class="border border-gray-400 px-4 py-2">Date</th>
      <th class="border border-gray-400 px-4 py-2">Title</th>
      <th class="border border-gray-400 px-4 py-2">Amount</th>
      <th class="border border-gray-400 px-4 py-2">Type</th>
      <th class="border border-gray-400 px-4 py-2">Category</th>
      <th class="border border-gray-400 px-4 py-2">Action</th>
    </tr>
  </thead>
  <tbody>
   
    {
  transactions.map((transaction) => (
    <tr key={transaction._id}> {/* Use a unique key */}
      <td className="border border-gray-400 px-4 py-2">{transaction.date}</td>
      <td className="border border-gray-400 px-4 py-2">{transaction.title}</td>
      <td className="border border-gray-400 px-4 py-2">{transaction.amount}</td>
      <td className="border border-gray-400 px-4 py-2">{transaction.type}</td>
      <td className="border border-gray-400 px-4 py-2">{transaction.category}</td>
      <td className="border border-gray-400 px-4 py-2">
        <div class='flex flex-row '><FaEdit onClick={(e)=>{openModal1();setTransactionId(transaction._id)}}/><MdDeleteForever style={{color:"red",fontSize:"18px",marginLeft:"10%"}} onClick={() => handleDelete(transaction._id)}/></div></td>
    </tr>
  ))
}

      
      
  
   
  </tbody>
</table>
</div>
<div className="financial-summary max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Financial Summary</h2>
      <div className="bg-gray-100 p-4 rounded-md shadow-inner">
        <p className="text-lg font-medium text-gray-700">Total Expenses:</p>
        <p className="text-xl font-bold text-red-600">${Number(totalExpense).toFixed(2)}</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-md shadow-inner mt-4">
        <p className="text-lg font-medium text-gray-700">Total Savings:</p>
        <p className="text-xl font-bold text-green-600">${Number(totalSaving).toFixed(2)}</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-md shadow-inner mt-4">
        <p className="text-lg font-medium text-gray-700">Total Amount (Savings - Expenses):</p>
        <p className={`text-xl font-bold ${totalAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          ${Number(totalAmount).toFixed(2)}
        </p>
      </div>
    </div>
    <div class='mt-5'>
      <h1>Transaction Dashboard</h1>
      <div class='flex justify-center'>
      <PieChart transactions={transactions} /></div>
    </div>
</div>
  )
}
