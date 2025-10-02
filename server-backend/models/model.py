import os
from typing import Literal, Optional
from fastapi import FastAPI, Response
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from llama_cpp import Llama

app = FastAPI()

MODEL_PATH = os.environ.get("MODEL_PATH", "models/Llama-3.1-8B-instruct-q4_K_M.gguf")
N_CTX = int(os.environ.get("N_CTX", "4096"))
N_THREADS = int(os.environ.get("N_THREADS", "8"))

# Load once at startup
llm = Llama(
    model_path=MODEL_PATH,
    n_ctx=N_CTX,
    n_threads=N_THREADS,
    logits_all=False,
    verbose=False,
)

class ChatRequest(BaseModel):
    messages: list[dict]   # [{role:'system'|'user'|'assistant', content:str}, ...]
    target_language: Literal["ru", "de"] = "ru"
    max_tokens: int = 512
    temperature: float = 0.7
    top_p: float = 0.95

SYSTEM_PROMPT_RU = (
    "Ты — полезный русскоязычный ассистент. Отвечай только по-русски. "
    "Будь кратким, вежливым и точным."
)
SYSTEM_PROMPT_DE = (
    "Du bist ein hilfreicher deutschsprachiger Assistent. Antworte nur auf Deutsch. "
    "Sei kurz, höflich und präzise."
)

def system_prompt(lang: str) -> str:
    return SYSTEM_PROMPT_RU if lang == "ru" else SYSTEM_PROMPT_DE

def sse_format(data: str) -> bytes:
    return f"data: {data}\n\n".encode("utf-8")

@app.post("/v1/chat")
def chat(req: ChatRequest):
    # Build instruction-style messages (Llama-3 instruct chat template)
    sys = {"role":"system","content": system_prompt(req.target_language)}
    msgs = [sys] + req.messages

    stream = llm.create_chat_completion(
        messages=msgs,
        max_tokens=req.max_tokens,
        temperature=req.temperature,
        top_p=req.top_p,
        stream=True,
    )

    def token_stream():
        try:
            for chunk in stream:
                delta = chunk["choices"][0]["delta"].get("content", "")
                if delta:
                    yield sse_format(delta)
            yield sse_format("[[END]]")
        except Exception as e:
            yield sse_format(f"[[ERROR:{str(e)}]]")

    headers = {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Access-Control-Allow-Origin": "*",  # tighten in prod
    }
    return StreamingResponse(token_stream(), headers=headers)
