import React, { Component } from "react";
import html2pdf from "html2pdf.js";

import Resume from "../templates/resume.md";
import { SubTitle, DivisionLine, Button, Loading } from "./components";

import "./App.css";

const THEME = "papercss";
const MARGIN_OF_PDF = 0.5;
const MIN_WIDTH = 760;
const OWNER = "jbee";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      classNames: "",
    };
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
        margin: MARGIN_OF_PDF,
        filename: `${OWNER}_resume.pdf`,
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .save();
  }

  static applyTheme(base) {
    switch (THEME) {
      case "papercss": {
        return import("../node_modules/papercss/dist/paper.min.css").then(() =>
          base.concat("paper"),
        );
      }
      default:
        return base;
    }
  }

  static applyContainer(base) {
    return window.innerWidth > MIN_WIDTH ? base.concat("container") : base;
  }

  async reduceCSS() {
    const base = ["margin-top-large", "margin-bottom-large"];
    const base2 = await App.applyTheme(base);
    const base3 = App.applyContainer(base2);
    const classNames = base3.join(" ");

    return classNames;
  }

  render() {
    const { isLoading, classNames } = this.state;

    return isLoading ? (
      <Loading />
    ) : (
      <div className={classNames}>
        <Button exportToPdf={async () => this.exportToPdf()} />
        <div ref={ref => (this.resumeTemplate = ref)}>
          <Resume components={{ h4: SubTitle, hr: DivisionLine }} />
        </div>
      </div>
    );
  }
}

export default App;
