import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../public/index.html';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Motion, spring} from 'react-motion';
import Muuri from 'muuri';
import WebAnimations from '@polymer/web-animations/web-animations.js';
// In your render...


initGrid();

function initGrid() {
  var grid = new Muuri('.grid', {
    dragEnabled: true,
    layoutOnInit: false
  }).on('move', function () {
    saveLayout(grid);
  });

  var layout = window.localStorage.getItem('layout');
  if (layout) {
    loadLayout(grid, layout);
  } else {
    grid.layout(true);
  }
}

function serializeLayout(grid) {
  var itemIds = grid.getItems().map(function (item) {
    return item.getElement().getAttribute('data-id');
  });
  return JSON.stringify(itemIds);
}

function saveLayout(grid) {
  var layout = serializeLayout(grid);
  window.localStorage.setItem('layout', layout);
}

function loadLayout(grid, serializedLayout) {
  var layout = JSON.parse(serializedLayout);
  var currentItems = grid.getItems();
  var currentItemIds = currentItems.map(function (item) {
    return item.getElement().getAttribute('data-id')
  });
  var newItems = [];
  var itemId;
  var itemIndex;

  for (var i = 0; i < layout.length; i++) {
    itemId = layout[i];
    itemIndex = currentItemIds.indexOf(itemId);
    if (itemIndex > -1) {
      newItems.push(currentItems[itemIndex])
    }
  }

  grid.sort(newItems, {layout: 'instant'});
}

ReactDOM.render(<List />, document.getElementById("react-root"));
