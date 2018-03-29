import React from "react";
import Styled from "styled-components";
import ReactDom from "react-dom";

export default class extends React.Component {
  render() {
    const { href } = this.props;
    return (
      <React.Fragment>
        <a href={href} target="_blank" rel="noopener">
          {href}
        </a>
      </React.Fragment>
    );
  }
}
