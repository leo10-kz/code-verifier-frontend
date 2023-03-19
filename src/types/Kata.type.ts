export type Kata = {
  // _id: string,
   name: string,
   description: string,
   level: string,
   intents: number,
   stars: number,
   creator: string, // Id of User
   solution: string,
   participants: string[]
};