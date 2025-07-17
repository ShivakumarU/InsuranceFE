import { useEffect, useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import Report from './components/reports/Report';
import api from '../lib/axios'; 
import { useParams } from 'react-router-dom';

const Sample = () => {
  const { caseNumber } = useParams(); 
  const [formData, setFormData] = useState({});

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

      try {
        const responses = await Promise.all(
          endpoints.map(endpoint =>
            api.get(`/${endpoint}/${caseNumber}`).then(res => res.data).catch(() => null)
          )
        );

        const mergedData = responses.reduce((acc, data) => {
          if (data) return { ...acc, ...data };
          return acc;
        }, {});

        mergedData.caseNumber = caseNumber;
        setFormData(mergedData);
      } catch (err) {
        console.error("Failed to fetch report data", err);
      }
    };

    fetchFormData();
  }, [caseNumber]);

  return (
    <div className="w-screen h-screen">
        {formData ? (
          <PDFViewer width="100%" height="100%">
            <Report data={formData} />
          </PDFViewer>
        ) : (
          <div className="p-6 text-center">
            <button className="btn">
              <span className="loading loading-spinner"></span>
              loading
            </button>
          </div>
        )}
<div className='w-[500px] h-[500px] overflow-auto flex flex-wrap p-4 border border-2 border-amber-700'>
  {Array.isArray(formData.insuredPhotosUpload) &&
    formData.insuredPhotosUpload.map((img, i) => (
      <img
        key={i}
        src={`http://localhost:5001${img}`}
        alt={`photo-${i}`}
        className="max-w-full max-h-full object-contain"
      />
  ))}
</div>

    </div>
  );
};

export default Sample;
