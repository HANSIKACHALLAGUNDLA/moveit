/**
 * MOVEIT - Mock Data Repository
 * 
 * Note for future development:
 * This file contains mock data representing the database state.
 * When Supabase is integrated, these data models can directly map to:
 * - 'buses' table
 * - 'bus_stops' table
 * - 'passenger_demand' table
 * - 'routes' table
 */

export const MOCK_BUS_STOPS = [
  {
    id: 'stop-virar-stn',
    name: 'Virar Station',
    locationCode: 'VR-01',
    area: 'Virar West',
    waitingPassengers: 48,
    upcomingBusId: 'BUS-101',
    demandStatus: 'High Demand',
    connectedRoutes: ['Route 1', 'Route 3'],
    mapCoords: { x: 22, y: 28 } // coordinate for the schematic transit map
  },
  {
    id: 'stop-nalasopara-e',
    name: 'Nalasopara East',
    locationCode: 'NSP-02',
    area: 'Nalasopara East',
    waitingPassengers: 31,
    upcomingBusId: 'BUS-205',
    demandStatus: 'Moderate Demand',
    connectedRoutes: ['Route 2', 'Route 3'],
    mapCoords: { x: 50, y: 38 }
  },
  {
    id: 'stop-vasai-stn',
    name: 'Vasai Station',
    locationCode: 'BSR-01',
    area: 'Vasai West',
    waitingPassengers: 17,
    upcomingBusId: 'BUS-301',
    demandStatus: 'Normal Demand',
    connectedRoutes: ['Route 1', 'Route 4'],
    mapCoords: { x: 74, y: 62 }
  },
  {
    id: 'stop-vasai-e',
    name: 'Vasai East',
    locationCode: 'BSR-02',
    area: 'Vasai East (Industrial)',
    waitingPassengers: 42,
    upcomingBusId: 'BUS-205',
    demandStatus: 'High Demand',
    connectedRoutes: ['Route 1', 'Route 2', 'Route 4'],
    mapCoords: { x: 88, y: 50 }
  },
  {
    id: 'stop-nalasopara-w',
    name: 'Nalasopara West',
    locationCode: 'NSP-01',
    area: 'Nalasopara West',
    waitingPassengers: 22,
    upcomingBusId: 'BUS-102',
    demandStatus: 'Normal Demand',
    connectedRoutes: ['Route 1'],
    mapCoords: { x: 42, y: 55 }
  },
  {
    id: 'stop-evershine',
    name: 'Evershine City',
    locationCode: 'NSP-03',
    area: 'Evershine Nagar',
    waitingPassengers: 28,
    upcomingBusId: 'BUS-103',
    demandStatus: 'Moderate Demand',
    connectedRoutes: ['Route 3'],
    mapCoords: { x: 38, y: 20 }
  },
  {
    id: 'stop-ambadi',
    name: 'Ambadi Road',
    locationCode: 'AMB-01',
    area: 'Ambadi Junction',
    waitingPassengers: 19,
    upcomingBusId: 'BUS-205',
    demandStatus: 'Normal Demand',
    connectedRoutes: ['Route 2'],
    mapCoords: { x: 65, y: 44 }
  },
  {
    id: 'stop-manickpur',
    name: 'Manickpur',
    locationCode: 'MNK-01',
    area: 'Manickpur Ground',
    waitingPassengers: 14,
    upcomingBusId: 'BUS-301',
    demandStatus: 'Normal Demand',
    connectedRoutes: ['Route 4'],
    mapCoords: { x: 80, y: 75 }
  }
];

