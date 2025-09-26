import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, "your_secret_key");
        (req as any).user = decoded; // Ajoute les informations de l'utilisateur à la requête
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
