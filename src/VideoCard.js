import React from "react";

const VideoCard = ({ info }) => {
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;
  return (
    <div className="w-72 shadow-lg rounded-lg p-2 m-2">
      <img
        src={thumbnails.medium.url}
        alt="thumbnails"
        className="rounded-lg"
      />
      <h1 className="font-semibold text-md py-2">{title}</h1>
      <div className="text-gray-500">{channelTitle}</div>
      <div>{statistics.viewCount} views</div>
    </div>
  );
};

export default VideoCard;
