const prisma = require("./prisma");
const router = require("express").Router();
module.exports = router;

// GET all puppies
router.get("/", async (req, res, next) => {
  try {
    const puppies = await prisma.puppy.findMany();
    res.json(puppies);
  } catch (error) {
    console.error("Error fetching puppies:", error);
    next(error);
  }
});

// GET puppy by ID
router.get("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const puppy = await prisma.puppy.findUnique({ where: { id } });

    if (!puppy) {
      return next({
        status: 404,
        message: `Puppy with ID #${id} does not exist.`,
      });
    }

    res.json(puppy);
  } catch (error) {
    console.error("Error fetching puppy:", error);
    next(error);
  }
});

// POST create a new puppy
router.post("/", async (req, res, next) => {
  try {
    const { name, breed } = req.body;
    const puppy = await prisma.puppy.create({
      data: { name, breed },
    });
    res.status(201).json(puppy);
  } catch (error) {
    console.error("Error creating puppy:", error);
    next(error);
  }
});

// DELETE a puppy by ID
router.delete("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const puppy = await prisma.puppy.findUnique({ where: { id } });

    if (!puppy) {
      return next({
        status: 404,
        message: `Puppy with ID #${id} does not exist.`,
      });
    }

    await prisma.puppy.delete({ where: { id } });

    // Respond with 201 Created and a confirmation message
    res
      .status(201)
      .json({ message: `Puppy with ID #${id} has been successfully deleted.` });
  } catch (error) {
    console.error("Error deleting puppy:", error);
    next(error);
  }
});
