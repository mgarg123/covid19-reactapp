import React from 'react';
import ReactDOM from 'react-dom';
import Routing from './Routing.jsx';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Routing />
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
