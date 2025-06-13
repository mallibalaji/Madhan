# Base image with Python and FFmpeg
FROM python:3.10-slim

# Install dependencies including FFmpeg
RUN apt-get update && \
    apt-get install -y ffmpeg && \
    apt-get clean

# Set working directory
WORKDIR /app

# Copy your project files
COPY . /app

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Command to run your Python bot or app
CMD ["python", "main.py"]
