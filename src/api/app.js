import {
  planRoutes as _planRoutes,
  getTour as _getTour
} from '.';
import {
  driverToRoutingAPIEntity,
  deliveryToRoutingAPIEntity
} from './utils';

export function planRoutes(drivers, deliveries, stops) {
  const vehicles = drivers.valueSeq().map(driverToRoutingAPIEntity);
  const shipments = deliveries.valueSeq().map(delivery => {
    return deliveryToRoutingAPIEntity(delivery
    .set('pickup', stops.get(delivery.get('pickupStopId')))
    .set('dropoff', stops.get(delivery.get('dropoffStopId'))));
  });
  return _planRoutes(vehicles, [{ id: 'car' }], { shipments });
}

export function getTour(points) {
  return _getTour(points.toJS());
}
