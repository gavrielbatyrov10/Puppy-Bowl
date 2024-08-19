const prisma = require("../prisma");

const seed = async () => {
  for (let i = 1; i <= 10; i++) {
    await prisma.puppy.upsert({
      where: { id: i },
      update: {},
      create: {
        name: `name ${i}`,
        breed: `Breed ${i % 3}`,
      },
    });
  }
};

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
