import './app.global.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';

import ApplicationContainer from './containers/ApplicationContainer';

import store from './store';

// Create main element
const mainElement = document.createElement('div');
mainElement.className = 'app-root';
document.body.appendChild(mainElement);

// Render components
const render = (Component: any) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    mainElement
  );
};

render(ApplicationContainer);
