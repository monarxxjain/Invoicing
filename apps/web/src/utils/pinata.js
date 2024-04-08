// https://lime-adjacent-gamefowl-120.mypinata.cloud/ipfs/

const axios = require("axios");
const FormData = require("form-data");
// const fs = require("fs");

const JWT = process.env.PINATA_KEY
const PINATA_BASE_URL = process.env.PINATA_BASE_URL

const pinFileToIPFS = async (file) => {
  console.log("JWT ",JWT);
  const formData = new FormData();

  formData.append("file", file);

  const pinataMetadata = JSON.stringify({
    name: "File name",
  });
  formData.append("pinataMetadata", pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", pinataOptions);

  try {
    const res = await axios.post(
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
    // console.log("File uploaded to IPFS:", res.data);

    const sellerAddress = "0xu3289483242";
    const metadataObj = {
      description: "The NFT to the Bill uploaded by the Company",
      external_url: `${PINATA_BASE_URL}/ipfs/${res.data.IpfsHash}`,
      image: "https://i1.sndcdn.com/avatars-000672907826-20999i-t240x240.jpg",
      name: `Company Bill NFT ${sellerAddress}`,
      attributes: [
        {
          trait_type: "sellerAddress",
          value: sellerAddress
        },
        {
          display_type: "date",
          trait_type: "createdAt",
          value: Date().toString()
        },
        {
          trait_type: "systemAddress",
          value: "0x876876876876876"
        },
        {
          trait_type: "billAddress",
          value: `${PINATA_BASE_URL}/ipfs/${res.data.IpfsHash}`
        }
      ]
    };

    const metadata = JSON.stringify(metadataObj);

    try {
      const metadataRes = await axios.post(
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
    //   console.log("Metadata pinned to IPFS:", metadataRes.data);
      return metadataRes.data;
    } catch (error) {
      console.error("Error pinning metadata to IPFS:", error.message, JSON.stringify(error));
    }
  } catch (error) {
    console.error("Error uploading file to IPFS:", error.message);
  }
};

export default pinFileToIPFS;
