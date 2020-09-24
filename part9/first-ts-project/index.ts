import express from 'express';
import { bmiCalculator } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

const checkBmiQuery = (query: Record<string, unknown>) => {
  if (Object.keys(query).length !== 2) throw new Error('Wrong amount of arguments!');
  if (!Object.keys(query).includes('height') || !Object.keys(query).includes('weight'))
    throw new Error('Height or weight property missing');
};

app.get('/bmi', (req, res) => {
  try {
    checkBmiQuery(req.query);
    const bmi: string = bmiCalculator(Number(req.query.height), Number(req.query.weight));
    res.json({
      weight: req.query.weight,
      height: req.query.height,
      bmi
    });
  } catch(error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const msg = String(error.message);
    res.json({
      "error": msg
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});