import {
  Button,
  Flex,
  Link,
  Separator,
  Text,
  TextField,
} from "@radix-ui/themes";
import { CardSignIn, ContainerSignIn } from "./styles";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import google from "@assets/google.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@hooks/useToast";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, database, googleProvider } from "@services/firebase";
import { get, ref } from "firebase/database";

const loginUserFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
});

export type createUserFormData = z.infer<typeof loginUserFormSchema>;

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const navigate = useNavigate();

  const { openToast } = useToast();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createUserFormData>({
    resolver: zodResolver(loginUserFormSchema),
  });

  function onInvalid() {
    if (errors.email?.message === "Required") {
      openToast({
        isOpen: true,
        title: "Email é obrigatório",
        content: "Preencha o campo obrigatório para fazer o cadastro",
        error: true,
      });
    }

    if (errors.email) {
      openToast({
        isOpen: true,
        title: "Formato do email inválido",
        content:
          "O formato do email deve seguir o formato padrão 'username@domain.com'",
        error: true,
      });
    }

    if (errors.password) {
      openToast({
        isOpen: true,
        title: "Senha é obrigatório",
        content: "Preencha o campo obrigatório para fazer o cadastro",
        error: true,
      });
    }
  }

  async function onSubmitUserWithEmailAndPassword(data: createUserFormData) {
    setIsLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const dataUser = await get(ref(database, "profiles/" + user.uid));

      if (dataUser.exists()) {
        console.log("ENTREI AQUI");
        reset({ email: "", password: "" });
        navigate("/");
      } else {
        throw new Error("User does not exist");
      }
    } catch (error) {
      if (error instanceof Error && error.message === "User does not exist") {
        openToast({
          isOpen: true,
          title: "Usuário não existe",
          content:
            "Para acessar a nossa plataforma, você precisa de uma conta cadastrada",
          error: true,
        });
      } else {
        openToast({
          isOpen: true,
          title: "Erro ao entrar",
          content: "Email e/ou senha inválidos",
          error: true,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLoginWithGoogle() {
    setIsLoadingGoogle(true);
    try {
      const { user } = await signInWithPopup(auth, googleProvider);

      if (user) {
        reset({ email: "", password: "" });
        navigate("/");
      }
    } catch (error) {
      openToast({
        isOpen: true,
        title: "Algo inesperado aconteceu",
        content: "Tente novamente",
        error: true,
      });
    } finally {
      setIsLoadingGoogle(false);
    }
  }

  return (
    <ContainerSignIn align={"center"} justify={"center"} direction={"column"}>
      <CardSignIn direction={"column"} gap={"4"}>
        <Flex direction={"column"} gap={"5"} width={"100%"}>
          <Flex gap={"1"} direction={"column"}>
            <Text size={"6"} weight={"bold"}>
              Entrar
            </Text>

            <Text size={"3"} weight={"medium"} color="gray">
              Acesse com seu email e senha
            </Text>
          </Flex>

          <Flex gap={"4"} direction={"column"} width={"100%"}>
            <Flex gap={"2"} direction={"column"} width={"100%"}>
              <Text size={"3"} weight={"medium"}>
                Email
              </Text>

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <TextField.Root
                    placeholder="Digite seu email"
                    size={"3"}
                    value={value}
                    onChange={onChange}
                    color={errors.email ? "red" : "blue"}
                  >
                    <TextField.Slot>
                      <Mail size={16} />
                    </TextField.Slot>
                  </TextField.Root>
                )}
              />
            </Flex>

            <Flex gap={"2"} direction={"column"} width={"100%"}>
              <Text size={"3"} weight={"medium"}>
                Senha
              </Text>

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <TextField.Root
                    placeholder="Digite sua senha"
                    size={"3"}
                    type={isShowPassword ? "text" : "password"}
                    color={errors.password ? "red" : "blue"}
                    value={value}
                    onChange={onChange}
                  >
                    <TextField.Slot>
                      <Lock size={16} />
                    </TextField.Slot>

                    <TextField.Slot
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setIsShowPassword((prevState) => !prevState)
                      }
                    >
                      {isShowPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </TextField.Slot>
                  </TextField.Root>
                )}
              />
            </Flex>
          </Flex>

          <Flex direction={"column"} gap={"1"}>
            <Button
              size={"3"}
              onClick={handleSubmit(
                onSubmitUserWithEmailAndPassword,
                onInvalid
              )}
              loading={isLoading}
              disabled={isLoading || isLoadingGoogle}
            >
              Acessar conta
            </Button>

            <Text color="gray" size={"2"} weight={"medium"} align={"center"}>
              Não possui conta?{" "}
              <Link color="blue" onClick={() => navigate("/signup")}>
                Cadastre-se
              </Link>
            </Text>
          </Flex>
        </Flex>

        <Flex width={"100%"} gap={"2"} align={"center"}>
          <Separator size={"4"} />
          <Text size={"2"} weight={"medium"} color="gray">
            ou
          </Text>
          <Separator size={"4"} />
        </Flex>

        <Button
          size={"3"}
          variant="outline"
          color="gray"
          onClick={handleLoginWithGoogle}
          loading={isLoadingGoogle}
          disabled={isLoading || isLoadingGoogle}
        >
          <img src={google} width={16} /> Entrar com o google
        </Button>
      </CardSignIn>
    </ContainerSignIn>
  );
}
