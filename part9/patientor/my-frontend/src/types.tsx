interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseDescribed extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartBaseDescribed {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseDescribed {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartBaseDescribed {
  name: "Part four";
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

export default CoursePart;