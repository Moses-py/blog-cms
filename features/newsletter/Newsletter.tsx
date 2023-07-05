"use client";
const Newsletter = () => {
  return (
    <>
      <section className="bg-gray-200 w-full py-[6rem]">
        <div className="container md:grid place-items-center md:p-[3rem]">
          <div className="flex flex-col gap-[1rem] p-8 md:p-[3rem] bg-white text-center">
            <h1 className="font-sans text-3xl font-bold">
              Subscribe for the latest updates
            </h1>
            <p className="text-gray-400 text-md">
              Subscribe to my newsletter and never miss an update every week
            </p>
            <input
              type="text"
              placeholder="email@address.com"
              className="px-[1rem] py-[0.5rem] border-gray-300"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Newsletter;
