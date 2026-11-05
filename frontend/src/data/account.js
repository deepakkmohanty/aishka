export const mockProfile = {
  name: 'Priya Sharma',
  email: 'priya.sharma@email.com',
  phone: '+91 98765 43210',
  dateOfBirth: '1990-05-15',
};

export const mockOrders = [
  {
    id: '10482',
    date: '2025-03-12',
    status: 'Delivered',
    items: [
      { name: 'Amethyst Silver Pendant', quantity: 1 },
      { name: 'Filigree Hoop Earrings', quantity: 2 },
    ],
    total: 8499,
  },
  {
    id: '10356',
    date: '2025-02-08',
    status: 'Processing',
    items: [
      { name: 'Ruby Studded Kada', quantity: 1 },
    ],
    total: 12450,
  },
  {
    id: '10201',
    date: '2024-12-22',
    status: 'Cancelled',
    items: [
      { name: 'Kids Silver Anklet Set', quantity: 1 },
      { name: 'Emerald Toe Ring Pair', quantity: 1 },
    ],
    total: 3299,
  },
];

export const mockAddresses = [
  {
    id: 1,
    name: 'Priya Sharma',
    address: 'Flat 402, Saheed Nagar, Near KIIT Square',
    city: 'Bhubaneswar',
    pincode: '751007',
    phone: '+91 98765 43210',
    isDefault: true,
  },
  {
    id: 2,
    name: 'Priya Sharma',
    address: '12, Janpath Road, Connaught Place',
    city: 'New Delhi',
    pincode: '110001',
    phone: '+91 98765 43210',
    isDefault: false,
  },
];
