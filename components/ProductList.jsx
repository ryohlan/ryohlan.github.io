import React from "react";
import Styled, { keyframes } from "styled-components";
import ReactMarkdown from "react-markdown";
import { Colors, Values } from "../Assets";

interface Props {
  products: Array<object>;
}

const FadeInOut = keyframes`
  0% {
    opacity: 0;
    margin-top: 6px;
  }

  100% {
    opacity: 1;
    margin-top: 2px;
  }
`;

const ProductList = Styled.section`
  display: flex;
  flex-wrap: wrap;
  @media(max-width: ${800}px) {
    flex-direction: column;
  }
`;

const ProductWrapper = Styled.div`
  background-color: #FFF;
  border-radius: 1px;
  padding: 1.3rem;
  margin: 2px;
  flex: 1;
  min-width: 30%;
  animation: ${FadeInOut} 0.2s linear;
  @media(max-width: ${Values.SP_BREAK_POINT}) {
    margin: 2px 0;
  }
`;

const renderSPApp = markdown => (
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

export default ({ products }: Props) => (
  <ProductList>
    {products.map(md => {
      if (md.labels.find(l => l.name === "SPApp")) {
        return (
          <ProductWrapper key={md.id}>{renderSPApp(md.body)}</ProductWrapper>
        );
      }
    })}
  </ProductList>
);
