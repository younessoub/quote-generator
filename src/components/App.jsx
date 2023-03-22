import twitterIcon from "../assets/twitter-icon.svg";
import tumblerIcon from "../assets/tumbler-icon.svg";
import { useEffect, useRef, useState } from "react";

function App() {
  const colors = [
    "#16a085",
    "#27ae60",
    "#2c3e50",
    "#f39c12",
    "#e74c3c",
    "#9b59b6",
    "#FB6964",
    "#342224",
    "#472E32",
    "#BDBB99",
    "#77B1A9",
    "#73A857",
  ];

  const quoteRef = useRef();
  const authorRef = useRef();

  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [color, setColor] = useState("");

  const getQuote = () => {
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((data) => {
        setQuote(data.content);

        setAuthor(data.author);
      })
      .catch((err) => console.error(err));
  };

  const getRandomColor = () => {
    const colorsNum = colors.length;
    const randomIndex = Math.floor(Math.random() * (colorsNum - 1));
    setColor(colors[randomIndex]);
  };

  const change = () => {
    getQuote();
    getRandomColor();
    quoteRef.current.style.animation = "fadeIn 1s ease-in ";
    authorRef.current.style.animation = "fadeIn 1s ease-in ";

    setTimeout(() => {
      quoteRef.current.style.animation = "";
      authorRef.current.style.animation = "";
    }, 1200);
  };

  useEffect(() => {
    change();
  }, []);

  return (
    <div
      id="quote-box"
      className="h-screen flex justify-center items-center "
      style={{
        backgroundColor: color,
      }}
    >
      <div className=" bg-white mx-4 p-8 rounded-md max-w-lg">
        <h1
          id="text"
          ref={quoteRef}
          className=" font-bold text-3xl flex gap-3 "
          style={{ color: color }}
        >
          <div>
            <svg
              className=" w-9 h-9"
              style={{ fill: color }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z" />
            </svg>
          </div>
          {quote || "Loading Quote..."}
        </h1>
        <p
          id="author"
          ref={authorRef}
          className=" text-right mt-8 font-medium"
          style={{ color: color }}
        >
          - {author}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              id="tweet-quote"
              href={`https://twitter.com/intent/tweet?text=${quote}`}
              target="_blank"
            >
              <div
                className="h-12 w-12 p-2 rounded-md"
                style={{ backgroundColor: color }}
              >
                <img className="h-8 w-8" src={twitterIcon} alt="quote icon" />
              </div>
            </a>
            <a
              href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&content=${quote}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`}
              target="_blank"
            >
              <div
                className="h-12 w-12 p-2 rounded-md"
                style={{ backgroundColor: color }}
              >
                <img className="h-8 w-8" src={tumblerIcon} alt="quote icon" />
              </div>
            </a>
          </div>
          {/* https://twitter.com/intent/tweet?text=[YOUR_QUOTE]&hashtags=[YOUR_HASHTAGS]
           */}
          <button
            id="new-quote"
            onClick={change}
            style={{ backgroundColor: color }}
            className="text-white p-3 rounded-md"
          >
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
