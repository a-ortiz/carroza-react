import React from 'react';
import { render } from 'react-dom';
import { configureStore } from './store';
import Root from './components/Root';
import './styles.css';

import Im from 'immutable';
import { v4 } from 'node-uuid';


const pickupStopId1 = v4();
const dropoffStopId1 = v4();

const pickupStopId2 = v4();
const dropoffStopId2 = v4();

const pickupStopId3 = v4();
const dropoffStopId3 = v4();

const pickupStopId4 = v4();
const dropoffStopId4 = v4();

const pickupStopId5 = v4();
const dropoffStopId5 = v4();

const pickupStopId6 = v4();
const dropoffStopId6 = v4();

const store = configureStore(new Im.Map([
  ['entities', new Im.Map([
    ['deliveries', new Im.Map([
      ['dlv-1', new Im.Map([
        ['id', 'dlv-1'],
        ['pickupStopId', pickupStopId1],
        ['dropoffStopId', dropoffStopId1]
      ])],
      ['dlv-2', new Im.Map([
        ['id', 'dlv-2'],
        ['pickupStopId', pickupStopId2],
        ['dropoffStopId', dropoffStopId2]
      ])],
      ['dlv-3', new Im.Map([
        ['id', 'dlv-3'],
        ['pickupStopId', pickupStopId3],
        ['dropoffStopId', dropoffStopId3]
      ])],
      ['dlv-4', new Im.Map([
        ['id', 'dlv-4'],
        ['pickupStopId', pickupStopId4],
        ['dropoffStopId', dropoffStopId4]
      ])],
      ['dlv-5', new Im.Map([
        ['id', 'dlv-5'],
        ['pickupStopId', pickupStopId5],
        ['dropoffStopId', dropoffStopId5]
      ])],
      ['dlv-6', new Im.Map([
        ['id', 'dlv-6'],
        ['pickupStopId', pickupStopId6],
        ['dropoffStopId', dropoffStopId6]
      ])]
    ])],
    ['stops', new Im.Map([
      [pickupStopId1, new Im.Map([
        ['id', pickupStopId1],
        ['location', new Im.Map([
          ['latitude', 40.767963],
          ['longitude', -73.986121]
        ])]
      ])],
      [dropoffStopId1, new Im.Map([
        ['id', dropoffStopId1],
        ['location', new Im.Map([
          ['latitude', 40.718263],
          ['longitude', -74.000340]
        ])]
      ])],
      [pickupStopId2, new Im.Map([
        ['id', pickupStopId2],
        ['location', new Im.Map([
          ['latitude', 40.778193],
          ['longitude', -73.982933]
        ])]
      ])],
      [dropoffStopId2, new Im.Map([
        ['id', dropoffStopId2],
        ['location', new Im.Map([
          ['latitude', 40.747542],
          ['longitude', -73.945798]
        ])]
      ])],
      [pickupStopId3, new Im.Map([
        ['id', pickupStopId3],
        ['location', new Im.Map([
          ['latitude', 40.754935],
          ['longitude', -74.035303]
        ])]
      ])],
      [dropoffStopId3, new Im.Map([
        ['id', dropoffStopId3],
        ['location', new Im.Map([
          ['latitude', 40.756378],
          ['longitude', -74.044349]
        ])]
      ])],
      [pickupStopId4, new Im.Map([
        ['id', pickupStopId4],
        ['location', new Im.Map([
          ['latitude', 40.779995],
          ['longitude', -73.906759]
        ])]
      ])],
      [dropoffStopId4, new Im.Map([
        ['id', dropoffStopId4],
        ['location', new Im.Map([
          ['latitude', 40.803064],
          ['longitude', -73.951749]
        ])]
      ])],
      [pickupStopId5, new Im.Map([
        ['id', pickupStopId5],
        ['location', new Im.Map([
          ['latitude', 40.808289],
          ['longitude', -74.010308]
        ])]
      ])],
      [dropoffStopId5, new Im.Map([
        ['id', dropoffStopId5],
        ['location', new Im.Map([
          ['latitude', 40.769900],
          ['longitude', -73.960081]
        ])]
      ])],
      [pickupStopId6, new Im.Map([
        ['id', pickupStopId6],
        ['location', new Im.Map([
          ['latitude', 40.689447],
          ['longitude', -73.980077]
        ])]
      ])],
      [dropoffStopId6, new Im.Map([
        ['id', dropoffStopId6],
        ['location', new Im.Map([
          ['latitude', 40.728423],
          ['longitude', -74.003524]
        ])]
      ])]
    ])],
    ['drivers', new Im.Map([
      ['drv-1', new Im.Map([
        ['id', 'drv-1'],
        ['name', 'Michael Jackson'],
        ['location', new Im.Map([
          ['latitude', 40.750012],
          ['longitude', -73.987827]
        ])]
      ])],
      ['drv-2', new Im.Map([
        ['id', 'drv-2'],
        ['name', 'Lady Gaga'],
        ['location', new Im.Map([
          ['latitude', 40.748444],
          ['longitude', -73.948893]
        ])]
      ])],
      ['drv-3', new Im.Map([
        ['id', 'drv-3'],
        ['name', 'Darth Vader'],
        ['location', new Im.Map([
          ['latitude', 40.728062],
          ['longitude', -74.003881]
        ])]
      ])],
      ['drv-4', new Im.Map([
        ['id', 'drv-4'],
        ['name', 'Bruce Willis'],
        ['location', new Im.Map([
          ['latitude', 40.786124],
          ['longitude', -74.028400]
        ])]
      ])]
    ])]
  ])]
]));

render(
  <Root store={store} />,
  document.getElementById('root')
);
