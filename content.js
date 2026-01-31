// 防止重复注入导致这类变量重定义错误
if (typeof window.deleteAllSessions === 'undefined') {
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  async function deleteAllSessions() {
    try {
      const checkboxes = [...document.querySelectorAll('input[type="checkbox"]')];
      console.log(`📂 找到 ${checkboxes.length} 条会话`);

      checkboxes.forEach(cb => {
        if (!cb.checked) cb.click();
      });

      await sleep(300);

      const batchDeleteBtn = [...document.querySelectorAll('span.delete-text')]
        .find(el => el.innerText.trim() === '删除');

      if (!batchDeleteBtn) {
        console.error('❌ 未找到批量删除按钮');
        return;
      }

      batchDeleteBtn.click();
      await sleep(400);

      const confirmBtn = [...document.querySelectorAll('button.kimi-button.danger.modal-button')]
        .find(b => b.innerText.trim() === '删除');

      if (confirmBtn) {
        confirmBtn.click();
        console.log(`✅ 已触发批量删除`);
      } else {
        console.warn('⚠ 未找到确认按钮');
      }
    } catch (error) {
      console.error('执行出错:', error);
    }
  }

  // 暴露给全局以便调用
  window.deleteAllSessions = deleteAllSessions;

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'deleteAll') {
      deleteAllSessions();
      sendResponse({ status: 'started' });
    }
  });

  // 检查是否需要自动执行
  chrome.storage.local.get(['autoDelete'], (result) => {
    if (result.autoDelete && window.location.href.includes('chat/history')) {
      console.log('🚀 发现自动删除标记，正在启动...');
      chrome.storage.local.remove('autoDelete', () => {
        // 延迟一下等待页面加载更稳定
        setTimeout(deleteAllSessions, 1000);
      });
    }
  });
}