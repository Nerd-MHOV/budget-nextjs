"use client";
import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import { CallbackProps } from "@/components/layout/Message/interface";
import Image from "next/image";
import Btn from "@/components/layout/Btn/Btn";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Message from "@/components/layout/Message/Message";
const SignInPage = () => {
  const [user, setUser] = useState("");
  const [passwd, setPasswd] = useState("");
  const [callback, setCallback] = useState<CallbackProps>({});

  async function handleLogin(e: Event) {
    e.preventDefault();

    const result = await signIn("credentials", {
      username: user,
      password: passwd,
      redirect: true,
      callbackUrl: "/",
    });
  }

  useEffect(() => {
    if (callback.type) {
      setTimeout(() => {
        setCallback({});
      }, 5000);
    }
  }, [callback]);

  return (
    <div className="login">
      <div className="loginBox">
        <form>
          <div className="logo">
            <div className="image">
              <Image
                src="/GrupoperaltasCompleto.png"
                alt="Logo"
                width={400}
                height={88}
              />
            </div>
            <div className="desc">Sistema de Orçamentos</div>
          </div>

          {callback.type && (
            <Message message={callback.message} type={callback.type} />
          )}

          <label>
            <span className="field">Usuario:</span>
            <input
              onChange={(e) => setUser(e.target.value)}
              type="text"
              name="user"
              placeholder="Informe seu usuario..."
            />
          </label>
          <label>
            <span className="field">Senha:</span>
            <input
              onChange={(e) => setPasswd(e.target.value)}
              autoComplete=""
              type="password"
              name="passwd"
              placeholder="Informe sua senha..."
            />
          </label>
          <div className="formAction">
            {/* Recuperar Senha */}
            {/* <Link to="/" className={"link"}></Link> */}
            {/* _______________ */}
            <Btn action={"Logar-se"} color={"green"} onClick={handleLogin} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
