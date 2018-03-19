import React from "react";
import Styled, { keyframes } from "styled-components";
import ReactMarkdown from "react-markdown";
import * as API from "../Api";
import CodeBlock from "../CodeBlock";
import Router from "next/router";

type PageType = "blogs" | "others" | "products";

const SP_BREAK_POINT = "480px";

interface State {
  blogs: Array<any>;
  others: Array<any>;
  products: Array<any>;
  page: PageType;
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
    padding: 0;
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
  font-size: 0.8em;
  text-align: center;
  margin-top: 1em;
`;

const Contact = Styled.span`
  font-size: 0.8em;
  text-align: center;
  margin-top: 1em;
`;

const NavList = Styled.div`
  @media(max-width: ${SP_BREAK_POINT}) {
    display: flex;
    margin: 0.3rem;
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
  @media(max-width: ${SP_BREAK_POINT}) {
    margin: 0.3rem;
  }
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
  cursor: pointer;
  position: relative;
  transition-duration: 0.5s;
  overflow: hidden;
  border-radius: 1px;
  position: relative;
  animation: ${BlogPostKeyFrames} 0.2s linear;
  @media(max-width: ${SP_BREAK_POINT}) {
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
    background-color: #505156;
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
    others: [],
    products: [],
    page: "blogs"
  };

  componentDidMount() {
    this.fetchPageContents();
  }

  fetchPageContents() {
    const { page } = this.state;
    switch (page) {
      default:
      case "blogs": {
        API.getBlogs().then(blogs => this.setState({ blogs }));
        break;
      }
      case "others": {
        API.getOthers().then(others => this.setState({ others }));
        break;
      }
      case "products": {
        API.getProducts().then(products => this.setState({ products }));
        break;
      }
    }
  }

  pushRoutes(page: PageType) {
    this.setState({ page });
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

  renderOthers() {
    const { others } = this.state;
    if (others.length === 0) return this.renderNoContents();

    return null;
  }

  renderProducts() {
    const { products } = this.state;
    if (products.length === 0) return this.renderNoContents();

    return products.map(p => <h2 key={p.id}>{p.title}</h2>);
  }

  render() {
    const { page } = this.state;
    return (
      <Wrapper>
        <Main>
          <MenuArea>
            <NavList>
              <NavItem
                onClick={() => this.pushRoutes("blogs")}
                active={page === "blogs"}
              >
                Posts
              </NavItem>
              <NavItem
                onClick={() => this.pushRoutes("products")}
                active={page === "products"}
              >
                Products
              </NavItem>
              <NavItem
                onClick={() => this.pushRoutes("others")}
                active={page === "others"}
              >
                Others
              </NavItem>
            </NavList>
            <ProfileWrapper>
              <Icon />
              <ProfileName>Ryohlan</ProfileName>
              <Skills>
                iOS/Androd Apps,<br /> Web front-end developer, Web Designer
              </Skills>
              <Contact>Contact me: sabure.app[at]gmail.com</Contact>
            </ProfileWrapper>
          </MenuArea>
          <ContentArea>
            {page === "blogs" && this.renderBlogs()}
            {page === "others" && this.renderOthers()}
            {page === "products" && this.renderProducts()}
          </ContentArea>
        </Main>
        <Footer>powered by Github Pages + Nextjs</Footer>
      </Wrapper>
    );
  }
}
