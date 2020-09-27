import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Timer from "../components/timer";
import styles from "../styles/Home.module.css";

export default function Home(db) {
  const [isButton, setIsButton] = useState(false);
  const [user, setUser] = useState("");
  const router = useRouter();

  const handleLink = () => {
    router.push("/auth/login");
  };

  const clickButton = async (e) => {
    try {
      const click = { [e.target.name]: e.target.value };
      let ti = setTimeout(() => {
        setIsButton(false);
      }, 20000);
      setIsButton(true);
      clearTimeout(ti);
      const userId = user._id;
      console.log(userId);
      const res = await fetch(`http://localhost:3000/api/connectDB?base=/`, {
        method: "POST",
        body: JSON.stringify({ click, userId }),
      });
      // const userClick = await fetchData(user);
      // console.log(userClick);
      // setUser(userClick);
      // console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async (us) => {
    try {
      const data = await fetch(
        `http://localhost:3000/api/home?userId=${us.userId}`
      );
      const dataUser = await data.json();
      setUser(dataUser);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const res = JSON.parse(localStorage.getItem("user"));
    if (!res) {
      return handleLink();
    }
    if (res) {
      fetchData(res);
    }
  }, [clickButton]);

  return (
    <div className={styles.container}>
      <Head>
        <title>test work</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
        />
      </Head>
      <main className={styles.main}>
        {/* <form method="POST"> */}
        <button
          type="submit"
          name="button"
          value="button1"
          disabled={isButton}
          onClick={clickButton}

          // onChange={handler}
        >
          Кнопка 1
        </button>
        <button
          type="submit"
          name="button"
          value="button2"
          onClick={clickButton}
          disabled={isButton}
          // onChange={handler}
        >
          Кнопка 2
        </button>
        <button
          type="submit"
          name="button"
          value="button3"
          onClick={clickButton}
          disabled={isButton}
          // onChange={handler}
        >
          Кнопка 3
        </button>
        {/* </form> */}
        {isButton && <Timer isButton={isButton} />}
        <div className="card">
          {!user && <Loader />}
          {user && (
            <div className="click">
              <p>Кнопка 1 натиснута {user.clicks.button1} раз</p>
              <p>Кнопка 2 натиснута {user.clicks.button2} раз</p>
              <p>Кнопка 3 натиснута {user.clicks.button3} раз</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// export async function getStaticProps() {
//   const res = await fetch("http://localhost:3000/api/connectDB");
//   const db = await res.json();

//   return {
//     db: {
//       db,
//     },
//   };
// }
