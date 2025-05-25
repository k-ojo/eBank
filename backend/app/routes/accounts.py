from fastapi import APIRouter, Depends, HTTPException, status
from app.models.user import AccountCreate, DepositRequest, WithdrawalRequest, TransferRequest
from app.services.auth import get_current_user
from app.db.init import accounts_collection, transactions_collection
from app.utils import serialize_doc
from datetime import datetime
import uuid


router = APIRouter(prefix="/api/accounts", tags=["accounts"])

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_account(account_data: AccountCreate, current_user: dict = Depends(get_current_user)):
    account_id = str(uuid.uuid4())
    account_number = generate_account_number()
    sort_code = generate_sort_code()
    
    account_doc = {
        "account_id": account_id,
        "user_id": current_user["user_id"],
        "account_number": account_number,
        "sort_code": sort_code,
        "account_type": account_data.account_type,
        "balance": float(account_data.initial_deposit),
        "currency": "GBP",
        "status": "active",
        "created_at": datetime.utcnow()
    }
    await accounts_collection.insert_one(account_doc)
    
    if account_data.initial_deposit > 0:
        transaction_id = str(uuid.uuid4())
        transaction_doc = {
            "transaction_id": transaction_id,
            "account_id": account_id,
            "transaction_type": "deposit",
            "amount": float(account_data.initial_deposit),
            "status": "completed",
            "timestamp": datetime.utcnow(),
            "description": "Initial deposit"
        }
        await transactions_collection.insert_one(transaction_doc)
    
    return serialize_doc(account_doc)

@router.get("/{account_id}/balance")
async def get_balance(account_id: str, current_user: dict = Depends(get_current_user)):
    account = await accounts_collection.find_one({"account_id": account_id, "user_id": current_user["user_id"]})
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
    return {"balance": account["balance"], "currency": account["currency"]}

