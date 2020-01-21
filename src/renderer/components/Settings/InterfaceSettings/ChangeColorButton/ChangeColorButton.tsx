import React from 'react';

import styles from './ChangeColorButton.css';
import { EAppColor } from '../../../../constants/persistent-data-store';

type Props = {
  color: EAppColor;
  onClick: () => void;
};

const ChangeColorButton: React.FC<Props> = (props: Props) => {
  const { color, onClick } = props;

  return (
    <button
      onClick={onClick}
      className={styles.buttonContainer}
      style={{ backgroundColor: color }}
    ></button>
  );
};

export default ChangeColorButton;
