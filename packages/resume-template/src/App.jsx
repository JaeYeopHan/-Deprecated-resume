import React, { Component } from "react";

import ResumeEnglish from "../../resume-data/resume-ENG.md";
import ResumeKorean from "../../resume-data/resume-KOR.md";
import config from "../../resume-data/resumeConfig.json";

import * as Components from "./components";
import { pipe, delay, exportToPdfFile, isSupport } from "./utils";

import "./App.css";

const MIN_WIDTH = 760;

export default class App extends Component {
  state = {
    isLoading: true,
    classNames: "",
    language: "KOR",
  };

  customComponents = {
    h4: Components.SubTitle,
    hr: Components.DivisionLine,
    inlineCode: Components.Badge,
  };

  constructor() {
    super();

    const { owner, theme, pdf, languages } = config;

    !owner && console.error("Not correct owner name in `resumeConfig.json`");

    this.languages = languages;
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

    !isSupport(this.languages, language) &&
      console.error("Not correct language in `resumeConfig.json`");

    let ResumeTemplate;
    switch (language) {
      case "ENG":
        ResumeTemplate = ResumeEnglish;
        break;
      case "KOR":
        ResumeTemplate = ResumeKorean;
        break;
      default:
        ResumeTemplate = ResumeEnglish;
    }
    return <ResumeTemplate components={this.customComponents} />;
  }

  render() {
    const { isLoading, classNames, language: activeLanguage } = this.state;
    const LoadingTemplate = <Components.Loading />;
    const LanguageButtons = this.languages.map((lang, idx) => (
      <Components.BadgeSecondary
        key={idx}
        contents={lang}
        activeLanguage={activeLanguage}
        onClick={language => this.setState({ language })}
      />
    ));
    const ExportPdfButton = (
      <Components.Button
        onClick={async () =>
          exportToPdfFile(this.resumeTemplate, {
            margin: this.pdf.margin,
            owner: this.owner,
          })
        }
      />
    );
    const Resume = (
      <div className={classNames}>
        {LanguageButtons}
        {ExportPdfButton}
        <div ref={ref => (this.resumeTemplate = ref)}>
          {this.buildResumeTemplate()}
        </div>
      </div>
    );

    return isLoading ? LoadingTemplate : Resume;
  }
}
