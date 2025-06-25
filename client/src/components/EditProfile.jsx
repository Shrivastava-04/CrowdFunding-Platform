import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.name || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [email, setEmail] = useState(user.email || "");
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState(user.phoneNumber || "");
  const [profilePic, setProfilePic] = useState(user.image || null);
  const [isUploading, setIsUploading] = useState(false);
  const Base_Url = import.meta.env.VITE_BASE_URL;

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true); // start uploading

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Crowd_fund_user_images");
    data.append("cloud_name", "dgs40un2h");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dgs40un2h/image/upload", {
        method: "POST",
        body: data
      });

      const updatedImageURL = await res.json();
      setProfilePic(updatedImageURL.url);
    } catch (err) {
      console.error("Upload failed", err);
      alert("Image upload failed.");
    } finally {
      setIsUploading(false); // done uploading
    }
  };

  const handleSave = async () => {
    const formData = {
      name: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phone,
      image: profilePic
    };

    try {
      const res = await axios.put(
        `${Base_Url}/user/updateuser/${user._id}`,
        formData
      );
      console.log("User updated:", res.data);
      toast.success("Profile updated successfully!");
      setTimeout(() => {
        window.location.reload()
      }, 2000);
    } catch (err) {
      console.error("Error updating user:", err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 border rounded-md shadow-sm p-6 bg-white">
      <Toaster/>
      <h2 className="text-2xl font-semibold flex items-center mb-4">
        <i className="mr-2">✏️</i> Edit Profile
      </h2>

      {/* Profile details accordion */}
      <div className="border rounded mb-4">
        <div className="bg-gray-100 px-4 py-2 font-medium">
          Profile details
        </div>
        <div className="p-4 space-y-4">
          <div className="flex flex-col">
            <label>First name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border-b p-1 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label>Last name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border-b p-1 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label>Registered Email</label>
            <input
              type="email"
              value={email}
              disabled
              className="border-b p-1 bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col">
            <label>Phone number</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="w-16 border p-1 text-center"
              />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 border-b p-1 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label>Change Profile Picture</label>
            <div className="flex items-center gap-4 mt-2">
              <label className="flex items-center bg-gray-200 px-4 py-2 rounded-md cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  className="hidden"
                />
                <span className="text-white bg-[#8B1C37] px-3 py-1 rounded">Choose file</span>
              </label>
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-lg font-semibold">
                {profilePic ? (
                  <img src={profilePic} alt="Profile" className="rounded-full w-12 h-12 object-cover" />
                ) : (
                  firstName.charAt(0).toUpperCase()
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save button */}
      <div className="text-center">
        <button
          onClick={handleSave}
          className={`px-8 py-2 rounded-full transition cursor-pointer
             ${
            isUploading || !profilePic
              ? "bg-gray-400 "
              : "bg-[#8B1C37] hover:bg-[#a82b48] text-white"
          }`}
        >
          {isUploading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin border-2 border-white border-t-transparent rounded-full h-4 w-4" />
              Uploading...
            </div>
          ) : (
            "💾 Save"
          )}
        </button>
      </div>
    </div>
  );
};

export default EditProfile;

// import axios from 'axios';
// import React, { useState } from 'react';

// const EditProfile = ({user}) => {
//   const [firstName, setFirstName] = useState(user.name||"");
//   const [lastName, setLastName] = useState(user.lastName||"");
//   const [email, setEmail] = useState(user.email||"");
//   const [countryCode, setCountryCode] = useState('+91');
//   const [phone, setPhone] = useState(user.phoneNumber||"");
//   const [profilePic, setProfilePic] = useState(user.image||null);

//   const handleProfilePicChange = async (e) => {
//     const file = e.target.files[0];
    
//     const data = new FormData();
//     data.append("file",file);
//     data.append("upload_preset","Crowd_fund_user_images");
//     data.append("cloud_name","dgs40un2h");
    
//     const res = await fetch("https://api.cloudinary.com/v1_1/dgs40un2h/image/upload",{
//         method:"POST",
//         body: data
//     })

//     const updatedImageURL = await res.json();
//     console.log(updatedImageURL.url);
//     setProfilePic(updatedImageURL.url)
//   };

//   const handleSave = async () => {
//     const formData = {
//         name:firstName,
//         lastName:lastName,
//         email:email,
//         phoneNumber:phone,
//         image:profilePic
//     }

//     try {
//       const res = await axios.put(
//         `http://localhost:4001/user/updateuser/${user._id}`,
//         formData
//       );
//       console.log("User updated:", res.data);
//       alert("Profile updated successfully!");
//     } catch (err) {
//       console.error("Error updating user:", err);
//       alert("Failed to update profile");
//     }
//     // console.log({ firstName, lastName, email, countryCode, phone });
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-10 border rounded-md shadow-sm p-6 bg-white">
//       <h2 className="text-2xl font-semibold flex items-center mb-4">
//         <i className="mr-2">✏️</i> Edit Profile
//       </h2>

//       {/* Profile details accordion */}
//       <div className="border rounded mb-4">
//         <div className="bg-gray-100 px-4 py-2 font-medium">
//           Profile details
//         </div>
//         <div className="p-4 space-y-4">
//           <div className="flex flex-col">
//             <label>First name</label>
//             <input
//               type="text"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               className="border-b p-1 focus:outline-none"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label>Last name</label>
//             <input
//               type="text"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               className="border-b p-1 focus:outline-none"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label>Registered Email</label>
//             <input
//               type="email"
//               value={email}
//               disabled
//               className="border-b p-1 bg-gray-100 cursor-not-allowed"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label>Phone number</label>
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 value={countryCode}
//                 onChange={(e) => setCountryCode(e.target.value)}
//                 className="w-16 border p-1 text-center"
//               />
//               <input
//                 type="text"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 className="flex-1 border-b p-1 focus:outline-none"
//               />
//             </div>
//           </div>

//           <div className="flex flex-col">
//             <label>Change Profile Picture</label>
//             <div className="flex items-center gap-4 mt-2">
//               <label className="flex items-center bg-gray-200 px-4 py-2 rounded-md cursor-pointer">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleProfilePicChange}
//                   className="hidden"
//                 />
//                 <span className="text-white bg-[#8B1C37] px-3 py-1 rounded">Choose file</span>
//               </label>
//               <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-lg font-semibold">
//                 {profilePic ? (
//                   <img src={profilePic} alt="Profile" className="rounded-full w-12 h-12 object-cover" />
//                 ) : (
//                   firstName.charAt(0).toUpperCase()
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Save button */}
//       <div className="text-center">
//         <button
//           onClick={handleSave}
//           className="bg-[#8B1C37] text-white px-8 py-2 rounded-full hover:bg-[#a82b48] transition"
//         >
//           💾 Save
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EditProfile;
