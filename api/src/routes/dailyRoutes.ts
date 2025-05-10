import { Router } from 'express';
import { createDaily, getDailyById, getAllDailies, updateDaily, deleteDaily } from '../controllers/Entity/dailyController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.post("/create", createDaily);
router.get("/:id", getDailyById);   
router.get("/", getAllDailies);
router.put("/update/:id", updateDaily);
router.delete("/delete/:id", deleteDaily);

export default router;