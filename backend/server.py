from fastapi import FastAPI, APIRouter, HTTPException, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Annotated
from bson import ObjectId
from pydantic.functional_validators import BeforeValidator
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'change-me')

app = FastAPI()
api_router = APIRouter(prefix="/api")

# ---------- Helpers ----------
PyObjectId = Annotated[str, BeforeValidator(str)]


def now_iso():
    return datetime.now(timezone.utc).isoformat()


def verify_admin(password: Optional[str]):
    if not password or password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid admin password")


# ---------- Models ----------
class RSVPCreate(BaseModel):
    name: str
    guest_count: int = Field(ge=1, le=50)


class RSVP(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    guest_count: int
    created_at: str = Field(default_factory=now_iso)


class BlessingCreate(BaseModel):
    name: str
    message: str


class BlessingUpdate(BaseModel):
    name: Optional[str] = None
    message: Optional[str] = None


class Blessing(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    message: str
    created_at: str = Field(default_factory=now_iso)


class AdminLogin(BaseModel):
    password: str


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Abel & Merlyn Wedding API"}


# RSVP
@api_router.post("/rsvp", response_model=RSVP)
async def create_rsvp(payload: RSVPCreate):
    obj = RSVP(name=payload.name.strip(), guest_count=payload.guest_count)
    await db.rsvps.insert_one(obj.model_dump())
    return obj


@api_router.get("/rsvp", response_model=List[RSVP])
async def list_rsvps(x_admin_password: Optional[str] = Header(default=None)):
    verify_admin(x_admin_password)
    docs = await db.rsvps.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return docs


# Guestbook
@api_router.post("/guestbook", response_model=Blessing)
async def create_blessing(payload: BlessingCreate):
    name = payload.name.strip()
    message = payload.message.strip()
    if not name or not message:
        raise HTTPException(status_code=400, detail="Name and message are required")
    obj = Blessing(name=name[:60], message=message[:400])
    await db.blessings.insert_one(obj.model_dump())
    return obj


@api_router.get("/guestbook", response_model=List[Blessing])
async def list_blessings():
    docs = await db.blessings.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return docs


@api_router.put("/guestbook/{blessing_id}", response_model=Blessing)
async def update_blessing(blessing_id: str, payload: BlessingUpdate,
                          x_admin_password: Optional[str] = Header(default=None)):
    verify_admin(x_admin_password)
    update = {k: v for k, v in payload.model_dump().items() if v is not None}
    if not update:
        raise HTTPException(status_code=400, detail="Nothing to update")
    res = await db.blessings.find_one_and_update(
        {"id": blessing_id}, {"$set": update}, return_document=True
    )
    if not res:
        raise HTTPException(status_code=404, detail="Blessing not found")
    res.pop("_id", None)
    return res


@api_router.delete("/guestbook/{blessing_id}")
async def delete_blessing(blessing_id: str, x_admin_password: Optional[str] = Header(default=None)):
    verify_admin(x_admin_password)
    res = await db.blessings.delete_one({"id": blessing_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blessing not found")
    return {"ok": True}


# Admin
@api_router.post("/admin/login")
async def admin_login(payload: AdminLogin):
    verify_admin(payload.password)
    return {"ok": True}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
