import React from "react";
import Styled from "styled-components";
import ReactMarkdown from "react-markdown";
import * as API from "../Api";
import CodeBlock from "../components/markdown/CodeBlock";
import Link from "../components/markdown/Link";
import Router from "next/router";
import GithubIcon from "react-icons/lib/fa/github";
import TwitterIcon from "react-icons/lib/fa/twitter";
import FacebookIcon from "react-icons/lib/fa/facebook-square";
import { Values, Colors } from "../Assets";
import BlogList from "../components/BlogList";
import ProductList from "../components/ProductList";

type PageType = "blogs" | "others" | "products";

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
  padding: 2rem 2rem 0;
  box-sizing: border-box;
  @media(max-width: ${Values.SP_BREAK_POINT}) {
    padding: 0;
  }
`;

const Main = Styled.main`
  display: flex;
  position: relative;
  @media(max-width: ${Values.SP_BREAK_POINT}) {
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
  margin-top: 1rem;
`;

const MenuArea = Styled.nav`
  min-width: 200px;
  max-width: 200px;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  @media(max-width: ${Values.SP_BREAK_POINT}) {
    min-width: 0;
    max-width: 100%;
    position: relative;
    flex-direction: column-reverse;
  }
`;

const Skills = Styled.span`
  font-size: 0.8em;
  text-align: center;
  margin-top: 1rem;
`;

const Contact = Styled.span`
  font-size: 0.8em;
  text-align: center;
  margin-top: 1rem;
`;

const NavList = Styled.div`
  @media(max-width: ${Values.SP_BREAK_POINT}) {
    display: flex;
    margin: 0.3rem;
  }
`;

const NavItem = Styled.div`
  flex: 1;
  padding: 6px;
  background-color: ${({ active }) => (active ? Colors.font.primary : "#FFF")};
  border-radius: 1px;
  position: relative;
  padding-left: 30px;
  margin-bottom: 1em;
  color: ${({ active }) => (active ? "#FFF" : Colors.font.primary)}
  transition-duration: 0.5s;
  cursor: ${({ active }) => (active ? "normal" : "pointer")};
  @media(max-width: ${Values.SP_BREAK_POINT}) {
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
    background-color: ${({ active }) =>
      active ? "#FFF" : Colors.font.primary};
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
  @media(max-width: ${Values.SP_BREAK_POINT}) {
    margin-left: 0;
  }
`;

const SectionTitle = Styled.h1`
  margin-bottom: 0.5em;
`;

const Icons = Styled.div`
  display: flex;
  align-items: center;
  margin-top: 1em;
`;

const IconWrapper = Styled.a.attrs({ target: "_blank" })`
  margin: 0 6px;
  display: block;
`;

const Space = Styled.div`
  flex: 1;
`;

const Footer = Styled.footer`
  font-size: 0.5em;
  text-align: center;
  color: #505156;
  padding: 1rem;
`;

export default class extends React.Component<void, State> {
  state: State = {
    blogs: [],
    others: [],
    products: []
  };

  getPageQuery({ asPath, query }) {
    return query.page || asPath.split("?page=")[1] || "blogs";
  }

  componentDidMount() {
    this.fetchPageContents(this.props.url);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchPageContents(nextProps.url);
  }

  fetchPageContents(url) {
    const page = this.getPageQuery(url);
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
    const href = "/?page=" + page;
    Router.push(href, href, { shallow: true });
  }

  renderNoContents() {
    return <p style={{ padding: "3em", textAlign: "center" }}>No contents</p>;
  }

  renderBlogs() {
    const { blogs } = this.state;
    if (blogs.length === 0) return this.renderNoContents();

    return <BlogList posts={blogs} />;
  }

  renderOthers() {
    const { others } = this.state;
    if (others.length === 0) return this.renderNoContents();

    return null;
  }

  renderProducts() {
    const { products } = this.state;
    if (products.length === 0) return this.renderNoContents();

    return <ProductList products={products} />;
  }

  render() {
    const page = this.getPageQuery(this.props.url);
    return (
      <React.Fragment>
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
                <Icons>
                  <IconWrapper href={Values.Links.gh}>
                    <GithubIcon color={Colors.font.primary} size={24} />
                  </IconWrapper>
                  <IconWrapper href={Values.Links.tw}>
                    <TwitterIcon color={Colors.font.primary} size={24} />
                  </IconWrapper>
                  <IconWrapper href={Values.Links.fb}>
                    <FacebookIcon color={Colors.font.primary} size={23} />
                  </IconWrapper>
                </Icons>
              </ProfileWrapper>
            </MenuArea>
            <ContentArea>
              {page === "blogs" && this.renderBlogs()}
              {page === "others" && this.renderOthers()}
              {page === "products" && this.renderProducts()}
            </ContentArea>
          </Main>
        </Wrapper>
        <Footer>powered by Github Pages + Nextjs</Footer>
      </React.Fragment>
    );
  }
}
