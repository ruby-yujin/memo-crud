from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI()

memos = []

class Memo(BaseModel):
    id:int
    content:str
    
# create_memo(--) : 여기서 -- 는 class으로 생성후 객체로 받아야해 -> 7라인에 class 생성했어
@app.post('/memos')
def create_memo(memo:Memo): 
    memos.append(memo)
    return '메모 추가에 성공했습니다!'

@app.get('/memos')
def read_memo():
    return memos

# 정적인 파일을 받아서 웹서버에서 보여주기
app.mount("/",StaticFiles(directory="static",html=True), name="static")
