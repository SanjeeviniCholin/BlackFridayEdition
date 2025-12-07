// middleware/auth.js
import Session from "../models/Session.js";
import User from "../models/User.js";

export async function authFetch(
  url,
  method = "GET",
  body = null,
  token = null
) {
  try {
    const finalToken = token || sessionStorage.getItem("sessionToken");

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${finalToken}`,
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const res = await fetch(
      (process.env.REACT_APP_API_BASE || "http://localhost:5000") + url,
      options
    );

    if (!res.ok) {
      const err = await res.json();
      throw err;
    }

    return await res.json();
  } catch (error) {
    console.error("authFetch error:", error);
    throw error;
  }
}
