import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const add = async (content) => {
  const response = await axios.post(baseUrl, {
    content,
    votes: 0,
  });
  return response.data;
};

const vote = async (id) => {
  const { data } = await axios.get(baseUrl);
  const toVote = data.find((anecdote) => anecdote.id === id);
  const response = await axios.put(`${baseUrl}/${id}`, {
    ...toVote,
    votes: toVote.votes + 1,
  });
  return response.data;
};

export default { getAll, add, vote };
