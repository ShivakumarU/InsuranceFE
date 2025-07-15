import { uploadFile } from "../../../utils/uploadFile";

const GarageVerification = ({ formData, setFormData }) => {
  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <div className="space-y-4 p-5">
      <h2 className="text-xl font-bold mb-4 gradient-flex"> Garage Verification</h2>

      <div>
        <label className="label">Garage Visited ???</label>
        <select
          className="select select-bordered"
          value={formData.garageVisited || ''}
          onChange={(e) => handleChange('garageVisited', e.target.value)}
        >
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      {formData.garageVisited === 'no' && (
        <div>
          <label className="label">Reason for not visiting the garage</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={formData.garageNotVisitedReason || ''}
            onChange={(e) => handleChange('garageNotVisitedReason', e.target.value)}
          />
        </div>
      )}

      {formData.garageVisited === 'yes' && (
        <>
          <div>
            <label className="label">Damages Matching</label>
            <select
              className="select select-bordered"
              value={formData.damagesMatching || ''}
              onChange={(e) => handleChange('damagesMatching', e.target.value)}
            >
              <option value="">Select</option>
              <option value="co-relating">Co-relating</option>
              <option value="not co-relating">Not Co-relating</option>
            </select>
          </div>

          <div>
            <label className="label">Multiple Damages</label>
            <select
              className="select select-bordered "
              value={formData.multipleDamages || ''}
              onChange={(e) => handleChange('multipleDamages', e.target.value)}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div>
            <label className="label">Any blood marks ?</label>
            <select
              className="select select-bordered "
              value={formData.bloodMarks || ''}
              onChange={(e) => handleChange('bloodMarks', e.target.value)}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

        {formData.bloodMarks === 'yes' && (
        <div>
          <label className="label">Blood Marks Description</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={formData.bloodMarksDescription || ''}
            onChange={(e) => handleChange('bloodMarksDescription', e.target.value)}
          />
        </div>
      )}

          <div>
            <label className="label">Photos Taken</label>
            <select
              className="select select-bordered"
              value={formData.garagePhotosTaken || ''}
              onChange={(e) => handleChange('garagePhotosTaken', e.target.value)}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {formData.garagePhotosTaken === 'yes' && (
            <div>
              <label className="label">Upload Garage Photos</label>
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

                    setFormData((prev) => ({
                      ...prev,
                      garagePhotosUpload: uploadedUrls,
                    }));
                  }}          
               />
            </div>
          )}

          {formData.garagePhotosTaken === 'no' && (
            <div>
              <label className="label">Reason for not taking photos</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.garagePhotosNotTakenReason || ''}
                onChange={(e) => handleChange('garagePhotosNotTakenReason', e.target.value)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GarageVerification;
