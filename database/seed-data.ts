import { Entry } from "../interfaces"

type NewEntry = Omit<Entry, "id">

interface SeedData {
  entries: NewEntry[]
}

export const seedData: SeedData = {
  entries: [
    {
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum amet debitis porro quos cum, sunt sed vitae molestias fuga blanditiis rem a vero placeat, repellendus temporibus quibusdam fugit perspiciatis harum.",
      createdAt: Date.now(),
      status: "pending",
    },
    {
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum amet debitis porro quos cum,",
      createdAt: Date.now() - 1000000,
      status: "in-progress",
    },
    {
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores molestiae quibusdam, culpa neque enim nam eius nostrum voluptatem et, excepturi repudiandae error corrupti nemo maiores, mollitia ex illo tempore veritatis?",
      createdAt: Date.now() - 100000,
      status: "finished",
    },
  ],
}
