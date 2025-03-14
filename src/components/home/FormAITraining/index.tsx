import { Flex, Select, Text, TextField } from "@radix-ui/themes";
import { ContainerFormAITraining } from "./styles";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormWatch,
} from "react-hook-form";
import { AIFormData } from "../EmptyTraining";
import { maskNumber } from "@utils/masks";

type FormAITrainingProps = {
  control: Control<AIFormData>;
  errors: FieldErrors<AIFormData>;
  watch: UseFormWatch<AIFormData>;
};

export function FormAITraining({
  control,
  errors,
  watch,
}: FormAITrainingProps) {
  function handleChangeInputNumber(
    value: string,
    onChange: (...event: any[]) => void
  ) {
    const newValue = maskNumber(value);

    onChange(newValue);
  }

  return (
    <ContainerFormAITraining direction={"column"} gap={"3"}>
      <Flex gap={"2"} direction={"column"} width={"100%"}>
        <Text size={"3"} weight={"medium"}>
          Preferência muscular *
        </Text>

        <Controller
          control={control}
          name="musclePreference"
          render={({ field: { onChange, value } }) => (
            <TextField.Root
              placeholder="Ex.: Costas"
              size={"3"}
              color={errors.musclePreference ? "red" : "blue"}
              value={value}
              onChange={onChange}
            />
          )}
        />
      </Flex>

      <Flex gap={"4"}>
        <Flex gap={"2"} direction={"column"} width={"100%"}>
          <Text size={"3"} weight={"medium"}>
            Frequência semanal *
          </Text>

          <Controller
            control={control}
            name="weeklyFrequency"
            render={({ field: { onChange } }) => (
              <Select.Root
                defaultValue={watch("weeklyFrequency")}
                size={"3"}
                onValueChange={onChange}
              >
                <Select.Trigger />
                <Select.Content>
                  <Select.Group>
                    {[...new Array(7)].map((_, index) => (
                      <Select.Item key={index} value={`${index + 1}`}>
                        {index + 1}
                      </Select.Item>
                    ))}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            )}
          />
        </Flex>

        <Flex gap={"2"} direction={"column"} width={"100%"}>
          <Text size={"3"} weight={"medium"}>
            Tempo de duração (minutos) *
          </Text>

          <Controller
            control={control}
            name="durationTime"
            render={({ field: { onChange, value } }) => (
              <TextField.Root
                placeholder="Ex.: 90"
                size={"3"}
                color={errors.durationTime ? "red" : "blue"}
                value={value}
                onChange={(e) =>
                  handleChangeInputNumber(e.target.value, onChange)
                }
              />
            )}
          />
        </Flex>
      </Flex>

      <Flex gap={"2"} direction={"column"} width={"100%"}>
        <Text size={"3"} weight={"medium"}>
          Desconforto
        </Text>

        <Controller
          control={control}
          name="discomfort"
          render={({ field: { onChange, value } }) => (
            <TextField.Root
              placeholder="Ex.: Dores no joelho"
              size={"3"}
              value={value}
              onChange={onChange}
            />
          )}
        />
      </Flex>

      <Flex gap={"2"} direction={"column"} width={"100%"}>
        <Text size={"3"} weight={"medium"}>
          Problema de saúde
        </Text>

        <Controller
          control={control}
          name="healthProblem"
          render={({ field: { onChange, value } }) => (
            <TextField.Root
              placeholder="Ex.: Asma"
              size={"3"}
              value={value}
              onChange={onChange}
            />
          )}
        />
      </Flex>

      <Flex gap={"2"} direction={"column"} width={"100%"}>
        <Text size={"3"} weight={"medium"}>
          Tempo para exercício aeróbic (minutos)
        </Text>

        <Controller
          control={control}
          name="timeForAerobicExercise"
          render={({ field: { onChange, value } }) => (
            <TextField.Root
              placeholder="Ex.: 20"
              size={"3"}
              value={value}
              onChange={(e) =>
                handleChangeInputNumber(e.target.value, onChange)
              }
            />
          )}
        />
      </Flex>
    </ContainerFormAITraining>
  );
}
