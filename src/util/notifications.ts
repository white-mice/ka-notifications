import { NotificationsResponse, Notification, AvatarNotification, BadgeNotification, BasicNotification, GroupedBadgeNotification, ModeratorNotification, ProgramFeedbackNotification, ResponseFeedbackNotification } from "../notification";
import { graphQLFetch, getChromeFkey } from "./graphql";
import { escapeHTML, parseAndRender } from "./markdown";
import AVATAR_SHORTNAMES from "../json/avatar-shortnames.json";
import AVATAR_REQUIREMENTS from "../json/avatar-requirements.json";

// Shorthand to create element
function _element (type: string, className: string): HTMLElement {
  const element = document.createElement(type);
  element.className = className;
  return element;
}

// Gets the time since a date as a string
function timeSince (date: Date): string {
  const seconds = ((new Date().getTime() - date.getTime()) / 1000) | 0;

  if (seconds < 60) {
    return `${seconds} second${seconds === 1 ? "" : "s"}`;
  }

  if (seconds < 3600) {
    const minutes = (seconds / 60) | 0;
    return `${minutes} minute${minutes === 1 ? "" : "s"}`;
  }

  if (seconds < 86400) {
    const hours = (seconds / 3600) | 0;
    return `${hours} hour${hours === 1 ? "" : "s"}`;
  }

  if (seconds < 2592000) {
    const days = (seconds / 86400) | 0;
    return `${days} day${days === 1 ? "" : "s"}`;
  }

  if (seconds < 31536000) {
    const months = (seconds / 2592000) | 0;
    return `${months} month${months === 1 ? "" : "s"}`;
  }

  const years = (seconds / 31536000) | 0;
  return `${years} year${years === 1 ? "" : "s"}`;
}

function addFeedbackTextarea (button: HTMLButtonElement, requestType: RequestType, responseType: ResponseType, id: string, qaExpandKey: string, qaExpandType: string, focusKind = "scratchpad") {
  const originalOnClick = button.onclick;
  const textarea = _element("textarea", "notification-reply-textarea") as HTMLTextAreaElement;
  button.parentElement.insertAdjacentElement("beforebegin", textarea);
  textarea.focus();
  textarea.style.height = "0";
  textarea.style.height = textarea.scrollHeight+"px";
  textarea.oninput = () => {
    textarea.style.height = "0";
    textarea.style.height = textarea.scrollHeight+"px";
  };
  button.innerText = "Send";
  button.onclick = async () => {
    if(textarea.value === "") {
      button.innerText = "Reply";
      button.onclick = originalOnClick;
      textarea.remove();
      return;
    } else {
      button.innerText = "Sending";
      const spinner = _element("div", "mini-loading-spinner");
      spinner.innerHTML = "<div></div><div></div><div></div>";
      spinner.style.display = "inline-block";
      button.insertAdjacentElement("afterend", spinner);
      console.log(requestType);
      addFeedback(requestType, responseType, id, qaExpandKey, textarea.value, qaExpandType, focusKind)
        .then(() => {
          button.innerText = "Sent";
          spinner.remove();
          textarea.remove();
        })
        .catch(console.error);
    }
  };
}

// Send a message given a valid program ID and qakey
type RequestType = "QUESTION" | "COMMENT";
type ResponseType = "REPLY" | "ANSWER";
async function addFeedback (feedbackType: RequestType, responseType: ResponseType, topicId: string, qaExpandKey: string, textContent: string, expandType: string, focusKind = "scratchpad"): Promise<void | Response> {
  return await getChromeFkey()
    .then((fkey) =>
      graphQLFetch("feedbackQuery", fkey, {
        topicId,
        feedbackType,
        currentSort: 1,
        qaExpandKey,
        focusKind
      })
        .then(async (response) => {
          const json = await response.json();
          const sub = json.data.feedback.feedback[0];
          const key: string = feedbackType === "QUESTION" && expandType === "answer" ? sub.answers[0].key : sub.key;
          console.log(key, sub, feedbackType === "QUESTION" && expandType === "answer", feedbackType, expandType);
          return graphQLFetch("AddFeedbackToDiscussion", fkey, { parentKey: key, textContent, feedbackType: responseType });
        }))
    .catch((error) => {
      console.error("Error in sending feedback: ", error);
    });
}

