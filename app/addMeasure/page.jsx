"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../firebase/auth";
import { useRouter } from "next/navigation";
import Loader from "../components/loader";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { TbPlus } from "react-icons/tb";
import { IoIosArrowRoundBack } from "react-icons/io";
export default function AddMeasure() {
  const { authUser, isLoading } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  // User data values
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [cast, setCast] = useState("");
  const currentDate = new Date().toLocaleDateString("en-GB");
  // +++++++++++++++++++++++++++ Entities for Shirt/Qameez +++++++++++++++++++++++++++
  const [shirtLambai, setShirtLambai] = useState("");
  const [shirtBazu, setShirtBazu] = useState("");
  // Coller Entities
  const [shirtCollerType, setShirtCollerType] = useState("Coller"); // Default Value is "Coller"
  const [shirtCollerSize, setShirtCollerSize] = useState(""); // Default Value is "2:1/2"
  const [shirtCollerChorai, setShirtCollerChorai] = useState(""); // Default Value is "2:1/2"
  const [shirtCollerStyle, setShirtCollerStyle] = useState(""); // Default Value is "Simple"
  const [shirtBanLambai, setShirtBanLambai] = useState("");
  const [shirtBanChorai, setShirtBanChorai] = useState(""); // Default Value is "1"
  const [shirtBanStyle, setShirtBanStyle] = useState(""); // Default Value is "Chakor"
  const [shirtMaghziSize, setShirtMaghziSize] = useState("");
  // KAF Entities
  const [shirtKafSize, setShirtKafSize] = useState("");
  const [shirtKafStyle, setShirtKafStyle] = useState("Kaf"); // Default value is "Kaf"
  const [shirtKafDetail, setShirtKafDetail] = useState("");

  const [shirtSidePocket, setShirtSidePocket] = useState("Double"); // Default value is "None"
  const [shirtTera, setShirtTera] = useState("");
  const [shirtKandha, setShirtKandha] = useState("");
  const [shirtFrontPocket, setShirtFrontPocket] = useState("None"); // Default Value is "None"
  const [shirtDaman, setShirtDaman] = useState("Gol"); // Default Value is "Gol"
  const [shirtChati, setShirtChati] = useState("");
  const [shirtKamar, setShirtKamar] = useState("");
  const [shirtGhera, setShirtGhera] = useState("");
  const [shirtNotes, setShirtNotes] = useState("");

  // +++++++++++++++++++++++++++ Entities for Pent Shalwar +++++++++++++++++++++++++++
  const [pentSize, setPentSize] = useState("");
  const [pentGheer, setPentGheer] = useState("");
  const [pentPancha, setPentPancha] = useState("");
  const [pentPanchaStyle, setPentPanchaStyle] = useState("Simple"); // Default Value is "Simple"
  const [pentStyle, setPentStyle] = useState("Simple");
  const [pentPocket, setPentPocket] = useState("");
  const [pentNotes, setPentNotes] = useState("");

  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push("/userlogin");
    }
    if (!!authUser) {
      // fetchTodos(authUser.uid);
    }
  }, [authUser, isLoading]);

  const addMeasurement = async (e) => {
    e.preventDefault();
    // Basic form validation
    if (
      !username ||
      !phone ||
      !shirtLambai ||
      !shirtBazu ||
      !shirtKafSize ||
      !shirtTera ||
      !shirtKandha ||
      !shirtDaman ||
      !shirtChati ||
      !shirtGhera ||
      !pentSize ||
      !pentPancha
    ) {
      setErrorMessage("Please fill in all required fields.");
      return; // Prevent form submission
    }
    try {
      const docRef = await addDoc(collection(db, "measurements"), {
        owner: authUser.uid,
        username,
        phone,
        date: currentDate,
        cast,
        // New entities for shirt
        shirtLambai,
        shirtBazu,
        shirtCollerType,
        shirtCollerStyle,
        shirtCollerSize,
        shirtCollerChorai,
        shirtBanLambai,
        shirtBanChorai,
        shirtBanStyle,
        shirtMaghziSize,
        shirtKafSize,
        shirtKafStyle,
        shirtKafDetail,
        shirtSidePocket,
        shirtTera,
        shirtKandha,
        shirtFrontPocket,
        shirtDaman,
        shirtChati,
        shirtKamar,
        shirtGhera,
        shirtNotes,
        // New Entities for Pent
        pentSize,
        pentGheer,
        pentStyle,
        pentPancha,
        pentPanchaStyle,
        pentPocket,
        pentNotes,
      });
      // Show success toast
      toast.success("Measurement added successfully!", {
        position: "top-right",
        autoClose: 3000, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Reset form and error message after successful submission
      setUsername("");
      setPhone("");
      setCast("");
      setErrorMessage("");
      // Entities for shirt
      setShirtLambai("");
      setShirtBazu("");
      setShirtCollerType("");
      setShirtCollerSize("");
      setShirtCollerChorai("");
      setShirtCollerStyle("");
      setShirtBanLambai("");
      setShirtBanChorai("");
      setShirtBanStyle("");
      setShirtMaghziSize("");
      setShirtKafSize("");
      setShirtKafStyle("");
      setShirtKafDetail("");
      setShirtSidePocket("");
      setShirtTera("");
      setShirtKandha("");
      setShirtFrontPocket("");
      setShirtDaman("");
      setShirtChati("");
      setShirtKamar("");
      setShirtGhera("");
      setShirtNotes("");
      // Entities for Pent
      setPentSize("");
      setPentGheer("");
      setPentStyle("");
      setPentPancha("");
      setPentPanchaStyle("");
      setPentPocket("");
      setPentNotes("");

      // router.push("/");
    } catch (error) {
      console.error("Error adding document: ", error);
      // Show error toast
      toast.error("Error adding measurement. Please try again.", {
        position: "top-right",
        autoClose: 5000, // 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  // Function to reset state values
  const resetValues = () => {
    setShirtCollerSize("");
    setShirtCollerChorai("");
    setShirtCollerStyle("");
    setShirtBanLambai("");
    setShirtBanChorai("");
    setShirtBanStyle("");
    setShirtMaghziSize("");
  };
  const Cancel = () => {
    router.back();
  };
  return !authUser ? (
    <div className="">
      <Loader />
    </div>
  ) : (
    <div className="">
      <div className="page-header-group">
        <h1 className="heading1">Add Measurement</h1>

        <div className="flex gap-3">
          <button onClick={Cancel} className="button-default">
            <IoIosArrowRoundBack />
            Cancel
          </button>
          <button onClick={addMeasurement} className="button-style">
            <TbPlus /> Add Measurement
          </button>
        </div>
      </div>
      <ToastContainer />
      {/* Place this component at the top of your component tree */}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form>
        <div className="box-style">
          <h2 className="heading2">Personal Detail</h2>

          <div className="personal-detail-box">
            <div>
              <label className="label-style">
                Customer Name <span className="asterisk">*</span>
              </label>
              <input
                className="block mb-1 min-h-[auto] border border-slate-600 w-full  bg-white px-3 py-[0.32rem] leading-[1.6] outline-none focus:border-teal-700"
                placeholder="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername((prevUsername) => e.target.value)}
              />
            </div>
            <div>
              <label className="label-style">Cast</label>
              <input
                className="block mb-1 min-h-[auto] border border-slate-600 w-full  bg-white px-3 py-[0.32rem] leading-[1.6] outline-none focus:border-teal-700"
                placeholder="Cast"
                type="phone"
                value={cast}
                onChange={(e) => setCast(e.target.value)}
              />
            </div>
            <div>
              <label className="label-style">
                Customer Phone <span className="asterisk">*</span>
              </label>
              <input
                className="block mb-1 min-h-[auto] border border-slate-600 w-full  bg-white px-3 py-[0.32rem] leading-[1.6] outline-none focus:border-teal-700"
                placeholder="Phone"
                type="phone"
                required
                pattern="[0-9]{10}"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <label className="label-style">Date</label>
              {/* New input field for current date */}
              <input
                className="block mb-1 min-h-[auto] border border-slate-600 w-full  bg-gray-100 px-3 py-[0.32rem] leading-[1.6] outline-none focus:border-teal-700"
                type="text"
                value={currentDate}
                readOnly // Make it read-only to prevent user input
              />
            </div>
          </div>
        </div>
        {/* Qmaeez/Shirt Input Fields */}

        <div className="flex md:flex-row flex-col justify-between items-start">
          <div className="w-full md:w-[48%] box-style">
            <h2 className="heading2">Qameez Detail</h2>

            <div className="grid gap-3">
              <div>
                <label className="label-style">
                  Lambai
                  <span className="asterisk">*</span>
                </label>
                <input
                  className="input-style"
                  placeholder="Lambai"
                  type="text"
                  required
                  value={shirtLambai}
                  onChange={(e) => setShirtLambai(e.target.value)}
                />
              </div>

              <div>
                <label className="label-style">
                  Bazu
                  <span className="asterisk">*</span>
                </label>
                <input
                  className="input-style"
                  placeholder="Bazu"
                  type="text"
                  required
                  value={shirtBazu}
                  onChange={(e) => setShirtBazu(e.target.value)}
                />
              </div>
              <div>
                <label className="label-style">
                  Tera
                  <span className="asterisk">*</span>
                </label>
                <input
                  className="input-style"
                  placeholder="Tera Size"
                  type="text"
                  required
                  value={shirtTera}
                  onChange={(e) => setShirtTera(e.target.value)}
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
                  value={shirtKandha}
                  onChange={(e) => setShirtKandha(e.target.value)}
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
                  value={shirtChati}
                  onChange={(e) => setShirtChati(e.target.value)}
                />
              </div>

              <div>
                <label className="label-style">Kamar</label>
                <input
                  className="input-style"
                  placeholder="Kamar"
                  type="text"
                  value={shirtKamar}
                  onChange={(e) => setShirtKamar(e.target.value)}
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
                  value={shirtGhera}
                  onChange={(e) => setShirtGhera(e.target.value)}
                />
              </div>
              <div>
                <label className="label-style">
                  Daman <span className="asterisk">*</span>
                </label>
                <select
                  className="input-style"
                  value={shirtDaman}
                  required
                  onChange={(e) => setShirtDaman(e.target.value)}
                >
                  <option value="Gol">Gol</option>
                  <option value="Chakor">Chakor</option>
                </select>
              </div>
              <div>
                <h3 className="heading3 ">Coller Details</h3>
                <div
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
                  // style={{
                  //   gridTemplateColumns: "repeat(auto-fit, minmax(22%, 1fr))",
                  // }}
                >
                  {/* repeat(auto-fit, minmax(22%, 1fr)) */}
                  <div>
                    <label className="label-style">Coller Type</label>
                    <select
                      className="input-style"
                      value={shirtCollerType}
                      onChange={(e) => {
                        resetValues(); // Call the function to reset values
                        setShirtCollerType(e.target.value);
                      }}
                    >
                      <option value="Coller">Coller</option>
                      <option value="Ban">Ban</option>
                      <option value="Maghzi">Maghzi</option>
                    </select>
                  </div>
                  {/* If Coller selected */}
                  {shirtCollerType === "Coller" && (
                    <>
                      <div>
                        <label className="label-style">Coller Size</label>
                        <input
                          className="input-style"
                          placeholder="Coller Size"
                          type="text"
                          value={shirtCollerSize}
                          onChange={(e) => setShirtCollerSize(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="label-style">Coller Chorai</label>
                        <select
                          className="input-style"
                          value={shirtCollerChorai}
                          onChange={(e) => setShirtCollerChorai(e.target.value)}
                        >
                          <option value="">select</option>
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
                          value={shirtCollerStyle}
                          onChange={(e) => setShirtCollerStyle(e.target.value)}
                        >
                          <option value="">select</option>
                          <option value="Simple">Simple</option>
                          <option value="French">French</option>
                        </select>
                      </div>
                    </>
                  )}
                  {/* If Ban Selected */}
                  {shirtCollerType === "Ban" && (
                    <>
                      <div className="grid-rows-1">
                        <label className="label-style">Ban</label>
                        <input
                          className="input-style"
                          placeholder="Ban Size"
                          type="text"
                          value={shirtBanLambai}
                          onChange={(e) => setShirtBanLambai(e.target.value)}
                        />
                      </div>
                      <div className="grid-rows-1">
                        <label className="label-style">Ban Chorai</label>
                        <select
                          className="input-style"
                          value={shirtBanChorai}
                          onChange={(e) => setShirtBanChorai(e.target.value)}
                        >
                          <option value="">select</option>
                          <option value="1/2">1/2</option>
                          <option value="1/4">3/4</option>
                          <option value="1">1</option>
                          <option value="1:1/4">1:1/4</option>
                          <option value="1:1/2">1:1/2</option>
                          <option value="1:3/4">1:3/4</option>
                          <option value="2">2</option>
                        </select>
                      </div>
                      <div className="grid-rows-1">
                        <label className="label-style">Ban Style</label>
                        <select
                          className="input-style"
                          value={shirtBanStyle}
                          onChange={(e) => setShirtBanStyle(e.target.value)}
                        >
                          <option value="">select</option>
                          <option value="Gol">Gol</option>
                          <option value="Chakor">Chakor</option>
                        </select>
                      </div>
                    </>
                  )}
                  {/* If Maghzi Selected */}
                  {shirtCollerType === "Maghzi" && (
                    <>
                      <div>
                        <label className="label-style">Maghzi Size</label>
                        <input
                          className="input-style"
                          placeholder="Maghzi Size"
                          type="text"
                          value={shirtMaghziSize}
                          onChange={(e) => setShirtMaghziSize(e.target.value)}
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
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
                  // style={{
                  //   gridTemplateColumns: "repeat(auto-fit, minmax(22%, 1fr))",
                  // }}
                >
                  <div>
                    <label className="label-style">
                      Kaf Size
                      <span className="asterisk">*</span>
                    </label>
                    <input
                      className="input-style"
                      placeholder="Kaf Size"
                      type="text"
                      required
                      value={shirtKafSize}
                      onChange={(e) => setShirtKafSize(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="label-style">Kaf Style</label>
                    <select
                      className="input-style"
                      value={shirtKafStyle}
                      onChange={(e) => setShirtKafStyle(e.target.value)}
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
                      value={shirtKafDetail}
                      onChange={(e) => setShirtKafDetail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="label-style">Side Pocket</label>
                <select
                  className="input-style"
                  value={shirtSidePocket}
                  onChange={(e) => setShirtSidePocket(e.target.value)}
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
                  value={shirtFrontPocket}
                  onChange={(e) => setShirtFrontPocket(e.target.value)}
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
                  value={shirtNotes}
                  onChange={(e) => setShirtNotes(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-[48%] box-style">
            <h2 className="heading2">Shalwar Detail</h2>

            <div className="grid gap-3">
              <div>
                <label className="label-style">
                  Shalwar Size <span className="asterisk">*</span>
                </label>
                <input
                  className="input-style"
                  placeholder="Shawar Size"
                  type="text"
                  required
                  value={pentSize}
                  onChange={(e) => setPentSize(e.target.value)}
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
                  value={pentPancha}
                  onChange={(e) => setPentPancha(e.target.value)}
                />
              </div>
              <div>
                <label className="label-style">Gheer</label>
                <input
                  className="input-style"
                  placeholder="Gheer"
                  type="text"
                  value={pentGheer}
                  onChange={(e) => setPentGheer(e.target.value)}
                />
              </div>

              <div>
                <label className="label-style">Pancha Style</label>
                <select
                  className="input-style"
                  value={pentPanchaStyle}
                  onChange={(e) => setPentPanchaStyle(e.target.value)}
                >
                  <option value="Simple">Simple</option>
                  <option value="Karahi Hath">Karahi Hath</option>
                  <option value="Karahi Machine">Karahi Machine</option>
                  <option value="Jali Single">Jali Single</option>
                  <option value="Jali Double">Jali Double</option>
                  <option value="Kanta">Kanta</option>
                  {/* Add other style options if needed */}
                </select>
              </div>

              <div>
                <label className="label-style">Shalwar Style</label>
                <select
                  className="input-style"
                  value={pentStyle}
                  onChange={(e) => setPentStyle(e.target.value)}
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
                  value={pentPocket}
                  onChange={(e) => setPentPocket(e.target.value)}
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
                  value={pentNotes}
                  onChange={(e) => setPentNotes(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="text-right mt-4 mb-10"></div>
      </form>
    </div>
  );
}
