import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { TbXboxX } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';


const LendPageCard = ({user}) => {
  const navigate = useNavigate();
  const Base_Url = import.meta.env.VITE_BASE_URL;
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm();
    
    const onSubmit = async(data)=>{
        const campaignData = {
            title: data.title,
            description: data.description,
            category: data.category,
            goal: data.goal,
            images: data.images,
            deadline: data.deadline,
            creatorId: user._id
        }
        await axios.post(`${Base_Url}/campaign/campaignadd`,campaignData).then((res)=>{
            console.log(res)
            toast.success(res.data.message);
            setTimeout(() => {
              navigate(`/campaign?id=${res.data.campaignId}`);
            }, (2000));
        }).catch((err)=>{
          toast.error(err.response.data.message);
        })
    }
    const options = [
      "Medical",
      "Memorials",
      "Non-Profit",
      "Education",
      "Emergencies",
      "Children",
      "Animal",
      "Sports",
      "Community",
      "Elderly",
      "Art & Media",
      "Women",
      "Technology",
      "Environment",
      "Social Entrepreneurship",
      "Human Rights",
      "Rural Development",
      "Livelihood",
      "Loans",
      "Construction",
      "Others",
    ];
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (e) => {
    const input = e.target.value;
    setQuery(input);
    setValue("category",input)

    if (input.trim() === "") {
      setShowDropdown(false);
      setFiltered([]);
    } else {
      const matches = options.filter((item) =>
        item.toLowerCase().includes(input.toLowerCase())
      );
      setFiltered(matches);
      setShowDropdown(true);
    }
  };

  const handleSelect = (value) => {
    setQuery(value);
    setValue("category", value);
    setShowDropdown(false);
  };

  const [minDate,setMinDate] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  useEffect(()=>{
    const today = new Date();
    today.setDate(today.getDate()+10);
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    setMinDate(`${yyyy}-${mm}-${dd}`);
  },[])
  const handleChangeDate = (e) => {
    const value = e.target.value;
    if (value < minDate) {
      alert("Please select a date 10 days from today or later.");
      setSelectedDate(""); // Reset if invalid
    } else {
      setSelectedDate(value);
    }
  };

  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (files) => {
    setUploading(true);
    const urls = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Crowd_fund_user_images"); 
      formData.append("cloud_name", "dgs40un2h"); 

      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dgs40un2h/image/upload", 
          formData
        );
        urls.push(res.data.url);
      } catch (err) {
        // console.error("Upload failed:", err);
        toast.error("Upload Failed");
      }
    }

    setImages(urls);
    // console.log(urls)
    setUploading(false);
};

useEffect(() => {
        setValue("images", images);
}, [images, setValue]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    handleUpload(files);
  };

    const handleDelete = (indexToRemove) => {
    setImages((prevImages) =>
        prevImages.filter((_, index) => index !== indexToRemove)
    );
    };


  return (
    <div className='rounded-xl shadow-md bg-gray-300 w-4/5 p-2 h-fit flex flex-col items-center gap-10 justify-evenly hover:shadow-lg transition-all duration-200'>
        <div className='flex items-center justify-center py-3 bg-gray-400 rounded-xl shadow-md px-2'>
            <h1 className='text-2xl'>Please Enter the details about your Campaign</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-10'>
            <div className='flex justify-evenly items-center text-xl'>
                <h2>Please Enter the title of the Campaign</h2>
                <div className='relative'>
                    <input
                      autoComplete="off"
                      id="title"
                      name="title"
                      type="text"
                      className="peer placeholder-transparent h-16 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Name"
                      {...register("title",{required:true})}
                    />
                    <label
                      htmlFor="title"
                      className="absolute -left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Title
                    </label>
                </div>
            </div>
            <div className='flex justify-evenly items-center text-xl'>
                <h2>Please Enter about the Campaign</h2>
                <div className='relative'>
                    <textarea
                      autoComplete="off"
                      id="description"
                      name="description"
                      type="text"
                      className="peer placeholder-transparent h-16 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="description"
                      {...register("description",{required:true})}
                    />
                    <label
                      htmlFor="description"
                      className="absolute -left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      About
                    </label>
                </div>
            </div>
            <div className='flex justify-evenly items-center text-xl'>
                <div className='flex flex-col gap-5 items-center justify-evenly'>
                    <h2>Please select the category of the Campaign</h2>
                    <div className="relative  mx-auto">
                        <input
                            id='category'
                            name='category'
                            type="text"
                            value={query}
                            onChange={handleChange}
                            onFocus={() => query && setShowDropdown(true)}
                            className="peer placeholder-transparent h-16 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                            placeholder="Search..."
                        />
                        {showDropdown && filtered.length > 0 && (
                            <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                            {filtered.map((item, idx) => (
                                <li
                                key={idx}
                                onClick={() => handleSelect(item)}
                                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                                >
                                {item}
                                </li>
                            ))}
                            </ul>
                        )}
                        <label htmlFor="category"  className="absolute -left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                            Category
                        </label>
                    </div>
                </div>
                <div className='flex flex-col gap-5 items-center justify-evenly'>
                    <h2>Please Enter the total amount you want to be raised</h2>
                    <div className='relative'>
                        <input type="text" id='goal' name='goal' placeholder='goal' className='peer placeholder-transparent h-16 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600' 
                        {...register("goal",{require:true})}
                        />
                        <label
                        htmlFor="goal"
                        className="absolute -left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                        Goal
                        </label>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-evenly text-xl'>
                <div className='flex flex-col gap-5 items-center justify-evenly'>
                    <h2>Please Enter the deadline for the Campaign</h2>
                    <div className='relative'>
                        <input type="date" id='date' name='date' className='peer placeholder-transparent h-16 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600' 
                        {...register("deadline",{required:true})}
                        />
                        <label className="absolute -left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm" htmlFor="date">Select Date</label>
                    </div>
                </div>
                <div className='flex flex-col gap-5 items-center justify-evenly'>
                    <h2>Please Upload Some photos of the Campaign</h2>
                    <div className='relative'>
                        <input
                            id='images'
                            name='images'
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                            className="peer placeholder-transparent text-center py-2 text-md font-bold h-16 w-full text-lg border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        />
                        <label className="absolute -left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm" htmlFor="images">
                            Select the images
                        </label>
                        {uploading && <p>Uploading...</p>}
                        <div className="flex justify-evenly items-center flex-wrap">
                            {images.map((url, index) => (
                                <div
                                    key={index}
                                    className={`relative h-8 w-8 rounded-md`}
                                    style={{
                                        backgroundImage:`url(${url})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                >
                                    <button
                                    onClick={() => handleDelete(index)}
                                    className="absolute right-0 text-white bg-black/50 p-1 rounded-full hover:bg-black"
                                    >
                                    <TbXboxX size={8} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-center py-2 px-3 text-xl'>
                <button className="cursor-pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2">
                    Submit
                </button>
            </div>
        </form>
    </div>
  )
}

export default LendPageCard
