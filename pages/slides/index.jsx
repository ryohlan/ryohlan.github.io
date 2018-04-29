import React from "react";
import Styled, { keyframes } from "styled-components";
import Spinner from "../../components/Spinner";
import * as Api from "../../Api";
import ReactMarkdown from "react-markdown";
import Router from "next/router";
import ArrowPrev from "react-icons/lib/md/keyboard-arrow-left";
import ArrowNext from "react-icons/lib/md/keyboard-arrow-right";
import FullScreen from "react-icons/lib/md/fullscreen";
import FullScreenExit from "react-icons/lib/md/fullscreen-exit";
import { Colors, Values } from "../../Assets";

interface Props {}

interface State {
  slideMarkdowns: Array<any>;
  loading: boolean;
  error?: object;
  baseFontSize: string;
}

export default class extends React.Component<Props, State> {
  state: State = {
    slideMarkdowns: [],
    error: null,
    loading: true,
    baseFontSize: "24px"
  };

  parseQuery(asPath: string) {
    if (!/id=\w+&page=\d+$/.test(asPath)) return {};

    const { id, page } = asPath
      .split("?")[1]
      .split("&")
      .map(s => s.split("="))
      .map(s => ({ [s[0]]: s[1] }))
      .reduce((a, b) => ({ ...a, ...b }));
    return { id: parseInt(id), page: parseInt(page) };
  }

  handleKeyEvent() {
    window.document.addEventListener("keydown", ({ code }) => {
      const { id, page } = this.parseQuery(this.props.url.asPath);
      switch (code) {
        case "ArrowRight": {
          this.nextPage();
          break;
        }
        case "ArrowLeft": {
          this.prevPage();
          break;
        }
        default:
          break;
      }
    });
  }

  prevPage() {
    const { id, page } = this.parseQuery(this.props.url.asPath);

    if (page === 1) return;

    const href = `/slides?id=${id}&page=${page - 1}`;
    Router.push(href, href, { shallow: true });
  }

  nextPage() {
    const slideLength = this.state.slideMarkdowns.length;
    const { id, page } = this.parseQuery(this.props.url.asPath);

    if (page === slideLength) return;

    const href = `/slides?id=${id}&page=${page + 1}`;
    Router.push(href, href, { shallow: true });
  }

  componentDidMount() {
    this.handleKeyEvent();
    const { asPath } = this.props.url;
    const { id, page } = this.parseQuery(asPath);
    Api.getSlide(id)
      .then(issue =>
        this.setState({
          slideMarkdowns: issue.body.split("---"),
          loading: false
        })
      )
      .catch(error => this.setState({ error, loading: false }));
  }

  render() {
    const { asPath } = this.props.url;
    const { loading, slideMarkdowns, error, baseFontSize } = this.state;
    const { id, page } = this.parseQuery(asPath);

    if (loading) {
      return (
        <Wrapper>
          <Spinner />
        </Wrapper>
      );
    }

    if (error) {
      return <Wrapper>{this.state.error.message}</Wrapper>;
    }

    return (
      <React.Fragment>
        <Wrapper key={page}>
          <style>{`
            html, body {
              overflow: hidden;
            }
            html {
              font-size: ${baseFontSize};
            }
            @media(max-width: ${Values.SP_BREAK_POINT}) {
              html { font-size: 12px; }
            }
            pre {
              border: solid 1px #DDD;
              padding: 2em;
              border-radius: 7px;
              background-color: #505156;
              color: rgba(255,255,255,.9);
            }
            `}</style>
          <MDWrapper>
            <ReactMarkdown
              source={slideMarkdowns[page - 1]}
              renderers={{
                listItem: Styled.li`
                  font-size: 1.5rem;
                  margin: 0.6rem 0;
                `,
                image: Styled.img`
                  max-width: 100vw;
                  max-height: 300px;
                `
              }}
            />
          </MDWrapper>
          <PagePrevArea onClick={() => this.prevPage()} />
          <PageNextArea onClick={() => this.nextPage()} />
        </Wrapper>
        <BottomNavigationArea>
          <BottomNavigationContainer>
            <FullScreenButton
              size={30}
              color="rgba(255, 255,255, .8)"
              onClick={() => {
                const {
                  webkitRequestFullscreen,
                  mozRequestFullScreen
                } = window.document.documentElement;
                if (webkitRequestFullscreen)
                  window.document.documentElement.webkitRequestFullscreen();
                if (mozRequestFullScreen)
                  window.document.documentElement.mozRequestFullScreen();
              }}
            />
          </BottomNavigationContainer>
        </BottomNavigationArea>
      </React.Fragment>
    );
  }
}

const FadeInOut = keyframes`
  0% {
    opacity: 0;
    margin-top: 4px;
  }

  100% {
    opacity: 1;
    margin-top: 0px;
  }
`;

const Wrapper = Styled.main`
  width: 100vw;
  height: 100vh;
  background-color: #FFF;
  padding: 0 4rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MDWrapper = Styled.div`
  animation: ${FadeInOut} 0.3s linear;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PagePrevArea = Styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100px;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const PageNextArea = Styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 100px;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const BottomNavigationArea = Styled.div`
  height: 70px;
  position: fixed;
  bottom: -70px;
  width: 100%;
  left: 0;
  padding-top: 40px;
  transition: all 300ms 0s ease;
  &:hover {
    bottom: 0;
  }
`;

const BottomNavigationContainer = Styled.div`
  background-color: ${Colors.font.secondary};
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FullScreenButton = Styled(FullScreen)`
  padding: 1rem;
  cursor: pointer;
  transition: all 300ms 0s ease;
  &:hover {
    transform: scale(1.5);
  }
`;
