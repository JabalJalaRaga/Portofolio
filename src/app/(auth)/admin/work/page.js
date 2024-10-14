"use client";
import { useState } from "react";
import Card from "../../../../components/card";

export default function AdminWork() {
  const [data, setData] = useState({
    title: "",
    employeeType: "",
    companyName: "",
    location: "",
    locationType: "",
    currentRole: "",
    start_date: "",
    end_date: "",
  });

  const optEmployeeType = [
    { label: "Full-Time", value: "full-time" },
    { label: "Part Time", value: "part-time" },
    { label: "Contract", value: "contract" },
    { label: "Internship", value: "internship" },
  ];

  const optLocation = [
    { label: "Onsite", value: "onsite" },
    { label: "WFH", value: "wfh" },
  ];

  const inputHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  async function onSubmitData(e) {
    e.preventDefault(); // Prevent form submission without validation
    try {
      let res = await fetch("/api/message", {
        method: "POST",
        body: JSON.stringify(data),
      });
      let resData = await res.json();
      if (!resData.data) {
        throw Error(resData.message);
      }
      alert("Data berhasil disimpan dengan id \n" + resData.data.insertedId);
    } catch (err) {
      console.error("ERR", err.message);
      alert(err.message);
    }
  }

  return (
    <>
      <div className="bg-white p-10 w-4/5 mx-auto rounded-lg shadow-lg">
        <h1 className="text-2xl mb-3">ADD Experience</h1>
        <h2 className="text-sm mb-8 text-gray-600">* Indicates Required</h2>

        <form onSubmit={onSubmitData}>
          <div className="mb-5">
            <label htmlFor="title" className="block mb-1 font-semibold">
              Title*
            </label>
            <input
              type="text"
              name="title"
              onChange={inputHandler}
              className="border border-gray-300 rounded w-full p-2"
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="employmentType"
              className="block mb-1 font-semibold"
            >
              Employment Type*
            </label>
            <select
              name="employeeType"
              onChange={inputHandler}
              className="border border-gray-300 rounded w-full p-2"
              required
            >
              <option value="" disabled selected>
                Employment Type
              </option>
              {optEmployeeType &&
                optEmployeeType.map((item, key) => (
                  <option key={key} value={item.value}>
                    {item.label}
                  </option>
                ))}
            </select>
          </div>

          <div className="mb-5 flex items-center">
            <span className="flex-none">Learn more about</span>
            <a href="#" className="flex-initial text-cyan-400 ml-1 underline">
              Employment Types.
            </a>
          </div>

          <div className="mb-5">
            <label htmlFor="companyName" className="block mb-1 font-semibold">
              Company Name*
            </label>
            <input
              type="text"
              name="companyName"
              onChange={inputHandler}
              placeholder="Ex: Microsoft"
              className="border border-gray-300 rounded w-full p-2"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="location" className="block mb-1 font-semibold">
              Location*
            </label>
            <input
              type="text"
              name="location"
              onChange={inputHandler}
              placeholder="Ex: London, United Kingdom"
              className="border border-gray-300 rounded w-full p-2"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="locationType" className="block mb-1 font-semibold">
              Location Type*
            </label>
            <select
              name="locationType"
              onChange={inputHandler}
              className="border border-gray-300 rounded w-full p-2"
              required
            >
              <option value="" disabled selected>
                Location Type
              </option>
              {optLocation &&
                optLocation.map((item, key) => (
                  <option key={key} value={item.value}>
                    {item.label}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex mb-5 items-center">
            <input
              type="checkbox"
              name="currentRole"
              onChange={inputHandler}
              className="mr-2"
            />
            <label htmlFor="currentRole" className="font-semibold">
              I am currently working in this role
            </label>
          </div>

          <div className="mb-5">
            <label htmlFor="start_date" className="block mb-1 font-semibold">
              Start Date*
            </label>
            <input
              type="date"
              name="start_date"
              onChange={inputHandler}
              className="border border-gray-300 rounded w-full p-2"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="end_date" className="block mb-1 font-semibold">
              End Date
            </label>
            <input
              type="date"
              name="end_date"
              onChange={inputHandler}
              className="border border-gray-300 rounded w-full p-2"
            />
          </div>

          <div className="mb-5">
            <button
              type="submit"
              className="border w-full bg-cyan-400 text-white h-10 rounded-full transition duration-200 hover:bg-cyan-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <Card title="List Of Work" style="mt-5">
        List
      </Card>
    </>
  );
}
