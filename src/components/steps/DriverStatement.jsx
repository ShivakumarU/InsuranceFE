import { uploadFile } from "../../../utils/uploadFile";
import DateInputText from "../DateInputText";

const DriverStatement = ({ formData, setFormData }) => {
  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <div className="space-y-4 p-5">
      <h1 className="gradient-flex text-2xl font-bold mb-4 text-center">Driver Statement</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <label className="label">Driver Verified ?</label>
          <select
            className="select select-bordered"
            value={formData.driverVerified || ''}
            onChange={(e) => handleChange('driverVerified', e.target.value)}
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {formData.driverVerified === 'no' && (
          <div className="md:col-span-2">
            <label className="label">Reason for not visiting</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={formData.driverNotVisitReason || ''}
              onChange={(e) => handleChange('driverNotVisitReason', e.target.value)}
            />
          </div>
        )}

        {formData.driverVerified === 'yes' && (
          <>
            <div>
              <label className="label">Photos Taken</label>
              <select
                className="select select-bordered"
                value={formData.driverPhotosTaken || ''}
                onChange={(e) => handleChange('driverPhotosTaken', e.target.value)}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {formData.driverPhotosTaken === 'yes' && (
              <div>
                <label className="label">Upload Photo</label>
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
                        driverPhotosUpload: uploadedUrls,
                      }));
                    }}   
                />
              </div>
            )}

            <div>
              <label className="label">Driver Gender</label>
              <select
                className="select select-bordered w-1/4"
                value={formData.driverGenderInDriver || ''}
                onChange={(e) => handleChange('driverGenderInDriver', e.target.value)}
              >
                <option value="">Select</option>
                <option value="he">He</option>
                <option value="she">She</option>
              </select>
            </div>

            <div>
              <label className="label">Driver Name</label>
              <input
                type="text"
                className="input input-bordered w-3/4"
                value={formData.driverNameInDriver || ''}
                onChange={(e) => handleChange('driverNameInDriver', e.target.value)}
              />
            </div>

            <div>
              <label className="label">Driver Occupation</label>
              <input
                type="text"
                className="input input-bordered w-4/5"
                value={formData.driverOccupation || ''}
                onChange={(e) => handleChange('driverOccupation', e.target.value)}
              />
            </div>

            <div>
              <label className="label">Travelling From</label>
              <input
                type="text"
                className="input input-bordered w-4/5"
                value={formData.travelFromInDriver || ''}
                onChange={(e) => handleChange('travelFromInDriver', e.target.value)}
              />
            </div>

            <div>
              <label className="label">Travelling To</label>
              <input
                type="text"
                className="input input-bordered w-4/5"
                value={formData.travelToInDriver || ''}
                onChange={(e) => handleChange('travelToInDriver', e.target.value)}
              />
            </div>

            <div>
              <label className="label">Travelling Car No</label>
              <input
                type="text"
                className="input input-bordered w-3/4"
                value={formData.carNoInDriver || ''}
                onChange={(e) => handleChange('carNoInDriver', e.target.value)}
              />
            </div>

            <div>
              <label className="label">Total Persons in IV</label>
              <input
                type="number"
                className="input input-bordered w-1/3"
                value={formData.ivTotalPersonsInDriver || ''}
                onChange={(e) => handleChange('ivTotalPersonsInDriver', e.target.value)}
              />
            </div>

            <div>
              <label className="label">Accident Place</label>
              <input
                type="text"
                className="input input-bordered w-4/5"
                value={formData.accidentPlaceInDriver || ''}
                onChange={(e) => handleChange('accidentPlaceInDriver', e.target.value)}
              />
            </div>
            
            <DateInputText
              label="Accident Date"
              value={formData.accidentDateInDriver}
              onChange={(val) => setFormData({ ...formData, accidentDateInDriver: val })}
            />

            <div>
              <label className="label">Accident Time</label>
              <input
                type="time"
                className="input input-bordered w-1/3"
                value={formData.accidentTimeInDriver || ''}
                onChange={(e) => handleChange('accidentTimeInDriver', e.target.value)}
              />
            </div>

            <div>
              <label className="label">Accident Manner 🔴🔴🔴🔴🔴</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.accidentMannerInDriver || ''}
                onChange={(e) => handleChange('accidentMannerInDriver', e.target.value)}
              />
            </div>

            <div>
              <label className="label">Who is Injured?</label>
              <select
                className="select select-bordered w-1/2"
                value={formData.whoIsInjuredInDriver || ''}
                onChange={(e) => handleChange('whoIsInjuredInDriver', e.target.value)}
              >
                <option value="">Select</option>
                <option value="no one injured">No one injured</option>
                <option value="injured">injured</option>
              </select>
            </div>

            {formData.whoIsInjuredInDriver === 'injured' && (
              <div>
                <label className="label">Injured Name & relation with IV</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={formData.injuredNameRelationInDriver || ''}
                  onChange={(e) => handleChange('injuredNameRelationInDriver', e.target.value)}
                />
              </div>
            )}

            <div>
              <label className="label">Police Case Filed</label>
              <select
                className="select select-bordered "
                value={formData.policeCaseInDriver || ''}
                onChange={(e) => handleChange('policeCaseInDriver', e.target.value)}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="Panchanama">Panchanama</option>
              </select>
            </div>

            {(formData.policeCaseInDriver === 'yes' || formData.policeCaseInDriver === "Panchanama") && (
              <div>
                <label className="label">Police Station Name</label>
                <input
                  type="text"
                  className="input input-bordered w-5/6"
                  value={formData.policeStationNameInDriver || ''}
                  onChange={(e) => handleChange('policeStationNameInDriver', e.target.value)}
                />
              </div>
            )}

            <div>
              <label className="label">Car Driven By</label>
              <select
                className="select select-bordered"
                value={formData.carDrivenByInDriver || ''}
                onChange={(e) => handleChange('carDrivenByInDriver', e.target.value)}
              >
                <option value="">Select</option>
                <option value="himself">Himself</option>
                <option value="herself">Herself</option>
                <option value="other-person">Other Person</option>
              </select>
            </div>

            <div>
              <label className="label">Driver Name as per Statement</label>
              <input
                type="text"
                className="input input-bordered w-5/6"
                value={formData.driverNameInDriverStatement || ''}
                onChange={(e) => handleChange('driverNameInDriverStatement', e.target.value)}
              />
            </div>

            <div>
              <label className="label">IV Driver DL</label>
              <select
                className="select select-bordered"
                value={formData.driverDLInDriver || ''}
                onChange={(e) => handleChange('driverDLInDriver', e.target.value)}
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
                value={formData.statementGivenInDriver || ''}
                onChange={(e) => handleChange('statementGivenInDriver', e.target.value)}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DriverStatement;
