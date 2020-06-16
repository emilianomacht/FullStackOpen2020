/* eslint-disable react/prop-types */
import React from 'react';
// import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const Filter = (props) => {
  // const dispatch = useDispatch();

  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    // dispatch(setFilter(event.target.value));
    props.setFilter(event.target.value);
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter
      {' '}
      <input onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = {
  setFilter,
};

// export default Filter;
const ConnectedFilter = connect(null, mapDispatchToProps)(Filter);
export default ConnectedFilter;
