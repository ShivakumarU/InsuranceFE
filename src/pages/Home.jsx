import NavBar from '../components/NavBar';
import { useEffect, useState } from 'react';
import api from '../../lib/axios';
import { Trash } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const [cases, setCases] = useState([]);

  const navigate = useNavigate();

  const fetchCases = async () => {
    try {
      const res = await api.get("/insured-details");
      const sortedData = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setCases(sortedData);
    } catch (error) {
      console.error("Error fetching cases", error);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);


  const handleDeleteClaim = async (caseNumber) => {
    const deleteSafe = async (url) => {
      try {
        await api.delete(url);
      } catch (err) {
        if (err.response?.status !== 404) {
          throw err;
        }
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
        fetchCases(); 
      }
    } catch (error) {
      console.error("Error deleting the claim", error);
      toast.error("Unable to delete the Claim");
    }
  };


return (
    <div>
      <NavBar />
      <div className="p-10 border-b mt-5">
        <h2 className="text-2xl font-bold mb-12 mt-5 gradient-flex">Insurance - All Pending Cases : {cases.length}</h2>

        <div className="grid grid-cols-[50px_repeat(6,_1fr)_50px] gap-4 border-b py-3 px-2 bg-gray-300 text-black  text-left">
          <div>S.No</div>
          <div>Company Name</div>
          <div>Insured Name</div>
          <div>Claim Number</div>
          <div>Vehicle Number</div>
          <div>Vehicle Type</div>
          <div>Close Proximity ( Days )</div>
        </div>
        {cases.map((item, index) => {
          const parseDDMMYYYY = (dateStr) => {
            if (!dateStr) return null;
            const [dd, mm, yyyy] = dateStr.split('/');
            const date = new Date(`${yyyy}-${mm}-${dd}T00:00:00`);
            return isNaN(date.getTime()) ? null : date;
          };

          const accidentDate = parseDDMMYYYY(item.accidentDateTime);
          const policyStartDate = parseDDMMYYYY(item.policyStartDate);

          let closeProximity = "N/A";
          let isRed = false;

          if (accidentDate && policyStartDate) {
            const diffTime = accidentDate.getTime() - policyStartDate.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            closeProximity = diffDays;
            isRed = diffDays <= 30;
          }

          return (
            <button 
              onClick={() => navigate(`/investigations/${item.caseNumber}`)}
              key={item.caseNumber}
              className="grid grid-cols-[50px_repeat(6,_1fr)_50px] gap-4 py-3 px-2 border-b text-left hover:bg-gray-400 w-full hover:text-black"
            >
              <div>{index + 1}</div>
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
              <div className={`px-2 py-1 rounded ${closeProximity <= 30 ? "bg-red-500 w-1/5" : ""}`}>
                {closeProximity}
              </div>
              <div className='flex items-center justify-center'>
                <Trash
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClaim(item.caseNumber);
                  }}
                  className="w-5 h-5 transition-all duration-200 hover:w-4 hover:h-4 cursor-pointer"
                />
              </div>
            </button>
          );
        })}

      </div>

    </div>
  );
};

export default Home;
