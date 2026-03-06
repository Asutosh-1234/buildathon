import axios from "axios";
import { asynchandler } from "../utils/async-Handeler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/api_response.js";
import { ApiError } from "../utils/api_error.js";

const login = asynchandler(async (req, res) => {
    console.log("Login endpoint hit");
    const authURL = `https://${process.env.AUTH0_DOMAIN}/authorize` +
        `?response_type=code` +
        `&client_id=${process.env.AUTH0_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(process.env.AUTH0_CALLBACK_URL)}` +
        `&scope=openid%20profile%20email`;

    res.redirect(authURL);
});

const handleCallback = asynchandler(async (req, res) => {
    const { code, error, error_description } = req.query;

    if (error) {
        throw new ApiError(400, error_description || error);
    }

    if (!code) {
        throw new ApiError(400, "No code received from Auth0");
    }

    const tokenRes = await axios.post(
        `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
        {
            grant_type: "authorization_code",
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            code,
            redirect_uri: process.env.AUTH0_CALLBACK_URL,
        },
        { headers: { "Content-Type": "application/json" } }
    );

    const { access_token } = tokenRes.data;
    console.log("Access token received");

    const userInfoRes = await axios.get(
        `https://${process.env.AUTH0_DOMAIN}/userinfo`,
        {
            headers: { Authorization: `Bearer ${access_token}` }
        }
    );

    const { sub, name, email, picture } = userInfoRes.data;
    console.log("User info received:", email);

    const user = await User.findOneAndUpdate(
        { auth0Id: sub },
        { name, email, avatar: picture },
        { upsert: true, returnDocument: "after" }
    );

    console.log("User saved in DB:", user._id);

    res.status(200).json(new ApiResponse(200, user, "User logged in successfully"));
});

export { login, handleCallback };