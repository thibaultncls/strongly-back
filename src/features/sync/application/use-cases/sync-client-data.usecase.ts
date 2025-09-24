import type { SyncRepository } from "@features/sync/domain/repositories/sync.repository.js";
import type { SyncClientData } from "@features/sync/interfaces/http/types/sync-client-data.type.js";

export class SyncClientDataUseCase {
  constructor(private syncRepository: SyncRepository) {}

  async execute(data: SyncClientData) {
    await this.handleExercises(data);
    await this.handleExerciseBodyParts(data);
    await this.handleWorkoutTemplates(data);
    await this.handleTemplateExercises(data);
    await this.handleTemplateSets(data);
    await this.handleWorkouts(data);
    await this.handleWorkoutExercises(data);
    await this.handleSets(data);
    await this.handleSetIntensities(data);
    await this.handleSetSetTypes(data);
    await this.handleTemplateExerciseTypes(data);
    await this.handleTemplateSetTypes(data);
    await this.handleUserSubscriptions(data);
    await this.handleWorkoutExerciseTypes(data);
  }

  private async handleExercises(data: SyncClientData) {
    if (data.exercise && data.exercise.length > 0) {
      const exercisesId = data.exercise.map((exercise) => exercise.id);
      const exercisesToSync = await this.syncRepository.checkExercisesToSync(exercisesId);
      await this.syncRepository.syncExercises(exercisesToSync, data.exercise);
    }
  }

  private async handleExerciseBodyParts(data: SyncClientData) {
    if (data.exercise_body_part && data.exercise_body_part.length > 0) {
      const exerciseBodyParts = data.exercise_body_part.map((ebp) => ({
        exercise_id: ebp.exercise_id,
        body_part_id: ebp.body_part_id,
      }));
      const exerciseBodyPartsToSync = await this.syncRepository.checkExerciseBodyPartsToSync(
        exerciseBodyParts.map((ebp) => ebp.exercise_id),
        exerciseBodyParts.map((ebp) => ebp.body_part_id)
      );
      await this.syncRepository.syncExerciseBodyParts(exerciseBodyPartsToSync, data.exercise_body_part);
    }
  }

  private async handleWorkoutTemplates(data: SyncClientData) {
    if (data.workout_template && data.workout_template.length > 0) {
      const workoutTemplateIds = data.workout_template.map((template) => template.id);
      const workoutTemplatesToSync = await this.syncRepository.checkWorkoutTemplatesToSync(workoutTemplateIds);
      await this.syncRepository.syncWorkoutTemplates(workoutTemplatesToSync, data.workout_template);
    }
  }

  private async handleTemplateExercises(data: SyncClientData) {
    if (data.template_exercise && data.template_exercise.length > 0) {
      const templateExerciseIds = data.template_exercise.map((te) => te.id);
      const templateExercisesToSync = await this.syncRepository.checkTemplateExercisesToSync(templateExerciseIds);
      await this.syncRepository.syncTemplateExercises(templateExercisesToSync, data.template_exercise);
    }
  }

  private async handleTemplateSets(data: SyncClientData) {
    if (data.template_set && data.template_set.length > 0) {
      const templateSetIds = data.template_set.map((ts) => ts.id);
      const templateSetsToSync = await this.syncRepository.checkTemplateSetsToSync(templateSetIds);
      await this.syncRepository.syncTemplateSets(templateSetsToSync, data.template_set);
    }
  }

  private async handleWorkouts(data: SyncClientData) {
    if (data.workout && data.workout.length > 0) {
      const workoutIds = data.workout.map((workout) => workout.id);
      const workoutsToSync = await this.syncRepository.checkWorkoutsToSync(workoutIds);
      await this.syncRepository.syncWorkouts(workoutsToSync, data.workout);
    }
  }

  private async handleWorkoutExercises(data: SyncClientData) {
    if (data.workout_exercise && data.workout_exercise.length > 0) {
      const workoutExerciseIds = data.workout_exercise.map((we) => we.id);
      const workoutExercisesToSync = await this.syncRepository.checkWorkoutExercisesToSync(workoutExerciseIds);
      await this.syncRepository.syncWorkoutExercises(workoutExercisesToSync, data.workout_exercise);
    }
  }