export const MOCK_BUSES = [
  {
    id: 'BUS-101',
    busNumber: 'Bus 101',
    route: 'Virar – Vasai',
    routeCode: 'R-101',
    currentLocation: 'Approaching Nalasopara Flyover',
    nextStop: 'Nalasopara West',
    targetStop: 'Vasai Station',
    etaMinutes: 4,
    occupancyPercent: 94,
    availableCapacity: 3,
    totalCapacity: 50,
    status: 'Nearly Full',
    driverName: 'Ramesh Sharma',
    speedKmH: 32,
    lastUpdated: '1 min ago',
    stopsSequence: [
      { name: 'Virar Station', status: 'passed', time: '10:15 AM' },
      { name: 'Nalasopara West', status: 'next', time: '10:22 AM' },
      { name: 'Vasai Station', status: 'upcoming', time: '10:32 AM' },
      { name: 'Vasai East', status: 'upcoming', time: '10:45 AM' }
    ],
    amenities: ['CCTV Active', 'AC', 'Digital Display'],
    mapPosition: { x: 35, y: 45 }
  },
  {
    id: 'BUS-102',
    busNumber: 'Bus 102',
    route: 'Virar – Vasai',
    routeCode: 'R-101',
    currentLocation: 'Departed Virar Station',
    nextStop: 'Virar Station Outer',
    targetStop: 'Vasai Station',
    etaMinutes: 14,
    occupancyPercent: 42,
    availableCapacity: 29,
    totalCapacity: 50,
    status: 'Available',
    driverName: 'Sunil Patil',
    speedKmH: 28,
    lastUpdated: 'Just now',
    stopsSequence: [
      { name: 'Virar Station', status: 'current', time: '10:24 AM' },
      { name: 'Nalasopara West', status: 'upcoming', time: '10:35 AM' },
      { name: 'Vasai Station', status: 'upcoming', time: '10:48 AM' },
      { name: 'Vasai East', status: 'upcoming', time: '11:00 AM' }
    ],
    amenities: ['CCTV Active', 'Standard', 'Low Floor'],
    mapPosition: { x: 26, y: 32 }
  },
  {
    id: 'BUS-103',
    busNumber: 'Bus 103',
    route: 'Virar – Nalasopara',
    routeCode: 'R-103',
    currentLocation: 'Virar Depot Terminal',
    nextStop: 'Evershine City',
    targetStop: 'Nalasopara East',
    etaMinutes: 21,
    occupancyPercent: 68,
    availableCapacity: 16,
    totalCapacity: 50,
    status: 'Moderate',
    driverName: 'Anil Yadav',
    speedKmH: 35,
    lastUpdated: '2 mins ago',
    stopsSequence: [
      { name: 'Virar Station', status: 'passed', time: '10:10 AM' },
      { name: 'Evershine City', status: 'next', time: '10:28 AM' },
      { name: 'Nalasopara East', status: 'upcoming', time: '10:42 AM' }
    ],
    amenities: ['CCTV Active', 'AC'],
    mapPosition: { x: 30, y: 22 }
  },
  {
    id: 'BUS-205',
    busNumber: 'Bus 205',
    route: 'Nalasopara East – Vasai East',
    routeCode: 'R-205',
    currentLocation: 'Ambadi Junction Signal',
    nextStop: 'Ambadi Road',
    targetStop: 'Vasai East',
    etaMinutes: 8,
    occupancyPercent: 78,
    availableCapacity: 11,
    totalCapacity: 50,
    status: 'Moderate',
    driverName: 'Kiran More',
    speedKmH: 30,
    lastUpdated: 'Just now',
    stopsSequence: [
      { name: 'Nalasopara East', status: 'passed', time: '10:18 AM' },
      { name: 'Ambadi Road', status: 'next', time: '10:26 AM' },
      { name: 'Vasai East', status: 'upcoming', time: '10:38 AM' }
    ],
    amenities: ['CCTV Active', 'EV Bus', 'USB Charging'],
    mapPosition: { x: 58, y: 41 }
  },
  {
    id: 'BUS-301',
    busNumber: 'Bus 301',
    route: 'Vasai Station – Vasai East',
    routeCode: 'R-301',
    currentLocation: 'Vasai Station Bay 3',
    nextStop: 'Manickpur',
    targetStop: 'Vasai East',
    etaMinutes: 12,
    occupancyPercent: 52,
    availableCapacity: 24,
    totalCapacity: 50,
    status: 'Available',
    driverName: 'Deepak Varma',
    speedKmH: 25,
    lastUpdated: '3 mins ago',
    stopsSequence: [
      { name: 'Vasai Station', status: 'passed', time: '10:20 AM' },
      { name: 'Manickpur', status: 'next', time: '10:29 AM' },
      { name: 'Vasai East', status: 'upcoming', time: '10:42 AM' }
    ],
    amenities: ['CCTV Active', 'Low Floor'],
    mapPosition: { x: 76, y: 68 }
  },
  {
    id: 'BUS-108',
    busNumber: 'Bus 108',
    route: 'Virar – Vasai Express',
    routeCode: 'R-EXP-1',
    currentLocation: 'Highway Bypass Km 4',
    nextStop: 'Vasai Station Direct',
    targetStop: 'Vasai Station',
    etaMinutes: 2,
    occupancyPercent: 98,
    availableCapacity: 1,
    totalCapacity: 50,
    status: 'Crowded',
    driverName: 'Mahesh Kadam',
    speedKmH: 42,
    lastUpdated: 'Just now',
    stopsSequence: [
      { name: 'Virar Station', status: 'passed', time: '10:05 AM' },
      { name: 'Highway Bypass', status: 'passed', time: '10:18 AM' },
      { name: 'Vasai Station', status: 'next', time: '10:24 AM' }
    ],
    amenities: ['CCTV Active', 'Express Service'],
    mapPosition: { x: 60, y: 56 }
  },
  {
    id: 'BUS-212',
    busNumber: 'Bus 212',
    route: 'Nalasopara West – Virar Station',
    routeCode: 'R-212',
    currentLocation: 'Nalasopara Bridge',
    nextStop: 'Virar Station',
    targetStop: 'Virar Station',
    etaMinutes: 18,
    occupancyPercent: 36,
    availableCapacity: 32,
    totalCapacity: 50,
    status: 'Available',
    driverName: 'Prakash Shinde',
    speedKmH: 34,
    lastUpdated: '4 mins ago',
    stopsSequence: [
      { name: 'Nalasopara West', status: 'passed', time: '10:12 AM' },
      { name: 'Nalasopara Bridge', status: 'passed', time: '10:20 AM' },
      { name: 'Virar Station', status: 'next', time: '10:38 AM' }
    ],
    amenities: ['CCTV Active', 'Standard'],
    mapPosition: { x: 32, y: 40 }
  },
  {
    id: 'BUS-115',
    busNumber: 'Bus 115',
    route: 'Vasai Station – Virar Station',
    routeCode: 'R-115',
    currentLocation: 'Vasai West Ring Road',
    nextStop: 'Nalasopara West',
    targetStop: 'Virar Station',
    etaMinutes: 27,
    occupancyPercent: 100,
    availableCapacity: 0,
    totalCapacity: 50,
    status: 'Crowded',
    driverName: 'Vijay Gaikwad',
    speedKmH: 22,
    lastUpdated: '1 min ago',
    stopsSequence: [
      { name: 'Vasai Station', status: 'passed', time: '10:14 AM' },
      { name: 'Nalasopara West', status: 'next', time: '10:35 AM' },
      { name: 'Virar Station', status: 'upcoming', time: '10:52 AM' }
    ],
    amenities: ['CCTV Active', 'AC'],
    mapPosition: { x: 62, y: 64 }
  }
];

