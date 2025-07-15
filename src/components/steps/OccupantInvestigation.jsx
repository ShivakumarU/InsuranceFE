import React from 'react';

const OccupantInvestigation = ({ formData, setFormData }) => {
  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <div className="space-y-4 p-5">
      <h1 className="gradient-flex text-2xl font-bold mb-4 text-center">
        Form 8 - Occupant Investigation
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="label">Any occupant in IV?</label>
          <select
            className="select select-bordered"
            value={formData.anyOccupantInIV || ''}
            onChange={(e) => handleChange('anyOccupantInIV', e.target.value)}
            required
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>


        {formData.anyOccupantInIV === 'yes' && (
          <>
            <div>
              <label className="label">Is any occupant verified?</label>
              <select
                className="select select-bordered"
                value={formData.anyOccupantVerified || ''}
                onChange={(e) => handleChange('anyOccupantVerified', e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>


            {formData.anyOccupantVerified === 'no' && (
              <div className="md:col-span-2">
                <label className="label">Please mention reason</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={formData.occupantNotVerifiedReason || ''}
                  onChange={(e) => handleChange('occupantNotVerifiedReason', e.target.value)}
                />
              </div>
            )}


            {formData.anyOccupantVerified === 'yes' && (
              <div className="md:col-span-2">
                <label className="label">Occupant Findings</label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  value={formData.occupantFindings || ''}
                  onChange={(e) => handleChange('occupantFindings', e.target.value)}
                />
              </div>
            )}


            <div className="md:col-span-2">
              <label className="label">Do you want to add anything?</label>
              <select
                className="select select-bordered"
                value={formData.occupantsAddAnything || ''}
                onChange={(e) => handleChange('occupantsAddAnything', e.target.value)}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {formData.occupantsAddAnything === 'yes' && (
              <div className="md:col-span-2">
                <label className="label">Additional Comments</label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  value={formData.occupantsAdditionalComments || ''}
                  onChange={(e) => handleChange('occupantsAdditionalComments', e.target.value)}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OccupantInvestigation;
