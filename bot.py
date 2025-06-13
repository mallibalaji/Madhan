import os
import logging
import subprocess
import gdown
from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, ContextTypes, filters
from dotenv import load_dotenv

load_dotenv()

BOT_TOKEN = os.getenv("BOT_TOKEN")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Send me a Google Drive link to convert to AC3 audio.")


async def handle_drive_link(update: Update, context: ContextTypes.DEFAULT_TYPE):
    message_text = update.message.text

    if "drive.google.com" not in message_text:
        await update.message.reply_text("Please send a valid Google Drive link.")
        return

    try:
        await update.message.reply_text("Downloading video...")

        output_video = "input.mp4"
        output_audio = "output.ac3"

        gdown.download(url=message_text, output=output_video, quiet=False, fuzzy=True)

        await update.message.reply_text("Converting video to AC3 audio...")

        ffmpeg_command = ["ffmpeg", "-i", output_video, "-c:a", "ac3", "-b:a", "192k", output_audio]
        subprocess.run(ffmpeg_command, check=True)

        file_size = os.path.getsize(output_audio)
        if file_size > 2 * 1024 * 1024 * 1024:
            await update.message.reply_text("Converted file is larger than 2GB. Cannot upload via Telegram.")
        else:
            await update.message.reply_document(document=open(output_audio, "rb"))

    except Exception as e:
        logger.error(f"Error: {e}")
        await update.message.reply_text("An error occurred during conversion.")
    finally:
        if os.path.exists(output_video):
            os.remove(output_video)
        if os.path.exists(output_audio):
            os.remove(output_audio)


if __name__ == "__main__":
    app = ApplicationBuilder().token(BOT_TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_drive_link))

    print("🤖 Bot is running...")
    app.run_polling()
