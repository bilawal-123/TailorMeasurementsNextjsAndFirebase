"use client";
import Print from "@/app/components/print";
import { useReactToPrint } from "react-to-print";
import Loader from "@/app/components/loader";
import { useRef, useEffect, useState } from "react";
import { useAuth } from "@/firebase/auth";
import { useRouter, useParams } from "next/navigation";
// import { useRouter } from "next/navigation";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import Link from "next/link";
import {
  TbPencil,
  TbEye,
  TbTrash,
  TbArrowNarrowLeft,
  TbPrinter,
} from "react-icons/tb";
import DecimalConversion from "@/app/components/decimalConversion";

// import "@/public/print-styles.css";
export default function ViewMeasure() {
  //   const router = useRouter();
  //   const { id } = router.query;
  const { id } = useParams();
  const { authUser, isLoading } = useAuth();
  const [measure, setMeasure] = useState(null);
  const router = useRouter();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  useEffect(() => {
    const fetchMeasure = async () => {
      try {
        const measureDoc = await getDoc(doc(db, "measurements", id));
        if (measureDoc.exists()) {
          setMeasure(measureDoc.data());
        } else {
          console.error("Measurement not found");
        }
      } catch (error) {
        console.error("Error fetching measurement: ", error);
      }
    };

    fetchMeasure();
  }, [id]);

  if (measure === null) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const deleteMeasurement = async (docId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this measurement?"
    );
    if (isConfirmed) {
      try {
        // Delete the todo document with the given ID from the "todos" collection in Firestore.
        await deleteDoc(doc(db, "measurements", docId));

        // After deleting the todo, fetch all todos for the current user and update the state with the new data.
        //   fetchMeasurements(authUser.uid);
        router.push("/");
      } catch (error) {
        console.error("An error occured", error);
      }
    }
  };

  return !authUser ? (
    <div>
      <Loader />
    </div>
  ) : (
    <>
      <div className="">
        {/* Pass the ref to the Print component */}

        <div className="page-header-group">
          <h1 className="heading1 m-0">View Measurement</h1>
          <div className="flex gap-3">
            <Link href={`/editMeasure/${id}`} className="button-style">
              <TbPencil /> Edit
            </Link>
            <button
              className="button-delete"
              onClick={() => deleteMeasurement(id)}
            >
              <TbTrash /> Delete
            </button>
            <button className="button-print" onClick={handlePrint}>
              <TbPrinter /> Print
            </button>
          </div>
        </div>

        <div className="box-style">
          <h2 className="heading2">Personal Detail</h2>

          <div className="personal-detail-box">
            <div>
              <span className="label-style">
                Customer Name <span className="asterisk">*</span>
              </span>
              <p>{measure?.username}</p>
            </div>
            <div>
              <span className="label-style">Cast</span>
              <p> {measure?.cast}</p>
            </div>
            <div>
              <span className="label-style">
                Customer Phone <span className="asterisk">*</span>
              </span>
              <p>{measure?.phone}</p>
            </div>

            <div>
              <span className="label-style">Date</span>
              <p>{measure?.date}</p>
            </div>
          </div>
        </div>

        <div className="flex md:flex-row flex-col justify-between items-start">
          <div className="w-full md:w-[48%] box-style">
            <h2 className="heading2">Qameez Detail</h2>

            <div className="grid gap-3">
              <div className="view-measure-row">
                <span className="label-style !mb-0">
                  Lambai
                  <span className="asterisk">*</span>
                </span>
                <p className="text-lg  font-semibold">
                  <DecimalConversion value={measure?.shirtLambai} />
                </p>
              </div>
              <div className="view-measure-row">
                <span className="label-style !mb-0">
                  Bazu
                  <span className="asterisk">*</span>
                </span>
                <p className="text-lg  font-semibold">
                  <DecimalConversion value={measure?.shirtBazu} />
                </p>
              </div>
              <div className="view-measure-row">
                <span className="label-style !mb-0">
                  Tera
                  <span className="asterisk">*</span>
                </span>
                <p className="text-lg  font-semibold">
                  <DecimalConversion value={measure?.shirtTera} />
                </p>
              </div>
              <div className="view-measure-row">
                <span className="label-style !mb-0">
                  Kandha
                  <span className="asterisk">*</span>
                </span>
                <p className="text-lg  font-semibold">
                  <DecimalConversion value={measure?.shirtKandha} />
                </p>
              </div>

              <div className="view-measure-row">
                <span className="label-style !mb-0">
                  Chati
                  <span className="asterisk">*</span>
                </span>
                <p className="text-lg  font-semibold">
                  <DecimalConversion value={measure?.shirtChati} />
                </p>
              </div>
              <div className="view-measure-row">
                <span className="label-style !mb-0">Kamar</span>
                <p className="text-lg  font-semibold">
                  <DecimalConversion value={measure?.shirtKamar} />
                </p>
              </div>
              <div className="view-measure-row">
                <span className="label-style !mb-0">
                  Ghera
                  <span className="asterisk">*</span>
                </span>
                <p className="text-lg  font-semibold">
                  <DecimalConversion value={measure?.shirtGhera} />
                </p>
              </div>
              <div className="view-measure-row">
                <span className="label-style !mb-0">
                  Daman
                  <span className="asterisk">*</span>
                </span>
                <p className="text-lg  font-semibold">{measure?.shirtDaman}</p>
              </div>
              <div className="view-measure-row">
                <span className="label-style !mb-0">Coller</span>
                <div className="text-lg font-semibold">
                  {/* Coller Data */}
                  {measure?.shirtCollerType && (
                    <>
                      {measure.shirtCollerType}
                      {measure.shirtCollerStyle && " | "}
                      {measure.shirtCollerStyle}
                      {measure.shirtCollerSize && " | "}
                      {measure.shirtCollerSize}
                      {measure.shirtCollerChorai && " | "}
                      {measure.shirtCollerChorai}
                    </>
                  )}
                  {/* Ban Data */}
                  {measure?.shirtBanLambai && (
                    <>
                      {" | "}
                      <DecimalConversion value={measure.shirtBanLambai} />
                      {measure.shirtBanChorai && " | "}
                      {measure.shirtBanChorai}
                      {measure.shirtBanStyle && " | "}
                      {measure.shirtBanStyle}
                    </>
                  )}
                  {/* Maghzi Data */}
                  {measure?.shirtMaghziSize && (
                    <>
                      {" | "}
                      <DecimalConversion value={measure.shirtMaghziSize} />
                    </>
                  )}
                </div>
              </div>
              <div className="view-measure-row">
                <span className="label-style !mb-0">
                  Kaf Details
                  <span className="asterisk">*</span>
                </span>
                <div className="text-lg font-semibold">
                  <p className="text-lg font-semibold">
                    <DecimalConversion value={measure?.shirtKafSize} />
                    {measure?.shirtKafStyle && measure.shirtKafSize && " | "}

                    {measure?.shirtKafStyle}
                    {measure?.shirtKafDetail && measure.shirtKafStyle && " | "}

                    {measure?.shirtKafDetail}
                  </p>
                </div>
              </div>
              <div className="view-measure-row">
                <span className="label-style !mb-0">Side Pocket</span>
                <p className="text-lg  font-semibold">
                  {measure?.shirtSidePocket}
                </p>
              </div>
              <div className="view-measure-row">
                <span className="label-style !mb-0">Front Pocket</span>
                <p className="text-lg  font-semibold">
                  {measure?.shirtFrontPocket}
                </p>
              </div>
              <div className="flex border-b border-gray-300 flex-col">
                <span className="label-style">Notes</span>
                <p className="">{measure?.shirtNotes}</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[48%] box-style">
            <h2 className="heading2">Shalwar Detail</h2>

            <div className="grid gap-3">
              <div className="grid gap-3">
                <div className="view-measure-row">
                  <span className="label-style !mb-0">
                    Shalwar
                    <span className="asterisk">*</span>
                  </span>
                  <p className="text-lg font-semibold">
                    <DecimalConversion value={measure?.pentSize} />
                  </p>
                </div>
                <div className="view-measure-row">
                  <span className="label-style !mb-0">
                    Pancha <span className="asterisk">*</span>
                  </span>
                  <p className="text-lg  font-semibold">
                    <DecimalConversion value={measure?.pentPancha} />
                  </p>
                </div>
                <div className="view-measure-row">
                  <span className="label-style !mb-0">Gheer</span>
                  <p className="text-lg  font-semibold">
                    <DecimalConversion value={measure?.pentGheer} />
                  </p>
                </div>

                <div className="view-measure-row">
                  <span className="label-style !mb-0">Pancha Style</span>
                  <p className="text-lg  font-semibold">
                    {measure?.pentPanchaStyle}
                  </p>
                </div>
                <div className="view-measure-row">
                  <span className="label-style !mb-0">Style</span>
                  <p className="text-lg  font-semibold">{measure?.pentStyle}</p>
                </div>
                <div className="view-measure-row">
                  <span className="label-style !mb-0">Pocket</span>
                  <p className="text-lg  font-semibold">
                    {measure?.pentPocket}
                  </p>
                </div>
                <div className="flex border-b border-gray-300 flex-col">
                  <span className="label-style">Notes</span>
                  <p className="">{measure?.pentNotes}</p>
                </div>
              </div>
            </div>
          </div>
          {/* end of parent */}
        </div>
        <div className="hidden">
          <Print ref={componentRef} measure={measure} className="hidden" />
        </div>
      </div>
    </>
  );
}
