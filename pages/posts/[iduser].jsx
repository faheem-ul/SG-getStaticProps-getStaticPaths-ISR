import { useRouter } from "next/router";

function Iduser({ post }) {
  // const router = useRouter();

  // if (router.isFallback) {
  //   return (
  //     <div>
  //       <h1>Loading</h1>
  //     </div>
  //   );
  // }

  // the above step is followed in the case when we set the fallback vakue to true.
  return (
    <div>
      {/* {console.log(post.id)} */}
      <h2>{post.id}</h2>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
}

export default Iduser;

// this is the case when we only have certain ids. let say 5 or 10. but if we have the 100 posts and their respective ids,
// then this is not the case.

// moreover, in the case wehere the ids are generated manually like we did in the following getStaticPaths function, the set of fallback
// key to false will make two things

// 1: The paths (which is an array) retruned by getStaticPaths will be rendered to html at build time by getStaticProps
// 2: The paths which are not returned by getStaticPaths will result in 404 error.

// the below function has 3 paths, whereas we are fetching all posts in the getstatiscprops function, but the only 3 ids will be rendered
// so in case, if we wanted to visit the path with id greater than 3, would result in 404 erroe

// export async function getStaticPaths() {
//   return {
//     paths: [
//       { params: { iduser: "1" } },
//       { params: { iduser: "2" } },
//       { params: { iduser: "3" } },
//     ],
//     fallback: true,
//   };
// }
export async function getStaticPaths() {
  return {
    paths: [
      { params: { iduser: "1" } },
      { params: { iduser: "2" } },
      { params: { iduser: "3" } },
    ],
    fallback: "blocking",
  };
}

// in the following example, the paths are generated as amny as there are the ids. however,if we want that the paths of only 10 ids
// should be generated and reaching any path greater than 10 should generate 404 error, we can use slice method while generating the array
// of paths as;
//
// if we want to generate the ids dynamically then;
//  const paths = data.slice(0, 3).map((post) => {
//   return {
//     params: {
//       iduser: `${post.id}`,
//     },
//   };
// });

// export async function getStaticPaths() {
//   const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//   const data = await res.json();

//   const paths = data.map((post) => {
//     return {
//       params: { iduser: `${post.id}` },
//     };
//   });

//   return {
//     paths: paths,
//     fallback: false,
//   };
// }

export async function getStaticProps(context) {
  // console.log("context", context);
  const { params } = context;
  // console.log(params);
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${params.iduser}`
    );
    const data = await res.json();
    // console.log(users);

    // if (!data.id) {
    //   return {
    //     notFound: true,
    //   };
    // }

    // the above if condition will be applied only if we have set the value of fallback as true. this will navigate us to 404 page,
    // in case when there is no id available.
    return {
      props: {
        post: data,
      },
    };
  } catch (error) {
    console.error(error);
  }
}

// the code below is used to understand the concept that of static side generation. There are two cases.

// Case 1:

// In first case, we have used a settimeout function in which we have three consoles. first is right after the function getStaticprops,
// then second is inisde the settimeout and last is after the settimeout function. in this case, we get the output in
// the sequence where we get the first console, then the last console and then the console which is inside the settimeout.

// Case 2:
// In second case we have made an async function with name test inside the getStaticprops. In the return of test function we have made a
// promise and isnide that promise we have used the setTimeout function. now the consoles are written in a manner that first console is
// before the test function (inside the getStaticprops), second is inside the setTimeout function (which is inside the test function) and
// last is after calling the test async function. noe the sequence of the ouput is in the manner that  we see the first console, then our
// website gets on loading for 15 seconds and when loaded we get the comsole of settimeout and then the last console.

// Conclusion:
// Now the getStaticprops function is rendered on the server side and page is statically generated. in first case, the settimeout function
// made its console to wait for some time however renders the rest of consoles. but in second case the  settimeout function is inside the
// promise function, so when the promise is resolved then it will move on. thats why in second case, our website was loading for
// 15 seconds. this is similar to an api call where we use async await and some time is required to fetch the data so that our website get
// on loaded state.

// export async function getStaticProps() {
// console.log("before");

// case 1:
// setTimeout(() => {
//   console.log("inside timeout");
// }, 5000);

// case 2:

// async function test() {
//   return new Promise(function (resolve, reject) {
//     setTimeout(function () {
//       console.log("inside timeout");
//       resolve("timeout promise");
//     }, 15000);
//   });
// }
// await test();

// console.log("after timeout");

// props object should be in return
// return {
//   props: {
//     post: {
//       id: 1,
//       title: "post 1",
//       body: "post 1 body",
//     },
//   },
// };
// }
