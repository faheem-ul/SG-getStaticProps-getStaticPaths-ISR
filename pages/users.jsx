import Link from "next/link";

function Users({ users }) {
  return (
    <div>
      <h1>List of users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            `{user.name}` {""} has an email `{user.email}`
          </li>
        ))}
      </ul>
      <Link href="/userdetails">userdetails</Link>
    </div>
  );
}

export default Users;

export async function getStaticProps() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await res.json();
    // console.log(users);
    return {
      props: {
        users,
      },
    };
  } catch (error) {
    console.log("error in fetching users", error);
  }
}
