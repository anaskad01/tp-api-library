import { Request, Response, NextFunction } from "express";

export const roleMiddleware = (requiredRole: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user; // L'utilisateur doit être ajouté à la requête après vérification du token

        if (!user || user.role !== requiredRole) {
            return res.status(403).json({ message: "Access denied: insufficient permissions" });
        }

        next();
    };
};