  private async handleSets(data: SyncClientData) {
    if (data.set && data.set.length > 0) {
      const setIds = data.set.map((set) => set.id);
      const setsToSync = await this.syncRepository.checkSetsToSync(setIds);
      await this.syncRepository.syncSets(setsToSync, data.set);
    }
  }

  private async handleSetIntensities(data: SyncClientData) {
    if (data.set_intensity && data.set_intensity.length > 0) {
      const setIntensityIds = data.set_intensity.map((si) => ({
        set_id: si.set_id,
        intensity_id: si.intensity_id,
      }));
      const setIntensitiesToSync = await this.syncRepository.checkSetIntensitiesToSync(
        setIntensityIds.map((si) => si.set_id),
        setIntensityIds.map((si) => si.intensity_id)
      );
      await this.syncRepository.syncSetIntensities(setIntensitiesToSync, data.set_intensity);
    }
  }

  private async handleSetSetTypes(data: SyncClientData) {
    if (data.set_set_type && data.set_set_type.length > 0) {
      const setSetTypeIds = data.set_set_type.map((sst) => ({
        set_id: sst.set_id,
        set_type_id: sst.set_type_id,
      }));
      const setSetTypesToSync = await this.syncRepository.checkSetSetTypesToSync(
        setSetTypeIds.map((sst) => sst.set_id),
        setSetTypeIds.map((sst) => sst.set_type_id)
      );
      await this.syncRepository.syncSetSetTypes(setSetTypesToSync, data.set_set_type);
    }
  }

  private async handleTemplateExerciseTypes(data: SyncClientData) {
    if (data.template_exercise_type && data.template_exercise_type.length > 0) {
      const templateExerciseTypeIds = data.template_exercise_type.map((tet) => ({
        template_exercise_id: tet.template_exercise_id,
        exercise_type_id: tet.exercise_type_id,
      }));
      const templateExerciseTypesToSync = await this.syncRepository.checkTemplateExerciseTypesToSync(
        templateExerciseTypeIds.map((tet) => tet.template_exercise_id),
        templateExerciseTypeIds.map((tet) => tet.exercise_type_id)
      );
      await this.syncRepository.syncTemplateExerciseTypes(templateExerciseTypesToSync, data.template_exercise_type);
    }
  }

  private async handleTemplateSetTypes(data: SyncClientData) {
    if (data.template_set_type && data.template_set_type.length > 0) {
      const templateSetTypeIds = data.template_set_type.map((tst) => ({
        template_set_id: tst.template_set_id,
        set_type_id: tst.set_type_id,
      }));
      const templateSetTypesToSync = await this.syncRepository.checkTemplateSetTypesToSync(
        templateSetTypeIds.map((tst) => tst.template_set_id),
        templateSetTypeIds.map((tst) => tst.set_type_id)
      );
      await this.syncRepository.syncTemplateSetTypes(templateSetTypesToSync, data.template_set_type);
    }
  }

  private async handleUserSubscriptions(data: SyncClientData) {
    if (data.user_subscription && data.user_subscription.length > 0) {
      const userSubscriptionIds = data.user_subscription.map((us) => ({
        id: us.id,
        user_id: us.user_id,
        subscription_id: us.entitlement_id,
      }));

      const userSubscriptionsToSync = await this.syncRepository.checkUserSubscriptionsToSync(
        userSubscriptionIds.map((us) => us.id),
        userSubscriptionIds.map((us) => us.user_id),
        userSubscriptionIds.map((us) => us.subscription_id)
      );
      await this.syncRepository.syncUserSubscriptions(userSubscriptionsToSync, data.user_subscription);
    }
  }

  private async handleWorkoutExerciseTypes(data: SyncClientData) {
    if (data.workout_exercise_type && data.workout_exercise_type.length > 0) {
      const workoutExerciseTypeIds = data.workout_exercise_type.map((wet) => ({
        workout_exercise_id: wet.workout_exercise_id,
        exercise_type_id: wet.exercise_type_id,
      }));
      const workoutExerciseTypesToSync = await this.syncRepository.checkWorkoutExerciseTypesToSync(
        workoutExerciseTypeIds.map((wet) => wet.workout_exercise_id),
        workoutExerciseTypeIds.map((wet) => wet.exercise_type_id)
      );
      await this.syncRepository.syncWorkoutExerciseTypes(workoutExerciseTypesToSync, data.workout_exercise_type);
    }
  }
}
