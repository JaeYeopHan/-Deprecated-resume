import React, { Component, Fragment } from "react";

import ResumeEnglish from "../../resume-data/resume-en.md";
import ResumeKorean from "../../resume-data/resume-ko.md";
import config from "../../resume-data/resumeConfig.json";

import * as Components from "./components";
import { pipe, delay, exportToPdfFile } from "./utils";

import "./App.css";

const MIN_WIDTH = 760;

class App extends Component {
  state = {
    isLoading: true,
    classNames: "",
    language: "en",
  };

  customComponents = {
    h4: Components.SubTitle,
    hr: Components.DivisionLine,
    inlineCode: Components.Badge,
  };

  constructor() {
    super();

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
    await delay(3000);

    this.setState({
      isLoading: false,
      classNames,
    });
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

  buildResumeTemplate() {
    const { language } = this.state;
    switch (language) {
      case "ENG":
        return ResumeEnglish;
      case "KOR":
        return ResumeKorean;
      default:
        return ResumeEnglish;
    }
  }

  render() {
    const { isLoading, classNames } = this.state;
    const LoadingTemplate = <Components.Loading />;
    const LanguageButtons = (
      <Fragment>
        <Components.BadgeSecondary
          contents={`KOR`}
          onClick={language => this.setState({ language })}
        />
        <Components.BadgeSecondary
          contents={`ENG`}
          onClick={language => this.setState({ language })}
        />
      </Fragment>
    );
    const ResumeTemplate = this.buildResumeTemplate();
    const Resume = (
      <div className={classNames}>
        {LanguageButtons}
        <Components.Button
          onClick={async () =>
            exportToPdfFile(this.resumeTemplate, {
              margin: this.pdf.margin,
              owner: this.owner,
            })
          }
        />
        <div ref={ref => (this.resumeTemplate = ref)}>
          <ResumeTemplate components={this.customComponents} />
        </div>
      </div>
    );

    return isLoading ? LoadingTemplate : Resume;
  }
}

export default App;
