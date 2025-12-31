import dataSource from "@root/data/data-source.json";
import { AppQuery, userRepository } from "@/common/container";

const data = dataSource.users.map((i) => ({
  name: i.name,
  email: i.email,
  password: "12345",
  role: i.role.toUpperCase(),
  created_at: new Date(),
  updated_at: new Date(),
  created_by: +i.created_by,
  updated_by: +i.updated_by,
}));

export async function seed(reset: boolean = true) {
  if (reset) await userRepository.deleteMany(new AppQuery({}));

  for (const item of data) await userRepository.create(item);
  console.log(`Seeded ${data.length} users.`);
}
