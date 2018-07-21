import React from "react";
import Styled from "styled-components";
import { Colors, Values } from "../Assets";
import Slide from "./Slide";
import ReactMarkdown from "react-markdown";
import NoContents from "./NoContens";

interface Props {
  others: Array<any>;
}

export default ({ others }: Props) =>
  others.length > 0 ? (
    <React.Fragment>
      <section>
        <SectionTitle>Slides</SectionTitle>
        <SlidesWrapper>
          {others.filter(s => s.labels.find(s => s.name === "Slide")).map(s => (
            <ResponsiveSlideWrapper>
              <Slide
                key={s.id}
                id={s.number}
                title={s.title}
                slideMarkdowns={s.body.split("---")}
              />
            </ResponsiveSlideWrapper>
          ))}
        </SlidesWrapper>
      </section>
      <section style={{ marginTop: "1rem" }}>
        <SectionTitle>Others</SectionTitle>
        {others
          .filter(s => !s.labels.find(s => s.name === "Slide"))
          .map(s => (
            <OtherWrapper key={s.id}>{renderUdemy(s.body)}</OtherWrapper>
          ))}
      </section>
    </React.Fragment>
  ) : (
    <NoContents />
  );

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

const renderUdemy = markdown => (
  <ReactMarkdown
    source={markdown}
    renderers={{
      image: Styled.img`
        height: 40px;
        float: left;
        margin-right: 1rem;
      `,
      heading: Styled.h1`
        height: 40px;
        display: flex;
        align-items: center;
        font-size: 1.1rem;
        margin-bottom: 1rem;
      `,
      paragraph: Styled.p`
        font-size: 0.8rem;
        color: ${Colors.font.secondary};
      `,
      link: Styled.a.attrs({ target: "_blank", rel: "noopener" })`
        color: ${Colors.font.secondary};
        margin: 0.5rem 0.2rem 0;
        float: right;
        word-break: break-word;
      `
    }}
  />
);

const OtherWrapper = Styled.div`
  background-color: #FFF;
  border-radius: 1px;
  padding: 1.3rem;
  margin: 2px;
  display: flex;
  flex: 1;
  min-width: 30%;
  box-shadow: 0 4px 50px rgba(0, 0, 0, .1);
  @media(max-width: ${Values.SP_BREAK_POINT}) {
    margin: 2px 0;
  }
`;

const ResponsiveSlideWrapper = Styled.div`
  flex: 1;
  min-width: 100%;
  margin: 0;
  margin-bottom: 12px;
  box-shadow: 0 4px 50px rgba(0, 0, 0, .1);
`;

const SlidesWrapper = Styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;
