"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../firebase/auth";
import { useRouter } from "next/navigation";
import Loader from "../components/loader";
import {
  collection,
  getDocs,
  where,
  query,
  deleteDoc,
  doc,
  query as firestoreQuery, // Rename 'query' to avoid conflict
} from "firebase/firestore";
import { db } from "@/firebase/firebase";

import Link from "next/link";
// React ICONS
import { ToastContainer, toast } from "react-toastify";
import {
  TbX,
  TbSearch,
  TbPencil,
  TbEye,
  TbTrash,
  TbArrowNarrowRight,
  TbArrowNarrowLeft,
  TbHourglass,
  TbPlus,
  TbListSearch,
} from "react-icons/tb";
import { FaSquarePlus } from "react-icons/fa6";
import "react-toastify/dist/ReactToastify.css";

export default function MeasureList() {
  const { authUser, isLoading } = useAuth();
  const router = useRouter();

  const [measurementsList, setMeasurementsList] = useState("");
  // For search in measurements
  const [searchQuery, setSearchQuery] = useState("");
  const [noRecordsFound, setNoRecordsFound] = useState("");
  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push("/userLogin");
    }
    if (!!authUser) {
      fetchMeasurements(authUser.uid);
    }
  }, [authUser, isLoading]);

  const fetchMeasurements = async (uid) => {
    try {
      const q = query(
        collection(db, "measurements"),
        where("owner", "==", uid)
      );

      // Execute the query and get a snapshot of the results.
      const querySnapshot = await getDocs(q);

      // Extract the data from each measurement document and add it to the data array.
      let data = [];
      querySnapshot.forEach((measure) => {
        data.push({ ...measure.data(), id: measure.id });
      });

      // Set the measurements state with the data array.
      setMeasurementsList(data);
    } catch (error) {
      console.error("An error occured", error);
    }
  };
  const deleteMeasurement = async (docId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this measurement?"
    );
    if (isConfirmed) {
      try {
        await deleteDoc(doc(db, "measurements", docId));
        fetchMeasurements(authUser.uid);

        toast.success("Measurement deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (error) {
        console.error("An error occurred", error);

        toast.error("Error deleting measurement. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  // Search function
  const handleSearch = async (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    try {
      const q = firestoreQuery(
        collection(db, "measurements"),
        where("owner", "==", authUser.uid)
      );

      // Execute the query and get a snapshot of the results.
      const querySnapshot = await getDocs(q);

      // Extract the data from each measurement document and add it to the data array.
      let data = [];
      querySnapshot.forEach((measure) => {
        data.push({ ...measure.data(), id: measure.id });
      });

      // Filter measurements based on the search query
      const filteredMeasurements = data.filter(
        (measure) =>
          measure.username.toLowerCase().includes(query) ||
          measure.phone.toLowerCase().includes(query)
      );

      // Set the measurements state with the filtered data array.
      setMeasurementsList(filteredMeasurements);
      // Check if no records found
      if (filteredMeasurements.length === 0) {
        setNoRecordsFound(true);
      } else {
        setNoRecordsFound(false);
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };
  // On Clear Search Input
  const clearSearch = () => {
    setSearchQuery("");
    fetchMeasurements(authUser.uid);
    setNoRecordsFound(false);
  };
  // Pagination code start here
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastPage = Math.ceil(measurementsList.length / recordsPerPage);
  const handleClick = (page) => {
    setCurrentPage(page);
  };
  // Calculate the index of the first and last record to display
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = measurementsList.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <ToastContainer />

      <div className="page-header-group">
        <h1 className="heading1 !mb-0 inline-flex items-center gap-1">
          Customers List
        </h1>
        <div className="block relative mt-2 sm:mt-0 w-full sm:w-auto">
          <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
            <TbSearch />
          </span>
          <input
            placeholder="Search"
            className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
            value={searchQuery}
            onChange={handleSearch}
          />
          <span
            onClick={clearSearch}
            className="h-full absolute inset-y-0 right-0 flex items-center pr-2 z-10 hover:text-red-700 cursor-pointer"
          >
            <TbX />
          </span>
        </div>
      </div>

      {isLoading && (
        <div>
          <Loader />
        </div>
      )}

      {noRecordsFound && (
        <div className="border border-gray-200 flex justify-center items-center flex-col text-center h-[40vh] mt-10">
          <p className="text-5xl text-white mb-6 inline-flex bg-purple-700 rounded-full p-4 shadow-md shadow-gray-500 ">
            <TbListSearch />
          </p>

          <span className="w-full block text-xl font-bold text-red-400">{`No record for this search.`}</span>
          <button className="button-style mt-3" onClick={clearSearch}>
            <TbSearch /> Clear Search
          </button>
        </div>
      )}

      {!isLoading && measurementsList.length > 0 && (
        <>
          <div className=" sm:-mx-8  sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal w-full">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-4/12">
                      Customer
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-4/12">
                      Phone Number
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Created Date
                    </th>
                    <th className="w-[120px] px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.map((measure) => (
                    <tr key={measure.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {measure.username}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {measure.phone}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {measure.date}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex gap-3">
                          <Link
                            className="text-xl text-blue-700"
                            href={"/addMeasure"}
                          >
                            <FaSquarePlus />
                          </Link>
                          <Link
                            className="text-xl text-green-500"
                            href={`/editMeasure/${measure.id}`}
                          >
                            <TbPencil />
                          </Link>
                          <Link
                            className="text-xl text-purple-500"
                            href={`/viewMeasure/${measure.id}`}
                          >
                            <TbEye />
                          </Link>
                          <button
                            className="text-xl text-red-400"
                            onClick={() => deleteMeasurement(measure.id)}
                          >
                            <TbTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-between items-center mb-10">
            <p className="px-5 text-left text-xs font-semibold text-gray-600 uppercase">
              <strong>{measurementsList.length}</strong> Records found
            </p>

            {/* Pagination style code */}

            {/* Pagination */}
            <div className="flex justify-center items-center">
              <button
                onClick={() => handleClick(currentPage - 1)}
                className={`inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100  text-gray-900 rtl:rotate-180 ${
                  currentPage === 1 ? "bg-gray-100" : "bg-white"
                } `}
                disabled={currentPage === 1}
              >
                <TbArrowNarrowLeft />
              </button>
              <div className="inline-flex h-8 mx-1 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 text-sm">
                <span className="mx-2 font-bold">
                  {currentPage} of <strong>{lastPage}</strong>
                </span>
              </div>
              <button
                onClick={() => handleClick(currentPage + 1)}
                className={`inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 ${
                  currentPage === lastPage ? "bg-gray-100" : "bg-white"
                }`}
                disabled={currentPage === lastPage}
              >
                <TbArrowNarrowRight />
              </button>
            </div>
          </div>
        </>
      )}
      {/* {!isLoading && measurementsList.length < 1 && !noRecordsFound && ( */}
      {!isLoading && measurementsList.length < 1 && !noRecordsFound && (
        <div className="border border-gray-200 flex justify-center items-center flex-col text-center h-[40vh] mt-10">
          <p className="text-5xl rotate-45 text-white mb-6 inline-flex bg-purple-700 rounded-full p-4 shadow-md shadow-gray-500 ">
            <TbHourglass />
          </p>
          <span className="w-full block text-xl font-bold text-red-400">{`You don't have any Measurements`}</span>
          <Link className="button-style mt-3" href={"/addMeasure"}>
            <TbPlus /> Add Measurements
          </Link>
        </div>
      )}
    </>
  );
}
