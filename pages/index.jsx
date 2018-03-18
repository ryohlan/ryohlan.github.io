import React from "react";
import Styled from "styled-components";
import ReactMarkdown from "react-markdown";
import * as API from "../Api";
import CodeBlock from "../CodeBlock";
import Router from "next/router";

type PageType = "blogs" | "slides" | "apps";

const SP_BREAK_POINT = "480px";

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
  @media(max-width: ${SP_BREAK_POINT}) {
    padding: 1em;
  }
`;

const Main = Styled.main`
  display: flex;
  position: relative;
  @media(max-width: ${SP_BREAK_POINT}) {
    display: block;
  }
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
  display: flex;
  flex-direction: column;
  @media(max-width: ${SP_BREAK_POINT}) {
    min-width: 0;
    max-width: 100%;
    position: relative;
    flex-direction: column-reverse;
  }
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

const NavList = Styled.div`
  @media(max-width: ${SP_BREAK_POINT}) {
    display: flex;
  }
`;

const NavItem = Styled.div`
  flex: 1;
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
  };
  @media(max-width: ${SP_BREAK_POINT}) {
  }
`;

const ContentArea = Styled.div`
  margin-left: 220px;
  flex: 1;
  min-height: 90vh;
  @media(max-width: ${SP_BREAK_POINT}) {
    margin-left: 0;
  }
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
  wor
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
    this.setActiveNavName(this.props.url.query.page);
  }

  setActiveNavName(query: string) {
    const activeNavName: PageType = /^(blogs|slides|apps)$/.test(query)
      ? query
      : "blogs";
    this.setState({ activeNavName });
    switch (activeNavName) {
      default:
      case "blogs": {
        API.getBlogs().then(blogs => this.setState({ blogs }));
        break;
      }
      case "slides": {
        API.getSlides().then(slides => this.setState({ slides }));
        break;
      }
      case "apps": {
        API.getApps().then(apps => this.setState({ apps }));
        break;
      }
    }
  }

  pushRoutes(activeNavName: PageType) {
    this.setState({ activeNavName });
  }

  componentWillReceiveProps(nextProps) {
    this.setActiveNavName(nextProps.url.query.page);
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
        <Main>
          <MenuArea>
            <NavList>
              <NavItem
                onClick={() => this.pushRoutes("blogs")}
                active={activeNavName === "blogs"}
              >
                Blog Posts
              </NavItem>
              <NavItem
                onClick={() => this.pushRoutes("apps")}
                active={activeNavName === "apps"}
              >
                Apps
              </NavItem>
              <NavItem
                onClick={() => this.pushRoutes("slides")}
                active={activeNavName === "slides"}
              >
                Slides
              </NavItem>
            </NavList>
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
