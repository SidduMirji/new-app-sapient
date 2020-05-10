import React from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getData } from "./redux/store";
import NewsTableComponent from "./components/NewsTableComponent";

function App() {
  const newsData = useSelector(state => state.appData);
  const { page, totalPages } = newsData;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData({ page: page - 1 }));
  }, [page]);

  return <>{totalPages > 0 && <NewsTableComponent newsData={newsData} />}</>;
}

export default App;
