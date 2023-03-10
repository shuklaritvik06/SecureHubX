chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.runtime.setUninstallURL(
      "https://github.com/shuklaritvik06/securehubx/issues"
    );
  }
});
// chrome.alarms.onAlarm.addListener(() => {
//   chrome.notifications.create(
//     "starred",
//     {
//       type: "basic",
//       iconUrl: "images/octocat.gif",
//       title: "Contribution Stats",
//       message: "PR: 23, Issues: 23, Reviews: 21,Commits: 12",
//       silent: false
//     },
//     () => {}
//   );
// });

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const { username, repo } = JSON.parse(request);
  console.log(username, repo);
  sendResponse(
    JSON.stringify({
      status: "success"
    })
  );
});

// function createAlarm(username) {
//   chrome.alarms.create(username, {
//     delayInMinutes: 1,
//     periodInMinutes: 1
//   });
// }

// chrome.alarms.clear("open_source");
