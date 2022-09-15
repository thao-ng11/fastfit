# Data models

## User

| Name      | Type   | Unique | Optional |
| --------- | ------ | ------ | -------- |
| id            | int          | yes    | no       |
| username  | string | yes    | no       |
| password  | string | no     | no       |
| email     | string | yes    | no       |
| firstname | string | no     | no       |
| lastname  | string | no     | no       |

The `User` entity contains the data about a user account.

# RECIPES MODELS

## Meal

| Name          | Type         | Unique | Optional |
| ------------- | ------------ | ------ | -------- |
| id            | int          | yes    | no       |
| username        | string | yes    | no       |
| recipe_api_id | string       | no     | no       |
| date          | date         | no     | no       |
| type          | str          | no     | no       |

# WORKOUTS MODELS

## Cardio_workout

| Name         | Type                    | Unique | Optional |
| ------------ | ----------------------- | ------ | -------- |
| id            | int          | yes    | no       |
| username        | string | yes    | no       |
| category     | string | no     | no       |
| workout     | string | no     | no       |
| date/time    | date/time               | no     | no       |
| duration       | int                     | no     | no       |
| distance     | float                   | no     | yes      |

## Strength_workout

| Name         | Type                    | Unique | Optional |
| ------------ | ----------------------- | ------ | -------- |
| id            | int          | yes    | no       |
| username        | string | yes    | no       |
| category     | string | no     | no       |
| muscle_group | str                     | no     | no       |
| workout     | string | no     | no       |
| date/time    | date/time               | no     | no       |
| sets         | int                     | no     | no       |
| repetitions  | int                     | no     | no       |
| weight       | int                     | no     | yes      |

# JOURNAL MODELS

## Journal

| Name      | Type     | Unique | Optional |
| --------- | -------- | ------ | -------- |
| id            | int          | yes    | no       |
| username        | string | yes    | no       |
| date      | date     | no     | no       |
| grateful  | str      | no     | no       |
| daily_aff | str      | no     | no       |
| note      | str      | no     | no       |
| feeling   | int      | no     | no       |

# HEALTH MODELS

## Health_data

| Name           | Type        | Unique | Optional |
| -------------- | ----------- | ------ | -------- |
| id            | int          | yes    | no       |
| username        | string | yes    | no       |
| current_weight | int         | no     | no       |
| current_bmi    | float       | no     | no       |
| date/time      | date/time   | no     | no       |

## Goals

| Name        | Type        | Unique | Optional |
| ----------- | ----------- | ------ | -------- |
| id            | int          | yes    | no       |
| username        | string | yes    | no       |
| goal_weight | int         | no     | no       |
| goal_bmi    | float       | no     | no       |
| height    | int       | no     | no       |
