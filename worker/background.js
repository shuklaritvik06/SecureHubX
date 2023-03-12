chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.runtime.setUninstallURL(
      "https://github.com/shuklaritvik06/securehubx/issues"
    );
  }
});

chrome.alarms.onAlarm.addListener(() => {
  chrome.storage.sync.get(["username"], (result) => {
    const { username, repo, email } = result.username;
    fetch("http://localhost:5000/api/github", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        repo,
        email
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "success") {
          chrome.notifications.create(
            "sentData",
            {
              type: "basic",
              iconUrl: "images/octocat.gif",
              title: "Stats Sent",
              message: "Today's stats sent to the mail!",
              silent: false
            },
            () => {}
          );
        }
      });
  });
});

function getCurrentDelay() {
  const current = new Date();
  const time = current.getTime();
  current.setHours(24, 0, 0, 0);
  return Math.floor((current - time) / 60000);
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const { username, repo, email } = JSON.parse(request);
  try {
    createAlarm(username, repo, email);
  } catch (err) {
    return;
  }
  sendResponse(
    JSON.stringify({
      status: "success"
    })
  );
});

function createAlarm(username, repo, email) {
  chrome.storage.sync.set({
    username: {
      username,
      repo,
      email
    }
  });
  chrome.alarms.create(repo, {
    delayInMinutes: getCurrentDelay(),
    periodInMinutes: 86400000
  });
}
