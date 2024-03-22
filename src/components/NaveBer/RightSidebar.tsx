import React, { useMemo, useRef } from "react";

const RightSidebar = () => {


  // memoize the content of the right sidebar to avoid re-rendering on every mouse actions

  // only re-render when elementAttributes changes

  return (
    <section className="flex flex-col border-t border-primary-grey-200 bg-primary-black text-primary-grey-300 min-w-[227px] sticky right-0 h-full max-sm:hidden select-none">
      <h3 className=" px-5 pt-4 text-xs uppercase">Design</h3>
      <span className="text-xs text-primary-grey-300 mt-3 px-5 border-b border-primary-grey-200 pb-4">
        Make changes to canvas as you like
      </span>


    </section>
  );
};

export default RightSidebar;
