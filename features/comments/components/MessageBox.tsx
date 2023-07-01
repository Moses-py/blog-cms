const MessageBox = () => {
  return (
    <div className="w-full">
      <div className="rounded-xl border border-gray-300 w-full ">
        <textarea
          name="Comment"
          id="comment_box"
          rows={5}
          placeholder="write a comment..."
          className="border-none placeholder:text-gray-500 py-5 w-full rounded-xl outline-none ring-transparent focus:outline-none focus:ring-transparent"
        />
        <div className="flex justify-end items-end p-5 border-t border-t-gray-300 bg-gray-100">
          <button className="bg-primary rounded-md px-[17px] py-[10px] text-white text-xs font-semibold">
            Post comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
