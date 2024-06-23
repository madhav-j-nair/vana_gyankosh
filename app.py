from flask import Flask, request, jsonify
import os
from jinja2 import Template
from flask_cors import CORS


# (Set your Google API key securely, not shown here)
os.environ["GOOGLE_API_KEY"] = "enter your API key"  # Replace with your secure key storage method


# Import the ChatGoogleGenerativeAI class (replace with your actual implementation)
from langchain_google_genai import ChatGoogleGenerativeAI

app = Flask(__name__)

cors=CORS(app,origins="*")
llm = ChatGoogleGenerativeAI(model='gemini-pro')  # Create a global LLM instance

@app.route('/', methods=['GET'])
def get_plant_info():
    name = request.args.get('name')
    choice = request.args.get('choice')
    

    user_data = {
    "DESCRIPTION": Template("give a description about the {{ name }}").render(name=name),
    "BIOLOGICAL_DATA": Template("give details about biological features like growth time, age, environmental conditions and all other details about {{ name }}").render(name=name),
    "MARKET_DETAILS": Template("give details about the market data , cost of seed, export potential, market in India about {{ name }}").render(name=name),
    "HOW_TO_GROW": Template("step by step procedure on how to grow , the conditions and tips about {{ name }}").render(name=name),
     }


    if not name:
        return jsonify({'error': 'Please provide a plant name'}), 400  # Bad request

    if choice not in user_data:
        return jsonify({'error': 'Invalid choice. Valid choices: ' + ', '.join(user_data.keys())}), 400

    prompt = f"True or false, is {name} a plant or a tree? Just answer true or false."
    is_plant_or_tree = llm.invoke(prompt)

    if "true" not in is_plant_or_tree.content.lower():  # Check for both 'true' and 'True' (case-insensitive)
        return jsonify({'error': 'Please enter a valid plant or tree'})

    response = llm.invoke(user_data[choice])
    return jsonify({'plant_info': response.content})

if __name__ == '__main__':
    app.run(port=5000,debug=True)
