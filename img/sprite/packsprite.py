import os
import sys
import re
import json

rxp_adn = re.compile(r'^(\w+)'
                     '(\s(n|ne|e|se|s|sw|w|nw))'
                     '(\d+)'
                     '\.'
                     '(bmp|jpg|jpeg|png)$', re.IGNORECASE)

url_sprite = 'img/sprite'

class AnimationPacker(object):

    def __init__(self, path):
        self.path = path
        self.data = {}
        self.fail = [];

    def append(self, path, name, action, direction, num, ext):
        name = name.strip().lower()
        action = action.strip().lower()
        direction = direction.strip().lower()
        ext = ext.strip().lower();
        num = int(num.strip())
        if name not in self.data:
            self.data[name] = {}
        data = self.data[name]
        if action not in data:
            data[action] = {}
        data = data[action]
        if direction not in data:
            data[direction] = []
        data = data[direction]
#         print('num %s' % num)
        data.append({   'action': action,
                        'direction': direction,
                        'ext':ext,
                        'num':num,
                        'path': os.path.join(url_sprite, path)
                        })

    def parse(self, path):
        name = path
        path = os.path.join(self.path, path);
        if not os.path.exists(path):
            raise ValueError('InvalidPath: %s' % path)
        for p, d, fnames in os.walk(path):
            fnames.sort()
            c = 0
            for fn in fnames:
                m = rxp_adn.match(fn)
                if m is  None:
                    self.fail.append(fn)
                    continue
                c += 1
                self.append(os.path.join(path, fn), name, m.group(1), m.group(3), m.group(4), m.group(5))
        

    def asJson(self):
        data = {'animationPack': self.data}
        return json.dumps(data);

if __name__ == '__main__':
    ap = AnimationPacker(os.path.dirname(__file__))
    ap.parse(sys.argv[1])
    print(ap.asJson())
