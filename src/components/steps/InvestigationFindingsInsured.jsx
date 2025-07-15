import React from 'react';

const InvestigationFindingsInsured = ({ formData, setFormData }) => {
  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <div className="space-y-4 p-5">
      <h1 className="gradient-flex text-2xl font-bold mb-4 text-center">Investigation Findings (Only about Insured)</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <label className="label">Insured in vehicle?</label>
          <select className="select select-bordered" value={formData.insuredInVehicle || ''} onChange={(e) => handleChange('insuredInVehicle', e.target.value)}>
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {formData.insuredInVehicle === 'yes' && (
          <>
            <div>
              <label className="label">Is he/she injured?</label>
              <select className="select select-bordered" value={formData.insuredInjured || ''} onChange={(e) => handleChange('insuredInjured', e.target.value)}>
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {formData.insuredInjured === 'yes' && (
              <>
                <div>
                  <label className="label">Hospitalized ?</label>
                  <select className="select select-bordered" value={formData.insuredHospitalized || ''} onChange={(e) => handleChange('insuredHospitalized', e.target.value)}>
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                {formData.insuredHospitalized === 'yes' && (<>
                  <div>
                    <label className='label'>Hospital Name</label>
                    <input type="text" className="input input-bordered w-full" value={formData.insuredHospitalName || ''} onChange={(e) => handleChange('insuredHospitalName', e.target.value)} />
                  </div>
                  <div>
                    <label className="label">Medical Records</label>
                    <select className="select select-bordered" value={formData.insuredMedicalRecords || ''} onChange={(e) => handleChange('insuredMedicalRecords', e.target.value)}>
                      <option value="">Select</option>
                      <option value="available">Available</option>
                      <option value="not available">Not Available</option>
                    </select>
                  </div>
                </>)}

                <div>
                  <label className="label">Injuries Correlating</label>
                  <select className="select select-bordered" value={formData.insuredInjuriesCorelating || ''} onChange={(e) => handleChange('insuredInjuriesCorelating', e.target.value)}>
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </>
            )}
          </>
          )}

        <div>
          <label className="label">Insured Google Timeline</label>
          <select className="select select-bordered" value={formData.insuredGoogleTimeline || ''} onChange={(e) => handleChange('insuredGoogleTimeline', e.target.value)}>
            <option value="">Select</option>
            <option value="corelating">Corelating</option>
            <option value="not co-relating">Not Co-relating</option>
            <option value="no places visited">No Places Visited</option>
            <option value="insured not-cooperated">Insured Not-Cooperated</option>
            <option value="basic mobile">Basic Mobile</option> 
            <option value="damaged mobile">damaged mobile</option>
          </select>
        </div>

        {(formData.insuredGoogleTimeline !== 'basic mobile' && formData.insuredGoogleTimeline !=='damaged mobile') && (
          <>
            <div>
              <label className="label">Timeline/Phone Photos Attached</label>
              <select className="select select-bordered" value={formData.insuredTimelinePhotosAttached || ''} onChange={(e) => handleChange('insuredTimelinePhotosAttached', e.target.value)}>
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div>
              <label className="label">Accident Photos in Insured Mobile</label>
              <select className="select select-bordered" value={formData.insuredAccidentPhotosInMobile || ''} onChange={(e) => handleChange('insuredAccidentPhotosInMobile', e.target.value)}>
                <option value="">Select</option>
                <option value="available">Available</option>
                <option value="not available">Not Available</option>
                <option value="not co-operated">not co-operated</option>
              </select>
            </div>

            {formData.insuredAccidentPhotosInMobile === 'available' && (
              <>
                <div>
                  <label className="label">Accident Photos Date Info</label>
                  <select className="select select-bordered" value={formData.insuredPhotosDateInfo || ''} onChange={(e) => handleChange('insuredPhotosDateInfo', e.target.value)}>
                    <option value="">Select</option>
                    <option value="on the same day">On the Same Day</option>
                    <option value="before accident date">Before Accident Date</option>
                    <option value="after accident date">After Accident Date</option>
                  </select>
                </div>

                <div>
                  <label className="label">Photos Noticed In</label>
                  <select className="select select-bordered" value={formData.insuredPhotosSource || ''} onChange={(e) => handleChange('insuredPhotosSource', e.target.value)}>
                    <option value="">Select</option>
                    <option value="camera files">Camera Files</option>
                    <option value="whatsapp files">Whatsapp Files</option>
                    <option value="snapchat files">Snapchat Files</option>
                    <option value="instagram files">Instagram Files</option>
                    <option value="other person sent in whatsapp">Other Person Sent in Whatsapp</option>
                  </select>
                </div>

                {formData.insuredPhotosSource === 'other person sent in whatsapp' && (
                  <>
                    <div className="md:col-span-1">
                      <label className="label">Other Person Name :</label>
                      <input type="text" className="input input-bordered w-2/3" value={formData.insuredPhotosSenderName || ''} onChange={(e) => handleChange('insuredPhotosSenderName', e.target.value)} />
                    </div>
                    <div className="md:col-span-1">
                      <label className="label">Other Person Mobile no: </label>
                      <input type="text" className="input input-bordered w-2/3" value={formData.insuredPhotosSenderNumber || ''} onChange={(e) => handleChange('insuredPhotosSenderNumber', e.target.value)} />
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}

        <div>
          <label className="label">Insured DL</label>
          <select className="select select-bordered" value={formData.insuredDLStatus || ''} onChange={(e) => handleChange('insuredDLStatus', e.target.value)}>
            <option value="">Select</option>
            <option value="is having valid DL">Having Valid DL</option>
            <option value="is having invalid DL">Having Invalid DL</option>
            <option value="is not having DL">Not Having DL</option>
            <option value="is having LLR only">Having LLR Only</option>
            <option value="not provided">Not Provided</option>
          </select>
        </div>

        <div>
          <label className="label">Insured Call Data</label>
          <select className="select select-bordered" value={formData.insuredCallData || ''} onChange={(e) => handleChange('insuredCallData', e.target.value)}>
            <option value="">Select</option>
            <option value="match">Match</option>
            <option value="mismatch">Mismatch</option>
            <option value="not available">Not Available</option>
          </select>
        </div>

        <div>
          <label className="label">Do you want to add anything?</label>
          <select className="select select-bordered" value={formData.insuredAddAnything || ''} onChange={(e) => handleChange('insuredAddAnything', e.target.value)}>
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {formData.insuredAddAnything === 'yes' && (
          <div className="md:col-span-2">
            <label className="label">Additional Comments</label>
            <textarea className="textarea textarea-bordered w-full" value={formData.insuredAdditionalComments || ''} onChange={(e) => handleChange('insuredAdditionalComments', e.target.value)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestigationFindingsInsured;
