import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

old_block = """{loadingNews ? (
             <div className="flex justify-center py-10"><span className="text-gray-700 dark:text-gray-500">ang ti tin tc...</span></div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {realNews.map((news, index) => ("""

# Need to encode/decode correctly if there are Vietnamese characters, but I'll use regex to avoid character issues.
old_regex = r'\{loadingNews \? \([\s\S]*?<div className="flex justify-center py-10">[\s\S]*?</div>\s*\) : \(\s*<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">\s*\{realNews\.map\(\(news, index\) => \('

new_block = """<AnimatePresence mode="wait">
            {loadingNews ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-center py-10">
                <span className="text-gray-700 dark:text-gray-500">Đang tải tin tức...</span>
              </motion.div>
            ) : (
              <motion.div 
                key={activeNewsTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {realNews.map((news, index) => ("""

content = re.sub(old_regex, new_block, content)

# Also need to close the motion.div and AnimatePresence
close_regex = r'\{news\.title\}</h3>\s*</div>\s*</a>\s*\)\)\}\s*</div>\s*\)'
new_close = '{news.title}</h3>\n                    </div>\n                  </a>\n                ))}\n              </motion.div>\n            )}\n          </AnimatePresence>'

content = re.sub(close_regex, new_close, content)

codecs.open(filepath, 'w', 'utf-8').write(content)
print('Added AnimatePresence to news')
