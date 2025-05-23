// File: client/src/components/DeviceList.jsx
import { useEffect, useState } from 'react';
import { fetchDevices } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function DeviceList() {
    const [devices, setDevices] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function load() {
            try {
                const data = await fetchDevices();
                setDevices(data);
            } catch (err) {
                console.error('Error fetching devices:', err);
                setError('Failed to load devices.');
            }
        }
        load();
    }, []);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Select Your Device</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {devices.map((d) => (
                    <div key={d._id} className="bg-white rounded-lg shadow p-4 flex flex-col">
                        <div className="text-xl font-medium mb-2">{d.modelName}</div>
                        <div className="flex-1" />
                        <button
                            onClick={() => navigate(`/valuate/${d._id}`)}
                            className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                        >
                            Valuate (₹{d.basePrice})
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
