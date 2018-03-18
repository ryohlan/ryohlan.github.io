import React from "react";
import Styled from "styled-components";
import ReactMarkdown from "react-markdown";
import * as API from "../Api";
import CodeBlock from "../CodeBlock";

interface State {
  blogs: Array<any>;
}

const Main = Styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 3em;
  box-sizing: border-box;
`;

const SectionTitle = Styled.h1`
  margin-bottom: 0.5em;
`;

const BlogList = Styled.ul`
  list-style-type: none;
  padding: 0;
`;

const BlogPost = Styled.article.attrs({
  className: "blog-post"
})`
  padding: 3em;
  background-color: #FFF;
  margin-bottom: 0.8em;
  cursor: pointer;
  position: relative;
  transition-duration: 0.5s;
  overflow: hidden;
  box-shadow: 0 2px 20px rgba(100, 100, 100, .1);
  border-radius: 6px;
`;

const BlogTitle = Styled.h1`
  font-size: 1.2em;
`;

const BlogBody = Styled.div`
  margin-top: 2em;
`;

const UpdatedTime = Styled.time`
  font-size: 0.8em;
  margin-bottm: 3em;
`;

const Space = Styled.div`
  flex: 1;
`;

const Footer = Styled.footer`
  font-size: 0.5em;
  text-align: center;
  color: #DDD;
`;

export default class extends React.Component<void, State> {
  state: State = {
    blogs: []
  };

  componentDidMount() {
    API.getBlogs().then(blogs => this.setState({ blogs }));
  }

  render() {
    return (
      <Main>
        <section>
          <SectionTitle>Blog Posts</SectionTitle>
          <BlogList>
            {this.state.blogs.map(s => (
              <li key={s.id}>
                <BlogPost>
                  <BlogTitle key={s.id}>{s.title}</BlogTitle>
                  <UpdatedTime>
                    {new Date(s.updated_at).toLocaleString()}
                  </UpdatedTime>
                  <BlogBody>
                    <ReactMarkdown
                      source={s.body}
                      renderers={{ code: CodeBlock }}
                    />
                  </BlogBody>
                </BlogPost>
              </li>
            ))}
          </BlogList>
        </section>
        <Space />
        <Footer>powered by Nextjs</Footer>
      </Main>
    );
  }
}
