# Data models

## User

| Name      | Type         | Unique | Optional |
| --------- | ------------ | ------ | -------- |
| username  | string       | yes    | no       |
| password  | string       | no     | no       |
| email     | string       | yes    | no       |
| firstname | string       | no     | no       |
| lastname  | string       | no     | no       |

The `User` entity contains the data about a user account.

### RECIPES MODELS

## Meal

| Name       | Type     | Unique | Optional |
| ---------- | -------- | ------ | -------- |
| id         | int      | yes    | no       |
| uservo     | reference to user  | yes    | no       |
| recipe_api_id| string   | no     | no       |
| date     | date | no    | no       |
| type | str      | no     | no       |

### WORKOUTS MODELS

## Workout_categories

| Name       | Type     | Unique | Optional |
| ---------- | -------- | ------ | -------- |
| category | str      | yes    | no       |

## Muscle_group

| Name       | Type     | Unique | Optional |
| ---------- | -------- | ------ | -------- |
| muscle | str      | yes    | no       |

## Cardio_workout

| Name       | Type        | Unique | Optional |
| ---------- | ----------- | ------ | -------- |
| uservo | reference to    | yes    | no       |
| category | reference to categories | no    | no       |
| date/time   | date/time      | no     | no       |
| muscle_group  | str    | no    | no       |
| length | int      | no    | no       |
| distance    | float | no     | yes      |

## Strength_workout

| Name       | Type        | Unique | Optional |
| ---------- | ----------- | ------ | -------- |
| uservo | reference to    | yes    | no       |
| category | reference to categories | no    | no       |
| date/time   | date/time      | no     | no       |
| muscle_group  | str    | no    | no       |
| sets | int      | no    | no       |
| repetitions    | int | no     | no      |
| weight    | int | no     | yes      |

### JOURNAL MODELS

## Feeling_Emoji

| Name            | Type     | Unique | Optional |
| --------------- | -------- | ------ | -------- |
| id | int | no     | no       |
| feeling | str | no     | no       |
| image | date | no     | no       |

## User_Mood

| Name            | Type     | Unique | Optional |
| --------------- | -------- | ------ | -------- |
| feeling | str | no     | no       |
| uservo | reference to user | no     | no       |
| date | date | no     | no       |

## Journal_streak

| Name            | Type     | Unique | Optional |
| --------------- | -------- | ------ | -------- |
| uservo | reference to user | no     | no       |
| streak_days | int | no     | no       |
| date | int | no     | no       |

## Journal

| Name            | Type     | Unique | Optional |
| --------------- | -------- | ------ | -------- |
| uservo | ref_user | no     | no       |
| date | date | no     | no       |
| grateful     | str   | no     | no       |
| daily_aff    | str   | no     | no       |
| note          | str     | no     | no       |
