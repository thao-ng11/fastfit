### FastFIT Microservices

## Recipes

- **Method**: POST, GET, DELETE, PUT
- **Path**: /api/meals, api/meals/user, /api/meals/{meal_id}

Input:

```json
{
"username": str,
"recipe_api_id": str,
"date": date,
"type": str
}
```

Input for Put:

```json
{
"date": date,
"type": str
}
```

Output:

```json
{
"id": int,
"username": str,
"recipe_api_id": str,
"date": date,
"type": str
}
```

- POST/GET /meals - gets a list of all meals for every user, post   creates a meal
- GET /meals/user - gets all meals for a specific username
- GET /meals/{meal_id} - gets a specific meal id
- DELETE /meals/{meal_id} - delete a specific meal id
- PUT /meals/{meal_id} - updates a specific meal id

## Journals

- **Method**: POST, GET, DELETE
- **Path**: /api/journals/, /api/journals/user/, /api/journals/{journal_id}/,

Input:

```json
{
"username": str,
"entry_date": str,
"grateful": str,
"daily_aff": str,
"note": str,
"feeling": int,
}
```

Output:

```json
{
"id": int,
"username": str,
"entry_date": str,
"grateful": str,
"daily_aff": str,
"note": str,
"feeling": int,
}
```

- POST/GET /api/journals - gets a list of all offerings for journal.
  Post creates a new journal to users.
- GET /api/journals/journal_id - gets a specific journal id.
- DELETE a journal - able to delete a journal from the database.
