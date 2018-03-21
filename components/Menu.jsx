import React from "react";
import Styled from "styled-components";
import { Values, Colors } from "../Assets";
import GithubIcon from "react-icons/lib/fa/github";
import TwitterIcon from "react-icons/lib/fa/twitter";
import FacebookIcon from "react-icons/lib/fa/facebook-square";

interface Props {
  page: string;
  onClickMenu: (page: string) => void;
}

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

export default ({ page, onClickMenu }: Props) => (
  <React.Fragment>
    <NavList>
      <NavItem onClick={() => onClickMenu("blogs")} active={page === "blogs"}>
        Posts
      </NavItem>
      <NavItem
        onClick={() => onClickMenu("products")}
        active={page === "products"}
      >
        Products
      </NavItem>
      <NavItem onClick={() => onClickMenu("others")} active={page === "others"}>
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
  </React.Fragment>
);
