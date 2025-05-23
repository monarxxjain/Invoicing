const axios = require("axios");
const FormData = require("form-data");
import dotenv from "dotenv";
dotenv.config();

const JWT = process.env.PINATA_KEY
const GATEWAY = process.env.PINATA_BASE_URL

const pinFileToIPFS = async (file, sellerAddress) => {
  console.log("JWT ",JWT);
  const formData = new FormData();

  formData.append("file", file);

  const pinataMetadata = JSON.stringify({
    name: `invoice-${Date.now()}-${sellerAddress}`,
  });
  formData.append("pinataMetadata", pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", pinataOptions);

  try {
    const fileUploadRes = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: `Bearer ${JWT}`,
        },
      }
    );
    console.log("File uploaded to IPFS");

    const fileHash = fileUploadRes.data.IpfsHash;
    const fileUrl = `${GATEWAY}/${fileHash}`;

    const metadata = {
      seller: sellerAddress,
      uploaded_at: new Date().toISOString(),
      file_url: fileUrl,
      file_cid: fileHash,
      file_type: "application/pdf",
      notes: "This file contains a collection of invoices submitted by the seller for funding evaluation.",
    };


      const metadataUploadRes = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        metadata,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWT}`,
          },
        }
      );

      console.log("Metadata pinned to IPFS");
      const metadataCID = metadataUploadRes.data.IpfsHash;
      const metadataURL = `${GATEWAY}/${metadataCID}`;

      return {
        fileCID: fileHash,
        fileURL: fileUrl,
        metadataCID,
        metadataURL,
      };


  } catch (error) {
    console.error("Error uploading invoice to IPFS:", error?.response?.data || error.message);
    throw new Error("IPFS upload failed");
  }
};

export default pinFileToIPFS;
