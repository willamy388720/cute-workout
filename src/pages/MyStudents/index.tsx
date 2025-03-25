import {
  Button,
  Dialog,
  Flex,
  Spinner,
  Table,
  Text,
  TextField,
} from "@radix-ui/themes";
import { ContainerMyStudents } from "./styles";
import { useProfile } from "@hooks/useProfile";
import { EmptySudents } from "@components/myStudents/EmptySudents";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@hooks/useToast";
import { get, ref, set, update } from "firebase/database";
import { database } from "@services/firebase";
import { UserDTO } from "@dtos/userDTO";
import { v4 as uuidv4 } from "uuid";
import { Mail, Pencil, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const inviteStudentFormSchema = z.object({
  email: z.string().email(),
});

export type inviteStudentFormData = z.infer<typeof inviteStudentFormSchema>;
export function MyStudents() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStudentsLoading, setIsStudentsLoading] = useState(true);
  const [isStudentsDeleteLoading, setIsStudentsDeleteLoading] = useState(false);
  const [students, setStudents] = useState<UserDTO[]>([]);

  const { profile, mutationProfileFn } = useProfile();

  const { openToast } = useToast();

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<inviteStudentFormData>({
    resolver: zodResolver(inviteStudentFormSchema),
  });

  function onInvalid() {
    openToast({
      isOpen: true,
      title: "Email é obrigatório",
      content: "Preencha o campo obrigatório para fazer o cadastro",
      error: true,
    });
  }

  function toastEmailNotFound() {
    reset({ email: "" });
    return openToast({
      isOpen: true,
      title: "Email não encontrado",
      content: "Nenhuma conta associada a esse email foi encontrada",
      error: true,
    });
  }

  async function inviteStudent(data: inviteStudentFormData) {
    setIsLoading(true);
    try {
      const studentsData = await get(ref(database, "profiles/"));

      if (!studentsData.exists()) {
        toastEmailNotFound();
        return;
      }

      const profiles = Object.entries<UserDTO>(studentsData.val() ?? {}).map(
        ([id, value]) => ({
          id,
          email: value.email,
          name: value.name,
          image: value.image,
          weight: value.weight,
          height: value.height,
        })
      );

      const student = profiles.find((item) => item.email === data.email);

      if (!student) {
        toastEmailNotFound();
        return;
      }

      await set(
        ref(
          database,
          "invitations_sent/" + student.id + "/invitations/" + uuidv4()
        ),
        {
          invitedBy: profile.id,
          sentAt: new Date().toISOString(),
          type: "Invitation",
        }
      );

      openToast({
        isOpen: true,
        title: "Convite enviado",
        content: "O convite foi enviado com sucesso",
        error: false,
      });

      reset({ email: "" });
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

  async function fetchStudents() {
    const bodybuildingStudents = profile.bodybuildingStudents ?? [];

    const newStudents = await Promise.all(
      bodybuildingStudents.map(async (student) => {
        const studentRef = ref(database, "profiles/" + student);
        const studentData = await get(studentRef);

        return {
          id: student,
          email: studentData.val()?.email ?? "",
          name: studentData.val()?.name ?? "",
          image: studentData.val()?.image ?? "",
          weight: studentData.val()?.weight ?? "",
          height: studentData.val()?.height ?? "",
        };
      })
    );

    setStudents(newStudents);
    setIsStudentsLoading(false);
  }

  async function removeStudent(studentId: string) {
    setIsStudentsDeleteLoading(true);
    try {
      const bodybuildingStudents: string[] = profile.bodybuildingStudents ?? [];

      const bodybuildingStudentsFiltered = bodybuildingStudents.filter(
        (student) => student !== studentId
      );

      await update(ref(database, "profiles/" + profile.id), {
        bodybuildingStudents: bodybuildingStudentsFiltered,
      });

      await update(ref(database, "profiles/" + studentId), {
        isBodybuildingStudent: false,
        coachId: "",
      });

      await set(
        ref(
          database,
          "invitations_sent/" + studentId + "/invitations/" + uuidv4()
        ),
        {
          invitedBy: profile.id,
          sentAt: new Date().toISOString(),
          type: "End Of Bond",
        }
      );

      await mutationProfileFn({
        ...profile,
        bodybuildingStudents: bodybuildingStudentsFiltered,
        action: "save",
      });

      openToast({
        isOpen: true,
        title: "Aluno removido",
        content: "O aluno foi removido com sucesso",
        error: false,
      });
    } catch (error) {
      openToast({
        isOpen: true,
        title: "Algo inesperado aconteceu",
        content: "Tente novamente",
        error: true,
      });
    } finally {
      setIsStudentsDeleteLoading(false);
    }
  }

  useEffect(() => {
    fetchStudents();
  }, [profile]);

  if (isStudentsLoading) {
    return (
      <ContainerMyStudents width={"100%"} justify={"center"} align={"center"}>
        <Spinner size={"3"} />
      </ContainerMyStudents>
    );
  }

  return (
    <Dialog.Root open={isOpenModal}>
      <Dialog.Content>
        <Dialog.Title>Adicionar Aluno</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Mande um convite usando o email do aluno
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <Flex gap={"2"} direction={"column"} width={"100%"}>
            <Text size={"3"} weight={"medium"}>
              Email
            </Text>

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <TextField.Root
                  placeholder="Digite o email do aluno"
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
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Button
            variant="soft"
            color="gray"
            onClick={() => setIsOpenModal(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>

          <Button
            onClick={handleSubmit(inviteStudent, onInvalid)}
            disabled={isLoading}
            loading={isLoading}
          >
            Enviar
          </Button>
        </Flex>
      </Dialog.Content>

      <ContainerMyStudents>
        {students.length === 0 && (
          <EmptySudents saveIsOpenModal={(value) => setIsOpenModal(value)} />
        )}

        {students.length > 0 && (
          <Flex direction={"column"} width={"100%"} gap={"5"}>
            <Flex width={"100%"} justify={"between"} align={"center"}>
              <Text size={"7"} weight={"bold"}>
                Meu Treino
              </Text>

              <Button size={"3"} onClick={() => setIsOpenModal(true)}>
                Adicionar aluno
              </Button>
            </Flex>

            <div style={{ width: "100%" }}>
              <Table.Root variant="surface" style={{ width: "100%" }}>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell>Nome</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Altura (cm)</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Peso (kg)</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {students.map((student) => (
                    <Table.Row key={student.id} align={"center"}>
                      <Table.RowHeaderCell>{student.name}</Table.RowHeaderCell>
                      <Table.Cell>{student.email}</Table.Cell>
                      <Table.Cell>{student.height}</Table.Cell>
                      <Table.Cell>{student.weight}</Table.Cell>
                      <Table.Cell>
                        <Flex gap={"3"} align={"end"} justify={"end"}>
                          <Button
                            variant="outline"
                            color="red"
                            onClick={() => removeStudent(student.id)}
                            loading={isStudentsDeleteLoading}
                            disabled={isStudentsDeleteLoading}
                          >
                            <X size={16} />
                            Remover
                          </Button>

                          <Button
                            variant="outline"
                            onClick={() =>
                              navigate(`/treino/criar/${student.id}`)
                            }
                            disabled={isStudentsDeleteLoading}
                          >
                            <Pencil size={16} />
                            Treino
                          </Button>
                        </Flex>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </div>
          </Flex>
        )}
      </ContainerMyStudents>
    </Dialog.Root>
  );
}
