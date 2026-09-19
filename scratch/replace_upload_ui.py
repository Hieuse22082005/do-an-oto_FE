import codecs

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\EvaluateTab.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

old_upload = """<label className="relative inline-flex items-center justify-center cursor-pointer group/btn">
                         <input type="file" accept="image/*" multiple className="hidden" onChange={handleUploadCavet} disabled={isExtracting} />
                         <div className="bg-white dark:bg-black/5 dark:bg-white/5 hover:bg-white dark:bg-black/5 dark:hover:bg-white/10 border border-black/20 dark:border-white/20 px-8 py-3 rounded-full text-cyan-700 dark:text-cyan-300 font-bold backdrop-blur-md transition-all flex items-center gap-2 group-hover/btn:shadow-[0_0_15px_rgba(6,182,212,0.4)] group-hover/btn:border-cyan-500/50">
                           <ScanLine className="w-5 h-5" /> Chọn Ảnh Tải Lên
                         </div>
                       </label>"""

new_upload = """<label className="doodle-upload-container" tabIndex={0}>
                         <input type="file" accept="image/*" multiple className="hidden-file-input" onChange={handleUploadCavet} disabled={isExtracting} />
                         <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
                            <defs>
                              <filter id="doodle-jitter" x="-20%" y="-20%" width="140%" height="140%">
                                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves={3} result="noise"></feTurbulence>
                                <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G"></feDisplacementMap>
                              </filter>
                            </defs>
                          </svg>

                          <div className="doodle-folder">
                            <div className="folder-back">
                              <div className="folder-tab"></div>
                            </div>

                            <div className="doodle-papers">
                              <div className="paper file-1">
                                <div className="scribble-line"></div>
                                <div className="scribble-line short"></div>
                                <div className="scribble-line"></div>
                              </div>
                              <div className="paper file-2">
                                <svg viewBox="0 0 24 24" className="doodle-image-icon">
                                  <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="2"></rect>
                                  <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"></circle>
                                  <path d="M21 15l-5-5L5 21" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"></path>
                                </svg>
                              </div>
                            </div>

                            <div className="folder-front">
                              <svg className="folder-smile" viewBox="0 0 24 24">
                                <path d="M 7 14 Q 12 19 17 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"></path>
                              </svg>
                            </div>
                          </div>

                          <div className="doodle-btn">
                            <span className="btn-text">CHỌN ẢNH TẢI LÊN</span>
                          </div>

                          <svg className="doodle-decor sparkle-1" viewBox="0 0 24 24">
                            <path d="M12 0C12 6.6 17.4 12 24 12C17.4 12 12 17.4 12 24C12 17.4 6.6 12 0 12C6.6 12 12 6.6 12 0Z" fill="var(--btn-hover)" stroke="currentColor" strokeWidth="1.5"></path>
                          </svg>
                          <svg className="doodle-decor star-1" viewBox="0 0 24 24">
                            <path d="M12 2L15 9L22 10L17 15L18.5 22L12 18.5L5.5 22L7 15L2 10L9 9L12 2Z" fill="var(--accent-blue)" stroke="currentColor" strokeWidth="1.5"></path>
                          </svg>

                          <svg className="doodle-paperclip" viewBox="0 0 24 24">
                            <path d="M 12 4 L 12 18 C 12 20 9 20 9 18 L 9 6 C 9 3 15 3 15 6 L 15 16 C 15 18 13 18 13 16 L 13 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                          </svg>
                       </label>"""

if old_upload in content:
    content = content.replace(old_upload, new_upload)
    codecs.open(filepath, 'w', 'utf-8').write(content)
    print('Updated UI successfully')
else:
    print('Could not find exact old upload block')
