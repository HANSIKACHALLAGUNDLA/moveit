import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import {
  busService,
  busStopService,
  passengerService,
  routeService,
  demandService,
  busLocationService
} from '../services';
const TransportContext = createContext();

export function TransportProvider({ children }) {
  const [userRole, setUserRole] = useState('passenger'); // 'passenger' | 'authority'
  const [selectedStopId, setSelectedStopId] = useState('stop-virar-stn');
  const [stops, setStops] = useState([]);
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [authoritySummary, setAuthoritySummary] = useState({});
  const [userCheckedIn, setUserCheckedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize data through the service layer
  useEffect(() => {
    async function initializeData() {
      try {
        const [
          stopsData,
          busesData,
          routesData,
          fleetSummaryData,
          demandSummaryData,
          notifsData,
          busLocationsData
        ] = await Promise.all([
          busStopService.getAllBusStops(),
          busService.getAllBuses(),
          routeService.getAllRoutes(),
          busService.getFleetSummary(),
          demandService.getDemandAnalytics(),
          passengerService.getNotifications(),
          busLocationService.getLatestBusLocations()
        ]);

        const summaryData = {
          ...fleetSummaryData,
          waitingPassengers: demandSummaryData.totalWaiting
        };

        // Attach live Supabase location data to each bus
        const busesWithLocations = busesData.map(bus => {
          const location = busLocationsData.find(
            item => Number(item.bus_id) === Number(bus.id)
          );

          if (!location) {
            return bus;
          }

          // Convert latitude/longitude into the schematic map's
          // percentage-based x/y coordinates.
          const lats = stopsData
            .map(stop => Number(stop.latitude))
            .filter(Number.isFinite);

          const lngs = stopsData
            .map(stop => Number(stop.longitude))
            .filter(Number.isFinite);

          const minLat = Math.min(...lats);
          const maxLat = Math.max(...lats);
          const minLng = Math.min(...lngs);
          const maxLng = Math.max(...lngs);

          const longitudeRange = maxLng - minLng || 1;
          const latitudeRange = maxLat - minLat || 1;

          const x = ((Number(location.longitude) - minLng) / longitudeRange) * 80 + 10;

          const y =
            ((maxLat - Number(location.latitude)) / latitudeRange) * 75 + 10;

          return {
            ...bus,
            mapPosition: {
              x: Math.max(5, Math.min(95, x)),
              y: Math.max(5, Math.min(95, y))
            },
            speedKmH: Number(location.speed ?? bus.speedKmH ?? 30),
            currentStopId: location.current_stop_id,
            latitude: Number(location.latitude),
            longitude: Number(location.longitude),
            lastUpdated: location.updated_at || bus.lastUpdated
          };
        });

        setStops(stopsData);
        setBuses(busesWithLocations);
        setRoutes(routesData);
        setAuthoritySummary(summaryData);
        setNotifications(notifsData);
      } catch (err) {
        console.error('Failed to load initial transit data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    initializeData();

const unsubscribe = busLocationService.subscribeToBusLocations(
  (updatedLocation) => {
    setBuses(prevBuses =>
      prevBuses.map(bus => {
        if (Number(bus.id) !== Number(updatedLocation.bus_id)) {
          return bus;
        }

       const lats = stops
  .map(stop => Number(stop.latitude))
  .filter(Number.isFinite);

const lngs = stops
  .map(stop => Number(stop.longitude))
  .filter(Number.isFinite);

const minLat = Math.min(...lats);
const maxLat = Math.max(...lats);
const minLng = Math.min(...lngs);
const maxLng = Math.max(...lngs);

const longitudeRange = maxLng - minLng || 1;
const latitudeRange = maxLat - minLat || 1;

const x =
  ((Number(updatedLocation.longitude) - minLng) / longitudeRange) * 80 + 10;

const y =
  ((maxLat - Number(updatedLocation.latitude)) / latitudeRange) * 75 + 10;

return {
  ...bus,
  latitude: Number(updatedLocation.latitude),
  longitude: Number(updatedLocation.longitude),
  speedKmH: Number(updatedLocation.speed ?? bus.speedKmH ?? 30),
  currentStopId: updatedLocation.current_stop_id,
  lastUpdated: updatedLocation.updated_at || bus.lastUpdated,
  mapPosition: {
    x: Math.max(5, Math.min(95, x)),
    y: Math.max(5, Math.min(95, y))
  }
};
      })
    );
  }
);

return unsubscribe;
  }, []);

  // Active bus stop object
  const currentStop = useMemo(() => {
    return stops.find(s => s.id === selectedStopId) || stops[0] || null;
  }, [stops, selectedStopId]);

  // Buses relevant to the current stop or route
  const upcomingBusesForCurrentStop = useMemo(() => {
    if (!currentStop) return buses;
    const stopName = currentStop.name;
    
    // Sort so closest ETA comes first
    const relevant = buses.filter(bus => {
      return (
  bus.route?.toLowerCase().includes(stopName.toLowerCase().split(' ')[0]) ||
  bus.stopsSequence?.some(
    s => s.name?.toLowerCase() === stopName.toLowerCase()
  ) ||
  bus.nextStop?.toLowerCase().includes(stopName.toLowerCase()) ||
  bus.targetStop?.toLowerCase().includes(stopName.toLowerCase())
);
    });

    const combined = relevant.length >= 3 ? relevant : buses.slice(0, 4);
    return [...combined].sort((a, b) => a.etaMinutes - b.etaMinutes);
  }, [buses, currentStop]);

  // Check-in action ("I'm at this bus stop") via service layer
  const checkInAtStop = async (stopId) => {
    const targetId = stopId || selectedStopId;
    if (userCheckedIn && selectedStopId === targetId) {
      // Toggle off / cancel check-in
      setUserCheckedIn(false);
      setStops(prev => prev.map(s => {
        if (s.id === targetId) {
          return { ...s, waitingPassengers: Math.max(0, s.waitingPassengers - 1) };
        }
        return s;
      }));
      // Persist to service layer
      await passengerService.cancelPassengerCheckIn(targetId);
    } else {
      // Check in
      setSelectedStopId(targetId);
      setUserCheckedIn(true);
      setStops(prev => prev.map(s => {
        if (s.id === targetId) {
          return { ...s, waitingPassengers: s.waitingPassengers + 1 };
        }
        return s;
      }));
      // Persist to service layer
      await passengerService.recordPassengerCheckIn(targetId, userEmail);
    }
  };

  // Helper to get bus by id
  const getBusById = (busId) => {
    return buses.find(b => b.id === busId) || buses[0] || null;
  };

  // Select a new stop
  const selectStop = (stopId) => {
    setSelectedStopId(stopId);
  };

  const value = {
    userRole,
    setUserRole,
    selectedStopId,
    setSelectedStopId: selectStop,
    currentStop,
    stops,
    setStops,
    buses,
    setBuses,
    userCheckedIn,
    checkInAtStop,
    upcomingBusesForCurrentStop,
    authoritySummary,
    routes,
    getBusById,
    userEmail,
    setUserEmail,
    notifications,
    setNotifications,
    isLoading,
    // Direct service access for advanced queries
   services: {
  busService,
  busStopService,
  passengerService,
  routeService,
  demandService,
  busLocationService
}
  };

  return (
    <TransportContext.Provider value={value}>
      {children}
    </TransportContext.Provider>
  );
}

export function useTransport() {
  const context = useContext(TransportContext);
  if (!context) {
    throw new Error('useTransport must be used within a TransportProvider');
  }
  return context;
}
