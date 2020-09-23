interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ParseValues {
  log: Array<number>;
  target: number;
}

const parseArgumentsEx = (args: Array<string>): ParseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      target: Number(args[2]),
      log: args.slice(3, args.length + 1).map((n) => Number(n)),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateExercises = (log: Array<number>, target: number): Result => {
  const average: number = log.reduce((acc: number, cur: number) => acc + cur, 0) / log.length;

  let rating: number = 2;
  let ratingDescription: string = 'acceptable';
  if (average > target * 1.1) {
    rating = 3;
    ratingDescription = 'exceptional'
  }
  else if (average < target * 0.9) {
    rating = 1;
    ratingDescription = 'could be improved'
  }

  return {
    periodLength: log.length,
    trainingDays: log.filter((day: number) => day != 0).length,
    success: average > target ? true : false,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  }
}

try {
  const { log, target } = parseArgumentsEx(process.argv);
  console.log(calculateExercises(log, target));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}