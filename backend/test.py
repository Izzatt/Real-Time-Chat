from pymongo import MongoClient
client = MongoClient("mongodb+srv://izzat:dbpa%24%24word1234@cluster0.cvhz3.mongodb.net/chat_app?retryWrites=true&w=majority")
client.admin.command("ping")