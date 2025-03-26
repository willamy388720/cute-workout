import {
  Button,
  Dialog,
  Flex,
  IconButton,
  Select,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import {
  CardExercise,
  CardFormWorkout,
  CardWorkout,
  ContainerCreateManualWorkout,
  ContainerSelectExercises,
  ContentSelectExercises,
  DescriptionFormWorkout,
  ImageExercise,
  SelectMuscleGroup,
  TitleFormWorkout,
} from "./styles";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Dumbbell,
  Pencil,
  Plus,
  Save,
  Search,
  Trash,
} from "lucide-react";
import { useExercises } from "@hooks/useExercises";
import { Paginate } from "@components/shared/Paginate";
import { usePagination } from "@hooks/usePagination";
import { ExerciseDTO } from "@dtos/exerciseDTO";
import { searchOnExercises } from "@utils/pages/searchExercices";
import { useState } from "react";
import { useTrainingPlans } from "@hooks/useTrainingPlans";
import { useToast } from "@hooks/useToast";
import { ExerciseInTrainingDTO } from "@dtos/exerciseInTrainingDTO";
import { v4 as uuidv4 } from "uuid";
import { ref, remove, set } from "firebase/database";
import { database } from "@services/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { TrainingDTO } from "@dtos/trainingDTO";

const workoutFormSchema = z.object({
  muscleGroup: z.string().min(1, { message: "Muscle group is required" }),
  query: z.string(),
  repetitions: z.string(),
  observation: z.string(),
});

export type createWorkoutFormData = z.infer<typeof workoutFormSchema>;

const MUSCLESGROUP = [
  "Pescoço",
  "Trapézio",
  "Ombro",
  "Peito",
  "Costas",
  "Eretor da Espinha",
  "Bíceps",
  "Tríceps",
  "Antebraço",
  "Abdômen",
  "Perna",
  "Panturrilha",
  "Quadris",
  "Cardio",
  "Corpo inteiro",
];

const OBJMUCLESGROUP = {
  Pescoço: "Neck",
  Trapézio: "Trapezius",
  Ombro: "Shoulder",
  Peito: "Chest",
  Costas: "Back",
  "Eretor da Espinha": "Erector Spinae",
  Bíceps: "Biceps",
  Tríceps: "Triceps",
  Antebraço: "Forearm",
  Abdômen: "Abs",
  Perna: "Leg",
  Panturrilha: "Calf",
  Quadris: "Hips",
  Cardio: "Cardio",
  "Corpo inteiro": "Full Body",
};

const defaultValue = {
  muscleGroup: "",
  repetitions: "",
  query: "",
  observation: "",
};