// Creates an HTMLDivElement from a Notification object
export async function createNotificationHTMLDivElement (notification: Notification): Promise<HTMLDivElement> {
  const { __typename, brandNew, date, url } = notification;

  // This base element is the same no matter what type
  const notificationElement = _element("li", "notification" + (brandNew ? " unread" : ""));

  switch(__typename) {
    case "ResponseFeedbackNotification": {
      const { authorAvatarUrl, authorNickname, content, feedbackType, focusTranslatedTitle } = notification as ResponseFeedbackNotification & BasicNotification;
      notificationElement.innerHTML = `<div class='notification-header'><img class='notification-author--avatar' src='${authorAvatarUrl}'><h3 class='notification-author--nickname'>${escapeHTML(authorNickname)}</h3><a class='hyperlink' href='https://www.khanacademy.org${url}' target='_blank'>${feedbackType === "REPLY" ? "added a comment" : "answered your question"} on ${focusTranslatedTitle}</a><span class='notification-date'>${timeSince(new Date(date))} ago</span></div><div class='notification-content'>${parseAndRender(content)}</div>`;

      const wrapper = _element("div", "feedback-button-wrapper");
      const button = _element("button", "feedback-button") as HTMLButtonElement;
      button.innerText = "Reply";

      // Extract the id and qa_expand_key from the url
      let idMatch = /\/(\d+)\?qa_expand_key=([^&]+)&qa_expand_type=(\w+)/.exec(url);

      if(idMatch) {
        let id = idMatch[1];
        let qaExpandKey = idMatch[2];
        let qaExpandType = idMatch[3];
        button.onclick = () => addFeedbackTextarea(button, feedbackType === "ANSWER" ? "QUESTION" : "COMMENT", "REPLY", id, qaExpandKey, qaExpandType);
      } else {
        let id = (await(await fetch(`https://www.khanacademy.org/api/internal/graphql/ContentForPath?fastly_cacheable=persist_until_publish&pcv=d6d47957dd47ef94066c3adef0c9aa40922342e1&hash=3314043276&variables=%7B%22path%22%3A%22${encodeURIComponent(/\/.*(?=\?)/g.exec(url)[0])}%22%2C%22countryCode%22%3A%22NL%22%2C%22kaLocale%22%3A%22en%22%2C%22clientPublishedContentVersion%22%3A%22d6d47957dd47ef94066c3adef0c9aa40922342e1%22%7D&lang=en&curriculum=`)).json()).data.contentRoute.listedPathData.content.id;
        const match = /\?qa_expand_key=([^&]+)&qa_expand_type=(\w+)/g.exec(url);
        let qaExpandKey = match[1];
        let qaExpandType = match[2];
        button.onclick = () => addFeedbackTextarea(button, feedbackType === "ANSWER" ? "QUESTION" : "COMMENT", "REPLY", id, qaExpandKey, qaExpandType.toUpperCase(), "project");
      }
      wrapper.appendChild(button);
      notificationElement.appendChild(wrapper);
    }
      break;
    case "ProgramFeedbackNotification": {
      const { authorAvatarSrc, authorNickname, content, feedbackType, translatedScratchpadTitle } = notification as ProgramFeedbackNotification & BasicNotification;
      notificationElement.innerHTML = `<div class='notification-header'><img class='notification-author--avatar' src='${authorAvatarSrc}'><h3 class='notification-author--nickname'>${escapeHTML(authorNickname)}</h3><a class='hyperlink' href='https://www.khanacademy.org${url}' target='_blank'>${feedbackType === "COMMENT" ? "commented" : "asked a question"} on ${translatedScratchpadTitle}</a><span class='notification-date'>${timeSince(new Date(date))} ago</span></div><div class='notification-content'>${parseAndRender(content)}</div>`;

      // Extract the id and qa_expand_key from the url
      let idMatch = /\/(\d+)\?qa_expand_key=([^&]+)&qa_expand_type=(\w+)/.exec(url);
      let id = idMatch[1];
      let qaExpandKey = idMatch[2];

      const wrapper = _element("div", "feedback-button-wrapper");
      const addFeedbackButton = _element("button", "feedback-button");
      addFeedbackButton.innerText = "Reply";
      addFeedbackButton.onclick = () => addFeedbackTextarea(addFeedbackButton as HTMLButtonElement, feedbackType as RequestType, feedbackType === "QUESTION" ? "ANSWER" : "REPLY", id, qaExpandKey, "");
      wrapper.appendChild(addFeedbackButton);
      notificationElement.appendChild(wrapper);
    }
      break;
    case "GroupedBadgeNotification": {
      let badgeString = "";
      const { badgeNotifications } = notification as GroupedBadgeNotification & BasicNotification;
      if(badgeNotifications.length === 2) {
        badgeString = badgeNotifications[0].badge.description + " and " + badgeNotifications[1].badge.description;
      } else {
        badgeString = badgeNotifications.map((badge) => badge.badge.description).slice(0, -1).join(", ") + ", and " + badgeNotifications[badgeNotifications.length - 1].badge.description;
      }
      notificationElement.innerHTML = `<div class='notification-header'><img class='notification-author--avatar' src='${badgeNotifications[0].badge.icons.compactUrl}'><h3 class='notification-author--nickname'>KA Badges</h3><a class='hyperlink' href='https://www.khanacademy.org${url}' target='_blank'>view badges</a><span class='notification-date'>${timeSince(new Date(date))} ago</span></div><p class='notification-content'>You earned ${badgeString}! Congratulations!</p>`;
    }
      break;
    case "BadgeNotification": {
      const { badge: { description, icons: { compactUrl }, relativeUrl } } = notification as BadgeNotification & BasicNotification;
      notificationElement.innerHTML = `<div class='notification-header'><img class='notification-author--avatar' src='${compactUrl}'><h3 class='notification-author--nickname'>KA Badges</h3><a class='hyperlink' href='https://www.khanacademy.org${relativeUrl}' target='_blank'>view badges</a><span class='notification-date'>${timeSince(new Date(date))} ago</span></div><p class='notification-content'>You earned ${description}! Congratulations!</p>`;
    }
      break;
    case "ModeratorNotification": {
      const { text } = notification as ModeratorNotification & BasicNotification;
      notificationElement.innerHTML = `<div class='notification-header'><img class='notification-author--avatar' src='guardian-icon.png'><h3 class='notification-author--nickname'>KA Guardian</h3><span class='notification-date'>${timeSince(new Date(date))} ago</span></div><p class='notification-content'>${text}</p>`;
    }
      break;
    case "AvatarNotification": {
      const { name, thumbnailSrc, url } = notification as AvatarNotification & BasicNotification;
      notificationElement.innerHTML = `<div class='notification-header'><img class='notification-author--avatar' src='${thumbnailSrc.startsWith("https://cdn.kastatic.org/") ? thumbnailSrc : "https://cdn.kastatic.org" + thumbnailSrc}'><h3 class='notification-author--nickname'>KA Avatars</h3><a class='hyperlink' href='https://www.khanacademy.org${url}' target='_blank'>use avatar</a><span class='notification-date'>${timeSince(new Date(date))} ago</span></div><p class='notification-content'>You unlocked <b>${AVATAR_SHORTNAMES[name]}</b>! <i>${AVATAR_REQUIREMENTS[name]}</i></p>`;
    }
      break;
    default:
      notificationElement.outerHTML = `<li class='notification'><pre style='width:100%;overflow-x:auto'>${JSON.stringify(notification, null, 2)}</pre></li>`;
  }
  return notificationElement as HTMLDivElement;
}

