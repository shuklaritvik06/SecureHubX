chrome.storage.sync.get(["url"], (result) => {
  const urls = JSON.parse(result.url);
  const url = new URL(window.location.href);
  if (urls.includes("https://" + url.hostname)) {
    document.body.innerHTML = "<h1>BLOCKED!!</h1>";
  }
});
