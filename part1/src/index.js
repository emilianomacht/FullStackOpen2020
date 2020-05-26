import React, { useState } from "react";
import ReactDOM from "react-dom";

const Title = ({ text }) => <h1>{text}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = ({ feedback }) => {
  const [good, neutral, bad] = [...feedback];
  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodFeedback = () => {
    setGood(good + 1);
  };

  const neutralFeedback = () => {
    setNeutral(neutral + 1);
  };

  const badFeedback = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Title text="Give feedback" />
      <Button handleClick={goodFeedback} text="good" />
      <Button handleClick={neutralFeedback} text="neutral" />
      <Button handleClick={badFeedback} text="bad" />

      <Title text="Statistics" />
      <Statistics feedback={[good, neutral, bad]} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
