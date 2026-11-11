# 캐시 없이 파일을 내려 주는 로컬 서버 — 고친 내용이 바로 반영되게 함
import http.server, sys

class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        super().end_headers()
    def translate_path(self, path):
        # tobe/mypage.html 처럼 접두사 없는 주소는 tobe/tobe-mypage.html 로 풀어 줌
        import os
        r = super().translate_path(path)
        if not os.path.exists(r):
            d, f = os.path.split(r)
            k = os.path.basename(d)
            if k in ('tobe', 'asis') and os.path.exists(os.path.join(d, k + '-' + f)):
                return os.path.join(d, k + '-' + f)
        return r
    def log_message(self, *a):
        pass

http.server.ThreadingHTTPServer(('', int(sys.argv[1]) if len(sys.argv) > 1 else 8765), H).serve_forever()
