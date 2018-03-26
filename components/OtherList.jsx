import React from "react";
import Styled from "styled-components";
import { Colors, Values } from "../Assets";
import Slide from "./Slide";

interface Props {
  others: Array<any>;
}

const SectionTitle = Styled.h1`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  @media(max-width: ${Values.SP_BREAK_POINT}) {
    margin: 0.5rem 0 1rem 1rem;
  }
`;

const SlidePage = Styled.div`
  padding: 1rem;
  width: 100%;
  height: 200px;
`;

export default ({ others }: Props) => (
  <React.Fragment>
    <section>
      <SectionTitle>Slides</SectionTitle>
      {others
        .filter(s => s.labels.find(s => s.name === "Slide"))
        .map(s => (
          <Slide
            key={s.id}
            id={s.number}
            slideMarkdowns={s.body.split("---")}
          />
        ))}
    </section>
  </React.Fragment>
);
