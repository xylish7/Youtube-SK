import * as React from 'react';

import styles from './Counter.css';

export interface Props {
  value: number;

  incrementValue: () => any;
  decrementValue: () => any;
}

const Counter: React.FunctionComponent<Props> = ({ value, incrementValue, decrementValue }) => (
  <div className={styles.counter}>
    <p id="counter-value">Current value: {value}</p>
    <p>
      <button id="increment" onClick={incrementValue}>
        Increment
      </button>
      <button id="decrement" onClick={decrementValue}>
        Decrement
      </button>
    </p>
  </div>
);

export default Counter;
