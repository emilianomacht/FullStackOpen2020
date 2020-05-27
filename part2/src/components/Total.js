import React from "react";

const Total = ({ course }) => {
  return (
    <p>
      <strong>
        total of {course.parts.reduce((sum, part) => part.exercises + sum, 0)}{" "}
        exercises
      </strong>
    </p>
  );
};

export default Total;
