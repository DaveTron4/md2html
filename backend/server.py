# app.py
from flask import Flask, request, jsonify
import markdown
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from Vite dev server

@app.route('/convert', methods=['POST'])
def convert_md():
    data = request.get_json()
    md_content = data.get('markdown', '')
    html = markdown.markdown(md_content)
    print(html)  # Debugging line to check the HTML output
    return jsonify({'html': html})

if __name__ == '__main__':
    app.run(debug=True)
