import React from "react";
import Styled from "styled-components";
import ReactMarkdown from "react-markdown";
import * as API from "../Api";
import CodeBlock from "../CodeBlock";
import Router from "next/router";

type PageType = "blogs" | "slides" | "apps";

interface State {
  blogs: Array<any>;
  slides: Array<any>;
  apps: Array<any>;
  activeNavName: PageType;
}

const PageTitle = Styled.h1`
  margin-bottom: 1em;
  font-family: "Source Code Pro", monospace;
`;

const Wrapper = Styled.div`
  min-height: 100vh;
  padding: 2em;
  box-sizing: border-box;
`;

const Main = Styled.main`
  display: flex;
  position: relative;
`;

const ProfileWrapper = Styled.section`
  background-color: #FFF;
  border-radius: 1px;
  margin-bottom: 1em;
  padding: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Icon = Styled.img.attrs({
  src: "/static/images/icon.png"
})`
  width: 80px;
  height: 80px;
`;

const ProfileName = Styled.span`
  margin-top: 1em;
`;

const MenuArea = Styled.nav`
  min-width: 200px;
  max-width: 200px;
  position: absolute;
  top: 0;
  left: 0;
`;

const Skills = Styled.span`
  font-size: 0.7em;
  text-align: center;
  margin-top: 1em;
`;

const Contact = Styled.span`
  font-size: 0.7em;
  text-align: center;
  margin-top: 1em;
`;

const NavItem = Styled.div`
  padding: 6px;
  background-color: ${({ active }) => (active ? "#505156" : "#FFF")};
  border-radius: 1px;
  position: relative;
  padding-left: 30px;
  margin-bottom: 1em;
  color: ${({ active }) => (active ? "#FFF" : "#505156")}
  transition-duration: 0.5s;
  cursor: ${({ active }) => (active ? "normal" : "pointer")};
  &:before {
    transition-duration: 0.5s;
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    top: 10px;
    left: 10px;
    background-color: ${({ active }) => (active ? "#FFF" : "#505156")};
    border-radius: 1px;
  };
  &:hover {
    background-color: ${({ active }) => !active && "#c5c6cc"};
  }
`;

const ContentArea = Styled.div`
  margin-left: 220px;
  flex: 1;
  min-height: 90vh;
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
  border-radius: 1px;
  position: relative;
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
    background-color: #505156;
    border-radius: 1px;
  };
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
  margin-top: 3em;
  color: #505156;
`;

export default class extends React.Component<void, State> {
  state: State = {
    blogs: [],
    slides: [],
    apps: [],
    activeNavName: ""
  };

  componentDidMount() {
    API.getBlogs().then(blogs => this.setState({ blogs }));
    const { query } = this.props.url;
    this.setState({ activeNavName: query.page });
  }

  pushRoutes(pageName: PageType) {
    Router.push({
      pathname: "/",
      query: { page: pageName },
      shallow: true
    });
  }

  componentWillReceiveProps(nextProps) {
    const { query } = nextProps.url;
    this.setState({ activeNavName: query.page });
  }

  renderNoContents() {
    return <p>No contents</p>;
  }

  renderBlogs() {
    const { blogs } = this.state;
    if (blogs.length === 0) return this.renderNoContents();

    return (
      <BlogList>
        {blogs.map(s => (
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
    );
  }

  renderSlides() {
    const { slides } = this.state;
    if (slides.length === 0) return this.renderNoContents();

    return null;
  }

  renderApps() {
    const { apps } = this.state;
    if (apps.length === 0) return this.renderNoContents();

    return null;
  }

  render() {
    const { activeNavName } = this.state;
    return (
      <Wrapper>
        <PageTitle>Ryohlan's Portfolio</PageTitle>
        <Main>
          <MenuArea>
            <NavItem
              onClick={() => this.pushRoutes("blogs")}
              active={activeNavName === "blogs"}
            >
              Blog Posts
            </NavItem>
            <NavItem
              onClick={() => this.pushRoutes("slides")}
              active={activeNavName === "slides"}
            >
              Slides
            </NavItem>
            <NavItem
              onClick={() => this.pushRoutes("apps")}
              active={activeNavName === "apps"}
            >
              Apps
            </NavItem>
            <ProfileWrapper>
              <Icon />
              <ProfileName>Ryohlan</ProfileName>
              <Skills>
                iOS/Androd apps,<br /> Web front-end developer, Web Designer
              </Skills>
              <Contact>Contact me: sabure.app[at]gmail.com</Contact>
            </ProfileWrapper>
          </MenuArea>
          <ContentArea>
            {activeNavName === "blogs" && this.renderBlogs()}
            {activeNavName === "slides" && this.renderSlides()}
            {activeNavName === "apps" && this.renderApps()}
          </ContentArea>
        </Main>
        <Footer>powered by Github Pages + Nextjs</Footer>
      </Wrapper>
    );
  }
}