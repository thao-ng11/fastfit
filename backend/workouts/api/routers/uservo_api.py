from fastapi import APIRouter, Response, status, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from psycopg.errors import ForeignKeyViolation
import os
from jose import jwt