export interface GetValues {
  value1: number;
  value2: number;
}

export const parseArguments = (args: Array<string>): GetValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

export const bmiCalculator = (height: number, weight: number): string => {
  const BMI : number = weight/height/height * 10000;
  
  if (BMI < 15) return 'Very severely underweight';
  if (BMI < 16) return 'Severely underweight';
  if (BMI < 18.5) return 'Underweight';
  if (BMI < 25) return 'Normal (healthy weight)';
  if (BMI < 30) return 'Overweight';
  if (BMI < 35) return 'Obese Class I (Moderately obese)';
  if (BMI < 40) return 'Obese Class II (Severely obese)';
  else return 'Obese Class III (Very severely obese)';
}

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(bmiCalculator(value1, value2));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}