// Creates HTMLDivElement
export async function renderFromCache (parentElement: HTMLDivElement, cache: { preloadString: string, cursor: string }) {
  parentElement.innerHTML += cache.preloadString;
  parentElement
    .querySelectorAll(".feedback-button")
    .forEach(async (button: HTMLButtonElement) => {
      const { typename, url, feedbackType } = button.dataset;
      if(typename === "ResponseFeedbackNotification") {
        // Extract the id and qa_expand_key from the url
        let idMatch = /\/(\d+)\?qa_expand_key=([^&]+)&qa_expand_type=(\w+)/.exec(url);
        if(idMatch) {
          let id = idMatch[1];
          let qaExpandKey = idMatch[2];
          let qaExpandType = idMatch[3];
          button.onclick = () => addFeedbackTextarea(button, feedbackType === "ANSWER" ? "QUESTION" : "COMMENT", "REPLY", id, qaExpandKey, qaExpandType);
        } else {
          let id = (await(await fetch(`https://www.khanacademy.org/api/internal/graphql/ContentForPath?fastly_cacheable=persist_until_publish&pcv=d6d47957dd47ef94066c3adef0c9aa40922342e1&hash=3314043276&variables=%7B%22path%22%3A%22${encodeURIComponent(/\/.*(?=\?)/g.exec(url)[0])}%22%2C%22countryCode%22%3A%22NL%22%2C%22kaLocale%22%3A%22en%22%2C%22clientPublishedContentVersion%22%3A%22d6d47957dd47ef94066c3adef0c9aa40922342e1%22%7D&lang=en&curriculum=`)).json()).data.contentRoute.listedPathData.content.id;
          const match = /\?qa_expand_key=([^&]+)&qa_expand_type=(\w+)/g.exec(url);
          let qaExpandKey = match[1];
          let qaExpandType = match[2];
          console.log(feedbackType);
          button.onclick = () => addFeedbackTextarea(button, feedbackType === "ANSWER" ? "QUESTION" : "COMMENT", "REPLY", id, qaExpandKey, qaExpandType.toUpperCase(), "project");
        }
      } else {
        let idMatch = /\/(\d+)\?qa_expand_key=([^&]+)&qa_expand_type=(\w+)/.exec(url);
        let id = idMatch[1];
        let qaExpandKey = idMatch[2];
        button.onclick = () => addFeedbackTextarea(button, feedbackType as RequestType, feedbackType === "QUESTION" ? "ANSWER" : "REPLY", id, qaExpandKey, "");
      }
    });
}

