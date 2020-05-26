import React, { useState } from "react";
import ReactDOM from "react-dom";

const Title = ({ text }) => <h1>{text}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ feedback }) => {
  if (feedback.every((value) => value === 0)) {
    return <p>No feedback given</p>;
  }

  const [good, neutral, bad] = [...feedback];
  return (
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={good + neutral + bad} />
        <Statistic
          text="average"
          value={Number.parseFloat((good - bad) / (good + neutral + bad)).toFixed(2)}
        />
        <Statistic
          text="positive"
          value={`${Number.parseFloat((good / (good + neutral + bad)) * 100).toFixed(0)} %`}
        />
      </tbody>
    </table>
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