export function CreateManualWorkout() {
  const [selectedExercise, setSelectedExercise] = useState<ExerciseDTO | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isEditingExercise, setIsEditingExercise] = useState(false);
  const [isEditingWorkout, setIsEditingWorkout] = useState(false);
  const [workoutEditing, setWorkoutEditing] = useState<TrainingDTO>(
    {} as TrainingDTO
  );
  const [workoutDeleting, setWorkoutDeleting] = useState<TrainingDTO>(
    {} as TrainingDTO
  );
  const [exercicesCurrentWorkout, setExercicesCurrentWorkout] = useState<
    ExerciseInTrainingDTO[]
  >([]);
  const [exercisesDeleted, setExercisesDeleted] = useState<
    ExerciseInTrainingDTO[]
  >([]);
  const [nameWorkout, setNameWorkout] = useState("");

  const { openToast } = useToast();

  const navigate = useNavigate();

  const params = useParams();

  const profileTrainingId = params.id ?? "";

  const { control, handleSubmit, reset, watch, setValue } =
    useForm<createWorkoutFormData>({
      resolver: zodResolver(workoutFormSchema),
      defaultValues: { ...defaultValue },
    });

  const { exercises } = useExercises();

  const { trainingPlans } = useTrainingPlans({ profileId: profileTrainingId });

  const workouts = trainingPlans.trainings
    ? trainingPlans.trainings.sort((a, b) => a.orderNumber - b.orderNumber)
    : [];

  const muscleGroup = watch("muscleGroup") as keyof typeof OBJMUCLESGROUP;

  const primaryMuscles = OBJMUCLESGROUP[muscleGroup];

  const exercisesFound =
    watch("query").trim() !== ""
      ? searchOnExercises(watch("query"), exercises)
      : exercises;

  const filteredExercises = exercisesFound.filter((exercise) =>
    exercise.primaryMuscles.includes(primaryMuscles)
  );

  const {
    currentPage,
    elements,
    paginate,
    previousPage,
    nextPage,
    resetCurrentPage,
  } = usePagination<ExerciseDTO>({ data: filteredExercises });

  function handleSelectExercise(exercise: ExerciseDTO) {
    if (selectedExercise?.id === exercise.id) {
      setSelectedExercise(null);
      return;
    }

    setSelectedExercise(exercise);
  }

  function onInvalid() {
    openToast({
      isOpen: true,
      title: "Campos obrigatórios",
      content: "Preencha os campos obrigatórios para fazer o criar o treino",
      error: true,
    });
  }

  async function onSubmit(data: createWorkoutFormData) {
    if (!selectedExercise) return;

    setIsLoading(true);

    try {
      setExercicesCurrentWorkout((prevState) => [
        ...prevState,
        {
          id: selectedExercise.id!,
          name: selectedExercise.title,
          machine: selectedExercise.equipment,
          observation: data.observation,
          image: selectedExercise.image,
          primaryMuscles: selectedExercise.primaryMuscles,
          repetitions: data.repetitions,
        },
      ]);

      openToast({
        isOpen: true,
        title: "Exercício adicionado",
        content: `Exercício "${selectedExercise.title}" adicionado`,
        error: false,
      });

      setSelectedExercise(null);
      setIsEditingExercise(false);
      reset({ ...defaultValue });
    } catch (error) {
      openToast({
        isOpen: true,
        title: "Algo inesperado aconteceu",
        content: "Tente novamente",
        error: false,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSaveWorkout() {
    setIsLoading(true);

    try {
      const trainingId = isEditingWorkout ? workoutEditing.id : uuidv4();

      await set(
        ref(
          database,
          "training_plans/" + profileTrainingId + "/trainings/" + trainingId
        ),
        {
          title: nameWorkout,
          orderNumber: workouts.length,
        }
      );

      if (isEditingWorkout) {
        exercisesDeleted.map(async (exercise) => {
          const { id } = exercise;
          await set(
            ref(
              database,
              "training_plans/" +
                profileTrainingId +
                "/trainings/" +
                trainingId +
                "/exercises/" +
                id
            ),
            null
          );
        });

        setExercisesDeleted([]);
        setIsEditingWorkout(false);
        setWorkoutEditing({} as TrainingDTO);
      }

      exercicesCurrentWorkout.map(async (exercise) => {
        const { id, ...restExercise } = exercise;
        await set(
          ref(
            database,
            "training_plans/" +
              profileTrainingId +
              "/trainings/" +
              trainingId +
              "/exercises/" +
              id
          ),
          {
            ...restExercise,
          }
        );
      });

      setExercicesCurrentWorkout([]);
      setNameWorkout("");

      openToast({
        isOpen: true,
        title: "Treino salvo",
        content: "O treino foi salvo com sucesso",
        error: false,
      });

      setSelectedExercise(null);
      reset({ ...defaultValue });
    } catch (error) {
      openToast({
        isOpen: true,
        title: "Algo inesperado aconteceu",
        content: "Tente novamente",
        error: false,
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleSaveExercise() {
    if (!selectedExercise) return;

    setIsLoading(true);

    const repetitions = watch("repetitions");
    const observation = watch("observation");

    setExercicesCurrentWorkout((prevState) => [
      ...prevState.map((item) => {
        if (item.id === selectedExercise.id) {
          return {
            ...item,
            observation,
            repetitions,
          };
        }

        return item;
      }),
    ]);

    openToast({
      isOpen: true,
      title: "Alterações salvas",
      content: `Alterações no exercício "${selectedExercise.title}" foram salvas`,
      error: false,
    });

    reset({ ...defaultValue });
    setSelectedExercise(null);
    setIsEditingExercise(false);
    setIsLoading(false);
  }

  function handleEditExercise(exercise: ExerciseInTrainingDTO) {
    const exerciseEditing: ExerciseDTO = {
      id: exercise.id,
      equipment: exercise.machine,
      image: exercise.image,
      primaryMuscles: exercise.primaryMuscles,
      title: exercise.name,
    };

    setValue("repetitions", exercise.repetitions);
    setSelectedExercise(exerciseEditing);
    setIsEditingExercise(true);

    location.href = "#add-exercise";
  }

  function handleDeleteExercise(exercise: ExerciseInTrainingDTO) {
    setExercicesCurrentWorkout((prevState) => [
      ...prevState.filter((item) => item.id !== exercise.id),
    ]);

    openToast({
      isOpen: true,
      title: "Exercício removido",
      content: "O exercício foi removido com sucesso",
      error: false,
    });

    if (isEditingWorkout) {
      setExercisesDeleted((prevState) => [...prevState, exercise]);
    }
  }

  function handleEditWorkout(workout: TrainingDTO) {
    setExercicesCurrentWorkout(workout.exercises);
    setIsEditingWorkout(true);
    setNameWorkout(workout.title);
    setWorkoutEditing(workout);
  }

  async function handleDeleteWorkout() {
    try {
      await remove(
        ref(
          database,
          "training_plans/" +
            profileTrainingId +
            "/trainings/" +
            workoutDeleting.id
        )
      );

      setWorkoutDeleting({} as TrainingDTO);

      openToast({
        isOpen: true,
        title: "Treino removido",
        content: "O treino foi removido com sucesso",
        error: false,
      });
    } catch (error) {
      openToast({
        isOpen: true,
        title: "Algo inesperado aconteceu",
        content: "Tente novamente",
        error: false,
      });
    }
  }

  return (
    <Dialog.Root>
      <ContainerCreateManualWorkout py={"8"} gap={"6"} direction={"column"}>
        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Excluir Treino</Dialog.Title>

          <Flex direction="column" gap="3">
            <Text size="3" mb="1">
              Tem certeza que deseja excluir o treino "{workoutDeleting.title}"?
              Esta ação não pode ser desfeita.
            </Text>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancelar
              </Button>
            </Dialog.Close>

            <Dialog.Close onClick={handleDeleteWorkout}>
              <Button color="red">
                <Trash size={16} />
                Excluir
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>

        <Flex direction={"column"} gap={"2"}>
          <div>
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft size={16} />
              Voltar
            </Button>
          </div>

          <Text weight={"bold"} size={"8"}>
            Criar Treino
          </Text>
          <Text color="gray" weight={"medium"}>
            Adicione um título e exercícios para o seu treino
          </Text>
        </Flex>

        <CardFormWorkout id="informations">
          <Flex direction={"column"}>
            <TitleFormWorkout>Informações do Treino</TitleFormWorkout>

            <DescriptionFormWorkout>
              Defina um nome para seu treino
            </DescriptionFormWorkout>
          </Flex>

          <Flex>
            <Flex gap={"2"} direction={"column"} width={"100%"}>
              <Text size={"3"} weight={"medium"}>
                Nome do Treino
              </Text>

              <TextField.Root
                placeholder="Ex: Treino 1: Costas e Bíceps"
                size={"3"}
                value={nameWorkout}
                onChange={(e) => setNameWorkout(e.target.value)}
              />
            </Flex>
          </Flex>
        </CardFormWorkout>

        <CardFormWorkout id="add-exercise">
          <Flex direction={"column"}>
            <TitleFormWorkout>Adicionar Exercício</TitleFormWorkout>

            <DescriptionFormWorkout>
              Selecione o grupo muscular e o exercício
            </DescriptionFormWorkout>
          </Flex>

          <Flex gap={"5"} direction={"column"}>
            {!isEditingExercise && (
              <SelectMuscleGroup gap={"2"} direction={"column"}>
                <Text size={"3"} weight={"medium"}>
                  Grupo Muscular
                </Text>

                <Controller
                  control={control}
                  name="muscleGroup"
                  render={({ field: { onChange, value } }) => (
                    <Select.Root
                      defaultValue={watch("muscleGroup")}
                      size={"3"}
                      onValueChange={(muscle) => {
                        resetCurrentPage();
                        onChange(muscle);
                      }}
                      value={value}
                    >
                      <Select.Trigger placeholder="Selecione um grupo muscular" />
                      <Select.Content>
                        <Select.Group>
                          {MUSCLESGROUP.map((muscle) => (
                            <Select.Item key={muscle} value={muscle}>
                              {muscle}
                            </Select.Item>
                          ))}
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>
                  )}
                />
              </SelectMuscleGroup>
            )}

            {watch("muscleGroup") !== "" && (
              <ContainerSelectExercises width={"100%"}>
                <Controller
                  control={control}
                  name="query"
                  render={({ field: { onChange, value } }) => (
                    <TextField.Root
                      placeholder="Buscar exercício..."
                      size={"3"}
                      value={value}
                      onChange={onChange}
                    >
                      <TextField.Slot side="right">
                        <Search size={16} />
                      </TextField.Slot>
                    </TextField.Root>
                  )}
                />

                <ContentSelectExercises>
                  {elements.map((exercise) => (
                    <CardExercise
                      key={exercise.id}
                      onClick={() => handleSelectExercise(exercise)}
                      selected={selectedExercise?.id === exercise.id}
                    >
                      <ImageExercise src={exercise.image} alt="" />
                      <Text align={"center"} weight={"bold"}>
                        {exercise.title}
                      </Text>
                    </CardExercise>
                  ))}
                </ContentSelectExercises>

                {filteredExercises.length > 8 && (
                  <Flex width={"100%"} align={"center"}>
                    <Paginate
                      currentPage={currentPage}
                      elementsPerPage="8"
                      paginate={paginate}
                      previousPage={previousPage}
                      nextPage={nextPage}
                      totalelements={filteredExercises.length}
                    />
                  </Flex>
                )}
              </ContainerSelectExercises>
            )}

            {isEditingExercise && selectedExercise && (
              <ContentSelectExercises>
                <CardExercise key={selectedExercise.id} isNotClickable>
                  <ImageExercise src={selectedExercise.image} alt="" />
                  <Text align={"center"} weight={"bold"}>
                    {selectedExercise.title}
                  </Text>
                </CardExercise>
              </ContentSelectExercises>
            )}

            {selectedExercise && (
              <Flex direction={"column"} gap={"4"}>
                <Flex gap={"2"} direction={"column"} width={"100%"}>
                  <Text size={"3"} weight={"medium"}>
                    Repetições
                  </Text>

                  <Controller
                    control={control}
                    name="repetitions"
                    render={({ field: { onChange, value } }) => (
                      <TextField.Root
                        size={"3"}
                        value={value}
                        onChange={onChange}
                        placeholder="Ex.: 3 séries de 12 repetições, 3x12"
                      />
                    )}
                  />
                </Flex>

                <Flex gap={"2"} direction={"column"} width={"100%"}>
                  <Text size={"3"} weight={"medium"}>
                    Observações (opcional)
                  </Text>

                  <Controller
                    control={control}
                    name="observation"
                    render={({ field: { onChange, value } }) => (
                      <TextArea
                        placeholder="Adicione observações sobre o exercício..."
                        size={"3"}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Flex>
              </Flex>
            )}

            <Flex justify={"end"}>
              {!isEditingExercise && (
                <Button
                  size={"3"}
                  disabled={
                    !selectedExercise ||
                    watch("repetitions").trim() === "" ||
                    isLoading
                  }
                  loading={isLoading}
                  onClick={handleSubmit(onSubmit, onInvalid)}
                >
                  <Plus size={16} />
                  Adicionar Exercício
                </Button>
              )}

              {isEditingExercise && (
                <Button
                  size={"3"}
                  disabled={
                    !selectedExercise ||
                    watch("repetitions").trim() === "" ||
                    isLoading
                  }
                  loading={isLoading}
                  onClick={handleSaveExercise}
                >
                  Salvar alterações
                </Button>
              )}
            </Flex>
          </Flex>
        </CardFormWorkout>

        <CardFormWorkout id="exercise-in-workout">
          <Flex direction={"column"}>
            <TitleFormWorkout>Exercícios do Treino</TitleFormWorkout>

            {exercicesCurrentWorkout.length === 0 && (
              <DescriptionFormWorkout>
                Nenhum exercício adicionado ainda
              </DescriptionFormWorkout>
            )}

            {exercicesCurrentWorkout.length > 0 && (
              <DescriptionFormWorkout>
                {exercicesCurrentWorkout.length} exercício(s) adicionado(s)
              </DescriptionFormWorkout>
            )}
          </Flex>

          <Flex width={"100%"} direction={"column"}>
            {exercicesCurrentWorkout.length === 0 && (
              <Flex
                direction={"column"}
                align={"center"}
                width={"100%"}
                my={"6"}
              >
                <Dumbbell size={50} color="var(--gray-8)" />
                <Text
                  color="gray"
                  mt={"2"}
                  weight={"medium"}
                  size={"3"}
                  align={"center"}
                >
                  Nenhum exercício adicionado.
                </Text>

                <Text
                  color="gray"
                  weight={"medium"}
                  size={"2"}
                  align={"center"}
                >
                  Use o formulário acima para adicionar exercícios ao seu
                  treino.
                </Text>
              </Flex>
            )}

            {exercicesCurrentWorkout.length > 0 && (
              <ContentSelectExercises>
                {exercicesCurrentWorkout.map((exercise) => (
                  <CardExercise
                    key={exercise.id}
                    isNotClickable
                    width={"100%"}
                    justify={"between"}
                  >
                    <ImageExercise src={exercise.image} alt="" />

                    <Text align={"center"} weight={"bold"}>
                      {exercise.name}
                    </Text>

                    <Text weight={"bold"}>
                      Repetições:{" "}
                      <Text weight={"medium"}>{exercise.repetitions}</Text>
                    </Text>

                    {exercise.observation.trim() !== "" && (
                      <Text weight={"bold"}>
                        Observações:{" "}
                        <Text weight={"medium"}>{exercise.observation}</Text>
                      </Text>
                    )}

                    <Flex width={"100%"} direction={"column"} gap={"2"}>
                      <Button
                        variant="outline"
                        size={"3"}
                        onClick={() => handleEditExercise(exercise)}
                        disabled={isEditingExercise}
                      >
                        <Pencil size={16} />
                        Editar
                      </Button>

                      <Button
                        variant="outline"
                        size={"3"}
                        color="red"
                        onClick={() => handleDeleteExercise(exercise)}
                        disabled={isEditingExercise}
                      >
                        <Trash size={16} />
                        Excluir
                      </Button>
                    </Flex>
                  </CardExercise>
                ))}
              </ContentSelectExercises>
            )}
          </Flex>

          <Flex justify={"end"}>
            <Button
              size={"3"}
              disabled={
                exercicesCurrentWorkout.length === 0 ||
                nameWorkout.trim() === ""
              }
              onClick={handleSaveWorkout}
            >
              <Save size={16} />
              Salvar Treino
            </Button>
          </Flex>
        </CardFormWorkout>

        {workouts.length > 0 && (
          <CardFormWorkout id="workouts">
            <Flex direction={"column"}>
              <TitleFormWorkout>Treinos Salvos</TitleFormWorkout>
            </Flex>

            <Flex gap={"4"} direction={"column"}>
              {workouts.map((workout) => (
                <CardWorkout
                  key={workout.id}
                  direction={"column"}
                  width={"100%"}
                  gap={"2"}
                >
                  <Flex width={"100%"} justify={"between"} align={"center"}>
                    <Text
                      size={"4"}
                      weight={"bold"}
                      className="card-workout-title"
                    >
                      {workout.title}
                    </Text>

                    <Flex align={"center"} gap={"4"}>
                      <IconButton
                        variant="ghost"
                        size={"3"}
                        onClick={() => handleEditWorkout(workout)}
                      >
                        <Pencil size={16} />
                      </IconButton>

                      <Dialog.Trigger
                        onClick={() => setWorkoutDeleting(workout)}
                      >
                        <IconButton variant="ghost" size={"3"} color="red">
                          <Trash size={16} />
                        </IconButton>
                      </Dialog.Trigger>
                    </Flex>
                  </Flex>

                  <Text size={"2"} weight={"medium"}>
                    {workout.exercises.length} exercício(s)
                  </Text>
                </CardWorkout>
              ))}
            </Flex>
          </CardFormWorkout>
        )}
      </ContainerCreateManualWorkout>
    </Dialog.Root>
  );
}
