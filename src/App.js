import React, { Component } from "react";

import Resume from "./templates/resume.md";
import { SubTitle, DivisionLine } from "./components";

import "../node_modules/papercss/dist/paper.min.css";
import "./App.css";

class App extends Component {
  render() {
    const isNeedContainerClass = window.innerWidth > 760;
    const ResumeTemplate = (
      <Resume components={{ h4: SubTitle, hr: DivisionLine }} />
    );

    const noContainerTemplate = (
      <div className="paper margin-top-large margin-bottom-large">
        {ResumeTemplate}
      </div>
    );

    const containerTemplate = (
      <div className="paper container margin-top-large margin-bottom-large">
        {ResumeTemplate}
      </div>
    );

    return isNeedContainerClass ? containerTemplate : noContainerTemplate;
  }
}

export default App;
