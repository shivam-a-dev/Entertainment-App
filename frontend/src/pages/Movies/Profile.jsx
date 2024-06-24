import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import Loader from "react-js-loader";
import { useUploadProfilePicMutation } from '../../redux/api/usersApi';

function Profile() {
  


  const { userInfo } = useSelector((state) => state.auth);
 

  const [img, setImg] = useState(null);
  const [uploadProfilePic, {isLoading: uploading}] = useUploadProfilePicMutation();



  useEffect(() => {
  
    if (userInfo && userInfo.profilePic) {    
      setImg(`data:image/jpeg;base64,${userInfo.profilePic}`);
    }
      
    
  }, [userInfo]);



  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('profilePic', file);
    try {
      await uploadProfilePic(formData);
   
    } catch (error) {
      console.log(error);
    }
  };

  const handleIconClick = () => {
    document.getElementById('file-upload').click();
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-slate-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Profile Page</h2>
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            {img ? (
                uploading ? <Loader type="spinner" bgColor="#fff" color="#000" size={50} /> :
              <img
                src={img}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
            <button
              onClick={handleIconClick}
              className="absolute bottom-0 right-0 p-2 bg-gray-800 text-white rounded-full"
            >
              <FaEdit />
            </button>
          </div>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <p className="text-gray-400">{userInfo.email}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
