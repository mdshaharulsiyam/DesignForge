"use client";


const LeftSidebar = () => {
  // memoize the result of this function so that it doesn't change on every render but only when there are new shapes


  return (
    <section className="flex flex-col border-t border-primary-grey-200 bg-primary-black text-primary-grey-300 min-w-[227px] sticky left-0 h-full max-sm:hidden select-none overflow-y-auto pb-20">
      <h3 className="border border-primary-grey-200 px-5 py-4 text-xs uppercase">Layers</h3>

    </section>
  );
};

export default LeftSidebar;
