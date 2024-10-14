"use client";
import { useState, useEffect } from 'react';
import Card from '../../../../components/card';

export default function AdminMessageWork() {
  const [data, setData] = useState({
    title: '',
    employeType: '',
    companyName: '',
    location: '',
    startDate: '',
    endDate: '',
  });
  
  const [workList, setWorkList] = useState([]); // State to hold the list of work entries

  const optEmployeType = [
    { label: 'Full Time', value: 'full-time' },
    { label: 'Part Time', value: 'part-time' },
    { label: 'Contract', value: 'contract' },
    { label: 'Internship', value: 'internship' },
  ];

  const optLocation = [
    { label: 'Onsite', value: 'onsite' },
    { label: 'WFH', value: 'wfh' },
  ];

  const inputHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  async function onSubmitData() {
    try {
      let res = await fetch('/api/work', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      let resData = await res.json();
      if (!resData.data) {
        throw Error(resData.message);
      }
      alert("Data berhasil disimpan dengan id \n" + resData.data.insertedId);
      fetchWorkList(); // Refresh the list after submission
    } catch (err) {
      console.error("ERR", err.message);
      alert(err.message);
    }
  }

  async function fetchWorkList() {
    try {
      let res = await fetch('/api/work');
      let resData = await res.json();
      setWorkList(resData.data || []); // Update workList with fetched data
    } catch (err) {
      console.error("Failed to fetch work list", err);
    }
  }

  useEffect(() => {
    fetchWorkList(); // Fetch work list when component mounts
  }, []);

  return (
    <>
      

      <Card title="List of Work" style="mt-5">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Employee Type</th>
              <th className="border border-gray-300 p-2">Company Name</th>
              <th className="border border-gray-300 p-2">Location</th>
              <th className="border border-gray-300 p-2">Start Date</th>
              <th className="border border-gray-300 p-2">End Date</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {workList.map((work, index) => (
              <tr key={index}>

                <td className="border border-gray-300 p-2">{work.title}</td>
                <td className="border border-gray-300 p-2">{work.employeType}</td>
                <td className="border border-gray-300 p-2">{work.companyName}</td>
                <td className="border border-gray-300 p-2">{work.location}</td>
                <td className="border border-gray-300 p-2">{work.startDate}</td>
                <td className="border border-gray-300 p-2">{work.endDate}</td>
                <td className="border border-gray-300 p-2">Balas    Arsipkan</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}