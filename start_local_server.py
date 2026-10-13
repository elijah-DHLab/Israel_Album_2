from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from pathlib import Path
import os,webbrowser
os.chdir(Path(__file__).resolve().parent)
server=ThreadingHTTPServer(('127.0.0.1',8000),SimpleHTTPRequestHandler)
print('Open http://localhost:8000/ — press CTRL+C to exit',flush=True)
webbrowser.open('http://localhost:8000/')
server.serve_forever()
