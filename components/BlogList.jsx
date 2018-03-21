import React from "react";
import Styled, { keyframes } from "styled-components";
import { Values, Colors } from "../Assets";
import CodeBlock from "./markdown/CodeBlock";
import Link from "./markdown/Link";
import ReactMarkdown from "react-markdown";

interface Props {
  posts: Array<any>;
}

const BlogList = Styled.ul`
  list-style-type: none;
  padding: 0;
`;

const BlogPostKeyFrames = keyframes`
  from {
    opacity: 0;
    margin-top: 6px;
  }

  to {
    opacity: 1;
    margin-top: 0;
  }
`;

const BlogPost = Styled.article.attrs({
  className: "blog-post"
})`
  padding: 3em;
  background-color: #FFF;
  margin-bottom: 0.8em;
  position: relative;
  transition-duration: 0.5s;
  overflow: hidden;
  border-radius: 1px;
  position: relative;
  animation: ${BlogPostKeyFrames} 0.2s linear;
  @media(max-width: ${Values.SP_BREAK_POINT}) {
    padding: 1.5em;
  }
`;

const BlogTitle = Styled.h1`
  font-size: 1.2em;
  margin-left: 20px;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    top: 9px;
    left: -20px;
    background-color: ${Colors.font.primary};
    border-radius: 1px;
  };
`;

const BlogBody = Styled.div`
  margin-top: 1.5em;
`;

const UpdatedTime = Styled.time`
  font-size: 0.8em;
  margin-bottm: 3em;
`;

export default ({ posts }: Props) => (
  <BlogList>
    {posts.map(s => (
      <li key={s.id}>
        <BlogPost>
          <BlogTitle key={s.id}>{s.title}</BlogTitle>
          <UpdatedTime>{new Date(s.updated_at).toLocaleString()}</UpdatedTime>
          <BlogBody>
            <ReactMarkdown
              source={s.body}
              renderers={{ code: CodeBlock, link: Link }}
            />
          </BlogBody>
        </BlogPost>
      </li>
    ))}
  </BlogList>
);
