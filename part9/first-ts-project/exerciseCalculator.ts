interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
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
  console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}