export const MOCK_AUTHORITY_SUMMARY = {
  activeBuses: 42,
  waitingPassengers: 318,
  crowdedBuses: 7,
  availableCapacity: 624,
  onTimeRate: '94.2%',
  fleetUtilization: '82%',
  criticalAlerts: 3
};

export const MOCK_ROUTES = [
  { id: 'all', name: 'All Routes' },
  { id: 'Virar – Vasai', name: 'Virar – Vasai' },
  { id: 'Virar – Nalasopara', name: 'Virar – Nalasopara' },
  { id: 'Nalasopara East – Vasai East', name: 'Nalasopara East – Vasai East' },
  { id: 'Vasai Station – Vasai East', name: 'Vasai Station – Vasai East' },
  { id: 'Virar – Vasai Express', name: 'Virar – Vasai Express' },
  { id: 'Nalasopara West – Virar Station', name: 'Nalasopara West – Virar Station' },
  { id: 'Vasai Station – Virar Station', name: 'Vasai Station – Virar Station' }
];

export const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Bus 101 Approaching',
    message: 'Bus 101 (Virar – Vasai) will arrive at Virar Station in 4 minutes with 3 seats left.',
    time: '2 mins ago',
    type: 'warning'
  },
  {
    id: 2,
    title: 'Less Crowded Option Available',
    message: 'Bus 102 follows Bus 101 in 14 minutes with 29 available seats (42% capacity).',
    time: '5 mins ago',
    type: 'info'
  },
  {
    id: 3,
    title: 'Surge at Virar Station',
    message: '48 passengers currently waiting at Virar Station. Extra feeder bus scheduled.',
    time: '12 mins ago',
    type: 'alert'
  }
];
