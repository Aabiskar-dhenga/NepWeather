import { createContext, useReducer } from "react";
export let BookmarkContext = createContext();

let data = {
  BookmarkCollection: [],
};

let reducer = (state, action) => {
  switch (action.type) {
    case "setBookmark":
      let samePlace = state.BookmarkCollection.find(
        (item) => item.newData === action.payload
      );
      if (!samePlace) {
        return {
          ...state,
          BookmarkCollection: [
            ...state.BookmarkCollection,
            {
              id: Date.now(),
              newData: action.payload,
            },
          ],
        };
      } else {
        alert("already bookmarked");
        return state;
      }

    case "remove":
      let remainingData = data.BookmarkCollection.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        BookmarkCollection: remainingData,
      };

    default:
      return state;
  }
};

export let UseContextProvider = ({ children }) => {
  let [state, dispatch] = useReducer(reducer, data);
  return (
    <BookmarkContext.Provider value={{ state, dispatch }}>
      {children}
    </BookmarkContext.Provider>
  );
};