// Creates a generator to load notifications
export async function* createNotificationsGenerator (cursor = ""):  AsyncGenerator<Notification[], Notification[]>{
  let complete = false;
  for(;!complete;) {
    // Retrieve user notifications as JSON

    const json: NotificationsResponse = await new Promise((resolve) => {
      getChromeFkey()
        .then((fkey) => graphQLFetch("getNotificationsForUser", fkey, { after: cursor }))
        .then(async (response) => {
          const json = await response.json();
          resolve(json?.data?.user?.notifications);
        })
        .catch(() => resolve(null));
    }).then(async (j: NotificationsResponse) => {
        let fkey = await getChromeFkey();
        j.notifications = (await Promise.all(j.notifications.map(async (notif, index) => {
            let notifParent = await getNotifParent(fkey, notif);
            console.log("[dev] [looper]", {notif, notifParent, index});
            return {
                value: (notifParent !== "ag5zfmtoYW4tYWNhZGVteXJBCxIIVXNlckRhdGEiHmthaWRfNDM5MTEwMDUzODMwNzU4MDY1MDIyMDIxMgwLEghGZWVkYmFjaxiAgNPE4Z2eCAw"),
                index: index,
            }
        }))).filter(x => x.value).map(x => j.notifications[x.index]);
        return j;
    });

    if(json) {
      // Retrieve a cursor from the JSON
      const nextCursor = json.pageInfo.nextCursor;

      // Update loop control variables
      complete = !nextCursor;
      cursor = nextCursor;

      // Return this set of notifications as JSON
      yield json.notifications;
    } else {
      break;
    }
  }
  return;
}

