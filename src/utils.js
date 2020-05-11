export const isValidData = data => {
  return data && data !== null;
};

export const initStorage = () => {
  if (sessionStorage.getItem("hiddenIDs") === null) {
    sessionStorage.setItem("hiddenIDs", JSON.stringify([]));
  }
  if (sessionStorage.getItem("votesData") === null) {
    sessionStorage.setItem("votesData", JSON.stringify([]));
  }
};

export const saveDeletedDataStorage = id => {
  var data;
  if (sessionStorage.getItem("hiddenIDs") === null) {
    data = [];
  } else {
    data = JSON.parse(sessionStorage.getItem("hiddenIDs"));
  }
  data.push(id);
  sessionStorage.setItem("hiddenIDs", JSON.stringify(data));
};

export const updateVotesDataStorage = values => {
  let data;
  let isUpdate = false;
  if (sessionStorage.getItem("votesData") === null) {
    data = [];
  } else {
    data = JSON.parse(sessionStorage.getItem("votesData"));
    data = data.map(item => {
      if (item.objectID === values.objectID) {
        isUpdate = true;
        return values;
      } else {
        return item;
      }
    });
  }
  if (!isUpdate) {
    data.push(values);
  }
  console.log(data);
  sessionStorage.setItem("votesData", JSON.stringify(data));
};
