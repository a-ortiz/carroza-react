
export function driverToRoutingAPIEntity(immutableDriver) {
  const { id, location } = immutableDriver.toJS();
  return {
    id,
    type: 'car',
    start: location
  };
}

export function deliveryToRoutingAPIEntity(immutableDelivery) {
  const { id, pickup, dropoff } = immutableDelivery.toJS();
  return {
    id,
    type: 'shipment',
    pickup: {
      coordinate: pickup.location
    },
    delivery: {
      coordinate: dropoff.location
    }
  };
}
