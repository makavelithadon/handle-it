/* eslint-disable no-multi-assign */
import * as bundledHandleIt from '../dist/esm/index.js';

let id = 1;

function genUUID() {
  return id++;
}

const on = (...args) => {
  bundledHandleIt.on(...args);

  // eslint-disable-next-line no-use-before-define
  displayRegisteredEvents(bundledHandleIt.debug());
};

const off = (...args) => {
  bundledHandleIt.off(...args);

  // eslint-disable-next-line no-use-before-define
  displayRegisteredEvents(bundledHandleIt.debug());
};

const generateButtonWithDeleteAction = (allDeleteButtons, ...args) => {
  const uuid = genUUID();
  const onDeleteFunctionId = `onDelete${uuid}`;

  allDeleteButtons.push(uuid);

  window[onDeleteFunctionId] = () => off(...args);

  return uuid;
};

const debugContainer = document.querySelector('.debug-container');

const displayRegisteredEvents = registeredEvents => {
  const allDeleteButtons = [];

  debugContainer.innerHTML = `
  <table class="table-auto mb-8">
  <thead>
    <tr>
      <th class="px-4 py-2">Element</th>
      <th class="px-4 py-2">Event</th>
      <th class="px-4 py-2">Callback</th>
    </tr>
  </thead>
  <tbody>
    ${[...registeredEvents.entries()]
      .map(([element, eventsObject]) => {
        return `
          ${Object.entries(eventsObject)
            .map(([eventName, callbacks]) => {
              const uuidElement = generateButtonWithDeleteAction(
                allDeleteButtons,
                element
              );

              const uuidEvent = generateButtonWithDeleteAction(
                allDeleteButtons,
                element,
                eventName
              );

              return `
              <tr>
                <td class="border px-10 py-6"><code>${element}</code>&nbsp;<button id="button${uuidElement}" class="text-xs button--delete bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Delete element</button></td>
                <td class="border px-10 py-6"><code>"${eventName}"</code>&nbsp;<button id="button${uuidEvent}" class="text-xs button--delete bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Delete event</button></td>
                <td class="border px-10 py-6">${callbacks.map(callback => {
                  // eslint-disable-next-line no-shadow
                  const uuid = generateButtonWithDeleteAction(
                    allDeleteButtons,
                    element,
                    eventName,
                    callback
                  );

                  return `<code>${callback}</code>&nbsp;<button id="button${uuid}" class="text-xs button--delete bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Delete callback/listener</button>`;
                })}</td>
              </tr>
            `;
            })
            .join('')}
        `;
      })
      .join('')}
  </tbody>
</table>
  `;

  // eslint-disable-next-line no-shadow
  allDeleteButtons.forEach(id => {
    const button = document.querySelector(`#button${id}.button--delete`);
    const onClick = () => {
      window[`onDelete${id}`]();

      button.removeEventListener('click', onClick);
    };

    button.addEventListener('click', onClick);
  });
};

const { debug } = bundledHandleIt;

export { on, off, debug };
