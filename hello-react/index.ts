interface User {
  name: string;
  id: number;
  isAdmin: boolean;
}

let newUser: User = {
  name: "Jane",
  id: 1,
  isAdmin: false
};

function addUser(user: User): string {
  return user.name + " added successfully";
}

console.log(addUser(newUser));