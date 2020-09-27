import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Timer from "../components/timer";
// import { BASE_URI } from "../next.config";
import styles from "../styles/Home.module.css";

export default function Home(db) {
  const [isButton, setIsButton] = useState(false);
  const [user, setUser] = useState("");
  const [click, setClick] = useState();

  const router = useRouter();

  const handleClick = (e) => {
    setClick({ ...click, [e.target.name]: e.target.value });
    console.log(click);
  };

  const handleLink = () => {
    router.push("/auth/login");
  };

  const clickButton = async (e) => {
    try {
      console.log(e.target.value);

      handleClick(e);
      setIsButton(true);
      setTimeout(() => {
        setIsButton(false);
      }, 20000);
      console.log(click);
      const res = await fetch(
        `https://test-work-alpha.vercel.app/api/connectDB?base=/`,
        {
          method: "POST",
          body: JSON.stringify(click),
          userId: user._id,
        }
      );
      const userClick = await res.json();
      console.log(userClick);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async (us) => {
    try {
      const data = await fetch(
        `https://test-work-alpha.vercel.app/api/home?userId=${us.userId}`
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
  }, []);

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
        <form onChange={handler} method="POST">
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
        </form>
        {isButton && <Timer isButton={isButton} />}
        {user && (
          <div className="click">
            <p>Кнопка 1 натиснута {user.clicks.button1} раз</p>
            <p>Кнопка 3 натиснута {user.clicks.button3} раз</p>
            <p>Кнопка 2 натиснута {user.clicks.button2} раз</p>
          </div>
        )}
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
