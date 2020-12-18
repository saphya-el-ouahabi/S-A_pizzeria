import React from 'react';

export default function LoadingBox() {
  return (
    <div>
      <div className="loading"></div>
        <i className="fa fa-spinner fa-spin"></i> 
        Chargement de la page...
    </div>
  );
}