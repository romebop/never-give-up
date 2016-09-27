import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import Button from './components/Button';
import counter from './reducers';
import './style.css';
import $ from 'jquery';

const store = createStore(counter);
const rootEl = document.getElementById('root');

function render() {
  ReactDOM.render(
    <Button

      total={store.getState().total}
      today={store.getState().today}
      best={store.getState().best}

      onPress={() => {
        store.dispatch({ type: 'PRESS' });
        $.post('/data', store.getState());
      }}
    
      onReset={() => {
        store.dispatch({ type: 'RESET' });
        $.post('/data', store.getState());
      }}
    
      fetchData={() => {
        $.getJSON('/data', function(data) {
          store.dispatch({ 
            type: 'RECEIVE',
            total: data.total,
            today: data.today,
            best: data.best,
          });
        });
    }}

    />,
    
    rootEl  
  );
}

render();
store.subscribe(render);