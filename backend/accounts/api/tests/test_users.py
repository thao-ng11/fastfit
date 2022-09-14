
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def test_verify_password():

    input = "password"
    input2 = "$2b$12$lS57fBpYGs5sNZrUJkMtCuwiNfDZyxjpDT5sUP7kvLJfNTJUAwkxq"
    result = verify_password(input, input2)
    print(input, input2, result)

    assert result == True