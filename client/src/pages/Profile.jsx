import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../redux/user/userSlice";
import { app } from "../firebase";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imgPercent, setImgPercent] = useState(0);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (image) {
      handleImageUpload(image);
    }
  }, [image]);

  const handleImageUpload = async () => {
    const storage = getStorage(app);
    const imageName = new Date().getTime() + image.name;
    const storageRef = ref(storage, imageName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgPercent(Math.round(progress));
      },
      (error) => {
        setImageUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleUserDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData?.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {imageUploadError ? (
            <span className="text-rose">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : imgPercent > 0 && imgPercent < 100 ? (
            <span className="text-stoneBold">{`Uploading ${imgPercent}%`}</span>
          ) : imgPercent === 100 ? (
            <span className="text-green">Image updated successfully!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          onChange={handleChange}
          placeholder="username"
          defaultValue={currentUser.username}
          id="username"
          className="border-bgColorLight p-3 rounded-lg focus:outline-none mt-4"
        />
        <input
          onChange={handleChange}
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          className="border-bgColorLight p-3 rounded-lg focus:outline-none"
        />
        <input
          type="password"
          onChange={handleChange}
          placeholder="password"
          id="password"
          className="border-bgColorLight p-3 rounded-lg focus:outline-none"
        />
        <button
          disabled={loading}
          className="bg-slate text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleUserDelete} className="text-rose cursor-pointer">
          Delete account
        </span>
        <span className="text-rose cursor-pointer">Sign out</span>
      </div>
      <p className="text-rose mt-5">{error ? error : ""}</p>
      <p className="text-green mt-5">
        {updateSuccess ? "User updated successfully!" : ""}
      </p>
    </div>
  );
}
