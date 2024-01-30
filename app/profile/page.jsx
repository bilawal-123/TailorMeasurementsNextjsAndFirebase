"use client";
import { useContext } from "react";
import ShopContext from "@/app/components/context";
import { useEffect, useState } from "react";
import { useAuth } from "../../firebase/auth";
import { useRouter } from "next/navigation";
import Loader from "../components/loader";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { ShopProvider } from "@/app/components/context";
import { TbPencil, TbTrash } from "react-icons/tb";
import { IoIosArrowRoundBack, IoIosSave } from "react-icons/io";
import { FaSquarePlus } from "react-icons/fa6";
import { RiUserAddFill } from "react-icons/ri";

const fetchProfiles = async (authUser, setProfiles, setShowAddProfile) => {
  if (!!authUser) {
    const profilesCollection = collection(db, "profile");
    const querySnapshot = await getDocs(
      query(profilesCollection, where("owner", "==", authUser.uid))
    );

    const profilesData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setProfiles(profilesData);

    if (profilesData.length > 0) {
      setShowAddProfile(false);
    }
  }
};

export default function Profile() {
  const router = useRouter();
  const { authUser, isLoading } = useAuth();
  const [errorMessage, setErrorMessage] = useState();
  const [shopName, setShopName] = useState("");
  const [shopOwner, setShopOwner] = useState("");
  const currentDate = new Date().toLocaleDateString("en-GB");
  const [profiles, setProfiles] = useState([]);
  const [showAddProfile, setShowAddProfile] = useState(false);
  // variables Edit/Update Profile
  const [editForm, setEditForm] = useState(false);
  const [editShopName, setEditShopName] = useState("");
  const [editShopOwner, setEditShopOwner] = useState("");
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const shop = useContext(ShopContext);
  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push("/userLogin");
    }
    if (!!authUser) {
      // Call fetchProfiles using the defined function
      fetchProfiles(authUser, setProfiles, setShowAddProfile);
    }
    if (profiles.length > 0) {
      const firstProfile = profiles[0];
      shop.setShopNameContext(firstProfile.shopName);
      shop.setShopOwnerContext(firstProfile.shopOwner);
    }
  }, [authUser, isLoading, profiles]);

  const addProfile = async (e) => {
    e.preventDefault();
    if (!shopName || !shopOwner) {
      setErrorMessage("Please fill all required fields");
      return;
    }
    try {
      const docRef = addDoc(collection(db, "profile"), {
        owner: authUser.uid,
        shopName,
        shopOwner,
        date: currentDate,
      });
      toast.success("Measurement added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      router.push("/profile");
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Error adding measurement. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      // Call fetchProfiles after adding a new profile
      fetchProfiles(authUser, setProfiles, setShowAddProfile);
    }
  };

  const editProfile = (profileId) => {
    const selectedProfile = profiles.find(
      (profile) => profile.id === profileId
    );
    if (selectedProfile) {
      setEditShopName(selectedProfile.shopName);
      setEditShopOwner(selectedProfile.shopOwner);
      setSelectedProfileId(profileId);
      setEditForm(true);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "profile", selectedProfileId), {
        shopName: editShopName,
        shopOwner: editShopOwner,
      });

      toast.success("Profile updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setEditForm(false);
      setSelectedProfileId(null);

      // Call fetchProfiles after updating a profile
      fetchProfiles(authUser, setProfiles, setShowAddProfile);
      router.push("/profile");
    } catch (error) {
      console.error("Error updating profile: ", error);
      toast.error("Error updating profile. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const deleteProfile = async (id) => {
    if (!id) {
      console.error("Selected profile ID is null or undefined.");
      return;
    }
    // Confirm deletion with the user
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this profile?"
    );

    if (!confirmDeletion) {
      return;
    }
    try {
      await deleteDoc(doc(db, "profile", id));

      toast.success("Profile deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Reset edit form and selected profile
      setEditForm(false);
      setSelectedProfileId(null);
      setShowAddProfile(true);
      // Call fetchProfiles after deleting a profile
      fetchProfiles();
      router.push("/profile");
    } catch (error) {
      console.error("Error deleting profile: ", error);
      toast.error("Error deleting profile. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const Cancel = () => {
    setEditForm(false);
    setShowAddProfile(false);
  };
  return !authUser ? (
    <Loader />
  ) : (
    <div className="">
      <div className="page-header-group">
        <h1 className="heading1">Profile</h1>
        <div className="flex gap-3">
          {editForm && (
            <button onClick={Cancel} className="button-default">
              <IoIosArrowRoundBack />
              Cancel
            </button>
          )}
          {profiles.length > 0 && !editForm && (
            <button
              className="button-edit"
              onClick={() => editProfile(profiles[0].id)}
            >
              <TbPencil />
              Edit Profile
            </button>
          )}
          {profiles.length > 0 && editForm && (
            <button onClick={updateProfile} className="button-edit">
              <IoIosSave /> Update Profile
            </button>
          )}
          {showAddProfile && (
            <button onClick={addProfile} className="button-style">
              <RiUserAddFill className="text-lg" /> Add Profile
            </button>
          )}
          {profiles.length > 0 && !editForm && (
            <button
              onClick={() => deleteProfile(profiles[0].id)}
              className="button-delete"
            >
              <TbTrash />
              Delete Profile
            </button>
          )}
        </div>
      </div>
      <ToastContainer />

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {showAddProfile && (
        <form>
          <div className="box-style">
            <h2 className="heading2">Personal Info</h2>
            <div className="personal-detail-box">
              <div>
                <label className="label-style">
                  Shop Name <span className="asterisk">*</span>
                </label>
                <input
                  className="input-style"
                  type="text"
                  placeholder="Shop Name"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                />
              </div>
              <div>
                <label className="label-style">
                  Shop Owner Name <span className="asterisk">*</span>
                </label>
                <input
                  className="input-style"
                  type="text"
                  placeholder="Shop Owner Name"
                  value={shopOwner}
                  onChange={(e) => setShopOwner(e.target.value)}
                />
              </div>

              <div>
                <label className="label-style">Date</label>
                <input
                  className="block mb-1 min-h-[auto] border border-slate-600 w-full  bg-gray-100 px-3 py-[0.32rem] leading-[1.6] outline-none focus:border-teal-700"
                  type="text"
                  value={currentDate}
                  readOnly // Make it read-only to prevent user input
                />
              </div>
            </div>
          </div>
          {/* <div className="text-right mt-4 mb-10">
            <button onClick={addProfile} className="button-style">
              Add Profile
            </button>
          </div> */}

          {/* Display the selected profile if editing */}
        </form>
      )}
      {/* Edit Profile Code Here */}
      {profiles.length > 0 && editForm && (
        <form>
          <div className="box-style">
            <h2 className="heading2">Update Personal Info</h2>
            <div className="personal-detail-box">
              <div>
                <label className="label-style">
                  Update Shop Name <span className="asterisk">*</span>
                </label>
                <input
                  className="input-style"
                  type="text"
                  placeholder="Shop Name"
                  value={editShopName}
                  onChange={(e) => setEditShopName(e.target.value)}
                />
              </div>
              <div>
                <label className="label-style">
                  Update Shop Owner Name <span className="asterisk">*</span>
                </label>
                <input
                  className="input-style"
                  type="text"
                  placeholder="Shop Owner Name"
                  value={editShopOwner}
                  onChange={(e) => setEditShopOwner(e.target.value)}
                />
              </div>
              <div>
                <label className="label-style">Date</label>
                <input
                  className="block mb-1 min-h-[auto] border border-slate-600 w-full  bg-gray-100 px-3 py-[0.32rem] leading-[1.6] outline-none focus:border-teal-700"
                  type="text"
                  value={currentDate}
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Display the selected profile if editing */}
        </form>
      )}
      {profiles.length > 0 && !editForm && (
        <div className="mt-6">
          <div className="box-style">
            <h2 className="heading2">Shop Details</h2>
            {profiles.map((profile) => (
              <div className="personal-detail-box" key={profile.id}>
                <div>
                  <span className="label-style">
                    Shop Name <span className="asterisk">*</span>
                  </span>
                  <p>{shop.shopNameContext}</p>
                </div>
                <div>
                  <span className="label-style">Shop Owner</span>
                  <p> {shop.shopOwnerContext}</p>
                </div>

                <div>
                  <span className="label-style">Date</span>
                  <p>{profile.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
