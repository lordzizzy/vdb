import React from 'react';
import BinocularsFill from 'assets/images/icons/binoculars-fill.svg';
import Plus from 'assets/images/icons/plus.svg';

const ToogleSearchAddButton = ({ addMode, toggleAddMode }) => {
  return (
    <div
      onClick={() => toggleAddMode()}
      className={`d-flex float-right-bottom float-add-${
        addMode ? 'on' : 'off'
      } align-items-center justify-content-center`}
    >
      {addMode ? (
        <BinocularsFill viewBox="0 -2 16 22" />
      ) : (
        <Plus viewBox="0 0 16 16" />
      )}
    </div>
  );
};

export default ToogleSearchAddButton;
