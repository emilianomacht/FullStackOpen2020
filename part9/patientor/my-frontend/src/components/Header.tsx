import React from "react";

interface NameProps {
  name: string;
}

const Header: React.FC<NameProps> = ({ name }) => {
  return (
    <h1>{name}</h1>
  );
};

export default Header;