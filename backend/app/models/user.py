from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Dict
from enum import Enum
from decimal import Decimal

class AccountType(str, Enum):
    current = "current"
    savings = "savings"
    business = "business"

class TransactionType(str, Enum):
    deposit = "deposit"
    withdrawal = "withdrawal"
    transfer = "transfer"
    payment = "payment"

class TransactionStatus(str, Enum):
    pending = "pending"
    completed = "completed"
    failed = "failed"

class UserRegister(BaseModel):
    first_name: str = Field(..., min_length=1, max_length=50)
    last_name: str = Field(..., min_length=1, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=8)
    date_of_birth: str
    phone: str
    address: Dict

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class AccountCreate(BaseModel):
    account_type: AccountType
    initial_deposit: Optional[Decimal] = Field(default=0.00, ge=0)

class TransferRequest(BaseModel):
    from_account_id: str
    to_account_number: str
    to_sort_code: str
    amount: Decimal = Field(..., gt=0)
    reference: Optional[str] = None
    recipient_name: str

class DepositRequest(BaseModel):
    account_id: str
    amount: Decimal = Field(..., gt=0)
    description: Optional[str] = None

class WithdrawalRequest(BaseModel):
    account_id: str
    amount: Decimal = Field(..., gt=0)
    description: Optional[str] = None

class Token(BaseModel):
    access_token: str
    token_type: str
