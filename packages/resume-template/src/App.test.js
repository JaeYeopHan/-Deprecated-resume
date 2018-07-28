import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import App from "./App";
import { Loading } from "./components";

configure({ adapter: new Adapter() });

describe("<App /> shallow rendering", () => {
  it("Loading component test", () => {
    const wrapper = shallow(<App />);

    expect(wrapper.length).toBe(1);
  });
});
