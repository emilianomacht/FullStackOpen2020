import express from 'express';
import { bmiCalculator } from './bmiCalculator';
import { calculateExercises, Result } from './exerciseCalculator';

const app = express();
app.use(express.json());

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

const checkExcReq = (query: ExcerciseQuery) => {
  if (Object.keys(query).length !== 2
    || !Object.keys(query).includes('dailyExercises') 
    || !Object.keys(query).includes('target')) {
      throw new Error('parameters missing');
    }
  if (!(query.dailyExercises instanceof Array) || isNaN(Number(query.target))) {
    throw new Error('malformatted parameters');
  }
  query.dailyExercises.forEach((day) => {
    if (isNaN(Number(day))) throw new Error('malformatted parameters');
  });
};

interface ExcerciseQuery {
  dailyExercises: Array<number>;
  target: number;
}

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const reqJson: ExcerciseQuery = req.body;
  try {
    checkExcReq(reqJson);
    const result: Result = calculateExercises(reqJson.dailyExercises, reqJson.target);
    res.json(result);
  } catch (error) {
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