"use strict";
const User = use("App/Models/User");

initialApp();
async function initialApp() {
  await User.findOrCreate(
    { email: "admin@uctopus.com" },
    {
      email: "admin@uctopus.com",
      username: "admin",
      name: "admin",
      lastname: "admin",
      password: "admin",
      admin: true
    }
  );
  console.log("User admin success");
}
