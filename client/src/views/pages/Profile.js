import React, { useContext } from 'react';
import MovieContext from '../../context/movies';
import Card from '../../components/common/Card';

const ProfilePage = () => {
  const { userList, handleToWatch, handleRecommend } = useContext(MovieContext);
  const userListArr = Object.values(userList);

  const toWatchMovies = userListArr.filter(item => item.toWatch);
  const recommendedMovies = userListArr.filter(item => item.isRecommended);

  return (
    <div className="container mt-5">
      <h1>Hello, Jonmar</h1>
      <p className="lead mb-5">Here are the lists of your movies.</p>
      <div className="d-flex flex-wrap">
        <div className="col bg-light pt-3 mr-3">
          <h3>To Watch</h3>
          <div className="mt-5">
            {toWatchMovies.map(item => {
              const { _id, title: cardTitle, image, type, year } = item.movie;
              return (
                <Card
                  key={`${year}-${cardTitle}-${_id}`}
                  id={_id}
                  image={image}
                  title={cardTitle}
                  year={year}
                  type={type}
                  toWatch={userList[_id]?.toWatch}
                  leftButtonLabel={'Remove To Watch'}
                  rightButtonHide={userList[_id]?.isRecommended}
                  onToWatch={() => handleToWatch(item.movie)}
                  onRecommend={() => handleRecommend(item.movie)}
                />
              );
            })}
          </div>
        </div>
        <div className="col bg-light pt-3">
          <h3>Recommended</h3>
          <div className="mt-5">
            {recommendedMovies.map(item => {
              const { _id, title: cardTitle, image, type, year } = item.movie;
              return (
                <Card
                  key={`${year}-${cardTitle}-${_id}`}
                  id={_id}
                  image={image}
                  title={cardTitle}
                  year={year}
                  type={type}
                  toWatch={userList[_id]?.toWatch}
                  rightButtonLabel={'Unrecommend'}
                  leftButtonHide={userList[_id]?.toWatch}
                  isRecommended={userList[_id]?.isRecommended}
                  onToWatch={() => handleToWatch(item.movie)}
                  onRecommend={() => handleRecommend(item.movie)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
