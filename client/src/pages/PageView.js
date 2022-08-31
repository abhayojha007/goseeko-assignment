import React, { useState, useEffect } from "react";
import { getTopicContent } from "../services";
import { useLocation, useNavigate } from "react-router-dom";
import NavBarWithSearch from "../components/navbar";
import Spinner from "../components/spinner";

const PageView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [topicContents, setTopicContents] = useState({});
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const navigateToErrorPage = (msg) => {
    navigate("/error", { state: { msg } });
  };
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await getTopicContent(id);
      if (res && !res.isError) {
        setTopicContents(res.data);
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
          <>
            <div
              dangerouslySetInnerHTML={{
                __html: topicContents.topic_name,
              }}
            />
            {topicContents.contents &&
              topicContents.contents.length &&
              topicContents.contents.map((item, index) => (
                <div
                  dangerouslySetInnerHTML={{ __html: item }}
                  key={String(index)}
                />
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default PageView;
