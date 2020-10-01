import React from 'react'
import CoursePart from '../types';

interface PartProps {
  part: CoursePart;
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<PartProps> = ({ part }) => {
  switch(part.name) {
    case 'Fundamentals':
      return (
        <div>
          <p><strong>{part.name}</strong> {part.exerciseCount}</p>
          <p>description: {part.description}</p>
        </div>
      );
    case "Using props to pass data":
      return (
        <div>
          <p><strong>{part.name}</strong> {part.exerciseCount}</p>
          <p>group project count: {part.groupProjectCount}</p>
        </div>
      );
    case "Deeper type usage":
      return (
        <div>
          <p><strong>{part.name}</strong> {part.exerciseCount}</p>
          <p>description: {part.description}</p>
          <a href={part.exerciseSubmissionLink}>exercise submission link</a>
        </div>
      );
    case "Part four":
      return (
        <div>
          <p><strong>{part.name}</strong> {part.exerciseCount}</p>
          <p>description: {part.description}</p>
      </div>
      );
    default:
      return assertNever(part);
  }
}

export default Part;