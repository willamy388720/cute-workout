import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Flex, Separator, Text, TextField } from "@radix-ui/themes";
import { CardSignUp, ContainerSignUp } from "./styles";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import google from "@assets/google.svg";
import { useToast } from "@hooks/useToast";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, database, googleProvider } from "@services/firebase";
import { ref, set } from "firebase/database";

const createUserFormSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    passwordConfirmation: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((form) => form.password === form.passwordConfirmation, {
    path: ["passwordConfirmation"],
    message: "Passwords does not match",
  });

export type createUserFormData = z.infer<typeof createUserFormSchema>;

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPasswordConfirmation, setIsShowPasswordConfirmation] =
    useState(false);

  const navigate = useNavigate();

  const { openToast } = useToast();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createUserFormData>({
    resolver: zodResolver(createUserFormSchema),
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

    if (
      errors.password ||
      (errors.passwordConfirmation &&
        errors.passwordConfirmation.message ===
          "Password must be at least 6 characters")
    ) {
      openToast({
        isOpen: true,
        title: "Tamanho de senha inválido",
        content: "A senha precisa ter no mínimo 6 caracteres",
        error: true,
      });
    }

    if (
      errors.passwordConfirmation &&
      errors.passwordConfirmation.message === "Passwords does not match"
    ) {
      openToast({
        isOpen: true,
        title: "Senhas diferentes",
        content: "A confirmação de senha precisa ser igual a senha",
        error: true,
      });
    }
  }

  async function onSubmitUserWithEmailAndPassword(data: createUserFormData) {
    setIsLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      if (user) {
        await set(ref(database, "profiles/" + user.uid), {
          email: user.email,
          name: "",
          weight: "",
          height: "",
          image: "",
        });
        reset({ email: "", password: "", passwordConfirmation: "" });
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
      setIsLoading(false);
    }
  }

  async function handleLoginWithGoogle() {
    setIsLoadingGoogle(true);
    try {
      const { user } = await signInWithPopup(auth, googleProvider);

      if (user) {
        await set(ref(database, "profiles/" + user.uid), {
          email: user.email,
          name: user.displayName,
          weight: "",
          height: "",
          image: user.photoURL,
        });

        reset({ email: "", password: "", passwordConfirmation: "" });
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
    <ContainerSignUp align={"center"} justify={"center"} direction={"column"}>
      <CardSignUp direction={"column"} gap={"4"}>
        <Flex direction={"column"} gap={"5"} width={"100%"}>
          <Flex gap={"1"} direction={"column"}>
            <Text size={"6"} weight={"bold"}>
              Cadastra-se
            </Text>

            <Text size={"3"} weight={"medium"} color="gray">
              Crie uma conta usando email e senha
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

            <Flex gap={"2"} direction={"column"} width={"100%"}>
              <Text size={"3"} weight={"medium"}>
                Confirmação de senha
              </Text>

              <Controller
                control={control}
                name="passwordConfirmation"
                render={({ field: { onChange, value } }) => (
                  <TextField.Root
                    placeholder="Digite a mesma senha"
                    size={"3"}
                    type={isShowPasswordConfirmation ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    color={errors.passwordConfirmation ? "red" : "blue"}
                  >
                    <TextField.Slot>
                      <Lock size={16} />
                    </TextField.Slot>

                    <TextField.Slot
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setIsShowPasswordConfirmation((prevState) => !prevState)
                      }
                    >
                      {isShowPasswordConfirmation ? (
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
              Criar conta
            </Button>
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
          disabled={isLoading || isLoadingGoogle}
          loading={isLoadingGoogle}
          onClick={handleLoginWithGoogle}
        >
          <img src={google} width={16} /> Cadastra-se com o google
        </Button>
      </CardSignUp>
    </ContainerSignUp>
  );
}
