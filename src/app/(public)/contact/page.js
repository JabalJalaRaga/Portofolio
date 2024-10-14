"use client"
import { useState, useEffect } from 'react'

const ItemCard = ({ label, value }) => {
    return (
        <div className='flex gap-4 bg-white  rounded-md my-2 p-2'>
            <div>{label}</div>
            <div>{value}</div>
        </div>
    )

}

export default function Contact() {
    const [data, setData] = useState({
        Nama: "",
        Email: "",
        Subject: "",
        Message: ""
        // locationType: "",
        // currentRole: "",
        // start_date: "",
        // end_date: "",
    });
    const [isLoading, setLoading] = useState(true)

    async function onLoadData() {
        setLoading(true)
        let res = await fetch('/api/contact')
        let data = await res.json()
        setData(data)
        setLoading(false)
    }

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
    useEffect(() => {
        onLoadData()
    }, [])

    return (
        <>
            <h2 className="text-center text-3xl w-full">Contact US</h2>

            <p className="text-center margin-0 mx-auto w-2/3	">
                This is page contact us. If you want to send us message, please write on the below.
            </p>

            <div className="md:flex mt-16">
                <form onSubmit={onSubmitData}>
                    <div className="w-full md:w-3/4 px-4 ">
                        <div className=" bg-white p-10  rounded-xl">
                            <h3 className="text-2xl py-2">Leave a message</h3>
                            <div className="w-ful md:flex gap-6">
                                <div className="w-full my-2">
                                    <label>Name</label>
                                    <input name='Nama' type="text" onChange={inputHandler} className="w-full border my-input-text" required />
                                </div>
                                <div className="w-full my-2">
                                    <label>Email</label>
                                    <input name='Email' type="text" onChange={inputHandler} className="w-full border my-input-text" required />
                                </div>
                            </div>
                            <div className="w-full my-2">
                                <label>Subject</label>
                                <input name='Subject' type="text" onChange={inputHandler} className="my-input-text w-full" required />
                            </div>
                            <div className="w-full">
                                <label>Message</label>
                                <textarea name='Message' onChange={inputHandler} className="border my-input-text w-full" required ></textarea>
                            </div>
                            <div className="w-full py-2">
                                <button type="submit" className="mx-1 h-9 items-center justify-center px-4  rounded-md bg-amber-500">
                                    <label>Send Message</label>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="w-full md:w-1/3 px-4">

                    {
                        !isLoading && Object.keys(data.location).map(key => {
                            return <ItemCard label={key} value={data.location[key]} key={key} />
                        })
                    }

                    {
                        !isLoading && Object.keys(data.phone).map(key => {
                            return <ItemCard label={key} value={data.phone[key]} key={key} />
                        })
                    }

                    {
                        !isLoading && Object.keys(data.social).map(key => {
                            return <ItemCard label={key} value={data.social[key]} key={key} />
                        })
                    }
                </div>
            </div>
        </>
    );
}