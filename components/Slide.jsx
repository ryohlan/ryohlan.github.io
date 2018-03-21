import React from "react";
import Styled, { keyframes } from "styled-components";
import RNMarkdown from "react-markdown";
import ArrowPrev from "react-icons/lib/md/keyboard-arrow-left";
import ArrowNext from "react-icons/lib/md/keyboard-arrow-right";
import FullScreen from "react-icons/lib/md/fullscreen";
import FullScreenExit from "react-icons/lib/md/fullscreen-exit";
import { Colors } from "../Assets";
interface Props {
  slideMarkdowns: string[];
}

interface State {
  slideIndex: number;
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

const Section = Styled.section`
  width: 100%;
  height: 100%;
  min-height: 240px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ContentWrapepr = Styled.div`
  background-color: #FFF;
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
`;

const Content = Styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  animation: ${FadeInOut} 0.3s linear;
`;

const BottomNavigation = Styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #FFF;
  margin-top: 1px;
`;

const Prev = Styled(ArrowPrev)`
  padding: 0.3rem;
  cursor: pointer;
  padding-right: 2rem;
`;

const Next = Styled(ArrowNext)`
  padding: 0.3rem;
  cursor: pointer;
  padding-left: 2rem;
`;

const FullScreenIcon = Styled(FullScreen)`
  position: absolute;
  padding: 1rem;
  top: 0;
  right: 0;
`;

const SlideNumber = Styled.span`
  font-size: 0.8rem;
  color: ${Colors.font.secondary};
`;

export default class extends React.Component<Props, State> {
  sectionRef = undefined;
  state: State = {
    slideIndex: 0
  };

  render() {
    const { slideMarkdowns } = this.props;
    const { slideIndex } = this.state;
    const isPrevActive = slideIndex > 0;
    const isNextActive = slideIndex < slideMarkdowns.length - 1;
    return (
      <Section
        ref={ref => {
          this.sectionRef = ref;
        }}
      >
        <ContentWrapepr>
          <Content key={slideMarkdowns[slideIndex]}>
            <RNMarkdown source={slideMarkdowns[slideIndex]} />
          </Content>
        </ContentWrapepr>
        <BottomNavigation>
          <Prev
            size={24}
            color={Colors.font.secondary}
            style={{ opacity: isPrevActive ? 1 : 0.2 }}
            onClick={() =>
              isPrevActive && this.setState({ slideIndex: slideIndex - 1 })
            }
          />
          <SlideNumber>
            {slideIndex + 1}/{slideMarkdowns.length}
          </SlideNumber>
          <Next
            size={24}
            color={Colors.font.secondary}
            style={{
              opacity: isNextActive ? 1 : 0.2
            }}
            onClick={() =>
              isNextActive && this.setState({ slideIndex: slideIndex + 1 })
            }
          />
        </BottomNavigation>
      </Section>
    );
  }
}
