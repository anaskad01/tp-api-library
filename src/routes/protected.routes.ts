import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const router = Router();

router.get("/admin", authMiddleware, roleMiddleware("admin"), (req, res) => {
    res.json({ message: "Bienvenue, admin !" });
});

router.get("/gerant", authMiddleware, roleMiddleware("gerant"), (req, res) => {
    res.json({ message: "Bienvenue, gérant !" });
});

router.get("/utilisateur", authMiddleware, roleMiddleware("utilisateur"), (req, res) => {
    res.json({ message: "Bienvenue, utilisateur !" });
});

export default router;
