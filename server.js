const BASE_URL = "https://jsonplaceholder.typicode.com";

async function getUsers() {
  try {
    const res = await fetch(`${BASE_URL}/users`)
      if (!res.ok) throw new Error("Request failed: " + res.status);
      const users = await res.json()
    return users;
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
}



async function createPost(title, body) {
  if (!title || !body) {
    throw new Error("All fields are required");
  }
  try {
    const res = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    })
      if (!res.ok) throw new Error("Request failed: " + res.status);
      const post = await res.json();
    return post;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create post");
  }
}




async function fetchCar(id) {
  if (!id) throw new Error("Please provide id");
  if (typeof id !== "number") throw new Error("Invalid id type");
  try {
    const res = await fetch(`${BASE_URL}/posts/${id}`)
      if (!res.ok) {
        throw new Error("Request failed: " + res.status);
      }
      const car = await  res.json();
    return car;
  } catch (error) {
    throw new Error("Failed to Fetch car");
  }
}


async function main(id, title, body) {
  if (!id || !title || !body) {
    throw new Error("All fields are required");
  }
  try {
    const user = await getUsers()
    const post = await createPost(title, body)
    const car = await fetchCar(id)
    const [car1, car2] = await Promise.all([
      fetchCar(1),
      fetchCar(2)
    ]);
    console.log(car1, car2);
    
    return {user, post, car}
  } catch (error) {
    console.log(error)
    throw new Error("Something went wrong");
  }
}

console.log(main(2, "test", "test"))