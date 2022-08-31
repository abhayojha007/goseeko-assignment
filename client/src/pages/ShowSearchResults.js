import React, { useState, useEffect } from "react";
import NavBarWithSearch from "../components/navbar";
import Spinner from "../components/spinner";
import { getSearchResults } from "../services";
import TopicCard from "../components/topic-card";
import { useLocation, useNavigate } from "react-router-dom";

const renderTopics = (item) => {
  return (
    <div key={item._id} style={{ marginTop: 10 }}>
      <TopicCard
        id={item.id}
        preview_content={item.content_without}
        topic_name={item.header}
      />
    </div>
  );
};
const ShowSearchResults = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const { state } = useLocation();
  const { searchText } = state; // Read values passed on state
  const navigate = useNavigate();
  const navigateToErrorPage = (msg) => {
    navigate("/error", { state: { msg } });
  };
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await getSearchResults(searchText);
      //console.log("res>>>>", res);
      if (!res.isError && res.data) {
        setSearchResults(res.data);
      } else {
        setIsLoading(false);
        navigateToErrorPage(res.msg);
      }
      setIsLoading(false);
    })();
  }, [searchText]);
  return (
    <div className="container">
      <NavBarWithSearch searchValue={searchText} />
      <div className="container" style={{ marginTop: 50 }}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {searchResults.length ? (
              searchResults.map((elem) => renderTopics(elem))
            ) : (
              <div> No Results found for the search text.</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ShowSearchResults;
