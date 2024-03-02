 export async function getItems() {
    try {
      const res = await fetch("http://localhost:3000/items");
      if (!res.ok) {
        throw new Error("failed to fetch");
      }
      return await res.json();

    } catch (err) {
      console.log(err);
    }
  }