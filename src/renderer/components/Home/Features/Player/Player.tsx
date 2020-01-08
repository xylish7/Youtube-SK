import React from 'react';

import { Empty } from 'antd';

const Player: React.FC = () => {
  return (
    <Empty
      style={{ marginTop: 150 }}
      description="Cooming soon! This feature is not available yet, but we are working on it. Don't forget to share this app with your friends!"
    />
  );
};

export default Player;
