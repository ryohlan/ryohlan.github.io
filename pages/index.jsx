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

export default class extends React.Component<void, State> {
  state: State = {
    blogs: [],
    others: [],
    products: []
  };

  getPageQuery({ asPath, query }) {
    return query.menu || "blogs";
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
    const href = "/?menu=" + page;
    Router.replace(href, `/${page}`, { shallow: true });
  }

  render() {
    const page = this.getPageQuery(this.props.url);
    const { blogs, others, products } = this.state;
    return (
      <React.Fragment>
        <Wrapper>
          <Main>
            <MenuArea>
              <Menu page={page} onClickMenu={this.pushRoutes} />
            </MenuArea>
            <ContentArea>
              {page === "blogs" && <BlogList posts={blogs} />}
              {page === "products" && <ProductList products={products} />}
              {page === "others" && <OtherList others={others} />}
            </ContentArea>
          </Main>
        </Wrapper>
        <Footer>powered by Github Pages + Nextjs</Footer>
      </React.Fragment>
    );
  }
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
  @media(max-width: ${Values.SP_BREAK_POINT}) {
    display: block;
  }
`;

const MenuArea = Styled.nav`
  min-width: 200px;
  max-width: 200px;
  position: sticky;
  top: 2rem;
  float: left;
  display: flex;
  flex-direction: column;
  @media(max-width: ${Values.SP_BREAK_POINT}) {
    min-width: 0;
    max-width: 100%;
    position: static;
    flex-direction: column-reverse;
    float: none;
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
