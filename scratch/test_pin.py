import urllib.request, re, json

url = 'https://www.pinterest.com/pin/165085142586714080/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')

# Find original images
urls = re.findall(r'https://i\.pinimg\.com/originals/[^\"]+\.(?:jpg|png)', html)
urls = list(set(urls))
print(json.dumps(urls, indent=2))
