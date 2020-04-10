import React from "react";
import Section from "./section/Section";
import { v4 as uuidv4 } from "uuid";
// import { HomePageContainer } from "./App.styles";

const Sections = ["Provider", "General", "Risk", "new"];

function createSection(sectionName) {
  return (
    <div key={uuidv4()}>
      <Section sectionName={sectionName} />
      <p> - </p>
    </div>
  );
}

function App() {
  return <div className="container">{Sections.map(createSection)}</div>;
}

export default App;
