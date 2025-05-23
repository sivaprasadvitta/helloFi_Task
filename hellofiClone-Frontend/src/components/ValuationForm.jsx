import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDevices, validateDevice } from '../services/api';

export default function ValuationForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [device, setDevice] = useState(null);
    
    const [form, setForm] = useState({
        switchingOn: 'Yes',
        callFunctionality: 'Yes',
        displayIssue: 'No',
        screenDetails: 'Original',
        repairHistory: 'No'
    });
    const [result, setResult] = useState(null);

    useEffect(() => {
        fetchDevices().then(list => {
            const d = list.find(x => x._id === id);
            if (!d) return navigate('/');
            setDevice(d);
        });
    }, [id]);

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const { calculatedPrice } = await validateDevice(id, form);
            setResult(calculatedPrice);
        } catch (err) {
            console.error('Validation error:', err);
            alert('Could not calculate price');
        }
    };

    if (!device) return null;

    return (
        <div className="max-w-md mx-auto p-6 bg-white mt-10 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Valuate {device.modelName}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {[
                    { label: "1. Is your device switching on?", name: "switchingOn", options: ["Yes", "No"] },
                    { label: "2. Able to make & receive calls?", name: "callFunctionality", options: ["Yes", "No"] },
                    { label: "3. Any issue with display?", name: "displayIssue", options: ["No", "Yes"] },
                    { label: "4. Tell us about your gadget’s screen:", name: "screenDetails", options: ["Original", "Changed (Compatible)", "Changed but Original (Bill Req)"] },
                    { label: "5. Is your device ever repaired?", name: "repairHistory", options: ["No", "Yes"] }
                ].map(({ label, name, options }) => (
                    <div key={name}>
                        <label className="block mb-1 font-medium">{label}</label>
                        <select
                            name={name}
                            value={form[name]}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        >
                            {options.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                    </div>
                ))}
                <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                    Calculate Price
                </button>
            </form>
            {result != null && (
                <div className="mt-6 p-4 bg-green-100 rounded text-center">
                    <span className="font-semibold">Estimated Price:</span> ₹{result}
                </div>
            )}
        </div>
    );
}