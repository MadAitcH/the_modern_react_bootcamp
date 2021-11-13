import "./ColorBox.css";

import { FC, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface ColorBoxProps {
  background: string;
  name: string;
}

const ColorBox: FC<ColorBoxProps> = ({ name, background }) => {
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
        <span className="see-more">More</span>
      </div>
    </CopyToClipboard>
  );
};

export default ColorBox;
