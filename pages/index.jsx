import Link from "next/link";

function Home() {
  return (
    <div>
      <h1>Home page to get users</h1>
      <Link href="/users">users</Link>
    </div>
  );
}

export default Home;
