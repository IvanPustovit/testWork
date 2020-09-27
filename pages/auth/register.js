import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Loader from "../../components/Loader";
import { BASE_URI } from "../../next.config";

const register = () => {
  const [form, setForm] = useState("");
  const [isload, setIsLoad] = useState(false);
  const router = useRouter();

  const handleLink = () => {
    router.push("/auth/login");
  };

  const handlerForm = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerUser = async (e) => {
    try {
      e.preventDefault();
      setIsLoad(true);
      const user = await fetch(`${BASE_URI}/connectDB?base=/auth/register`, {
        method: "POST",
        body: JSON.stringify(form),
      }).then((res) => res.json());
      if (Object.keys(user).length === 0) {
        setIsLoad(false);
        return M.toast({ html: `Користувач з email ${form.email} існує` });
      }
      const newUser = await user.ops[0];
      if (newUser) {
        setIsLoad(false);
        handleLink();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="row">
      <div className="col s6 offset-s3 ">
        <h1 className="widht-auth">Зареєструватися на сайті</h1>

        <div className="card blue-grey darken-1">
          {isload && <Loader />}
          <div className="card-content white-text">
            <span className="card-title">Авторизація</span>

            <form method="POST" action="/auth/register" onSubmit={registerUser}>
              <div className="input-field">
                <label htmlFor="email">Ваш email</label>
                <input
                  placeholder="Напишіть Ваш Email"
                  name="email"
                  type="email"
                  className="validate"
                  onChange={handlerForm}
                />
              </div>
              <div className="input-field">
                <label htmlFor="password">Ваш пароль</label>
                <input
                  placeholder="Напишіть Ваш пароль"
                  name="password"
                  type="password"
                  className="validate"
                  onChange={handlerForm}
                />
              </div>
              <div className="card-action">
                <Link href="/auth/login" name="action">
                  Увійти
                </Link>

                <button className="btn yellow darken-4" type="submit">
                  Зареєструватися
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default register;
