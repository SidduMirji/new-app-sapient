import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";
import Box from "@material-ui/core/Box";
import PAGE_ACTIONS from "../redux/action-constants";
import MaterialTable from "material-table";
import LineChart from "../components/LineChart";
import { isValidData } from "../utils";

const moment = require("moment");
const NewsTableComponent = ({ newsData }) => {
  const { page, totalPages, data, loading } = newsData;
  const { hits } = data;
  const columns = [
    { title: "Comments", field: "num_comments", width: 100 },
    { title: "Vote Count", field: "points", width: 170 },
    { title: "News Details", field: "title" },
    { title: "Author", field: "author", width: 100 },
    { title: "Created At", field: "created_at", width: 150 }
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getData({ page }));
  }, []);

  const handleChange = (event, value) => {
    dispatch({ type: PAGE_ACTIONS.UPDATE_PAGE, payload: value });
  };

  return (
    <>
      <MaterialTable
        title="Hacker News"
        columns={columns}
        isLoading={loading}
        // data={hits.filter(e => isValidData(e.num_comments))}
        data={hits.map(e => {
          return isValidData(e.num_comments)
            ? { ...e, created_at: moment(e.created_at).fromNow() }
            : {
                ...e,
                num_comments: 0,
                title: "NA",
                created_at: moment(e.created_at).fromNow()
              };
        })}
        actions={[
          {
            icon: "thumb_up_alt",
            tooltip: "Vote",
            onClick: (event, rowData) =>
              dispatch({
                type: PAGE_ACTIONS.UPDATE_VOTE,
                payload: rowData.objectID
              })
          },
          rowData => ({
            icon: "visibility_off",
            tooltip: "Hide",
            onClick: (event, rowData) =>
              dispatch({
                type: PAGE_ACTIONS.HIDE_DATA,
                payload: rowData.objectID
              })
          })
        ]}
        options={{
          actionsColumnIndex: -1,
          paging: false,
          headerStyle: {
            backgroundColor: "#ff6600",
            color: "#FFF",
            fontWeight: 550,
            fontSize: 15
          }
        }}
      />
      <Box display="flex" justifyContent="flex-end" m={1} p={1}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChange}
          color="primary"
        />
      </Box>
      {hits.length > 0 && (
        <Box display="flex" m={1} p={1}>
          <LineChart chartData={hits} />
        </Box>
      )}
    </>
  );
};

export default NewsTableComponent;
