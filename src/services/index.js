/**
 * MOVEIT Service Registry
 * 
 * Clean export point for all domain services.
 * Every service is Supabase-enabled with graceful offline/mock fallback.
 */

export * as busService from './busService';
export * as busStopService from './busStopService';
export * as routeService from './routeService';
export * as occupancyService from './occupancyService';
export * as demandService from './demandService';
export * as alertService from './alertService';
export * as passengerService from './passengerService';
export * as busLocationService from './busLocationService';
