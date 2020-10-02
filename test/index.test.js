import { fireEvent } from "@testing-library/dom";
import { on, off } from "./../src/index";

const html = `
  <button class="say-hello">Say hello</button>
`;

let events;

let body;
let sayHelloButton;

let onBodyClick;
let onButtonClick;

beforeEach(() => {
  document.body.innerHTML = html;
  body = body || document.body;
  sayHelloButton = sayHelloButton || document.querySelector(".say-hello");
});

describe("Test on, off fns", () => {
  it("should register events handlers only if element, event and callback are provided", () => {
    events = on(body);
    events = on(body, "click");
    expect(events.size).toBe(0);
    events = on(body, "click", (onBodyClick = jest.fn(() => {})));
    expect(events.size).toBe(1);
    expect(events.has(body)).toBe(true);
  });

  it("should correctly trigger events handlers", () => {
    onButtonClick = jest.fn(() => {});
    events = on(sayHelloButton, "click", onButtonClick);
    expect(events.size).toBe(2);
    fireEvent(sayHelloButton, new MouseEvent("click"));
    expect(onButtonClick).toHaveBeenCalled();
    expect(events.size).toBe(2);
  });
  it("should correctly remove event handler", () => {
    const clickEvent = new MouseEvent("click");
    expect(events.get(body).click).toHaveLength(1);

    fireEvent(body, clickEvent);
    expect(onBodyClick).toHaveBeenCalledTimes(1);

    off(sayHelloButton, "click", onButtonClick);

    expect(events.has(sayHelloButton)).toBeFalsy();

    const onTouchStartBody = () => {};

    on(body, "touchstart", onTouchStartBody);

    expect(events.get(body).touchstart).toHaveLength(1);

    off(body, "touchstart", onTouchStartBody);

    expect(events.get(body).touchstart).not.toBeDefined();

    fireEvent(body, clickEvent);

    expect(onBodyClick).toHaveBeenCalledTimes(2);

    off(body, "click");

    // Called times remaing the same for onBodyClick fn
    expect(onBodyClick).toHaveBeenCalledTimes(2);
  });
});
