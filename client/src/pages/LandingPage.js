import React, { useState, useEffect } from "react";
import NavBarWithSearch from "../components/navbar";
import Spinner from "../components/spinner";
import { getAllTopics } from "../services";
import TopicCard from "../components/topic-card";
import { useNavigate } from "react-router-dom";

const renderTopics = (item) => {
  return (
    <div key={item.id} style={{ marginTop: 10 }}>
      <TopicCard
        id={item.id}
        preview_content={item.preview_content}
        topic_name={item.topic_name}
      />
    </div>
  );
};

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allTopics, setAllTopics] = useState([]);
  const navigate = useNavigate();
  const navigateToErrorPage = (msg) => {
    navigate("/error", { state: { msg } });
  };
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await getAllTopics();
      if (res && !res.isError) {
        setAllTopics(res.data);
      } else {
        setIsLoading(false);
        navigateToErrorPage(res.msg);
      }
      setIsLoading(false);
    })();
  }, []);
  return (
    <div className="container">
      <NavBarWithSearch />
      <div className="container" style={{ marginTop: 50 }}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>{allTopics.length && allTopics.map((elem) => renderTopics(elem))}</>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
