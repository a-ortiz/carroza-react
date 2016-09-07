const routingURL = 'http://localhost:4567';

export function planRoutes(vehicles, vehicle_types, { shipments = [], services = [] }) {
  const urlPath = '/plan';
  const body = {
    vehicles,
    vehicle_types,
    jobs: [
      ...shipments,
      ...services
    ]
  };
  const url = `${routingURL}${urlPath}`;
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(body)
  })
  .then(response => response.json()
    .then(json => ({ status: response.status, data: json }))
  );
}

export function getTour(points) {
  const urlPath = '/tour';
  const body = {
    points
  };
  const url = `${routingURL}${urlPath}`;
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(body)
  })
  .then(response => response.json()
    .then(json => ({ status: response.status, data: json }))
  );
}
