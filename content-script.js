const target = document.createElement('script')
target.type =  'text/javascript'
target.src = chrome.runtime.getURL('interceptor.js')

document.documentElement.appendChild(target)