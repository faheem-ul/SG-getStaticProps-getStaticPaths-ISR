import Link from "next/link";

function userdetails({ posts }) {
  return (
    <div>
      <h1>List of users</h1>

      {posts.map((post) => {
        return (
          <div key={post.id}>
            <Link href={`/posts/${post.id}`}>
              {/* when the fallback is true and we naviagte to the /posts/id route with this link, then no loading state will occur
              on screen as all the files are statically generated and can be seen in the network. */}
              <h4>
                {post.id} {""}
                {""}
                {""}
                {post.title}
              </h4>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default userdetails;

export async function getStaticProps() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();

    return {
      props: {
        posts: data,
      },
    };
  } catch (error) {
    console.log("Failed to get posts", error);
  }
}
