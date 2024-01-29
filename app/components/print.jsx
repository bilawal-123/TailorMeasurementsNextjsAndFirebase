import { forwardRef } from "react";
import { useReactToPrint } from "react-to-print";
import "@/public/print-styles.css";
import DecimalConversion from "./decimalConversion";
import { useContext } from "react";
import ShopContext from "./context";
import Image from "next/image";
// eslint-disable-next-line react/display-name
const Print = forwardRef(({ measure }, ref) => {
  const shop = useContext(ShopContext);
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });

  if (!measure) {
    return null;
  }

  return (
    <div>
      <div
        ref={ref}
        className="m-0 flex items-start justify-start text-left  w-[300px] max-w-[300px] overflow-hidden"
      >
        {/* Your print-friendly content goes here */}
        <div className="print-container border border-gray-300 p-3 w-full">
          <p className="flex justify-between items-center  mb-2 border-b pb-2 border-dashed border-gray-300 gap-2">
            <div className="font-bold flex items-center gap-1 text-xs w-[100px]">
              <Image
                src="/icon-black-bg-white.png"
                alt="Example Image"
                width={16}
                height={16}
                priority
                style={{ height: "auto" }}
              />
              {shop.shopNameContext}
            </div>
            <span className=" text-xs max-w-[calc(100%_-_108px)]  inline-flex justify-end truncate ...">
              {measure.username}
            </span>
            {/* <span>{measure.phone}</span> */}
          </p>
          <div className="shalwar-qameez flex justify-between">
            <div className="col-1 w-2/5 pr-1">
              <table className="w-full font-bold text-lg">
                <tbody>
                  {measure.shirtLambai && (
                    <tr>
                      <td>
                        <DecimalConversion value={measure.shirtLambai} />
                      </td>
                      <td className="text-right text-sm font-normal pr-3">
                        لمبائی
                      </td>
                    </tr>
                  )}
                  {measure.shirtBazu && (
                    <tr>
                      <td>
                        <DecimalConversion value={measure.shirtBazu} />
                      </td>
                      <td className="text-right text-sm font-normal pr-3">
                        بازو
                      </td>
                    </tr>
                  )}

                  {measure.shirtTera && (
                    <tr>
                      <td>
                        <DecimalConversion value={measure.shirtTera} />
                      </td>
                      <td className="text-right text-sm font-normal pr-3">
                        تیرا
                      </td>
                    </tr>
                  )}

                  {measure.shirtChati && (
                    <tr>
                      <td>
                        <DecimalConversion value={measure.shirtChati} />
                      </td>
                      <td className="text-right text-sm font-normal pr-3">
                        چھاتی
                      </td>
                    </tr>
                  )}

                  {measure.shirtKamar && (
                    <tr>
                      <td>
                        <DecimalConversion value={measure.shirtKamar} />
                      </td>
                      <td className="text-right text-sm font-normal pr-3">
                        کمر
                      </td>
                    </tr>
                  )}

                  {measure.shirtGhera && (
                    <tr className="pb-3">
                      <td className="border-b-2 border-gray-400 pb-2">
                        <DecimalConversion value={measure.shirtGhera} />
                      </td>
                      <td className="text-right text-sm font-normal pr-3 border-b-2 border-gray-400  pb-2">
                        گھیرا
                      </td>
                    </tr>
                  )}

                  {measure.pentSize && (
                    <tr>
                      <td className=" pt-2">
                        <DecimalConversion value={measure.pentSize} />
                      </td>
                      <td className="text-right text-sm font-normal pr-3 pt-2">
                        شلوار
                      </td>
                    </tr>
                  )}

                  {measure.pentPancha && (
                    <tr>
                      <td>
                        <DecimalConversion value={measure.pentPancha} />
                      </td>
                      <td className="text-right text-sm font-normal pr-3">
                        پانچا
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="col-2 pl-2 w-3/5  text-right  border-l border-gray-300">
              <p className="mb-1.5">
                {measure.shirtCollerType && (
                  <table className="w-full">
                    <tr>
                      <td>
                        <div className="flex flex-row-reverse items-center">
                          {measure.shirtCollerType === "Coller" && (
                            <>
                              <span className="w-9 inline-block ml-1">
                                کالر
                              </span>
                              {measure.shirtCollerStyle && (
                                <>
                                  <span className="text-xs">
                                    {measure.shirtCollerStyle === "Simple" &&
                                      ""}
                                    {measure.shirtCollerStyle === "Chakor" &&
                                      "French"}
                                  </span>
                                </>
                              )}
                              {measure.shirtCollerSize && (
                                <span className="font-bold">
                                  {measure.shirtCollerSize}
                                </span>
                              )}
                              {measure.shirtCollerChorai && (
                                <span className="font-bold">
                                  {measure.shirtCollerChorai}
                                </span>
                              )}
                            </>
                          )}

                          {measure.shirtCollerType === "Ban" && (
                            <>
                              <span className="w-9 inline-block ml-1">بین</span>
                              <div className="flex flex-row-reverse  gap-1">
                                {measure.shirtBanLambai && (
                                  <span className="font-bold">
                                    <DecimalConversion
                                      value={measure.shirtBanLambai}
                                    />
                                  </span>
                                )}
                                {measure.shirtBanStyle && (
                                  <span>
                                    {measure.shirtBanStyle === "Gol" && "گول"}
                                    {measure.shirtBanStyle === "Chakor" &&
                                      "چکور"}
                                  </span>
                                )}

                                {measure.shirtBanChorai && (
                                  <span className="font-bold">
                                    {measure.shirtBanChorai}
                                  </span>
                                )}
                              </div>
                            </>
                          )}

                          {measure.shirtCollerType === "Maghzi" && (
                            <>
                              <span className="w-9 inline-block ml-1">
                                مغزی
                              </span>
                              {measure.shirtMaghziSize && (
                                <span>
                                  <DecimalConversion
                                    value={measure.shirtMaghziSize}
                                  />
                                </span>
                              )}
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  </table>
                )}
              </p>
              {measure.shirtSidePocket && (
                <p className="mb-1.5 flex flex-row-reverse">
                  <span className="w-9 inline-block ml-1">سائیڈ</span>
                  <span className="font-bold">
                    {" "}
                    {measure.shirtSidePocket === "Double" && " ڈبل"}
                    {measure.shirtSidePocket === "Single" && " سنگل"}
                    {measure.shirtSidePocket === "None" && " نہیں لگانی "}
                  </span>
                </p>
              )}{" "}
              {measure.shirtFrontPocket && (
                <p className="mb-1.5 flex flex-row-reverse">
                  <span className="w-9 inline-block ml-1">فرنٹ</span>
                  <span className="font-bold">
                    {measure.shirtFrontPocket === "None" && "نہیں لگانی"}
                    {measure.shirtFrontPocket === "Single" && "سنگل"}
                    {measure.shirtFrontPocket === "Double" && "ڈبل"}
                    {measure.shirtFrontPocket === "Single Flop" && "سنگل فلاپ"}
                    {measure.shirtFrontPocket === "Double Flop" && "ڈبل فلاپ"}
                    {measure.shirtFrontPocket === "Pocket Design" &&
                      "پاکٹ ڈیزائن"}
                  </span>
                </p>
              )}
              {measure.shirtDaman && (
                <p className="mb-1.5 flex flex-row-reverse">
                  <span className="w-9 inline-block ml-1">دامن</span>
                  <span className="font-bold">
                    {measure.shirtDaman === "Gol" && "گول"}
                    {measure.shirtDaman === "Chakor" && "چکور"}
                  </span>
                </p>
              )}
              {measure.shirtKandha && (
                <p className="mb-1.5">
                  <span className="font-bold">
                    <DecimalConversion value={measure.shirtKandha} />
                  </span>
                  <span className="w-9 inline-block ml-1">کاندھا</span>
                </p>
              )}
              {measure?.shirtKafSize && (
                <p className="mb-1.5 flex flex-row-reverse items-center">
                  <span className="w-9 inline-block ml-1">کف</span>
                  <div className="flex gap-1 items-center">
                    <span className="text-xs font-bold">
                      {measure.shirtKafDetail && ` ${measure.shirtKafDetail}`}
                    </span>
                    <span className="font-bold">
                      {measure.shirtKafStyle === "Kaf" && " "}
                      {measure.shirtKafStyle === "Gol" && "  گول"}
                    </span>
                    <span className="font-bold">{measure.shirtKafSize} </span>
                  </div>
                </p>
              )}
              {measure?.pentPanchaStyle && (
                <p className="mb-1.5 flex flex-row-reverse">
                  {measure.pentPanchaStyle === "Simple" && ""}

                  {measure.pentPanchaStyle !== "Simple" && (
                    <span className="w-9 inline-block ml-1">پانچا</span>
                  )}
                  <div className="flex flex-row-reverse gap-1">
                    <span className="font-bold">
                      {measure.pentPancha && measure.pentPancha}
                    </span>
                    <span className="font-bold text-xs flex items-center gap-2">
                      {measure.pentPanchaStyle === "Karahi Hath" &&
                        "کراہی ہاتھ"}
                      {measure.pentPanchaStyle === "Karahi Machine" &&
                        "کراہی مشین"}
                      {measure.pentPanchaStyle === "Jali Single" && "جالی سنگل"}
                      {measure.pentPanchaStyle === "Jali Double" &&
                        " جالی ڈبل "}
                      {measure.pentPanchaStyle === "Kanta" && "کانٹا"}
                    </span>
                  </div>
                </p>
              )}
              {measure?.pentGheer && (
                <p className="mb-1.5 flex flex-row-reverse">
                  <span className="w-9 inline-block ml-1"> گھیر</span>
                  <span className="font-bold">
                    {" "}
                    <DecimalConversion value={measure?.pentGheer} />
                  </span>
                </p>
              )}
              <p className="mb-1.5 flex flex-row-reverse">
                {measure?.pentStyle === "Simple" && ""}
                {measure?.pentStyle !== "Simple" && (
                  <span className="w-9 inline-block ml-1">شلوار</span>
                )}

                <span className="font-bold">
                  {measure?.pentStyle === "Trouser" && " ٹراوزر "}
                  {measure?.pentStyle === "Pajama" && "پاجامہ"}
                  {measure?.pentStyle === "Wal" && "ول والی"}
                </span>
              </p>
              <p className="mb-1.5">
                {measure?.pentPocket === "No" && ""}
                {measure?.pentPocket !== "No" && " شلوارجیب"}
                <span className="font-bold">
                  {measure?.pentPocket === "Zip" && " زپ"}
                  {measure?.pentPocket === "Single" && " سنگل"}
                  {measure?.pentPocket === "Double" && " ڈبل"}
                </span>
              </p>
              {measure?.shirtNotes && (
                <p className="mb-1.5 pt-1.5 border-t border-gray-300">
                  <>
                    <p>قمیض نوٹ</p>
                    <p> {measure?.shirtNotes}</p>
                  </>
                </p>
              )}
              {measure?.pentNotes && (
                <p className="mb-1.5 pt-1.5 border-t border-gray-300">
                  <>
                    <p>شلوار نوٹ</p>
                    <p> {measure?.pentNotes}</p>
                  </>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Print button within the print preview */}
      </div>
      <button onClick={handlePrint} className="no-print">
        Print
      </button>

      <style jsx>{`
        /* Add your additional styles for printing here */
        @media print {
          body,
          html {
            // height: 100vh; /* Use 100% here to support printing more than a single page*/
            margin: 0 !important;
            padding: 0 !important;
            // overflow: hidden;
          }
        }
      `}</style>
    </div>
  );
});

export default Print;
