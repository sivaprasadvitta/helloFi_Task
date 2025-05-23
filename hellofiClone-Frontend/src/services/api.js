import axios from 'axios';

export const fetchDevices = () => axios.get('http://localhost:3000/api/devices').then(res => res.data);

export const validateDevice = (deviceId, condition) =>
    axios
        .post('http://localhost:3000/api/devices/validate', { deviceId, condition })
        .then(res => res.data);

