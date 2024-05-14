import React, { useState } from "react";

// eslint-disable-next-line react/prop-types
const ModalWithoutCrop = ({ updateAvatar, closeModal }) => {
  const [imgSrc, setImgSrc] = useState("");
  const [error, setError] = useState("");
  const [img, setImg] = useState("");

  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImg(file);
    console.log("fileInput", imgSrc);

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImgSrc(reader.result);
    });
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!imgSrc) {
      setError("Please select an image.");
      return;
    }
    updateAvatar(img);
    closeModal();
  };

  return (
    <div
      className="relative z-50"
      aria-labelledby="crop-image-dialog"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-main bg-opacity-75 transition-all backdrop-blur-sm"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center px-2 py-12 text-center ">
          <div className="relative sm:w-[60%] min-h-[60vh] rounded-2xl bg-main-10 text-slate-100 text-left shadow-xl transition-all">
            <div className="px-5 py-4">
              <button
                type="button"
                className="rounded-md p-1 inline-flex items-center justify-center text-main-200 hover:bg-gray-200 focus:outline-none absolute top-2 right-2"
                onClick={closeModal}
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <input
                type="file"
                accept="image/*"
                onChange={onSelectFile}
                className="block w-full text-sm text-main-400 file:mr-4 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-xs file:bg-main-300 file:text-white hover:file:bg-main-400"
              />
              {error && <p className="text-red-500 text-xs">{error}</p>}
              {imgSrc && (
                <img
                  src={imgSrc}
                  alt="Selected"
                  className="max-w-full mt-4 mb-2 rounded"
                />
              )}
              {imgSrc && (
                <button
                  className="text-white text-xs py-2 px-4 rounded-xl bg-main-100 hover:bg-main-300"
                  onClick={handleSubmit}
                >
                  Ubah Photo
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalWithoutCrop;
