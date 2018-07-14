import React, { Component } from "react";
import html2pdf from "html2pdf.js";
import Resume from "../templates/resume.md";
import { SubTitle, DivisionLine, Button } from "./components";

import "../node_modules/papercss/dist/paper.min.css";
import "./App.css";

const MARGIN_OF_PDF = 0.5;
const MIN_WIDTH = 760;
const OWNER = "jbee";

class App extends Component {
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

  render() {
    return (
      <div
        className={
          window.innerWidth > MIN_WIDTH
            ? "paper margin-top-large margin-bottom-large container"
            : "paper margin-top-large margin-bottom-large"
        }
      >
        <Button exportToPdf={async () => this.exportToPdf()} />
        <div ref={ref => (this.resumeTemplate = ref)}>
          <Resume components={{ h4: SubTitle, hr: DivisionLine }} />
        </div>
      </div>
    );
  }
}

export default App;
