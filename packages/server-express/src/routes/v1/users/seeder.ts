import dataSource from "@root/data/data-source.json";
import { userRepository } from "@/common/container";
import { hashPassword } from "@/common/auth/password.utils";

const password = await hashPassword(`12345`);

const data = dataSource.users.map((i) => ({
  name: i.name,
  email: i.email,
  password,
  role: i.role.toUpperCase(),
  created_at: new Date(),
  updated_at: new Date(),
  created_by: +i.created_by,
  updated_by: +i.updated_by,
}));

export async function seed(reset: boolean = true) {
  if (reset) await userRepository.deleteMany({});

  for (const item of data) await userRepository.create(item);
  console.log(`Seeded ${data.length} users.`);
}
