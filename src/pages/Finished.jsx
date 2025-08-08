import React from 'react'
import NavBar from '../components/NavBar'
import { useNavigate } from 'react-router-dom';
import { CheckLine } from 'lucide-react';


const Finished = () => {
    const navigate = useNavigate();
  return (
    <div>
        <NavBar  />
        <div className="p-10 border-b mt-5">
            <div className="flex items-center gap-10 mb-12">
                <div className='flex gap-6 items-center'>
                    <h2 className="text-2xl font-bold gradient-flex ">Insurance - Total Finished Cases : 0</h2>
                    <CheckLine size={50} color='skyblue'/>
                </div>
                <div className="flex items-center gap-4 ml-auto">
                    <div className="form-control">
                        <input type="text" placeholder="🔍︎ Search . . . . . . . ." className="input border-yellow-600 focus:border-gray-500 focus:outline-none focus:border-2 w-96"   />
                    </div>
                    <button onClick={()=> navigate('/investigations')} className="btn btn-outline btn-hover-fill before:bg-orange-600 hover:text-white">
                     <span>Create a New Case</span>
                    </button>    
                    <button onClick={()=> navigate('/home')} className="btn btn-outline btn-hover-fill before:bg-orange-600 hover:text-white">
                     <span>View Pending Cases</span>
                    </button>            
                </div>
            </div>
            <div>
                <h1>This Page is under construction . . . . . .</h1>
            </div>
        </div>
    </div>
  )
}

export default Finished