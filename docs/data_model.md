# Data models

## User

| Name      | Type   | Unique | Optional |
| --------- | ------ | ------ | -------- |
| username  | string | yes    | no       |
| password  | string | no     | no       |
| email     | string | yes    | no       |
| firstname | string | no     | no       |
| lastname  | string | no     | no       |

## Profile

| Name      | Type              | Unique | Optional |
| --------- | ----------------- | ------ | -------- |
| user_info | reference to user | yes    | no       |
| avatar    | png               | no     | no       |
| height    | int               | no     | no       |
| zip       | int               | no     | no       |

The `User` entity contains the data about a user account.

# RECIPES MODELS

## Meal

| Name          | Type         | Unique | Optional |
| ------------- | ------------ | ------ | -------- |
| id            | int          | yes    | no       |
| uservo        | reference to | yes    | no       |
| recipe_api_id | string       | no     | no       |
| date          | date         | no     | no       |
| type          | str          | no     | no       |

# WORKOUTS MODELS

## Workout_categories

| Name     | Type | Unique | Optional |
| -------- | ---- | ------ | -------- |
| category | str  | yes    | no       |

## Muscle_group

| Name   | Type | Unique | Optional |
| ------ | ---- | ------ | -------- |
| muscle | str  | yes    | no       |

## Cardio_workout

| Name         | Type                    | Unique | Optional |
| ------------ | ----------------------- | ------ | -------- |
| uservo       | reference to            | yes    | no       |
| category     | reference to categories | no     | no       |
| date/time    | date/time               | no     | no       |
| muscle_group | str                     | no     | no       |
| length       | int                     | no     | no       |
| distance     | float                   | no     | yes      |

## Strength_workout

| Name         | Type                    | Unique | Optional |
| ------------ | ----------------------- | ------ | -------- |
| uservo       | reference to            | yes    | no       |
| category     | reference to categories | no     | no       |
| date/time    | date/time               | no     | no       |
| muscle_group | str                     | no     | no       |
| sets         | int                     | no     | no       |
| repetitions  | int                     | no     | no       |
| weight       | int                     | no     | yes      |

# JOURNAL MODELS

## Journal

| Name      | Type     | Unique | Optional |
| --------- | -------- | ------ | -------- |
| uservo    | ref_user | no     | no       |
| date      | date     | no     | no       |
| grateful  | str      | no     | no       |
| daily_aff | str      | no     | no       |
| note      | str      | no     | no       |
| feeling   | int      | no     | no       |

# HEALTH MODELS

## Health_data

| Name           | Type        | Unique | Optional |
| -------------- | ----------- | ------ | -------- |
| profilevo      | ref_profile | no     | no       |
| current_weight | int         | no     | no       |
| current_bmi    | float       | no     | no       |
| date/time      | date/time   | no     | no       |

## Goals

| Name        | Type        | Unique | Optional |
| ----------- | ----------- | ------ | -------- |
| profilevo   | ref_profile | no     | no       |
| goal_weight | int         | no     | no       |
| goal_bmi    | float       | no     | no       |
