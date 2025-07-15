import { useEffect, useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import Report from './components/reports/Report';
import api from '../lib/axios'; // adjust path to your axios instance
import { useParams } from 'react-router-dom';

const Sample = () => {
  const { caseNumber } = useParams(); // get caseNumber from URL
  const [formData, setFormData] = useState(null);

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
        <div className="p-6 text-center">Loading Report...</div>
      )}
    </div>
  );
};

export default Sample;
