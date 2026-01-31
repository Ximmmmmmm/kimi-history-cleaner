document.getElementById('deleteBtn').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentUrl = tabs[0].url;
    console.log('当前URL:', currentUrl);

    if (currentUrl.includes('chat/history')) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['content.js']
      }, () => {
        if (chrome.runtime.lastError) {
          console.log("Script might already be injected or other error:", chrome.runtime.lastError.message);
          // Even if injection "fails" (e.g. host perm), try sending message anyway if it was already there via manifest
        }
        chrome.tabs.sendMessage(tabs[0].id, { action: 'deleteAll' }, (response) => {
          if (chrome.runtime.lastError) {
            console.error('消息发送失败 (可能是脚本未就绪):', chrome.runtime.lastError);
          }
        });
      });
      window.close();
    } else {
      const targetUrl = 'https://www.kimi.com/chat/history';
      if (chrome.storage && chrome.storage.local) {
        chrome.storage.local.set({ autoDelete: true }, () => {
          chrome.tabs.update(tabs[0].id, { url: targetUrl });
          window.close();
        });
      } else {
        console.error('chrome.storage 不可用，请确保已在 manifest.json 中添加 storage 权限并点击“刷新”插件图标。');
        // 如果不可用，至少跳转过去，虽然不会自动执行
        chrome.tabs.update(tabs[0].id, { url: targetUrl });
        window.close();
      }
    }
  });
});