import { uploadFile } from "../../../utils/uploadFile";
import DateInputText from "../DateInputText";

const InsuredStatement = ({ formData, setFormData }) => {
  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <div className="space-y-4 p-5">
      <h1 className="gradient-flex text-2xl font-bold mb-4 text-center">Insured Statement</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
              <label className="label">Insured Type</label>
              <select
                className="select select-bordered"
                value={formData.insuredType || ''}
                onChange={(e) => handleChange('insuredType', e.target.value)}
              >
                <option value="">Select</option>
                <option value="insured">Insured</option>
                <option value="insured cum driver">Insured cum Driver</option>
              </select>
        </div>
        <div>
          <label className="label">Insured Verified</label>
          <select
            className="select select-bordered"
            value={formData.insuredVerified || ''}
            onChange={(e) => handleChange('insuredVerified', e.target.value)}
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {formData.insuredVerified === 'no' && (
          <div className="md:col-span-2">
            <label className="label">Reason</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={formData.insuredNotVerifiedReason || ''}
              onChange={(e) => handleChange('insuredNotVerifiedReason', e.target.value)}
            />
          </div>
        )}

        {formData.insuredVerified === 'yes' && (
          <>
            <div>
              <label className="label">Insured Visit Photo</label>
              <input
                type="file"
                multiple
                className="file-input file-input-bordered w-3/4"
                onChange={async (e) => {
                      const files = Array.from(e.target.files);
                      const uploadedUrls = [];

                      for (let file of files) {
                        const url = await uploadFile(file);
                        uploadedUrls.push(url);
                      }
                      console.log(uploadedUrls)

                      setFormData((prev) => ({
                        ...prev,
                        insuredPhotosUpload: uploadedUrls,
                      }));
                      console.log("Uploaded URLs:", uploadedUrls);
                    }}               
               />
            </div>

            <div>
              <label className="label">Insured Gender</label>
              <select
                className="select select-bordered"
                value={formData.insuredGender || ''}
                onChange={(e) => handleChange('insuredGender', e.target.value)}
              >
                <option value="">Select</option>
                <option value="he">He</option>
                <option value="she">She</option>
              </select>
            </div>

            <div>
              <label className="label">Insured Name</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.insuredNameInInsuredStatement || ''}
                onChange={(e) => handleChange('insuredNameInInsuredStatement', e.target.value)}

              />
            </div>

            <div>
              <label className="label">Insured Occupation</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.insuredOccupation || ''}
                onChange={(e) => handleChange('insuredOccupation', e.target.value)}
              />
            </div>

            <div>
              <label className="label">IV Number</label>
              <input
                type="text"
                className="input input-bordered w-3/4"
                value={formData.ivNumberInInsuredStatement || ''}
                onChange={(e) => handleChange('ivNumberInInsuredStatement', e.target.value)}
              />
            </div>

            <div>
              <label className="label">IV Using For</label>
              <select
                className="select select-bordered"
                value={formData.ivUse || ''}
                onChange={(e) => handleChange('ivUse', e.target.value)}
              >
                <option value="">Select</option>
                <option value="personal work">Personal Work</option>
                <option value="commercial use">Commercial Use</option>
              </select>
            </div>

            <DateInputText
              label="Accident Date"
              value={formData.accidentDateInInsuredStatement}
              onChange={(val) => setFormData({ ...formData, accidentDateInInsuredStatement: val })}
            />

            <div>
              <label className="label">Accident Time</label>
              <input
                type="time"
                className="input input-bordered w-1/3"
                value={formData.accidentTimeInInsuredStatement || ''}
                onChange={(e) => handleChange('accidentTimeInInsuredStatement', e.target.value)}
              />
            </div>

            <div>
              <label className="label">Travelling Person Relation with insured</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.travellingPersonRelationInInsuredStatement || ''}
                onChange={(e) => handleChange('travellingPersonRelationInInsuredStatement', e.target.value)}
              />
            </div>

            <div>
              <label className="label">Driver Gender</label>
              <select
                className="select select-bordered"
                value={formData.driverGender || ''}
                onChange={(e) => handleChange('driverGender', e.target.value)}
              >
                <option value="">Select</option>
                <option value="he">He</option>
                <option value="she">She</option>
              </select>
            </div>

            <div>
              <label className="label">Travelling Person Name</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.travellingPersonNameInInsuredStatement || ''}
                onChange={(e) => handleChange('travellingPersonNameInInsuredStatement', e.target.value)}
              />
            </div>

            <div>
              <label className="label">Accident Place</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.accidentPlaceInInsuredStatement || ''}
                onChange={(e) => handleChange('accidentPlaceInInsuredStatement', e.target.value)}
              />
            </div>

            <div>
              <label className="label">Travelling From</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.travelFromInsuredStatement || ''}
                onChange={(e) => handleChange('travelFromInsuredStatement', e.target.value)}
              />
            </div>

            <div>
              <label className="label">Travelling To</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.travelToInsuredStatement || ''}
                onChange={(e) => handleChange('travelToInsuredStatement', e.target.value)}
              />
            </div>

            <div>
              <label className="label">Accident Manner 🔴🔴🔴🔴🔴</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.accidentMannerInInsuredStatement || ''}
                onChange={(e) => handleChange('accidentMannerInInsuredStatement', e.target.value)}
              />
            </div>

            <div>
              <label className="label">Total Persons Travelling</label>
              <input
                type="number"
                className="input input-bordered w-1/2"
                value={formData.totalPersonsInInsuredStatement || ''}
                onChange={(e) => handleChange('totalPersonsInInsuredStatement', e.target.value)}
              />
            </div>

            <div>
              <label className="label">Any Injury/Death ?</label>
              <select
                className="select select-bordered"
                value={formData.anyInjuryInInsured || ''}
                onChange={(e) => handleChange('anyInjuryInInsured', e.target.value)}
              >
                <option value="">Select</option>
                <option value="No one injured">No one injured</option>
                <option value="injured">Injured</option>
              </select>
            </div>

            {formData.anyInjuryInInsured === 'injured' && (
              <div>
                <label className="label">Injured Name & relation with IV</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={formData.injuredNameRelationInInsured || ''}
                  onChange={(e) => handleChange('injuredNameRelationInInsured', e.target.value)}
                />
              </div>
            )}

            <div>
              <label className="label">Police Case Filed</label>
              <select
                className="select select-bordered"
                value={formData.policeCaseInInsured || ''}
                onChange={(e) => handleChange('policeCaseInInsured', e.target.value)}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="Panchanama">Panchanama</option>
              </select>
            </div>

            {(formData.policeCaseInInsured === 'yes' || formData.policeCaseInInsured === 'Panchanama') && (
              <div>
                <label className="label">Police Station Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={formData.policeStationNameInInsured || ''}
                  onChange={(e) => handleChange('policeStationNameInInsured', e.target.value)}
                />
              </div>
            )}

            <div>
              <label className="label">IV Driver Name</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.ivDriverNameInInsured || ''}
                onChange={(e) => handleChange('ivDriverNameInInsured', e.target.value)}
              />
            </div>

            <div>
              <label className="label">IV Driver DL</label>
              <select
                className="select select-bordered"
                value={formData.driverDLInInsured || ''}
                onChange={(e) => handleChange('driverDLInInsured', e.target.value)}
              >
                <option value="">Select</option>
                <option value="having valid DL">Having valid DL</option>
                <option value="having invalid DL">Having invalid DL</option>
                <option value="not having DL">Not having DL</option>
                <option value="having LLR only">Having LLR only</option>
              </select>
            </div>

            <div>
              <label className="label">Statement Given</label>
              <select
                className="select select-bordered"
                value={formData.statementGivenInInsured || ''}
                onChange={(e) => handleChange('statementGivenInInsured', e.target.value)}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label className="label">Withdraw of Claim ?</label>
              <select
                className="select select-bordered"
                value={formData.withdrawOfClaim || ''}
                onChange={(e) => handleChange('withdrawOfClaim',  e.target.value)}
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InsuredStatement;
