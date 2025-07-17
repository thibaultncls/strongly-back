import { container } from "@config/inversify.js";
import type { GetWorkoutTemplatesUseCase } from "@features/dashboard/application/use-case/get-workout-templates.usecase.js";
import { RequestError } from "@hono/node-server";
import { TYPES } from "@shared/constants/identifier.constant.js";
import { InvalidArgumentsError } from "@shared/errors/InvalidArgumentsError.js";
import type { Context } from "hono";

export async function getWorkoutTemplates(c: Context) {
  const userId = c.get("user").id;

  try {
    const useCase = container.get<GetWorkoutTemplatesUseCase>(TYPES.GET_WORKOUT_TEMPLATES_USE_CASE);
    const workoutTemplates = await useCase.execute(userId);

    return c.json({ workoutTemplates });
  } catch (error) {
    if (error instanceof RequestError) {
      return c.json({ error: error.message }, 500);
    } else if (error instanceof InvalidArgumentsError) {
      return c.json({ error: error.message }, 400);
    }
    return c.json({ error: "An unexpected error occurred" }, 500);
  }
}
