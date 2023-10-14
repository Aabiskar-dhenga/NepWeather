// export const SetlocalStorage = (placename) => {
//   let prev = GetlocalStorage();

//   let newPlace = {
//     placename,
//     id: Date.now(),
//   };
//   let dataAfterStringfy = JSON.stringify([...prev, newPlace]);
//   localStorage.setItem("place", dataAfterStringfy);
// };

// // to get the place

// export const GetlocalStorage = () => {
//   let getLs = localStorage.getItem("place");
//   let dataAfterParsed;
//   if (getLs) {
//     dataAfterParsed = JSON.parse(getLs);
//   }
//   return dataAfterParsed ?? [];
// };

// export const DeleteFunctionality = (deletingId) => {
//   let mappingData = GetlocalStorage();
//   let filteredData = mappingData.filter((item) => {
//     return item.id !== deletingId;
//   });
//   let dataAfterStringfy = JSON.stringify(filteredData);
//   localStorage.setItem("place", dataAfterStringfy);
//

export let setStorage = (place) => {
  let getItem = getStorage();
  let newPlace = {
    place,
    id: Date.now(),
  };

  let tobeStringified = [...getItem, newPlace];

  let dataAfterStringify = JSON.stringify(tobeStringified);

  localStorage.setItem("placeName", dataAfterStringify);
};

export let getStorage = () => {
  let allData = localStorage.getItem("placeName");
  let x;
  if (allData) {
    x = JSON.parse(allData);
  }
  return x ?? [];
};

export let DeleteFunctionality = (deltingID) => {
  let allData = getStorage();

  let filteredData = allData.filter((item) => {
    return item.id !== deltingID;
  });
  let dataAfterStringfy = JSON.stringify(filteredData);
  localStorage.setItem("placeName", dataAfterStringfy);
};
