import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const ShowAnecdote = ({ singleAnecdote, numberOfVotes }) => (
  <div>
    <p>{singleAnecdote}</p>
    <p>Has {numberOfVotes} votes.</p>
  </div>
);

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const randomSelect = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const voteAnecdote = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);
  };

  return (
    <div>
      <h3>Anecdote of the day</h3>
      <ShowAnecdote
        singleAnecdote={props.anecdotes[selected]}
        numberOfVotes={votes[selected]}
      />
      <Button text="vote" handleClick={voteAnecdote} />
      <Button text="next anecdote" handleClick={randomSelect} />

      <h3>Anecdote with most votes</h3>
      <ShowAnecdote
        singleAnecdote={props.anecdotes[votes.indexOf(Math.max(...votes))]}
        numberOfVotes={votes[votes.indexOf(Math.max(...votes))]}
      />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
