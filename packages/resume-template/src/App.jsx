import React, { Component } from "react";
import html2pdf from "html2pdf.js";

import Resume from "../../resume-data/resume.md";
import config from "../../resume-data/resumeConfig.json";

import { SubTitle, DivisionLine, Button, Loading } from "./components";
import { pipe } from "./utils/pipe";

import "./App.css";

const MIN_WIDTH = 760;

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      classNames: "",
    };
    this.setConfig(config);
  }

  setConfig(config) {
    const { owner, theme, pdf } = config;

    if (!owner) {
      console.error("Not correct owner name in `temaplate/resumeConfig.json`");
    }

    this.owner = owner || "";
    this.theme = theme || "";
    this.pdf = pdf;
  }

  async componentDidMount() {
    const classNames = await this.reduceCSS();

    this.setState({
      isLoading: false,
      classNames,
    });
  }

  async exportToPdf() {
    return await html2pdf()
      .from(this.resumeTemplate)
      .set({
        margin: this.pdf ? this.pdf.margin : 0.5,
        filename: `${this.owner}_resume.pdf`,
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .save();
  }

  async applyTheme(base) {
    switch (this.theme) {
      case "papercss": {
        await import("../node_modules/papercss/dist/paper.min.css");
        return base.concat("paper");
      }
      default:
        return base;
    }
  }

  async reduceCSS() {
    const base = ["margin-top-large", "margin-bottom-large"];
    const results = await pipe(
      base => (window.innerWidth > MIN_WIDTH ? base.concat("container") : base),
      await this.applyTheme.bind(this),
    )(base);

    return results.join(" ");
  }

  render() {
    const { isLoading, classNames } = this.state;
    const ResumeTemplate = (
      <div className={classNames}>
        <Button exportToPdf={async () => this.exportToPdf()} />
        <div ref={ref => (this.resumeTemplate = ref)}>
          <Resume components={{ h4: SubTitle, hr: DivisionLine }} />
        </div>
      </div>
    );

    return isLoading ? <Loading /> : ResumeTemplate;
  }
}

export default App;
