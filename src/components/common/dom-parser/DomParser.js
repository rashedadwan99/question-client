import "./dom-parser.css";
const DomParser = ({ htmlResponse, className = "", ...rest }) => {
  return (
    <span
      dangerouslySetInnerHTML={{ __html: htmlResponse }}
      className={`parser-container ${className}`}
      {...rest}
    />
  );
};
export default DomParser;
