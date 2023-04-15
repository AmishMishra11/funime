import React from "react";

import nezukoLoading from "../assets/nezuko-chibi-loading.gif";

function Loading() {
  return (
    <div className="flex items-center justify-center w-full">
      <img
        src={nezukoLoading}
        height={40}
        width={40}
        alt="Not Found"
        className="rounded"
      />

      {/* <i className="fa-solid fa-spinner fa-spin"></i> */}
    </div>
  );
}

export { Loading };
