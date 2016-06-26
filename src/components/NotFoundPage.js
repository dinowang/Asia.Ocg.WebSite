import React from 'react';
import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <div>
      <h4>
        Woops 404 !!
      </h4>
      <Link style={{color:"#3c8dbc"}} to="/">回首頁</Link>
    </div>
  );
};

export default NotFoundPage;
