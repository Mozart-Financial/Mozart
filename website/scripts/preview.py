from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from urllib.parse import urlsplit
ROOT=Path(__file__).resolve().parents[1]/'dist'
class Handler(SimpleHTTPRequestHandler):
 def __init__(self,*a,**kw): super().__init__(*a,directory=str(ROOT),**kw)
 def do_GET(self):
  path=urlsplit(self.path).path
  if path!='/' and (ROOT/(path.lstrip('/')+'.html')).is_file(): self.path=path+'.html'
  super().do_GET()
ThreadingHTTPServer(('127.0.0.1',8770),Handler).serve_forever()
