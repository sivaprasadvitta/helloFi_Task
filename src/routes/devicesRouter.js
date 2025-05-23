// server/routes/devicesRouter.js
import express from 'express';

const devicesRouter = express.Router();

// 5 hard-coded devices
const devices = [
  { _id: '1', modelName: 'iPhone 12',  basePrice: 80000 },
  { _id: '2', modelName: 'Samsung S22',basePrice: 70000 },
  { _id: '3', modelName: 'OnePlus 9',  basePrice: 50000 },
  { _id: '4', modelName: 'Pixel 6',    basePrice: 60000 },
  { _id: '5', modelName: 'Xiaomi 11',  basePrice: 45000 },
];

// Simple pricing deductions
function computePrice(basePrice, cond) {
  let price = basePrice;

  // 1. Is your device switching on?
  if (cond.switchingOn === 'No') {
    // Recycle: zero value
    return 0;
  }

  // 2. Able to make/receive calls?
  if (cond.callFunctionality === 'No') {
    price -= 5000;
  }

  // 3. Any issue with display?
  if (cond.displayIssue === 'Yes') {
    price -= 7000;
  }

  // 4. Screen details
  switch (cond.screenDetails) {
    case 'Original':
      break;               // no deduction
    case 'Changed (Compatible)':
      price -= 8000;
      break;
    case 'Changed but Original (Bill Req)':
      price -= 5000;
      break;
    default:
      break;
  }

  if (cond.repairHistory === 'Yes') {
    price -= 3000;
  }

  return Math.max(0, price);
}

// GET /api/devices
devicesRouter.get('/', (req, res) => {
  res.json(devices);
});



devicesRouter.post('/validate', (req, res) => {
  const { deviceId, condition } = req.body;
  const device = devices.find(d => d._id === deviceId);
  if (!device) {
    return res.status(404).json({ message: 'Unknown device' });
  }

  const calculatedPrice = computePrice(device.basePrice, condition);
  res.json({ calculatedPrice });
});

export default devicesRouter;
