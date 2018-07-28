import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Loading } from "./Loading";

configure({ adapter: new Adapter() });

describe("<Loading /> shallow rendering", () => {
  it("Loading component test", () => {
    const wrapper = shallow(<Loading />);

    expect(wrapper.hasClass("loading-container")).toBe(true);
    expect(wrapper.find(".loading").text()).toBe("");
    expect(wrapper.find(".loading-text").text()).toBe("H e l l o !");
  });
});