export function createNotificationString (notification: Notification): string {
  const { __typename, brandNew, date, url } = notification;
  switch(__typename) {
    case "ResponseFeedbackNotification": {
      const { authorAvatarUrl, authorNickname, content, feedbackType, focusTranslatedTitle } = notification as ResponseFeedbackNotification & BasicNotification;
      return `<li class="notification ${brandNew ? "unread" : ""}"><div class="notification-header"><img class="notification-author--avatar" src="${authorAvatarUrl}"><h3 class="notification-author--nickname">${escapeHTML(authorNickname)}</h3><a class="hyperlink" href="https://www.khanacademy.org${url}" target="_blank">${feedbackType === "REPLY" ? "added a comment" : "answered your question"} on ${focusTranslatedTitle}</a><span class="notification-date">${timeSince(new Date(date))} ago</span></div><div class="notification-content">${parseAndRender(content)}</div><div class="feedback-button-wrapper"><button class="feedback-button" data-url="${url}" data-typename="ResponseFeedbackNotification" data-feedbackType="${feedbackType}">Reply</button></div></li>`;
    }
    case "ProgramFeedbackNotification": {
      const { authorAvatarSrc, authorNickname, content, feedbackType, translatedScratchpadTitle } = notification as ProgramFeedbackNotification & BasicNotification;
      return `<li class="notification ${brandNew ? "unread" : ""}"><div class="notification-header"><img class="notification-author--avatar" src="${authorAvatarSrc}"><h3 class="notification-author--nickname">${escapeHTML(authorNickname)}</h3><a class="hyperlink" href="https://www.khanacademy.org${url}" target="_blank">${feedbackType === "COMMENT" ? "commented" : "asked a question"} on ${translatedScratchpadTitle}</a><span class="notification-date">${timeSince(new Date(date))} ago</span></div><div class="notification-content">${parseAndRender(content)}</div><div class="feedback-button-wrapper"><button class="feedback-button" data-url="${url}" data-typename="ProgramFeedbackNotification" data-feedbackType="${feedbackType}">Reply</button></div></li>`;
    }
    case "GroupedBadgeNotification": {
      let badgeString = "";
      const { badgeNotifications } = notification as GroupedBadgeNotification & BasicNotification;
      if(badgeNotifications.length === 2) {
        badgeString = badgeNotifications[0].badge.description + " and " + badgeNotifications[1].badge.description;
      } else {
        badgeString = badgeNotifications.map((badge) => badge.badge.description).slice(0, -1).join(", ") + ", and " + badgeNotifications[badgeNotifications.length - 1].badge.description;
      }
      return `<li class="notification ${brandNew ? "unread" : ""}"><div class="notification-header"><img class="notification-author--avatar" src="${badgeNotifications[0].badge.icons.compactUrl}"><h3 class="notification-author--nickname">KA Badges</h3><a class="hyperlink" href="https://www.khanacademy.org${url}" target="_blank">view badges</a><span class="notification-date">${timeSince(new Date(date))} ago</span></div><p class="notification-content">You earned ${badgeString}! Congratulations!</p></li>`;
    }
    case "BadgeNotification": {
      const { badge: { description, icons: { compactUrl }, relativeUrl } } = notification as BadgeNotification & BasicNotification;
      `<li class="notification ${brandNew ? "unread" : ""}"><div class="notification-header"><img class="notification-author--avatar" src="${compactUrl}"><h3 class="notification-author--nickname">KA Badges</h3><a class="hyperlink" href="https://www.khanacademy.org${relativeUrl}" target="_blank">view badges</a><span class="notification-date">${timeSince(new Date(date))} ago</span></div><p class="notification-content">You earned ${description}! Congratulations!</p></li>`;
    }
    case "ModeratorNotification": {
      const { text } = notification as ModeratorNotification & BasicNotification;
      return `<li class="notification ${brandNew ? "unread" : ""}"><div class="notification-header"><img class="notification-author--avatar" src="guardian-icon.png"><h3 class="notification-author--nickname">KA Guardian</h3><span class="notification-date">${timeSince(new Date(date))} ago</span></div><p class="notification-content">${text}</p></li>`;
    }
    case "AvatarNotification": {
      const { name, thumbnailSrc, url } = notification as AvatarNotification & BasicNotification;
      return `<li class="notification ${brandNew ? "unread" : ""}"><div class="notification-header"><img class="notification-author--avatar" src="${thumbnailSrc.startsWith("https://cdn.kastatic.org/") ? thumbnailSrc : "https://cdn.kastatic.org" + thumbnailSrc}"><h3 class="notification-author--nickname">KA Avatars</h3><a class="hyperlink" href="https://www.khanacademy.org${url}" target="_blank">use avatar</a><span class="notification-date">${timeSince(new Date(date))} ago</span></div><p class="notification-content">You unlocked <b>${AVATAR_SHORTNAMES[name]}</b>! <i>${AVATAR_REQUIREMENTS[name]}</i></p></li>`;
    }
    default:
      return `<li class="notification"><pre style="width:100%;overflow-x:auto">${JSON.stringify(notification, null, 2)}</pre></li>`;
  }
}

export async function getNotifParent(fkey, notif): Promise<String> {
    let parentProgramFetch = await (await graphQLFetch("feedbackQuery", fkey, {
        topicId: notif.url.split("?")[0].split("/").slice(-1)[0],
        feedbackType: "QUESTION",
        currentSort: 1,
        qaExpandKey: notif.url.split("?qa_expand_key=")[1].split("&qa_expand_type=reply")[0],
        focusKind: "scratchpad"
    })).json();
    // console.log("[dev] [getNotifParent]", parentProgramFetch);
    return parentProgramFetch.data.feedback.feedback[0].expandKey;
}