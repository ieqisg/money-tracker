FROM python:3.10-slim

WORKDIR /app

ENV PYTHONUNBUFFERED=1
ENV FLAGS_allocator_strategy=auto_growth

RUN apt-get update && apt-get install -y \
    --no-install-recommends \
    git \
    libgl1 \
    libglib2.0-0 \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt \
    --extra-index-url https://www.paddlepaddle.org.cn/packages/stable/cu126/

RUN git clone --depth 1 --branch release/2.10 \
    https://github.com/PaddlePaddle/PaddleOCR.git /opt/PaddleOCR

ENV PYTHONPATH=/opt/PaddleOCR

COPY . .

EXPOSE 8001

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]
