import React from "react";
import logo from "./images/logo.png";
import homeJob from ".images/home_job.png";
import homeEducation from ".images/home_education.png";
import homePolicy from "./images/home_policy.png";
import homeResume from "./images/home_resume.png";
import chatbot from "./images/chatbot.png";

export const LogoImg = ({alt = "LogoImg", width, height, ...props}) => {
  return <img src={logo} alt={alt} width={width} height={height} {...props} />
}

export const HomeJobImg = ({alt = "HomeJobImg", width, height, ...props}) => {
  return <img src={homeJob} alt={alt} width={width} height={height} {...props} />
}

export const HomeEducationImg = ({alt = "HomeEducationImg", width, height, ...props}) => {
  return <img src={homeEducation} alt={alt} width={width} height={height} {...props} />
}

export const HomePolicyImg = ({alt = "HomePolicyImg", width, height, ...props}) => {
  return <img src={homePolicy} alt={alt} width={width} height={height} {...props} />
}

export const HomeResumeImg = ({alt = "HomeResumeImg",width, height,  ...props}) => {
  return <img src={homeResume} alt={alt} width={width} height={height} {...props} />
}

export const ChatbotImg = ({alt = "ChatbotImg", width, height, ...props}) => {
  return <img src={chatbot} alt={alt} width={width} height={height} {...props} />
}

export const ImageAssets = {
  LogoImg,
  HomeJobImg,
  HomeEducationImg,
  HomePolicyImg,
  HomeResumeImg,
  ChatbotImg
}