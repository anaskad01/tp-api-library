import sequelize from '../src/config/database';
import { User } from '../src/models/user.model';

async function seedUsers() {
  try {
    await sequelize.sync({ alter: true });

    const existingUsers = await User.findAll();
    console.log(`Found ${existingUsers.length} existing users`);

    const usersToCreate = [
      { username: 'admin', password: 'admin123', role: 'admin' },
      { username: 'gerant', password: 'gerant123', role: 'gerant' },
      { username: 'utilisateur', password: 'user123', role: 'utilisateur' }
    ];

    for (const userData of usersToCreate) {
      const existingUser = await User.findOne({ where: { username: userData.username } });
      if (!existingUser) {
        await User.create(userData);
        console.log(`Created user: ${userData.username} with role: ${userData.role}`);
      } else {
        console.log(`User ${userData.username} already exists`);
      }
    }

    console.log('Seed completed successfully!');
  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    await sequelize.close();
  }
}

seedUsers();