import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';

const Card = ({
  id,
  image,
  title,
  year,
  type,
  toWatch,
  isRecommended,
  onToWatch,
  onRecommend,
  leftButtonLabel,
  rightButtonLabel,
  leftButtonHide,
  rightButtonHide,
}) => {
  return (
    <div className="card mb-3 mx-auto col-md-*" style={{ maxWidth: '540px' }}>
      <div className="row no-gutters">
        <div className="col-md-4">
          <img
            src={
              image === 'N/A'
                ? 'https://via.placeholder.com/200x320/000/999'
                : image
            }
            className="card-img"
            style={{ width: '200' }}
            alt={title}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <Link to={`/movies/${title}/${id}`}>
              <h5 className="card-title">{title}</h5>
            </Link>
            <p className="card-text">
              <small className="text-muted">
                {type.toUpperCase()} ({year})
              </small>
            </p>
            <div className="mt-3">
              {!leftButtonHide && (
                <Button
                  label={
                    leftButtonLabel ||
                    (toWatch ? 'Added To Watch ' : 'To Watch')
                  }
                  className={
                    toWatch ? 'dark disabled mr-2 mt-2' : 'dark mr-2 mt-2'
                  }
                  onClick={onToWatch}
                />
              )}
              {!rightButtonHide && (
                <Button
                  label={
                    rightButtonLabel ||
                    (isRecommended ? 'Recommended' : 'Recommend')
                  }
                  className={
                    isRecommended ? 'success disabled mt-2' : 'success mt-2'
                  }
                  onClick={onRecommend}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
