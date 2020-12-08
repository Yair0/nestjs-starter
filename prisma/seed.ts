import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  console.log('Seeding...');

  const user1 = await prisma.user.create({
    data: {
      name: 'Yolo',
      email: 'yolo@email.com',
      posts: {
        create: [
          {
            title: 'Post Yolo 01',
            content: 'hello world',
          },
          {
            title: 'Post Yolo 02',
            content: 'hello world',
            published: true,
          },
        ],
      },
    },
  });
  const user2 = await prisma.user.create({
    data: {
      name: 'Deivid',
      email: 'deivid@email.com',
      posts: {
        create: [
          {
            title: 'Post Deivid 01',
            content: 'hello mexico',
            published: true,
          },
          {
            title: 'Post Deivid 02',
            content: 'hello mexico',
            published: true,
          },
        ],
      },
    },
  });

  console.log({ user1, user2 });
};

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
