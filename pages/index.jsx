import React from "react";
import Styled from "styled-components";
import ReactMarkdown from "react-markdown";
import * as API from "../Api";
import CodeBlock from "../components/markdown/CodeBlock";
import Link from "../components/markdown/Link";
import Router from "next/router";
import { Values, Colors } from "../Assets";
import BlogList from "../components/BlogList";
import ProductList from "../components/ProductList";
import Menu from "../components/Menu";
import OtherList from "../components/OtherList";

interface State {
  blogs: Array<any>;
  others: Array<any>;
  products: Array<any>;
}

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

const ContentArea = Styled.div`
  margin-left: 220px;
  flex: 1;
  min-height: 90vh;
  @media(max-width: ${Values.SP_BREAK_POINT}) {
    margin-left: 0;
  }
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
    return query.page || asPath.split("?page=")[1];
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

  pushRoutes(page: string) {
    const href = "/?page=" + page;
    Router.push(href, `/${page}`, { shallow: true });
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

    return <OtherList others={others} />;
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
            <MenuArea key={page}>
              <Menu page={page} onClickMenu={p => this.pushRoutes(p)} />
            </MenuArea>
            <ContentArea>
              {page === "blogs" && this.renderBlogs()}
              {page === "products" && this.renderProducts()}
              {page === "others" && this.renderOthers()}
            </ContentArea>
          </Main>
        </Wrapper>
        <Footer>powered by Github Pages + Nextjs</Footer>
      </React.Fragment>
    );
  }
}
