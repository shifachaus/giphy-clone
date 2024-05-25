import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

const EmbedModal = ({ gif, setShowEmbedModal }) => {
  const [copied, setCopied] = useState(false);

  const EMBED_CODE = `<iframe src="https://giphy.com/embed/${gif?.id}" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p className="text-center"><a href="https://giphy.com/gifs/${gif?.slug}">via GIPHY</a></p>`;

  const copyToClipboard = () => {
    setCopied(true);
    navigator.clipboard
      .writeText(EMBED_CODE)
      .then(() => {
        setTimeout(() => {
          setCopied(false);
        }, 1000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  return (
    <div className="fixed z-40 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className=" p-4 rounded shadow-lg w-1/2">
        <div className="flex justify-between items-center">
          <h2 className="text-md font-bold mb-2 text-white">Embed Code</h2>

          <button
            onClick={() => setShowEmbedModal(false)}
            className=" text-black bg-gray-100/80 hover:bg-gray-100 rounded-full px-1 py-1"
          >
            <IoCloseOutline />
          </button>
        </div>

        <div className="flex">
          <div
            className="py-2 px-1 border rounded-tl rounded-bl text-black bg-gray-100 overflow-hidden"
            style={{ whiteSpace: "nowrap" }}
          >
            {EMBED_CODE}
          </div>

          <button
            onClick={copyToClipboard}
            disabled={copied}
            className={`p-4 bg-white  ${
              copied
                ? "bg-gradient-to-bl from-green-500 to-green-400"
                : "bg-gradient-to-bl from-purple-700 to-purple-500"
            } text-white px-4 py-2 rounded-tr rounded-br`}
          >
            {!copied ? (
              <span className=" font-medium text-sm text-nowrap">
                Copy Code
              </span>
            ) : (
              <span className=" font-medium text-sm text-nowrap">
                Link Copied!
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmbedModal;
