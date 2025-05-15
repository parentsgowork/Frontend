import logo from "../../assets/images/logo.png";

export const LogoImg = ({ alt = "LogoImg", width, height, ...props }) => {
  return <img src={logo} alt={alt} width={width} height={height} {...props} />;
}   
export default LogoImg;
