import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DriverInvestigation from "../components/steps/DriverInvestigation";
import DriverStatement from "../components/steps/DriverStatement";
import InsuredDetails from "../components/steps/InsuredDetails";
import InsuredStatement from "../components/steps/InsuredStatement";
import OtherDetails from "../components/steps/OtherDetails";
import OccupantInvestigation from "../components/steps/OccupantInvestigation";
import InvestigationFindingsInsured from "../components/steps/InvestigationFindingsInsured";
import SpotVerification from "../components/steps/SpotVerification";
import GarageVerification from "../components/steps/GarageVerification";
import { ArrowLeft, CircleArrowLeft, CircleArrowRight, DatabaseZap, Download } from "lucide-react";
import { PDFViewer } from '@react-pdf/renderer';
import Invoice from '../components/reports/Invoice';
import Report from '../components/reports/Report';
import toast from 'react-hot-toast';
import api from "../../lib/axios";

const steps = [
  { title: "Insured Details", component: InsuredDetails },
  { title: "Insured Statement", component: InsuredStatement },
  { title: "Driver Statement", component: DriverStatement },
  { title: "Spot Verification", component: SpotVerification },
  { title: "Garage Verification", component: GarageVerification },
  { title: "Insured Findings", component: InvestigationFindingsInsured },
  { title: "Driver Investigation", component: DriverInvestigation },
  { title: "Occupant Investigation", component: OccupantInvestigation },
  { title: "Other Details", component: OtherDetails }
];

const isValidDateFormat = (dateString) => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  return regex.test(dateString);
};

const MultiStepForm = () => {
  const navigate = useNavigate();
  const { caseNumber } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [localCaseNumber, setLocalCaseNumber] = useState(caseNumber || '');
  const [formData, setFormData] = useState({});
  const [createdEndpoints, setCreatedEndpoints] = useState(new Set());
  const [downloadInvoice, setDownloadInvoice] = useState(false);
  const [downloadReport, setDownloadReport] = useState(false);

  useEffect(() => {
    const fetchFormData = async () => {
      if (!caseNumber) return;

      const endpoints = [
        "insured-details",
        "insured-statement",
        "driver-statement",
        "spot-verification",
        "garage-verification",
        "investigationfinding-insured",
        "driver-investigation",
        "occupants-investigation",
        "other-details"
      ];

      const responses = await Promise.all(
        endpoints.map(endpoint =>
          api.get(`/${endpoint}/${caseNumber}`)
            .then(res => ({ endpoint, data: res.data }))
            .catch(() => null)
        )
      );

      const created = new Set();
      const mergedData = responses.reduce((acc, res) => {
        if (res?.data) {
          created.add(res.endpoint);
          return { ...acc, ...res.data };
        }
        return acc;
      }, {});

      setCreatedEndpoints(created);
      setFormData(prev => ({ ...prev, ...mergedData }));
    };

    fetchFormData();
  }, [caseNumber]);

  const StepComponent = steps[currentStep].component;

  const saveFormDataToDB = async () => {
    try {
      const dateFields = ['policyStartDate', 'accidentDateTime'];
      for (let field of dateFields) {
        if (formData[field] && !isValidDateFormat(formData[field])) {
          toast.error(`"${field}" must be in DD/MM/YYYY format`);
          return;
        }
      }

      const endpoints = [
        "insured-details",
        "insured-statement",
        "driver-statement",
        "spot-verification",
        "garage-verification",
        "investigationfinding-insured",
        "driver-investigation",
        "occupants-investigation",
        "other-details"
      ];

      const endpoint = endpoints[currentStep];
      const isExisting = createdEndpoints.has(endpoint);
      const method = isExisting ? api.put : api.post;
      const url = isExisting ? `/${endpoint}/${localCaseNumber}` : `/${endpoint}`;
      const res = await method(url, formData);

      if (res.status === 200 || res.status === 201) {
        if (!isExisting) {
          setCreatedEndpoints(prev => new Set(prev).add(endpoint));
        }

        if (currentStep === 0 && !localCaseNumber) {
          const newCaseNumber = res.data.caseNumber;
          setLocalCaseNumber(newCaseNumber);
          setFormData((prev) => ({ ...prev, caseNumber: newCaseNumber }));
          navigate(`/investigations/${newCaseNumber}`);
        }

        toast.success(`${steps[currentStep].title} Saved!`);

        if (currentStep < steps.length - 1) {
          setCurrentStep((prev) => prev + 1);
        }
      } else {
        toast.error("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error saving Details", error);
      if (error.response) {
        const status = error.response.status;
        if (status === 400) toast.error("Bad request. Please check the form.");
        else if (status === 500) toast.error("Server error. Try again later.");
        else toast.error(`Unexpected error: ${status}`);
      } else if (error.request) {
        toast.error("No response from server. Check your connection.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  if (downloadInvoice) {
    return (
      <div className="w-screen h-screen">
        <div className="absolute top-4 left-4 z-10">
          <button
            onClick={() => setDownloadInvoice(false)}
            className="btn btn-warning hover:btn-success ml-50 mt-16"
          >
            ← Back to Form
          </button>
        </div>
        <PDFViewer width="100%" height="100%">
          <Invoice data={formData} />
        </PDFViewer>
      </div>
    );
  }

  if(downloadReport){
    return(
      <div className="w-screen h-screen">
        <div className="absolute top-4 left-4 z-10">
          <button
            onClick={() => setDownloadReport(false)}
            className="btn btn-warning hover:btn-success ml-50 mt-16"
          >
            ← Back to Form
          </button>
        </div>
        <PDFViewer width="100%" height="100%">
          <Report data={formData} />
        </PDFViewer>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-8xl mx-auto mt-1">
      <div className="flex-col flex-wrap mb-6 p-4 border-b-[1px]">
        <button onClick={() => navigate('/home')} className="btn btn-outline btn-xl mb-5">
          <ArrowLeft size={15} /> Back to Home
        </button>
        <div className="flex flex-wrap justify-center gap-3">
          {steps.map((step, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`btn btn-xs btn-outline ${index === currentStep ? 'border-2 shadow-[0px_2px_10px_black] px-4 text-center border-green-500 gradient-flex' : 'btn-outline'}`}
            >
              {step.title}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-6 rounded shadow-md bg-base-100">
        <StepComponent formData={formData} setFormData={setFormData} />
      </div>
      <div className="flex justify-between mb-5 pt-6 p-3 border-t-[1px]">
        {currentStep > 0 && (
          <button
            onClick={() => setCurrentStep((prev) => prev - 1)}
            className="btn btn-outline"
          >
            <CircleArrowLeft /> Previous
          </button>
        )}

        <button onClick={saveFormDataToDB} className="btn btn-outline">
          Save <DatabaseZap />
        </button>

        {currentStep < steps.length - 1 && (
          <button
            onClick={() => setCurrentStep((prev) => prev + 1)}
            className="btn btn-outline"
          >
            Next <CircleArrowRight />
          </button>
        )}

        {currentStep === steps.length - 1 && (
          <div className="flex gap-4 mt-4">
            <button onClick={() => setDownloadInvoice(true)} className="btn btn-outline">
              Invoice <Download />
            </button>
            <button onClick={() => setDownloadReport(true)} className="btn btn-outline">
              Report <Download />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
