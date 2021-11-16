import "./ColorBox.css";

import { FC, useState, MouseEvent } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";

interface ColorBoxProps {
  background: string;
  name: string;
  moreUrl: string;
}

const ColorBox: FC<ColorBoxProps> = ({ name, background, moreUrl }) => {
  const [copied, setCopied] = useState(false);

  const onCopyToClipboard = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <CopyToClipboard text={background} onCopy={onCopyToClipboard}>
      <div className="ColorBox" style={{ background }}>
        <div
          className={`copy-overlay ${copied ? "show" : ""}`}
          style={{ background }}
        />
        <div className={`copy-msg ${copied ? "show" : ""}`}>
          <h1>copied!</h1>
          <p>{background}</p>
        </div>
        <div className="copy-container">
          <div className="box-content">
            <span>{name}</span>
          </div>
          <button className="copy-button">Copy</button>
        </div>
        <Link to={moreUrl} onClick={(e: MouseEvent) => e.stopPropagation()}>
          <span className="see-more">More</span>
        </Link>
      </div>
    </CopyToClipboard>
  );
};

export default ColorBox;
