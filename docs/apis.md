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
