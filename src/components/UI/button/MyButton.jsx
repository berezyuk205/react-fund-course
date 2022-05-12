import React from 'react';
import btn from './MyButton.module.css'


const MyButton = ({children, ...props}) => {
  return (
    <button {...props} className={btn.myBtn}>
      {children}
    </button>
  );
};

export default MyButton;