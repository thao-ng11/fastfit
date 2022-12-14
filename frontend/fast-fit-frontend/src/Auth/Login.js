import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "../Authentication";
import fastfit from "../fastfit2.png";
export default function Login() {
  const [token, login] = useToken();
  // console.log(token)
  let navigate = useNavigate();
  let [data, setData] = useState({
    username: "",
    password: "",
    error: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(data.username, data.password);
    // setData({error: error})
    setData({
      username: "",
      password: "",
    });
    navigate("/dashboard");
  };

  if (token) {
    navigate("/dashboard");
  }
  return (
    <section className="w-full h-1000px px-8 py-16 bg-[#073b4c] xl:px-8 tails-selected-element">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center md:flex-row">
          <div className="w-full space-y-5 md:w-3/5 md:pr-16">
            <p
              className="font-medium text-[#f1f1f1] uppercase"
              data-primary="blue-500"
            >
              Building A Healthier You
            </p>
            <div className="flex">
              <img
                alt="fastFIT"
                src={fastfit}
                className="h-[100px] w-[100px] pr-0"
              />
              <h2 className="text-7xl italic text-[#fff2f1] font-bold">
                <span className="text-[#8e4162]">ast</span>
                <span className="text-[#bf9aca]">FIT</span>
              </h2>
            </div>
            <p className="text-xl text-[#f1f1f1] md:pr-16">
              Interactable new way to track and plan your fitness and nutrition!
            </p>
          </div>
          <form onSubmit={handleSubmit} id="login-form">
            <div className="w-full mt-16 md:mt-0">
              <div
                className="relative z-10 h-auto p-8 py-8 overflow-hidden bg-[#c7e8f3] border-b-2 border-gray-300 rounded-lg shadow-2xl px-7 tails-selected-element"
                data-rounded="rounded-lg"
                data-rounded-max="rounded-full"
              >
                <h3 className="mb-8 text-3xl text-center font-bold font-sans tracking-wide text-[#8e4162]">
                  Log in
                </h3>
                <input
                  onChange={(event) =>
                    setData({ ...data, username: event.target.value })
                  }
                  type="text"
                  id="username"
                  className="block border border-grey-light w-full p-3 rounded mb-4 bg-[#f1f1f1]"
                  name="username"
                  placeholder="Username"
                />

                <input
                  onChange={(event) =>
                    setData({ ...data, password: event.target.value })
                  }
                  type="password"
                  className="block border border-grey-light w-full p-3 rounded mb-4 bg-[#f1f1f1]"
                  name="password"
                  placeholder="Password"
                />

                <div className=" grid place-items-center">
                  <button
                    className="w-100px px-3 py-2 font-medium text-white bg-[#8e4162] rounded-lg"
                    data-primary="blue-600"
                    data-rounded="rounded-lg"
                  >
                    Log Me In
                  </button>
                </div>
              </div>
            </div>
            <div>
              <p className=" grid place-items-center w-full mt-4 text-sm text-center text-[#f1f1f1]">
                Don't have an account?{" "}
                <a
                  href="../signup"
                  className="grid place-items-center max-w-70px underline hover:text-[#722f37]"
                >
                  Sign up here
                </a>
              </p>
            </div>
          </form>
        </div>

        <div className="container px-8 mx-auto sm:px-12 lg:px-20 justify-center">
          <h1 className="text-sm pt-20 font-bold tracking-wide text-center text-[#f1f1f1] uppercase mb-7">
            Built on
          </h1>
          <div className="flex items-center justify-center grid-cols-2 gap-y-8">
            <div className="flex items-center justify-center col-span-1 row-span-1">
              <img
                src="https://upload.wikimedia.org/wikiversity/en/8/8c/FastAPI_logo.png"
                alt="Hubspot"
                className="block object-contain h-9"
              />
            </div>
            <div className="flex items-center justify-center col-span-1 row-span-1">
              <img
                src="https://logos-download.com/wp-content/uploads/2016/09/React_logo_wordmark.png"
                alt="Youtube"
                className="block object-contain h-7 lg:h-8"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
