import { useEffect, useState } from "react";

export default function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMemes, setAllMemes] = useState([]);

  useEffect(function () {
    fetch(`https://api.imgflip.com/get_memes`)
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme({
      topText: "",         // Clear topText
      bottomText: "",      // Clear bottomText
      randomImage: url,
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }
  return (
    <div className="content">
      <div className="Meme">
        <form className="form">
          <input
            placeholder="Top text"
            type="text"
            className="input"
            name="topText"
            value={meme.topText}
            onChange={handleChange}
          />
          <input
            placeholder="Bottom text"
            type="text"
            className="input"
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}
          />
        </form>
        <button onClick={getMemeImage} className="meme-Btn">
          Get a new meme image😊
        </button>
      </div>
      <div className="meme-img">
        <img src={meme.randomImage} alt="meme" className="meme-image" />
        <h2 className="meme-text top">{meme.topText}</h2>
        <h2 className="meme-text bottom">{meme.bottomText} </h2>
      </div>
    </div>
  );
}
