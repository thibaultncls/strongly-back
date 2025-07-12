import { container } from "@config/inversify.js";
import type { GetWorkoutsTemplateUpdateUseCase } from "@features/dashboard/application/use-case/get-workouts-template-update.usecase.js";
import { RequestError } from "@hono/node-server";
import { TYPES } from "@shared/constants/identifier.constant.js";
import { InvalidArgumentsError } from "@shared/errors/InvalidArgumentsError.js";
import type { Context } from "hono";

export async function getWorkoutTemplatesUpdate(c: Context) {
  try {
    const userId = c.get("user").id;

    console.log(`Fetching workout template updates for user ID: ${userId}`);

    const useCase = container.get<GetWorkoutsTemplateUpdateUseCase>(TYPES.GET_WORKOUTS_TEMPLATE_UPDATE_USE_CASE);
    const updates = await useCase.execute(userId);

    return c.json({ updates });
  } catch (error) {
    if (error instanceof InvalidArgumentsError) {
      return c.json({ error: error.message }, 400);
    } else if (error instanceof RequestError) {
      return c.json({ error: error.message }, 500);
    } else {
      return c.json({ error: "An unexpected error occurred." }, 500);
    }
  }
}
