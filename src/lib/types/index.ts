export type Evt = keyof GlobalEventHandlersEventMap;

export type Elt = Element | Document | Window;

// eslint-disable-next-line no-unused-vars
export type CallBack = (event: Event) => void;

export type EventTypeHandlersMap = {
  // eslint-disable-next-line no-unused-vars
  [K in Evt]?: CallBack[];
};

export type AllEvents = Map<Elt, EventTypeHandlersMap>;
