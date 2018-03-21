import React from "react";
import Hljs from "highlight.js";
import Styled from "styled-components";

interface Props {
  value: string;
  language: string;
}

const Pre = Styled.pre`
  overflow: scroll;
  background-color: #2f3235;
  color: #eee;
  font-size: 0.9em;
  border-radius: 2px;
  margin: 1rem 0;
  @media(max-width: 480px) {
    margin: 1rem -1.5rem;
    border-radius: 0;
  }
`;

const Code = Styled.code`
  font-family: "Source Code Pro", monospace;
  font-weight: 100;
  background-color: transparent !important;
`;

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.setRef = this.setRef.bind(this);
  }

  setRef(el) {
    this.codeEl = el;
  }

  componentDidMount() {
    this.highlightCode();
  }

  componentDidUpdate() {
    this.highlightCode();
  }

  highlightCode() {
    Hljs.highlightBlock(this.codeEl);
  }

  render() {
    return (
      <Pre>
        <code ref={this.setRef} className={`language-${this.props.language}`}>
          {this.props.value}
        </code>
      </Pre>
    );
  }
}
