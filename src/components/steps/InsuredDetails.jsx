import DateInputText from "../DateInputText";

const InsuredDetails = ({formData, setFormData}) =>  {
  return (
    <div className="space-y-4 p-5">
      <h1 className="gradient-flex text-2xl font-bold mb-4 text-center">Insured Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="label">Insurance Company</label>
          <select
            className="select select-bordered w-1/2"
            value={formData.insuranceCompany || ''}
            onChange={(e) => setFormData({ ...formData, insuranceCompany: e.target.value })}
          >
            <option value="">Select Company</option>
            <option value="TATA AIG General Insurance Co Ltd">TATA AIG general insurance Co Ltd</option>
            <option value="Chola MS General Insurance Co Ltd">Chola MS general insurance Co Ltd</option>
            <option value="Reliance General Insurance Co Ltd">Relaince general insurance Co Ltd</option>
            <option value="Digit General Insurance Co Ltd">Digit General Insurance Co Ltd</option>
          </select>
        </div>

        <div>
          <label className="label">Ref Number : </label>
          <input
            type="text"
            className="input input-bordered w-3/4"
            value={formData.refNumber || ''}
            onChange={(e) => setFormData({ ...formData, refNumber: e.target.value })}
          />
        </div>

        <div>
          <label className="label">Claim No :</label>
          <input
            type="text"
            className="input input-bordered w-3/4"
            value={formData.claimNumber || ''}
            onChange={(e) => setFormData({ ...formData, claimNumber: e.target.value })}
          />
        </div>

        <div>
          <label className="label">Policy No :</label>
          <input
            type="text"
            className="input input-bordered w-3/4"
            value={formData.policyNumber || ''}
            onChange={(e) => setFormData({ ...formData, policyNumber: e.target.value })}
          />
        </div>

        <DateInputText
          label="Policy Start Date"
          value={formData.policyStartDate}
          onChange={(val) => setFormData({ ...formData, policyStartDate: val })}
        />

        <DateInputText
          label="Policy End Date"
          value={formData.policyEndDate}
          onChange={(val) => setFormData({ ...formData, policyEndDate: val })}
        />

        <div>
          <label className="label">Insured Name</label>
          <input
            type="text"
            className="input input-bordered w-3/4"
            value={formData.insuredName || ''}
            onChange={(e) => setFormData({ ...formData, insuredName: e.target.value })}
          />
        </div>

        <div>
          <label className="label">Insured Address</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={formData.insuredAddress || ''}
            onChange={(e) => setFormData({ ...formData, insuredAddress: e.target.value })}
          />
        </div>

        <DateInputText
          label="Accident Date"
          value={formData.accidentDate}
          onChange={(val) => setFormData({ ...formData, accidentDate: val })}
        />
        <div>
          <label className="label">Accident Time</label>
          <input
            type="time"
            placeholder="DD/MM/YYYY"
            className="input input-bordered w-1/3"
            value={formData.accidentTime || ''}
            onChange={(e) => setFormData({ ...formData, accidentTime: e.target.value })}
          />
        </div>

        <div>
          <label className="label">IV Driver (as per claim intimation)</label>
          <input
            type="text"
            className="input input-bordered w-3/4"
            value={formData.ivDriver || ''}
            onChange={(e) => setFormData({ ...formData, ivDriver: e.target.value })}
          />
        </div>
        
        <DateInputText
          label="Claim Intimation Date"
          value={formData.claimIntimationDate}
          onChange={(val) => setFormData({ ...formData, claimIntimationDate: val })}
        />        
        

        <div>
          <label className="label">IV Number</label>
          <input
            type="text"
            className="input input-bordered w-3/4"
            value={formData.ivNumber || ''}
            onChange={(e) => setFormData({ ...formData, ivNumber: e.target.value })}
          />
        </div>

        <div>
          <label className="label">Vehicle Type</label>
          <select
            className="select select-bordered w-1/3"
            value={formData.vehicleType || ''}
            onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
          >
            <option value="">Select Type</option>
            <option value="two wheeler">Two Wheeler</option>
            <option value="three wheeler">Three Wheeler</option>
            <option value="private car">Private Car</option>
            <option value="cab">Cab</option>
            <option value="lorry">Lorry</option>
            <option value="goods vehicle">Goods Vehicle</option>
            <option value="bus">Bus</option>
            <option value="miscellaneous vehicle">Miscellaneous Vehicle</option>
          </select>
        </div>

        <div>
          <label className="label">Invoice Amount</label>
          <input
            type="number"
            className="input input-bordered w-1/2"
            value={formData.invoiceAmount || ''}
            onChange={(e) => setFormData({ ...formData, invoiceAmount: e.target.value })}
          />
        </div>

        <div>
          <label className="label">Loss Location</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={formData.lossLocation || ''}
            onChange={(e) => setFormData({ ...formData, lossLocation: e.target.value })}
          />
        </div>

        <div>
          <label className="label">Cause of Loss</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={formData.causeOfLoss || ''}
            onChange={(e) => setFormData({ ...formData, causeOfLoss: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export default InsuredDetails