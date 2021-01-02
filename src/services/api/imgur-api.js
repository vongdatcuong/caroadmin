const imgurConfig = {
  cid1: "9be17502",
  cid2: "7684270",
  cs1: "94682f98",
  cs2: "479dbf00",
  cs3: "27083d34",
  cs4: "587293e4",
  cs5: "ed47ea78",
};
const uploadImage = async (base64Image) => {
  const cliId = `${imgurConfig.cid1}${imgurConfig.cid2}`;
  const token = `Client-ID ${cliId}`;
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      image: base64Image,
    }),
  };
  return fetch("https://api.imgur.com/3/image", requestOptions);
};
const ImgurApiService = { uploadImage };
export default ImgurApiService;
