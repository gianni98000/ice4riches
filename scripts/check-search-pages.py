"""Validate built public content, canonical URLs, internal links and JSON-LD.
Run after npm run build: python scripts/check-search-pages.py
"""
import json
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import xml.etree.ElementTree as ET

ROOT = Path('.next/server/app')
SITE = 'https://ice4riches.com'
class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(); self.links=[]; self.canonicals=[]; self.robots=[]; self.h1=0; self.text=[]; self.scripts=[]; self.script=None; self.script_type=None
        self.feed(source)
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='a': self.links.append(a.get('href',''))
        if tag=='h1': self.h1+=1
        if tag=='link' and a.get('rel')=='canonical': self.canonicals.append(a.get('href'))
        if tag=='meta' and a.get('name') in ('robots','googlebot'): self.robots.append(a.get('content',''))
        if tag=='script': self.script=[]; self.script_type=a.get('type')
    def handle_data(self, data):
        if self.script is not None: self.script.append(data)
        else: self.text.append(data)
    def handle_endtag(self, tag):
        if tag=='script' and self.script is not None:
            if self.script_type=='application/ld+json': self.scripts.append(json.loads(''.join(self.script)))
            self.script=None; self.script_type=None

def file_for(path): return ROOT/('index.html' if path=='/' else path.strip('/')+'.html')
sitemap=ET.fromstring((ROOT/'sitemap.xml.body').read_text())
urls=[n.text for n in sitemap.findall('{*}url/{*}loc')]
assert len(urls)==18 and len(set(urls))==len(urls), urls
paths={urlsplit(url).path or '/' for url in urls}
assert '/order' not in paths
for url in urls:
    path=urlsplit(url).path or '/'; p=Page(file_for(path).read_text())
    assert p.h1==1, (path,'H1',p.h1)
    assert len(p.canonicals)==1 and p.canonicals[0].rstrip('/')==url.rstrip('/'), (path,'canonical',p.canonicals,url)
    assert not any('noindex' in r or 'nosnippet' in r for r in p.robots), (path,'robots')
    assert p.scripts, (path,'missing JSON-LD')
    for href in p.links:
        if href.startswith('/') and not href.startswith('//'):
            target=urlsplit(href).path or '/'
            assert target in paths or target=='/order' or target.startswith('/licenses/'), (path,'broken link',href)
    assert '/clear-ice' in p.links or path=='/clear-ice', (path,'hub link')
    assert '/gravure-clear-ice-personnalisee' in p.links or path=='/gravure-clear-ice-personnalisee', (path,'engraving link')
    normalize=lambda t:re.sub(r'\s+',' ',t).strip()
    visible=normalize(' '.join(p.text))
    for script in p.scripts:
        for entity in script.get('@graph',[script]):
            if entity.get('@type')=='FAQPage':
                for item in entity['mainEntity']:
                    assert normalize(item['name']) in visible, (path,'question mismatch')
                    assert normalize(item['acceptedAnswer']['text']) in visible, (path,'answer mismatch')
    if path=='/gravure-clear-ice-personnalisee':
        assert not any(href.startswith('/order') for href in p.links)
    if path.startswith('/clear-ice/'):
        product=[node for script in p.scripts for node in script.get('@graph',[]) if node.get('@type')=='Product'][0]
        assert product['width']['unitCode']=='MMT' and 'offers' not in product
    print('PASS',path)
order=Page((ROOT/'order.html').read_text())
assert any('noindex' in r for r in order.robots)
robots=(ROOT/'robots.txt.body').read_text()
assert 'User-Agent: *' in robots and 'Allow: /' in robots and 'Disallow: /' not in robots
assert SITE+'/sitemap.xml' in robots
print('PASS: 18 indexable pages, internal links, matching visible/schema FAQs, quote-only engraving, order excluded, crawl allowed')
