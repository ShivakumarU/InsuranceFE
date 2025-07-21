import React from 'react';
import DateInputText from '../DateInputText';

const OtherDetails = ({ formData, setFormData }) => {
  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <div className="space-y-4 p-5">
      <h1 className="gradient-flex text-2xl font-bold mb-4 text-center">Other Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <label className="label">Over Seating</label>
          <select
            className="select select-bordered"
            value={formData.overSeating || ''}
            onChange={(e) => handleChange('overSeating', e.target.value)}
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {formData.overSeating === 'yes' && (
          <div className="md:col-span-2">
            <label className="label">Evidence</label>
            <textarea
              className="textarea textarea-bordered w-full"
              value={formData.overSeatingEvidence || ''}
              onChange={(e) => handleChange('overSeatingEvidence', e.target.value)}
            />
          </div>
        )}

        <div>
          <label className="label">Any Police Case Filed</label>
          <select
            className="select select-bordered"
            value={formData.policeCaseFiledOthers || ''}
            onChange={(e) => handleChange('policeCaseFiledOthers', e.target.value)}
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="panchanama-only">Panchanama Only</option>
          </select>
        </div>

        {(formData.policeCaseFiledOthers === 'yes' || formData.policeCaseFiledOthers === 'panchanama-only') && (
          <>
            <div>
              <label className="label">Police Station Name</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.policeStationNameOthers || ''}
                onChange={(e) => handleChange('policeStationNameOthers', e.target.value)}
              />
            </div>

            <div>
              <label className="label">IV Driver Name (as per PS)</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.asPerPsDriverName || ''}
                onChange={(e) => handleChange('asPerPsDriverName', e.target.value)}
              />
            </div>
            <DateInputText
              label="Accident Date (as per PS)"
              value={formData.asPerPsAccidentDate}
              onChange={(val) => setFormData({ ...formData, asPerPsAccidentDate: val })}
            />
          </>
        )}

        <div>
          <label className="label">Insured Name in RC/Extract and Policy</label>
          <select
            className="select select-bordered"
            value={formData.insuredNameMatchInRC || ''}
            onChange={(e) => handleChange('insuredNameMatchInRC', e.target.value)}
          >
            <option value="">Select</option>
            <option value="matching">Matching</option>
            <option value="not matching">Not Matching</option>
          </select>
        </div>

        {formData.insuredNameMatchInRC === 'not matching' && (
          <div className="md:col-span-2">
            <label className="label">Mismatch Evidence</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={formData.insuredNameMismatchReason || ''}
              onChange={(e) => handleChange('insuredNameMismatchReason', e.target.value)}
            />
          </div>
        )}

        <div>
          <label className="label">TS E-Challan</label>
          <select
            className="select select-bordered"
            value={formData.tsEChallan || ''}
            onChange={(e) => handleChange('tsEChallan', e.target.value)}
          >
            <option value="">Select</option>
            <option value="no pending challan">No Pending Challan</option>
            <option value="no suspects found">No Suspects Found</option>
            <option value="old damages">Old Damages Noted</option>
          </select>
        </div>

        <div>
          <label className="label">Third-Party Vehicle Involved</label>
          <select
            className="select select-bordered"
            value={formData.thirdPartyVehicleInvolved || ''}
            onChange={(e) => handleChange('thirdPartyVehicleInvolved', e.target.value)}
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {formData.thirdPartyVehicleInvolved === 'yes' && (
          <div className="md:col-span-2">
            <label className="label">Third-Party Details</label>
            <textarea
              className="textarea textarea-bordered w-full"
              value={formData.thirdPartyDetails || ''}
              onChange={(e) => handleChange('thirdPartyDetails', e.target.value)}
            />
          </div>
        )}

        <div>
          <label className="label">Fastag</label>
          <select
            className="select select-bordered"
            value={formData.feildFastag || ''}
            onChange={(e) => handleChange('feildFastag', e.target.value)}
          >
            <option value="">Select</option>
            <option value="suspects">Suspects</option>
            <option value="no suspects">No Suspects</option>
          </select>
        </div>
        <div>
          <label className="label">Break in policy ?</label>
          <select
            className="select select-bordered"
            value={formData.breakInPolicy || ''}
            onChange={(e) => handleChange('breakInPolicy', e.target.value)}
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label className="label">Drunk & Drive</label>
          <select
            className="select select-bordered"
            value={formData.drunkAndDrive || ''}
            onChange={(e) => handleChange('drunkAndDrive', e.target.value)}
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div>
          <label className="label">Additional findings ?</label>
          <select
            className="select select-bordered"
            value={formData.anyOtherInfo || ''}
            onChange={(e) => handleChange('anyOtherInfo', e.target.value)}
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {formData.anyOtherInfo === 'yes' && (
          <div className="md:col-span-2">
            <label className="label">Additional Information</label>
            <textarea
              className="textarea textarea-bordered w-full"
              value={formData.otherInfoDescription || ''}
              onChange={(e) => handleChange('otherInfoDescription', e.target.value)}
            />
          </div>
        )}
      </div>

      

      <div className="mt-10 border-t pt-6">
        <h2 className="text-xl font-semibold mb-4 gradient-flex">Conclusion</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label">Opinion</label>
            <select
              className="select select-bordered"
              value={formData.conclusionOpinion || ''}
              onChange={(e) => handleChange('conclusionOpinion', e.target.value)}
            >
              <option value="">Select</option>
              <option value="payable">Payable</option>
              <option value="repudiation">Repudiation</option>
            </select>
          </div>

          {formData.conclusionOpinion === 'repudiation' && (
            <div className="md:col-span-2">
              <label className="label">Evidence (Reason)</label>
              <textarea
                className="textarea textarea-bordered w-full"
                value={formData.suspectsEvidenceReason || ''}
                onChange={(e) => handleChange('suspectsEvidenceReason', e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtherDetails;
