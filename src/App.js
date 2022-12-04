import "./styles.css";
import { useState, useEffect } from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

export default function App() {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);

  const getQuote = () => {
    setLoading(true);
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((data) => {
        setQuote(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    getQuote();
  }, []);

  const play = () => {
    let utterance = new SpeechSynthesisUtterance(
      quote.content + "by" + quote.author
    );
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="wrapper">
      <header>Quote of the Day</header>
      <div className="content">
        {loading ? (
          <div className="quote-area spin"></div>
        ) : (
          <>
            <div className="quote-area">
              <p className="quote">{quote.content}</p>
            </div>
            <div className="author">
              <span>__</span>
              <span className="name">{quote.author}</span>
            </div>
          </>
        )}
      </div>
      <div className="buttons">
        <div className="features">
          <ul>
            <li className="copy">
              <VolumeUpIcon onClick={play} />
            </li>
            <li className="twitter">
              <a
                href={`https://twitter.com/intent/tweet?text=hello`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon />
              </a>
            </li>
          </ul>
          <button onClick={getQuote} className={!loading ? "" : "loadingBtn"}>
            {!loading ? <div>New Quote</div> : <div>Loading . . .</div>}
          </button>
        </div>
      </div>
    </div>
  );
}
