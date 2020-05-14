import React from 'react';
import ReactDOM from 'react-dom';
import Routing from './Routing.jsx';
import * as serviceWorker from './serviceWorker';
import store from '../src/components/redux/store'
import i18n from "./localize/i18n";
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <Routing />
      </I18nextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register({
  onUpdate: registration => {
    const waitingServiceWorker = registration.waiting

    if (waitingServiceWorker) {
      waitingServiceWorker.addEventListener("statechange", event => {
        if (event.target.state === "activated") {
          window.location.reload()
        }
      });
      waitingServiceWorker.postMessage({ type: "SKIP_WAITING" });
    }
  }
  // onUpdate: registration => {
  //   registration.unregister().then(() => {
  //     window.location.reload()
  //   })
  // },
  // onSuccess: registration => {
  //   console.info('service worker on success state')
  //   console.log(registration)
  // }
});
