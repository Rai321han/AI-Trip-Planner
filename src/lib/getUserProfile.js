import axios from "axios";

export async function getUserProfile(tokenInfo) {
  const res = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
    {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: "Applicaiton/json",
      },
    }
  );
  localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
}
