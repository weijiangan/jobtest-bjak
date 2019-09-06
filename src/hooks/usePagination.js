import React, { useState, useEffect, useCallback, useRef } from "react";
import querystring from "querystring";

const PAGE_PARAM_REGEX = /page=(?<page>\d+)/;

function usePagination(history, location, size = 10) {
  const { pathname, search } = location;
  const params = querystring.parse(search.slice(1));
  const initPage = parseInt(params.page, 10);
  const [page, setPage] = useState(initPage > 0 ? initPage : 1);

  useEffect(() => {
    const found = search.match(PAGE_PARAM_REGEX);
    if (found && found.groups.page !== page) {
      setPage(parseInt(found.groups.page, 10));
    } else {
      history.replace(`${pathname}?page=${page}`);
    }
  }, [search]); // only run when location changes

  const paginator = useCallback(
    arr => {
      let sliced = arr;
      if (arr.length > size) {
        sliced = arr.slice((page - 1) * size, page * size);
      }
      const pages = Math.ceil(arr.length / size);
      return [sliced, pages];
    },
    [page]
  );

  const setPageAndPushHistory = useCallback(
    arg => {
      setPage(arg);
      let newPage = arg;
      if (typeof arg === "function") {
        newPage = arg(page);
      }
      history.push(`${pathname}?page=${newPage}`);
    },
    [page]
  );

  return [page, setPageAndPushHistory, paginator];
}

export { usePagination };
