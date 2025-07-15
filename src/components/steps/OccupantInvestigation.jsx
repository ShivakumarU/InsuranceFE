import React from 'react';

const OccupantInvestigation = ({ formData, setFormData }) => {
  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleOccupantChange = (index, key, value) => {
    const updated = [...(formData.occupants || [])];
    updated[index] = { ...updated[index], [key]: value };
    setFormData({ ...formData, occupants: updated });
  };

  return (
    <div className="space-y-4 p-5">
      <h1 className="gradient-flex text-2xl font-bold mb-4 text-center">Form 8 - Occupant Investigation</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="label">Any occupant in IV?</label>
          <select
            className="select select-bordered"
            value={formData.anyOccupantInIV || ''}
            onChange={(e) => handleChange('anyOccupantInIV', e.target.value)}
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
              <>
                <div>
                  <label className="label">How many occupants verified?</label>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    className="input input-bordered w-1/3"
                    value={formData.occupantsVerifiedCount || ''}
                    onChange={(e) => {
                      const count = parseInt(e.target.value || '0');
                      const safeCount = Math.max(0, Math.min(count, 20));
                      const existing = formData.occupants || [];
                      const newOccupants = existing.slice(0, safeCount);
                      while (newOccupants.length < safeCount) newOccupants.push({});
                      setFormData({
                        ...formData,
                        occupantsVerifiedCount: safeCount,
                        occupants: newOccupants,
                      });
                    }}
                  />
                </div>

                {(formData.occupants || []).map((occupant, index) => (
                  <div key={index} className="col-span-2 border-t border-dashed pt-4 mt-4">
                    <h2 className="text-lg font-semibold mb-2">Occupant {index + 1}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="label">Occupant Name</label>
                        <input
                          type="text"
                          className="input input-bordered"
                          value={occupant.occupantName || ''}
                          onChange={(e) => handleOccupantChange(index, 'occupantName', e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="label">Is he/she injured?</label>
                        <select
                          className="select select-bordered"
                          value={occupant.occupantInjured || ''}
                          onChange={(e) => handleOccupantChange(index, 'occupantInjured', e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>

                      {occupant.occupantInjured === 'yes' && (
                        <>
                          <div>
                            <label className="label">Medical Records</label>
                            <select
                              className="select select-bordered"
                              value={occupant.medicalRecords || ''}
                              onChange={(e) => handleOccupantChange(index, 'medicalRecords', e.target.value)}
                            >
                              <option value="">Select</option>
                              <option value="available">Available</option>
                              <option value="not available">Not Available</option>
                            </select>
                          </div>

                          <div>
                            <label className="label">Injuries Correlating?</label>
                            <select
                              className="select select-bordered"
                              value={occupant.injuriesCorelating || ''}
                              onChange={(e) => handleOccupantChange(index, 'injuriesCorelating', e.target.value)}
                            >
                              <option value="">Select</option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </select>
                          </div>
                        </>
                      )}

                      <div className="md:col-span-2">
                        <label className="label">Google Timeline</label>
                        <select
                          className="select select-bordered"
                          value={occupant.occupantGoogleTimeline || ''}
                          onChange={(e) => handleOccupantChange(index, 'occupantGoogleTimeline', e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="corelating">Correlating</option>
                          <option value="not co-relating">Not Correlating</option>
                          <option value="No places visited">No Places Visited</option>
                          <option value="driver not-cooperated">Driver Not Cooperated</option>
                          <option value="basic mobile">Basic Mobile</option>
                          <option value="damaged mobile">damaged mobile</option>
                        </select>
                      </div>

                      {(occupant.occupantGoogleTimeline !== 'basic mobile' && occupant.occupantGoogleTimeline !== 'damaged mobile') && (
                        <>
                          <div>
                            <label className="label">Timeline/Phone Photos Attached</label>
                            <select
                              className="select select-bordered"
                              value={occupant.timelinePhonePhotosAttached || ''}
                              onChange={(e) => handleOccupantChange(index, 'timelinePhonePhotosAttached', e.target.value)}
                            >
                              <option value="">Select</option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </select>
                          </div>

                          <div>
                            <label className="label">Accident Photos in Occupant Mobile</label>
                            <select
                              className="select select-bordered"
                              value={occupant.occupantsAccidentPhotosInMobile || ''}
                              onChange={(e) => handleOccupantChange(index, 'occupantsAccidentPhotosInMobile', e.target.value)}
                            >
                              <option value="">Select</option>
                              <option value="available">Available</option>
                              <option value="not available">Not Available</option>
                              <option value="not co-operated">not co-operated</option>
                            </select>
                          </div>

                          {occupant.occupantsAccidentPhotosInMobile === 'available' && (
                            <>
                              <div>
                                <label className="label">Photos Date Info</label>
                                <select
                                  className="select select-bordered"
                                  value={occupant.accidentPhotoDateInfo || ''}
                                  onChange={(e) => handleOccupantChange(index, 'accidentPhotoDateInfo', e.target.value)}
                                >
                                  <option value="">Select</option>
                                  <option value="On the same day">On Same Day</option>
                                  <option value="Before accident date">Before Accident Date</option>
                                  <option value="After the accident date">After Accident Date</option>
                                </select>
                              </div>

                              <div>
                                <label className="label">Photos Noticed In</label>
                                <select
                                  className="select select-bordered"
                                  value={occupant.occupantsPhotosNoticedIn || ''}
                                  onChange={(e) => handleOccupantChange(index, 'occupantsPhotosNoticedIn', e.target.value)}
                                >
                                  <option value="">Select</option>
                                  <option value="Camera files">Camera Files</option>
                                  <option value="Whatsapp files">Whatsapp Files</option>
                                  <option value="SnapChat files">SnapChat Files</option>
                                  <option value="Instagram files">Instagram Files</option>
                                  <option value="Other person sent in Whatsapp">Other Person Sent in WhatsApp</option>
                                </select>
                              </div>

                              {occupant.occupantsPhotosNoticedIn === 'Other person sent in Whatsapp' && (
                                <>
                                  <div>
                                    <label className="label">Other Person Name</label>
                                    <input
                                      type="text"
                                      className="input input-bordered w-2/3"
                                      value={occupant.occupantsphotosSenderName || ''}
                                      onChange={(e) => handleOccupantChange(index, 'occupantsphotosSenderName', e.target.value)}
                                    />
                                  </div>
                                  <div>
                                    <label className="label">Other Person Mobile</label>
                                    <input
                                      type="text"
                                      className="input input-bordered w-2/3"
                                      value={occupant.occupantsPhotosSenderNumber || ''}
                                      onChange={(e) => handleOccupantChange(index, 'occupantsPhotosSenderNumber', e.target.value)}
                                    />
                                  </div>
                                </>
                              )}
                            </>
                          )}
                        </>
                      )}

                      <div>
                        <label className="label">Occupant DL</label>
                        <select
                          className="select select-bordered"
                          value={occupant.occupantDLStatus || ''}
                          onChange={(e) => handleOccupantChange(index, 'occupantDLStatus', e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="having valid DL">Having Valid DL</option>
                          <option value="having invalid DL">Having Invalid DL</option>
                          <option value="not having DL">Not Having DL</option>
                          <option value="having LLR only">Having LLR Only</option>
                          <option value="not provided">Not Provided</option>
                        </select>
                      </div>

                      <div>
                        <label className="label">Call Data</label>
                        <select
                          className="select select-bordered"
                          value={occupant.occupantCallData || ''}
                          onChange={(e) => handleOccupantChange(index, 'occupantCallData', e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="Match">Match</option>
                          <option value="Mismatch">Mismatch</option>
                          <option value="Not available">Not Available</option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="label">Do you want to add anything?</label>
                        <select
                          className="select select-bordered"
                          value={occupant.occupantsAddAnything || ''}
                          onChange={(e) => handleOccupantChange(index, 'occupantsAddAnything', e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {occupant.occupantsAddAnything === 'yes' && (
                          <textarea
                            className="textarea textarea-bordered mt-2 w-full"
                            value={occupant.occupantsAdditionalComments || ''}
                            onChange={(e) => handleOccupantChange(index, 'occupantsAdditionalComments', e.target.value)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OccupantInvestigation;
