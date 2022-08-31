import React from "react";
import { useNavigate } from "react-router-dom";

const TopicCard = (props) => {
  const { topic_name, preview_content, id } = props;
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/topic-content/${id}`;
    navigate(path);
  };
  const renderContent = () => {
    if (typeof preview_content === "string") {
      return <p className="card-text">{preview_content}</p>;
    }
    return preview_content.map((item, index) => (
      <p className="card-text" key={String(index)}>
        {item}
      </p>
    ));
  };
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{topic_name}</h5>
        {/* {preview_content && renderContent()} */}
        <button className="btn btn-light" onClick={routeChange}>
          Read more{" "}
        </button>
      </div>
    </div>
  );
};

export default TopicCard;
