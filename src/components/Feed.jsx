import React, { useEffect } from 'react'
import axios from 'axios';
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  useEffect(() => {
    getFeed();
  }, []);

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(`${BASE_URL}/feed`);
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log('Feed fetch error (backend may be down):', err.message);
    }
  };

  if (!feed) return <div className="p-8 text-center">Loading feed...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">DevTinder Feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feed.map((item) => (
          <div key={item.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{item.name || item.firstName || 'User'}</h2>
              <p>Swipe right if interested!</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary btn-sm">Like</button>
                <button className="btn btn-secondary btn-sm">Pass</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default Feed;
