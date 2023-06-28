"use client";
import { Timeline } from "flowbite-react";

const Input = ({
  label,
  description,
  placeholder,
  type,
  register,
  name,
  onchange,
  required,
}: Input) => {
  return (
    <>
      <Timeline.Item>
        <Timeline.Point />
        <Timeline.Content>
          <div className="flex flex-col gap-3">
            <label htmlFor="" className="text-md font-sans">
              {label}
            </label>

            <label
              htmlFor="label_description"
              className="text-xs text-gray-400 font-sans"
            >
              {description}
            </label>
            <input
              type={type}
              {...(register && register(name, { required: required }))}
              className="block border-gray-300 border w-full placeholder:text-xs placeholder:text-gray-300 text-xs"
              placeholder={placeholder}
              onChange={onchange}
            />
          </div>
        </Timeline.Content>
      </Timeline.Item>
    </>
  );
};

export default Input;
