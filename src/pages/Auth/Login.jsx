import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const cred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(cred.user, { displayName: name });
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex h-screen w-full bg-orange-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-2/3 h-full bg-orange-400 rounded-r-[100%] -translate-x-1/4 z-0" />

      <div className="relative z-10 flex items-center justify-center w-full px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2 font-mono">
              BidFlow
            </h1>
            <h2 className="text-xl font-semibold">
              {isLogin ? "Acesse sua conta" : "Cadastro"}
            </h2>
            <div className="flex justify-center mt-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-2xl">
                🦜
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <Input
                  placeholder="Nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label="Nome Completo"
                  required
                />
                <Input
                  placeholder="Telefone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  label="Telefone"
                />
              </>
            )}
            <Input
              type="email"
              placeholder="email@exemplo.com.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="E-mail"
              required
            />
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Senha"
              required
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button variant="primary" className="w-full py-3 mt-4">
              {isLogin ? "Entrar" : "Criar conta"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-orange-600 font-bold ml-1 hover:underline"
            >
              {isLogin ? "Cadastre-se" : "Faça login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
