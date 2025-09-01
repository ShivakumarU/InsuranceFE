import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import { CheckLine, Trash, SquareCheckBig } from 'lucide-react';
import api from '../../lib/axios';
import toast from 'react-hot-toast';

const Finished = () => {
  const [cases, setCases] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    totalRecords: 0,
    totalPages: 0,
    currentPage: 1,
    pageSize: 10,
  });

  const navigate = useNavigate();

  const fetchFinishedCases = async (page = 1) => {
    try {
      const res = await api.get(`/insured-details?status=finished&page=${page}&limit=10`);
      setCases(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error("Error fetching finished cases", err);
    }
  };

  useEffect(() => {
    fetchFinishedCases(1);
  }, []);

  const handleDeleteClaim = async (caseNumber) => {
    const deleteSafe = async (url) => {
      try {
        await api.delete(url);
      } catch (err) {
        if (err.response?.status !== 404) throw err;
      }
    };
    try {
      if (window.confirm("Are you sure you want to delete this claim?")) {
        await deleteSafe(`/insured-details/${caseNumber}`);
        await deleteSafe(`/insured-statement/${caseNumber}`);
        await deleteSafe(`/driver-statement/${caseNumber}`);
        await deleteSafe(`/spot-verification/${caseNumber}`);
        await deleteSafe(`/garage-verification/${caseNumber}`);
        await deleteSafe(`/investigationfinding-insured/${caseNumber}`);
        await deleteSafe(`/driver-investigation/${caseNumber}`);
        await deleteSafe(`/occupants-investigation/${caseNumber}`);
        await deleteSafe(`/other-details/${caseNumber}`);

        toast.success("Deleted successfully");
        fetchFinishedCases(pagination.currentPage); 
      }
    } catch (error) {
      console.error("Error deleting the claim", error);
      toast.error("Unable to delete the Claim");
    }
  };

  const handleMarkFinished = async (caseNumber, currentStatus) => {
    const action = !currentStatus ? "mark this case as finished" : "move it back to pending";
    if (!window.confirm(`Are you sure you want to ${action}?`)) return;
    try {
      await api.put(`/insured-details/${caseNumber}`, {
        isFinished: !currentStatus,
      });
      toast.success(`Case ${!currentStatus ? "marked as finished" : "moved back to pending"}`);
      fetchFinishedCases(pagination.currentPage); 
    } catch (err) {
      toast.error("Unable to update case");
      console.error(err);
    }
  };

  const parseDDMMYYYY = (dateStr) => {
    if (!dateStr || typeof dateStr !== 'string') return null;
    const parts = dateStr.trim().split('/');
    if (parts.length !== 3) return null;
    const [dd, mm, yyyy] = parts.map(p => parseInt(p, 10));
    if (isNaN(dd) || isNaN(mm) || isNaN(yyyy)) return null;
    const date = new Date(yyyy, mm - 1, dd);
    return isNaN(date.getTime()) ? null : date;
  };

  return (
    <div>
      <NavBar />
      <div className="px-8 py-5 border-b mt-5">
        <div className="flex items-center gap-10 mb-12">
          <div className='flex gap-6 items-center'>
            <h2 className="text-2xl font-bold gradient-flex">
              Insurance - Total Finished Cases : {pagination.totalRecords}
            </h2>
            <CheckLine size={50} color='skyblue'/>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <div className="form-control">
              <input 
                type="text" 
                placeholder="🔍︎ Search . . . . . . . ." 
                className="input border-yellow-600 focus:border-gray-500 focus:outline-none focus:border-2 w-96"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
              />
            </div>
            <button onClick={()=> navigate('/investigations')} className="btn btn-outline btn-hover-fill before:bg-orange-600 hover:text-white">
              <span>Create a New Case</span>
            </button>    
            <button onClick={()=> navigate('/home')} className="btn btn-outline btn-hover-fill bg-orange-600 text-white">
              <span>View Pending Cases</span>
            </button>            
          </div>
        </div>

        <div className="grid grid-cols-[50px_repeat(6,_1fr)_50px] gap-4 border-b py-3 px-2 bg-gray-300 text-black text-left">
          <div>S.No</div>
          <div>Company Name</div>
          <div>Insured Name</div>
          <div>Claim Number</div>
          <div>Vehicle Number</div>
          <div>Vehicle Type</div>
          <div>Close Proximity ( Days )</div>
        </div>

        {cases.filter((item) => {
          const fields = [
            item.insuranceCompany,
            item.insuredName,
            item.claimNumber,
            item.ivNumber,
            item.vehicleType,
          ];
          return fields.some(field => field?.toLowerCase().includes(searchTerm));
        }).map((item, index) => {
          const accidentDate = parseDDMMYYYY(item.accidentDate);
          const policyStartDate = parseDDMMYYYY(item.policyStartDate);

          let closeProximity = null;
          if (accidentDate && policyStartDate) {
            const diffTime = accidentDate.getTime() - policyStartDate.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            closeProximity = diffDays;
          }

          return (
            <button 
              onClick={() => navigate(`/investigations/${item.caseNumber}`)}
              key={item.caseNumber}
              className="grid grid-cols-[50px_repeat(6,_1fr)_50px] gap-4 py-3 px-2 border-b text-left hover:bg-gray-400 w-full hover:text-black"
            >
              <div>{index + 1 + (pagination.currentPage - 1) * pagination.pageSize}</div>
              <div>
                {item.insuranceCompany.includes("TATA") ? "TATA" :
                 item.insuranceCompany.includes("Chola") ? "CHOLA" :
                 item.insuranceCompany.includes("Reliance") ? "RELIANCE" :
                 item.insuranceCompany.includes("Digit") ? "DIGIT" :
                 item.insuranceCompany.split(" ")[0]}
              </div>
              <div>{item.insuredName}</div>
              <div>{item.claimNumber}</div>
              <div>{item.ivNumber}</div>
              <div>{item.vehicleType}</div>
              <div className={`px-2 py-1 rounded ${closeProximity <= 30 && closeProximity !== null ? "text-red-600 font-bold w-2/5" : ""}`}>
                {closeProximity !== null ? `${closeProximity<=30 ? `${closeProximity} days` : `${closeProximity}`}` : "N/A"}
              </div>
              <div className='flex items-center justify-center gap-2'>
                <Trash
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClaim(item.caseNumber);
                  }}
                  className="w-5 h-5 transition-all duration-200 hover:w-4 hover:h-4 cursor-pointer"
                />
                <SquareCheckBig className='cursor-pointer' onClick={(e)=> {
                  e.stopPropagation();
                  handleMarkFinished(item.caseNumber, item.isFinished);
                }}/>
              </div>
            </button>
          );
        })}

        {/* ✅ Pagination Controls */}
        <div className="flex justify-center items-center mt-8 gap-4">
          <button 
            disabled={pagination.currentPage === 1}
            onClick={() => fetchFinishedCases(pagination.currentPage - 1)}
            className="btn btn-outline btn-sm"
          >
            Prev
          </button>
          <span>
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button 
            disabled={pagination.currentPage === pagination.totalPages}
            onClick={() => fetchFinishedCases(pagination.currentPage + 1)}
            className="btn btn-outline btn-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Finished;
