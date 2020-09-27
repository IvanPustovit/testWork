import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Loader from "../../components/Loader";
import { BASE_URI } from "../../next.config";

const login = () => {
  const [form, setForm] = useState("");
  const [isload, setIsLoad] = useState(false);
  const router = useRouter();

  const handleLink = () => {
    router.push("/");
  };

  const handler = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    try {
      e.preventDefault();
      setIsLoad(true);
      const res = await fetch(`${BASE_URI}/api/connectDB?base=/auth/login`, {
        method: "POST",
        body: JSON.stringify(form),
      });
      const user = await res.json();

      if (Object.keys(user).length === 0) {
        setIsLoad(false);
        return M.toast({
          html: `Невірно введено email або пароль`,
        });
      }
      setIsLoad(false);
      handleLink();
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3 ">
        <h1 className="widht-auth">Увійти на сайт</h1>

        <div className="card blue-grey darken-1">
          {isload && <Loader />}
          <div className="card-content white-text">
            <span className="card-title">Авторизація</span>
            <div>
              <form method="POST" action="/auth/login" onSubmit={login}>
                <div className="input-field">
                  <label htmlFor="email">Ваш email</label>
                  <input
                    placeholder="Напишіть Ваш Email"
                    name="email"
                    type="email"
                    className="validate"
                    onChange={handler}
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="password">Ваш пароль</label>
                  <input
                    placeholder="Напишіть Ваш пароль"
                    name="password"
                    type="password"
                    onChange={handler}
                    className="validate"
                  />
                </div>
                <div className="card-action">
                  <Link href="/auth/register" name="action">
                    Зареєструватися
                  </Link>

                  <button className="btn yellow darken-4" type="submit">
                    Увійти
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
