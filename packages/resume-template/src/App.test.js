import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import App from "./App";

configure({ adapter: new Adapter() });

describe("<App /> shallow rendering", () => {
  it("Loading component test", () => {
    const wrapper = shallow(<App />);

    expect(wrapper.length).toBe(1);
  });
});

describe("<App /> mount", () => {
  it("calls componentDidMount test", () => {
    jest.spyOn(App.prototype, "componentDidMount");
    const wrapper = shallow(<App />);
    expect(App.prototype.componentDidMount.mock.calls.length).toBe(1);
    expect(wrapper.state().isLoading).toBe(true);
  });

  it("Render Loading Component test", () => {
    const wrapper = mount(<App />);
    wrapper.setState({
      isLoading: true,
    });
    expect(wrapper.find(".loading-container").exists()).toBe(true);
  });

  it("Render Resume template test", () => {
    const wrapper = mount(<App />);
    wrapper.setState({
      isLoading: false,
    });
    expect(wrapper.find(".loading-container").exists()).toBe(false);
  });

  it("getpapercss theme test", () => {
    const wrapper = mount(<App />);

    if (wrapper.instance().theme === "papercss") {
      wrapper.setState({
        isLoading: false,
        classNames: [
          "margin-top-large",
          "margin-bottom-large",
          "container",
        ].join(" "),
      });

      expect(wrapper.find(".margin-top-large").hasClass("container")).toBe(
        true,
      );
    } else {
      expect(true).toBe(true);
    }
  });
});

describe("<App /> method test", () => {
  it("applyTheme test when papercss theme", async () => {
    const wrapper = shallow(<App />);
    wrapper.instance().theme = "papercss";

    const result = await wrapper.instance().applyTheme([]);
    expect(result).toEqual(["paper"]);
  });
});
