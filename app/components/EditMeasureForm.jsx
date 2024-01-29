"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import Loader from "./loader";
import { TbDeviceFloppy } from "react-icons/tb";
import { IoIosSave } from "react-icons/io";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function EditMeasureForm() {
  const router = useRouter();
  const { id } = useParams();
  const [measure, setMeasure] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // User data values
  const [newUsername, setNewUsername] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newCast, setNewCast] = useState("");
  const currentDate = new Date().toLocaleDateString("en-GB");

  // +++++++++++++++++++++++++++ Entities for Shirt/Qameez +++++++++++++++++++++++++++
  const [newShirtLambai, setNewShirtLambai] = useState("");
  const [newShirtBazu, setNewShirtBazu] = useState("");

  // Coller Entities
  const [newShirtCollerType, setNewShirtCollerType] = useState("");
  const [newShirtCollerSize, setNewShirtCollerSize] = useState("");
  const [newShirtCollerChorai, setNewShirtCollerChorai] = useState("");
  const [newShirtCollerStyle, setNewShirtCollerStyle] = useState("");
  const [newShirtBanLambai, setNewShirtBanLambai] = useState("");
  const [newShirtBanChorai, setNewShirtBanChorai] = useState("");
  const [newShirtBanStyle, setNewShirtBanStyle] = useState("");
  const [newShirtMaghziSize, setNewShirtMaghziSize] = useState("");

  // KAF Entities
  const [newShirtKafSize, setNewShirtKafSize] = useState("");
  const [newShirtKafStyle, setNewShirtKafStyle] = useState("");
  const [newShirtKafDetail, setNewShirtKafDetail] = useState("");

  const [newShirtSidePocket, setNewShirtSidePocket] = useState("");
  const [newShirtTera, setNewShirtTera] = useState("");
  const [newShirtKandha, setNewShirtKandha] = useState("");
  const [newShirtFrontPocket, setNewShirtFrontPocket] = useState("");
  const [newShirtDaman, setNewShirtDaman] = useState("");
  const [newShirtChati, setNewShirtChati] = useState("");
  const [newShirtKamar, setNewShirtKamar] = useState("");
  const [newShirtGhera, setNewShirtGhera] = useState("");
  const [newShirtNotes, setNewShirtNotes] = useState("");

  // +++++++++++++++++++++++++++ Entities for Pent Shalwar +++++++++++++++++++++++++++
  const [newPentSize, setNewPentSize] = useState("");
  const [newPentGheer, setNewPentGheer] = useState("");
  const [newPentPancha, setNewPentPancha] = useState("");
  const [newPentPanchaStyle, setNewPentPanchaStyle] = useState("");
  const [newPentStyle, setNewPentStyle] = useState("");
  const [newPentPocket, setNewPentPocket] = useState("");
  const [newPentNotes, setNewPentNotes] = useState("");

  useEffect(() => {
    const fetchMeasure = async () => {
      try {
        const measureDoc = await getDoc(doc(db, "measurements", id));
        const measureData = measureDoc.data();

        if (measureDoc.exists()) {
          // const measureData = measureDoc.data(); // Define measureData here
          setMeasure(measureData);
          setNewUsername(measureData.username);
          setNewPhone(measureData.phone);
          setNewCast(measureData.cast);

          // +++++++++++++++++++++++++++ Entities for Shirt/Qameez +++++++++++++++++++++++++++
          setNewShirtLambai(measureData.shirtLambai);
          setNewShirtBazu(measureData.shirtBazu);

          // Collar Entities
          setNewShirtCollerType(measureData.shirtCollerType);
          setNewShirtCollerChorai(measureData.shirtCollerChorai);
          setNewShirtCollerSize(measureData.shirtCollerSize);
          setNewShirtCollerStyle(measureData.shirtCollerStyle);
          setNewShirtBanLambai(measureData.shirtBanLambai);
          setNewShirtBanChorai(measureData.shirtBanChorai);
          setNewShirtBanStyle(measureData.shirtBanStyle);
          setNewShirtMaghziSize(measureData.shirtMaghziSize);

          // KAF Entities
          setNewShirtKafSize(measureData.shirtKafSize);
          setNewShirtKafStyle(measureData.shirtKafStyle);
          setNewShirtKafDetail(measureData.shirtKafDetail);

          setNewShirtSidePocket(measureData.shirtSidePocket);
          setNewShirtTera(measureData.shirtTera);
          setNewShirtKandha(measureData.shirtKandha);
          setNewShirtFrontPocket(measureData.shirtFrontPocket);
          setNewShirtDaman(measureData.shirtDaman);
          setNewShirtChati(measureData.shirtChati);
          setNewShirtKamar(measureData.shirtKamar);
          setNewShirtGhera(measureData.shirtGhera);
          setNewShirtNotes(measureData.shirtNotes);

          // +++++++++++++++++++++++++++ Entities for Pent Shalwar +++++++++++++++++++++++++++
          setNewPentSize(measureData.pentSize);
          setNewPentGheer(measureData.pentGheer);
          setNewPentPancha(measureData.pentPancha);
          setNewPentPanchaStyle(measureData.pentPanchaStyle);
          setNewPentStyle(measureData.pentStyle);
          setNewPentPocket(measureData.pentPocket);
          setNewPentNotes(measureData.pentNotes);
        } else {
          console.error("Measurement not found");
          // You might want to handle this case differently, e.g., redirecting or showing an error message
        }
      } catch (error) {
        console.error("Error fetching measurement: ", error);
      }
    };

    fetchMeasure();
  }, [id]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    // Add the same required field validation logic here
    if (
      !newUsername ||
      !newPhone ||
      !newShirtLambai ||
      !newShirtBazu ||
      !newShirtKafSize ||
      !newShirtTera ||
      !newShirtKandha ||
      !newShirtDaman ||
      !newShirtChati ||
      !newShirtGhera ||
      !newPentSize ||
      !newPentPancha
    ) {
      setErrorMessage("Please fill in all required fields.");
      return; // Prevent form submission
    }
    try {
      setIsEditing(true);

      // Update the document in Firestore
      await updateDoc(doc(db, "measurements", id), {
        username: newUsername,
        phone: newPhone,
        cast: newCast,
        date: currentDate,
        // +++++++++++++++++++++++++++ Entities for Shirt/Qameez +++++++++++++++++++++++++++
        shirtLambai: newShirtLambai,
        shirtBazu: newShirtBazu,

        // Coller Entities
        shirtCollerType: newShirtCollerType,
        shirtCollerSize: newShirtCollerSize,
        shirtCollerChorai: newShirtCollerChorai,
        shirtCollerStyle: newShirtCollerStyle,
        shirtBanLambai: newShirtBanLambai,
        shirtBanChorai: newShirtBanChorai,
        shirtBanStyle: newShirtBanStyle,
        shirtMaghziSize: newShirtMaghziSize,

        // KAF Entities
        shirtKafSize: newShirtKafSize,
        shirtKafStyle: newShirtKafStyle,
        shirtKafDetail: newShirtKafDetail,

        shirtSidePocket: newShirtSidePocket,
        shirtTera: newShirtTera,
        shirtKandha: newShirtKandha,
        shirtFrontPocket: newShirtFrontPocket,
        shirtDaman: newShirtDaman,
        shirtChati: newShirtChati,
        shirtKamar: newShirtKamar,
        shirtGhera: newShirtGhera,
        shirtNotes: newShirtNotes,

        // +++++++++++++++++++++++++++ Entities for Pent Shalwar +++++++++++++++++++++++++++
        pentSize: newPentSize,
        pentGheer: newPentGheer,
        pentPancha: newPentPancha,
        pentPanchaStyle: newPentPanchaStyle,
        pentStyle: newPentStyle,
        pentPocket: newPentPocket,
        pentNotes: newPentNotes,
      });

      // Redirect to the view page after editing

      // Show success toast
      toast.success("Measurement Updated successfully!", {
        position: "top-right",
        autoClose: 3000, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setErrorMessage("");
      router.push(`/viewMeasure/${id}`);
    } catch (error) {
      console.error("Error updating measurement: ", error);
      // Show error toast
      toast.error("Error Updating measurement. Please try again.", {
        position: "top-right",
        autoClose: 5000, // 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsEditing(false);
    }
  };

  if (measure === null) {
    return <Loader />;
  }
  // Function to reset state values
  const resetValues = () => {
    setNewShirtCollerSize("");
    setNewShirtCollerChorai("");
    setNewShirtCollerStyle("");
    setNewShirtBanLambai("");
    setNewShirtBanChorai("");
    setNewShirtBanStyle("");
    setNewShirtMaghziSize("");
  };
  return (
    <div>
      <ToastContainer />
      {/* Place this component at the top of your component tree */}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className="">
        <form onSubmit={handleEditSubmit}>
          <div className="flex justify-between mb-4 items-center">
            <h1 className="heading1 !m-0">Update Measurement</h1>
            <button type="submit" disabled={isEditing} className="button-style">
              <IoIosSave /> {isEditing ? "Saving..." : "Save Changes"}
            </button>
          </div>
          <div className="box-style">
            <h2 className="heading2">Update Personal Detail</h2>
            <div className="grid grid-cols-4 gap-3">
              <div>
                <label className="label-style">
                  Customer Name <span className="asterisk">*</span>
                </label>
                <input
                  className="block mb-1 min-h-[auto] border border-slate-600 w-full  bg-white px-3 py-[0.32rem] leading-[1.6] outline-none focus:border-teal-700"
                  type="text"
                  required
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
              </div>
              <div>
                <label className="label-style">Cast</label>
                <input
                  className="block mb-1 min-h-[auto] border border-slate-600 w-full  bg-white px-3 py-[0.32rem] leading-[1.6] outline-none focus:border-teal-700"
                  type="text"
                  value={newCast}
                  onChange={(e) => setNewCast(e.target.value)}
                />
              </div>
              <div>
                <label className="label-style">
                  Phone <span className="asterisk">*</span>
                </label>
                <input
                  className="block mb-1 min-h-[auto] border border-slate-600 w-full  bg-white px-3 py-[0.32rem] leading-[1.6] outline-none focus:border-teal-700"
                  type="text"
                  required
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                />
              </div>

              <div>
                <label className="label-style">
                  Date <span className="asterisk">*</span>
                </label>
                {/* New input field for current date */}
                <input
                  className="block mb-1 min-h-[auto] border border-slate-600 w-full  bg-gray-100 px-3 py-[0.32rem] leading-[1.6] outline-none focus:border-teal-700"
                  type="text"
                  required
                  value={currentDate}
                  readOnly // Make it read-only to prevent user input
                />
              </div>
            </div>
          </div>
          {/* Qmaeez/Shirt Input Fields */}

          <div className="flex justify-between items-start">
            <div className="w-[48%] box-style">
              <h2 className="heading2">Update Qameez Detail</h2>

              <div className="grid gap-3">
                <div>
                  <label className="label-style">
                    Lambai <span className="asterisk">*</span>
                  </label>
                  <input
                    className="input-style"
                    placeholder="Lambai"
                    type="text"
                    required
                    value={newShirtLambai}
                    onChange={(e) => setNewShirtLambai(e.target.value)}
                  />
                </div>

                <div>
                  <label className="label-style">
                    Bazu <span className="asterisk">*</span>
                  </label>
                  <input
                    className="input-style"
                    placeholder="Bazu"
                    type="text"
                    required
                    value={newShirtBazu}
                    onChange={(e) => setNewShirtBazu(e.target.value)}
                  />
                </div>

                <div>
                  <label className="label-style">
                    Tera <span className="asterisk">*</span>
                  </label>
                  <input
                    className="input-style"
                    placeholder="Tera Size"
                    type="text"
                    required
                    value={newShirtTera}
                    onChange={(e) => setNewShirtTera(e.target.value)}
                  />
                </div>
                <div>
                  <label className="label-style">
                    Kandha <span className="asterisk">*</span>
                  </label>
                  <input
                    className="input-style"
                    placeholder="Kandha Size"
                    type="text"
                    required
                    value={newShirtKandha}
                    onChange={(e) => setNewShirtKandha(e.target.value)}
                  />
                </div>

                <div>
                  <label className="label-style">
                    Chati <span className="asterisk">*</span>
                  </label>
                  <input
                    className="input-style"
                    placeholder="Chati"
                    type="text"
                    required
                    value={newShirtChati}
                    onChange={(e) => setNewShirtChati(e.target.value)}
                  />
                </div>

                <div>
                  <label className="label-style">Kamar</label>
                  <input
                    className="input-style"
                    placeholder="Kamar"
                    type="text"
                    value={newShirtKamar}
                    onChange={(e) => setNewShirtKamar(e.target.value)}
                  />
                </div>

                <div>
                  <label className="label-style">
                    Ghera <span className="asterisk">*</span>
                  </label>
                  <input
                    className="input-style"
                    placeholder="Ghera"
                    type="text"
                    required
                    value={newShirtGhera}
                    onChange={(e) => setNewShirtGhera(e.target.value)}
                  />
                </div>
                <div>
                  <label className="label-style">
                    Daman <span className="asterisk">*</span>
                  </label>
                  <select
                    className="input-style"
                    value={newShirtDaman}
                    required
                    onChange={(e) => setNewShirtDaman(e.target.value)}
                  >
                    <option value="Gol">Gol</option>
                    <option value="Chakor">Chakor</option>
                  </select>
                </div>
                <div>
                  <h3 className="heading3 ">Coller Details</h3>
                  <div
                    className="grid gap-2"
                    style={{
                      gridTemplateColumns: "repeat(auto-fit, minmax(22%, 1fr))",
                    }}
                  >
                    <div>
                      <label className="label-style">Coller Type</label>
                      <select
                        className="input-style"
                        value={newShirtCollerType}
                        // onChange={(e) => setNewShirtCollerType(e.target.value)}
                        onChange={(e) => {
                          resetValues(); // Call the function to reset values
                          setNewShirtCollerType(e.target.value);
                        }}
                      >
                        <option value="Coller">Coller</option>
                        <option value="Ban">Ban</option>
                        <option value="Maghzi">Maghzi</option>
                      </select>
                    </div>
                    {/* If Coller selected */}
                    {newShirtCollerType === "Coller" && (
                      <>
                        <div>
                          <label className="label-style">Coller Size</label>
                          <input
                            className="input-style"
                            placeholder="Coller Size"
                            type="text"
                            value={newShirtCollerSize}
                            onChange={(e) =>
                              setNewShirtCollerSize(e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <label className="label-style">Coller Chorai</label>
                          <select
                            className="input-style"
                            value={newShirtCollerChorai}
                            onChange={(e) =>
                              setNewShirtCollerChorai(e.target.value)
                            }
                          >
                            <option value="">-Select-</option>
                            <option value="1:1/2">1:1/2</option>
                            <option value="1:3/4">1:3/4</option>
                            <option value="2">2</option>
                            <option value="2:1/4">2:1/4</option>
                            <option value="2:1/2">2:1/2</option>
                            <option value="2:3/4">2:3/4</option>
                            <option value="3">3</option>
                          </select>
                        </div>
                        <div>
                          <label className="label-style">Coller Style</label>
                          <select
                            className="input-style"
                            value={newShirtCollerStyle}
                            onChange={(e) =>
                              setNewShirtCollerStyle(e.target.value)
                            }
                          >
                            <option value="">-Select-</option>
                            <option value="Simple">Simple</option>
                            <option value="French">French</option>
                          </select>
                        </div>
                      </>
                    )}
                    {/* If Ban Selected */}
                    {newShirtCollerType === "Ban" && (
                      <>
                        <div className="grid-rows-1">
                          <label className="label-style">Ban</label>
                          <input
                            className="input-style"
                            placeholder="Ban Size"
                            type="text"
                            value={newShirtBanLambai}
                            onChange={(e) =>
                              setNewShirtBanLambai(e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <label className="label-style">Ban Chorai</label>
                          <select
                            className="input-style"
                            value={newShirtBanChorai}
                            onChange={(e) =>
                              setNewShirtBanChorai(e.target.value)
                            }
                          >
                            <option value="">-select-</option>
                            <option value="1/2">1/2</option>
                            <option value="1/4">3/4</option>
                            <option value="1">1</option>
                            <option value="1:1/4">1:1/4</option>
                            <option value="1:1/2">1:1/2</option>
                            <option value="1:3/4">1:3/4</option>
                            <option value="2">2</option>
                          </select>
                        </div>
                        <div>
                          <label className="label-style">Ban Style</label>
                          <select
                            className="input-style"
                            value={newShirtBanStyle}
                            onChange={(e) =>
                              setNewShirtBanStyle(e.target.value)
                            }
                          >
                            <option value="Gol">Gol</option>
                            <option value="Chakor">Chakor</option>
                          </select>
                        </div>
                      </>
                    )}
                    {/* If Maghzi Selected */}
                    {newShirtCollerType === "Maghzi" && (
                      <>
                        <div>
                          <label className="label-style">Maghzi Size</label>
                          <input
                            className="input-style"
                            placeholder="Maghzi Size"
                            type="text"
                            value={newShirtMaghziSize}
                            onChange={(e) =>
                              setNewShirtMaghziSize(e.target.value)
                            }
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
                {/* Kaf Inputs Entities */}
                <div>
                  <h3 className="heading3 ">Kaf Details</h3>
                  <div
                    className="grid gap-2"
                    style={{
                      gridTemplateColumns: "repeat(auto-fit, minmax(22%, 1fr))",
                    }}
                  >
                    <div>
                      <label className="label-style">
                        Kaf Size <span className="asterisk">*</span>
                      </label>
                      <input
                        className="input-style"
                        placeholder="Kaf Size"
                        type="text"
                        required
                        value={newShirtKafSize}
                        onChange={(e) => setNewShirtKafSize(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="label-style">Kaf Style</label>
                      <select
                        className="input-style"
                        value={newShirtKafStyle}
                        onChange={(e) => setNewShirtKafStyle(e.target.value)}
                      >
                        <option value="Kaf">Kaf</option>
                        <option value="Gol">Gol</option>
                      </select>
                    </div>
                    <div>
                      <label className="label-style">Kaf Detail</label>
                      <input
                        className="input-style"
                        placeholder="single, pati, kani"
                        type="text"
                        value={newShirtKafDetail}
                        onChange={(e) => setNewShirtKafDetail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="label-style">Side Pocket</label>
                  <select
                    className="input-style"
                    value={newShirtSidePocket}
                    onChange={(e) => setNewShirtSidePocket(e.target.value)}
                  >
                    <option value="Double">Double</option>
                    <option value="Single">Single</option>
                    <option value="None">None</option>
                  </select>
                </div>

                <div>
                  <label className="label-style">Front Pocket</label>
                  <select
                    className="input-style"
                    value={newShirtFrontPocket}
                    onChange={(e) => setNewShirtFrontPocket(e.target.value)}
                  >
                    <option value="None">None</option>
                    <option value="Single">Single</option>
                    <option value="Double">Double</option>
                    <option value="Single Flop">Single Flop</option>
                    <option value="Double Flop">Double Flop</option>
                    <option value="Pocket Design">Pocket Design</option>
                  </select>
                </div>

                <div>
                  <label className="label-style">Qameez Notes</label>
                  <textarea
                    className="input-style"
                    placeholder="Notes"
                    value={newShirtNotes}
                    onChange={(e) => setNewShirtNotes(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="w-[48%] box-style">
              <h2 className="heading2">Update Shalwar Detail</h2>

              <div className="grid gap-3">
                <div>
                  <label className="label-style">
                    Shlawar Size <span className="asterisk">*</span>
                  </label>
                  <input
                    className="input-style"
                    placeholder="Shalwar Size"
                    type="text"
                    required
                    value={newPentSize}
                    onChange={(e) => setNewPentSize(e.target.value)}
                  />
                </div>
                <div>
                  <label className="label-style">
                    Pancha <span className="asterisk">*</span>
                  </label>
                  <input
                    className="input-style"
                    placeholder="Pancha"
                    type="text"
                    required
                    value={newPentPancha}
                    onChange={(e) => setNewPentPancha(e.target.value)}
                  />
                </div>
                <div>
                  <label className="label-style">Gheer</label>
                  <input
                    className="input-style"
                    placeholder="Gheer"
                    type="text"
                    value={newPentGheer}
                    onChange={(e) => setNewPentGheer(e.target.value)}
                  />
                </div>

                <div>
                  <label className="label-style">Pancha Style</label>
                  <select
                    className="input-style"
                    value={newPentPanchaStyle}
                    onChange={(e) => setNewPentPanchaStyle(e.target.value)}
                  >
                    <option value="Simple">Simple</option>
                    <option value="Karahi Hath">Karahi Hath</option>
                    <option value="Karahi Machine">Karahi Machine</option>
                    <option value="Jali Single">Jali Single</option>
                    <option value="Jali Double">Jali Double</option>
                    <option value="Kanta">Kanta</option>
                  </select>
                </div>

                <div>
                  <label className="label-style">Shalwar Style</label>
                  <select
                    className="input-style"
                    value={newPentStyle}
                    onChange={(e) => setNewPentStyle(e.target.value)}
                  >
                    <option value="Simple">Simple</option>
                    <option value="Trouser">Trouser</option>
                    <option value="Pajama">Pajama</option>
                    <option value="Wal">Wal</option>
                  </select>
                </div>

                <div>
                  <label className="label-style">Shalwar Pocket</label>
                  <select
                    className="input-style"
                    value={newPentPocket}
                    onChange={(e) => setNewPentPocket(e.target.value)}
                  >
                    <option value="No">No</option>
                    <option value="Zip">Zip</option>
                    <option value="Single">Single</option>
                    <option value="Double">Double</option>
                  </select>
                </div>

                <div>
                  <label className="label-style">Shalwar Notes</label>
                  <textarea
                    className="input-style"
                    placeholder="Shalwar Notes"
                    value={newPentNotes}
                    onChange={(e) => setNewPentNotes(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
