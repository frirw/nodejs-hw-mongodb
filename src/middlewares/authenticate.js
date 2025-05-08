import createHttpError from "http-errors";

import { findSession, findUser } from "../services/auth.js";

export const authenticate = async (req, res, next) => {
    try {
        const authorization = req.get("Authorization");
        if (!authorization) {
            throw createHttpError(401, "Authorization header missing");
        }

        const [bearer, accessToken] = authorization.split(" ");
        if (bearer !== "Bearer") {
            throw createHttpError(401, "Header must have type Bearer");
        }

        const session = await findSession({ accessToken });
        if (!session) {
            throw createHttpError(401, "Session not found");
        }

        if (session.accessTokenValidUntil < Date.now()) {
            throw createHttpError(401, "Access token expired");
        }

        const user = await findUser({ _id: session.userId });
        if (!user) {
            throw createHttpError(401, "User not found");
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};
