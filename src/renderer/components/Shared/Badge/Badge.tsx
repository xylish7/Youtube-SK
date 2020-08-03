import React from 'react';

import styles from './Badge.css';
import { EAppColor } from '../../../constants/persistent-data-store';

type Props = {
  color?: EAppColor;
  showBadge?: Boolean;
  currentNumber?: Number;
  totalNumber?: Number;
  children: React.ReactNode;
  style: React.CSSProperties;
};

const Badge: React.FC<Props> = (props: Props) => {
  const { color, showBadge, currentNumber, totalNumber, children, style } = props;

  return (
    <div className={styles.badge}>
      {showBadge ? (
        <span className={styles.badgeText} style={{ backgroundColor: color, ...style }}>
          {currentNumber}/{totalNumber}
        </span>
      ) : null}
      {children}
    </div>
  );
};

export default Badge;
