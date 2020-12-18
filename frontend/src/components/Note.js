import React from 'react';

export default function Note(props) {
  const { note, numAvis } = props;
  return (
              <div className="note">
                    <span> <i className={note >=1?"fa fa-star": note >=0.5?'fa fa-star-half-o':'fa fa-star-o'}></i> </span>
                    <span> <i className={note >=2?"fa fa-star": note >=1.5?'fa fa-star-half-o':'fa fa-star-o'}></i> </span>
                    <span> <i className={note >=3?"fa fa-star": note >=2.5?'fa fa-star-half-o':'fa fa-star-o'}></i> </span>
                    <span> <i className={note >=4?"fa fa-star": note >=3.5?'fa fa-star-half-o':'fa fa-star-o'}></i> </span>
                    <span> <i className={note >=5?"fa fa-star": note >=4.5?'fa fa-star-half-o':'fa fa-star-o'}></i> </span>
                    <span> {numAvis + 'avis'}</span>
             </div>
  );
}

