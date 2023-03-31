(()=>{"use strict";const n=JSON.parse('{"AddFeedbackToDiscussion":"mutation AddFeedbackToDiscussion($focusKind: String, $focusId: String, $parentKey: String, $textContent: String!, $feedbackType: FeedbackType!, $fromVideoAuthor: Boolean, $shownLowQualityNotice: Boolean) {\\n  addFeedbackToDiscussion(focusKind: $focusKind, focusId: $focusId, parentKey: $parentKey, textContent: $textContent, feedbackType: $feedbackType, fromVideoAuthor: $fromVideoAuthor, shownLowQualityNotice: $shownLowQualityNotice) {\\n    feedback {\\n      appearsAsDeleted\\n      author {\\n        id\\n        kaid\\n        nickname\\n        avatar {\\n          name\\n          imageSrc\\n          __typename\\n        }\\n        __typename\\n      }\\n      content\\n      date\\n      definitelyNotSpam\\n      deleted\\n      downVoted\\n      expandKey\\n      feedbackType\\n      flaggedBy\\n      flags\\n      focusUrl\\n      focus {\\n        kind\\n        id\\n        translatedTitle\\n        relativeUrl\\n        __typename\\n      }\\n      fromVideoAuthor\\n      key\\n      lowQualityScore\\n      notifyOnAnswer\\n      permalink\\n      qualityKind\\n      replyCount\\n      replyExpandKeys\\n      showLowQualityNotice\\n      sumVotesIncremented\\n      upVoted\\n      ... on LowQualityFeedback {\\n        feedbackCode\\n        feedbackChar\\n        __typename\\n      }\\n      __typename\\n    }\\n    error {\\n      code\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n","clearBrandNewNotifications":"mutation clearBrandNewNotifications {\\n  clearBrandNewNotifications {\\n    error {\\n      code\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n","feedbackQuery":"query feedbackQuery($topicId: String!, $focusKind: String!, $cursor: String, $limit: Int, $feedbackType: FeedbackType!, $currentSort: Int, $qaExpandKey: String) {\\n  feedback(focusId: $topicId, cursor: $cursor, limit: $limit, feedbackType: $feedbackType, focusKind: $focusKind, sort: $currentSort, qaExpandKey: $qaExpandKey, answersLimit: 1) {\\n    feedback {\\n      isLocked\\n      replyCount\\n      appearsAsDeleted\\n      author {\\n        id\\n        kaid\\n        nickname\\n        avatar {\\n          name\\n          imageSrc\\n          __typename\\n        }\\n        __typename\\n      }\\n      badges {\\n        name\\n        icons {\\n          smallUrl\\n          __typename\\n        }\\n        description\\n        __typename\\n      }\\n      content\\n      date\\n      definitelyNotSpam\\n      deleted\\n      downVoted\\n      expandKey\\n      feedbackType\\n      flaggedBy\\n      flaggedByUser\\n      flags\\n      focusUrl\\n      focus {\\n        kind\\n        id\\n        translatedTitle\\n        relativeUrl\\n        __typename\\n      }\\n      fromVideoAuthor\\n      key\\n      lowQualityScore\\n      notifyOnAnswer\\n      permalink\\n      qualityKind\\n      replyCount\\n      replyExpandKeys\\n      showLowQualityNotice\\n      sumVotesIncremented\\n      upVoted\\n      ... on QuestionFeedback {\\n        hasAnswered\\n        answers {\\n          replyCount\\n          appearsAsDeleted\\n          author {\\n            id\\n            kaid\\n            nickname\\n            avatar {\\n              name\\n              imageSrc\\n              __typename\\n            }\\n            __typename\\n          }\\n          badges {\\n            name\\n            icons {\\n              smallUrl\\n              __typename\\n            }\\n            description\\n            __typename\\n          }\\n          content\\n          date\\n          definitelyNotSpam\\n          deleted\\n          downVoted\\n          expandKey\\n          feedbackType\\n          flaggedBy\\n          flaggedByUser\\n          flags\\n          focusUrl\\n          focus {\\n            kind\\n            id\\n            translatedTitle\\n            relativeUrl\\n            __typename\\n          }\\n          fromVideoAuthor\\n          key\\n          lowQualityScore\\n          notifyOnAnswer\\n          permalink\\n          qualityKind\\n          replyCount\\n          replyExpandKeys\\n          showLowQualityNotice\\n          sumVotesIncremented\\n          upVoted\\n          __typename\\n        }\\n        isOld\\n        answerCount\\n        __typename\\n      }\\n      ... on AnswerFeedback {\\n        question {\\n          replyCount\\n          appearsAsDeleted\\n          author {\\n            id\\n            kaid\\n            nickname\\n            avatar {\\n              name\\n              imageSrc\\n              __typename\\n            }\\n            __typename\\n          }\\n          badges {\\n            name\\n            icons {\\n              smallUrl\\n              __typename\\n            }\\n            description\\n            __typename\\n          }\\n          content\\n          date\\n          definitelyNotSpam\\n          deleted\\n          downVoted\\n          expandKey\\n          feedbackType\\n          flaggedBy\\n          flaggedByUser\\n          flags\\n          focusUrl\\n          focus {\\n            kind\\n            id\\n            translatedTitle\\n            relativeUrl\\n            __typename\\n          }\\n          fromVideoAuthor\\n          key\\n          lowQualityScore\\n          notifyOnAnswer\\n          permalink\\n          qualityKind\\n          replyCount\\n          replyExpandKeys\\n          showLowQualityNotice\\n          sumVotesIncremented\\n          upVoted\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    cursor\\n    isComplete\\n    sortedByDate\\n    __typename\\n  }\\n}\\n","getFeedbackRepliesPage":"query getFeedbackRepliesPage($postKey: String!, $cursor: String, $limit: Int!) {\\n  feedbackRepliesPaginated(feedbackKey: $postKey, cursor: $cursor, limit: $limit) {\\n    cursor\\n    isComplete\\n    feedback {\\n      isLocked\\n      expandKey\\n      appearsAsDeleted\\n      author {\\n        id\\n        kaid\\n        nickname\\n        avatar {\\n          name\\n          imageSrc\\n          __typename\\n        }\\n        __typename\\n      }\\n      content\\n      date\\n      definitelyNotSpam\\n      deleted\\n      downVoted\\n      expandKey\\n      feedbackType\\n      flaggedBy\\n      flaggedByUser\\n      flags\\n      focusUrl\\n      fromVideoAuthor\\n      key\\n      lowQualityScore\\n      notifyOnAnswer\\n      permalink\\n      qualityKind\\n      replyCount\\n      replyExpandKeys\\n      showLowQualityNotice\\n      sumVotesIncremented\\n      upVoted\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n","getFullUserProfile":"query getFullUserProfile($kaid: String, $username: String) {\\n  user(kaid: $kaid, username: $username) {\\n    id\\n    kaid\\n    key\\n    userId\\n    email\\n    username\\n    profileRoot\\n    gaUserId\\n    qualarooId\\n    isPhantom\\n    isDeveloper: hasPermission(name: \\"can_do_what_only_admins_can_do\\")\\n    isCurator: hasPermission(name: \\"can_curate_tags\\", scope: ANY_ON_CURRENT_LOCALE)\\n    isCreator: hasPermission(name: \\"has_creator_role\\", scope: ANY_ON_CURRENT_LOCALE)\\n    isPublisher: hasPermission(name: \\"can_publish\\", scope: ANY_ON_CURRENT_LOCALE)\\n    isModerator: hasPermission(name: \\"can_moderate_users\\", scope: GLOBAL)\\n    isParent\\n    isSatStudent\\n    isTeacher\\n    isDataCollectible\\n    isChild\\n    isOrphan\\n    isCoachingLoggedInUser\\n    canModifyCoaches\\n    nickname\\n    hideVisual\\n    joined\\n    points\\n    countVideosCompleted\\n    bio\\n    profile {\\n      accessLevel\\n      __typename\\n    }\\n    soundOn\\n    muteVideos\\n    showCaptions\\n    prefersReducedMotion\\n    noColorInVideos\\n    newNotificationCount\\n    canHellban: hasPermission(name: \\"can_ban_users\\", scope: GLOBAL)\\n    canMessageUsers: hasPermission(name: \\"can_send_moderator_messages\\", scope: GLOBAL)\\n    isSelf: isActor\\n    hasStudents: hasCoachees\\n    hasClasses\\n    hasChildren\\n    hasCoach\\n    badgeCounts\\n    homepageUrl\\n    isMidsignupPhantom\\n    includesDistrictOwnedData\\n    canAccessDistrictsHomepage\\n    preferredKaLocale {\\n      id\\n      kaLocale\\n      status\\n      __typename\\n    }\\n    underAgeGate {\\n      parentEmail\\n      daysUntilCutoff\\n      approvalGivenAt\\n      __typename\\n    }\\n    authEmails\\n    signupDataIfUnverified {\\n      email\\n      emailBounced\\n      __typename\\n    }\\n    pendingEmailVerifications {\\n      email\\n      __typename\\n    }\\n    tosAccepted\\n    shouldShowAgeCheck\\n    birthMonthYear\\n    lastLoginCountry\\n    __typename\\n  }\\n  actorIsImpersonatingUser\\n  isAIGuideEnabled\\n  hasAccessToAIGuideDev\\n}\\n","getNotificationsForUser":"query getNotificationsForUser($after: ID) {\\n  user {\\n    id\\n    notifications(after: $after) {\\n      notifications {\\n        __typename\\n        brandNew\\n        class_\\n        date\\n        kaid\\n        read\\n        url\\n        urlsafeKey\\n        ...ThreadCreatedNotificationType\\n        ...AssignmentDueDateNotificationType\\n        ...AssignmentCreatedNotificationType\\n        ...CoachRequestNotificationType\\n        ...BadgeNotificationType\\n        ...CourseMasteryGoalCreatedNotificationType\\n        ...ModeratorNotificationType\\n        ...ProgramFeedbackNotificationType\\n        ...CoachRequestAcceptedNotificationType\\n        ...AvatarNotificationType\\n        ...InfoNotificationType\\n        ...ResponseFeedbackNotificationType\\n        ...GroupedBadgeNotificationType\\n      }\\n      pageInfo {\\n        nextCursor\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\\nfragment AssignmentCreatedNotificationType on AssignmentCreatedNotification {\\n  numAssignments\\n  contentTitle\\n  coachAvatarURL\\n  coachName\\n  curationNodeIconURL\\n  className\\n  __typename\\n}\\n\\nfragment AssignmentDueDateNotificationType on AssignmentDueDateNotification {\\n  numAssignments\\n  dueDate\\n  contentTitle\\n  curationNodeIconURL\\n  __typename\\n}\\n\\nfragment AvatarNotificationType on AvatarNotification {\\n  name\\n  thumbnailSrc\\n  __typename\\n}\\n\\nfragment BadgeNotificationType on BadgeNotification {\\n  badgeName\\n  badge {\\n    description\\n    fullDescription\\n    name\\n    relativeUrl\\n    icons {\\n      compactUrl\\n      __typename\\n    }\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment CoachRequestAcceptedNotificationType on CoachRequestAcceptedNotification {\\n  isMultipleClassrooms\\n  student {\\n    id\\n    email\\n    nickname\\n    __typename\\n  }\\n  classroom {\\n    cacheId\\n    id\\n    name\\n    topics {\\n      id\\n      slug\\n      iconUrl\\n      key\\n      translatedStandaloneTitle\\n      __typename\\n    }\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment CoachRequestNotificationType on CoachRequestNotification {\\n  coachIsParent\\n  coach {\\n    id\\n    kaid\\n    nickname\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment CourseMasteryGoalCreatedNotificationType on CourseMasteryGoalCreatedNotification {\\n  curationNodeIconURL\\n  curationNodeTranslatedTitle\\n  masteryPercentage\\n  __typename\\n}\\n\\nfragment GroupedBadgeNotificationType on GroupedBadgeNotification {\\n  badgeNotifications {\\n    badge {\\n      badgeCategory\\n      description\\n      fullDescription\\n      name\\n      icons {\\n        compactUrl\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment InfoNotificationType on InfoNotification {\\n  notificationType\\n  __typename\\n}\\n\\nfragment ModeratorNotificationType on ModeratorNotification {\\n  text\\n  __typename\\n}\\n\\nfragment ProgramFeedbackNotificationType on ProgramFeedbackNotification {\\n  authorAvatarSrc\\n  authorNickname\\n  feedbackType\\n  translatedScratchpadTitle\\n  content\\n  __typename\\n}\\n\\nfragment ResponseFeedbackNotificationType on ResponseFeedbackNotification {\\n  authorAvatarUrl\\n  authorNickname\\n  feedbackType\\n  focusTranslatedTitle\\n  content\\n  sumVotesIncremented\\n  __typename\\n}\\n\\nfragment ThreadCreatedNotificationType on ThreadCreatedNotification {\\n  coachee {\\n    id\\n    kaid\\n    nickname\\n    __typename\\n  }\\n  threadId\\n  flagged\\n  __typename\\n}\\n"}');function e(e,t,a={}){return new Promise(((i,s)=>{fetch("https://www.khanacademy.org/api/internal/graphql/"+e,{method:"POST",headers:{"X-KA-fkey":t,"content-type":"application/json"},body:JSON.stringify({operationName:e,query:n[e],variables:a}),credentials:"same-origin"}).then((async n=>{if(200===n.status)return i(n);s(`Error in GraphQL ${e} call: Server responded  with status ${n.status} and body ${JSON.stringify(await n.text())}`)})).catch(s)}))}const t=[{reg:/(?:\n|^)`{3}\n?((.|\n)+?)`{3}/m,hasNestedParsing:!1,string:'<div class="discussion-code-block">$</div>'},{reg:/`([^\n]+?)`/,hasNestedParsing:!1,string:'<span class="discussion-code-inline">$</span>'},{reg:/\*([^\n]+?)\*/,hasNestedParsing:!0,string:"<b>$</b>"},{reg:/_([^\n]+?)_/,hasNestedParsing:!0,string:"<i>$</i>"},{reg:/~([^\n]+?)~/,hasNestedParsing:!0,string:"<s>$</s>"},{reg:/&lt;((?:@).+?)&gt;/,hasNestedParsing:!1,string:'<a class="hyperlink" href="https://www.khanacademy.org/profile/$" target="_blank">$</a>'},{reg:/((?:http|ftp|https)(?:.*?))(?:\s|$)/,hasNestedParsing:!1,string:'<a class="hyperlink" href="$" target="_blank">$</a>'}],a={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","=":"&#x3D;"},i=new RegExp(`[${Object.keys(a).join("")}]`,"g");function s(n){return n.replace(i,(n=>a[n]||""))}function o(n,e=!1){const a=[];let i=e?n:s(n);for(;i.length>0;){let n=0,s=t[0],r=null;do{if(e&&s.onlyFirst){n++,s=t[n];continue}const a=s.reg.exec(i);a&&(!r||r.index>a.index)&&(r={index:a.index,type:n,hasNestedParsing:Boolean(s.hasNestedParsing),isCustomRendering:Boolean(s.isCustomRendering),length:a[0].length,match:a.slice(1)}),n++,s=t[n]}while(n<t.length);if(!r)return a.push({type:-1,content:i}),a;r.index>0&&a.push({type:-1,content:i.substring(0,r.index)}),a.push({type:r.type,content:r.hasNestedParsing?o(r.match.join(""),!0):r.isCustomRendering?r.match:r.match[0]}),i=i.substring(r.index+r.length)}return a}function r(n){let e;return n.map((n=>-1===n.type?n.content:(e=t[n.type],e.isCustomRendering?e.render(n.content):e.string.replace(/\$/g,e.hasNestedParsing?r(n.content):n.content)))).join("")}function c(n){return r(o(n))}const l=JSON.parse('{"hopper_happy_style":"Hopper","hopper_cool_style":"Cool Hopper","hopper_jumping_style":"Jumping Hopper","leafers_seed_style":"Leafers","leafers_seedling_style":"Leafers","leafers_sapling_style":"Leafers","leafers_tree_style":"Leafers","leafers_ultimate_style":"Leafers","piceratops_seed_style":"&Pi;ceratops","piceratops_seedling_style":"&Pi;ceratops","piceratops_sapling_style":"&Pi;ceratops","piceratops_tree_style":"&Pi;ceratops","piceratops_ultimate_style":"&Pi;ceratops","duskpin_seed_style":"Duskpin","duskpin_seedling_style":"Duskpin","duskpin_sapling_style":"Duskpin","duskpin_tree_style":"Duskpin","duskpin_ultimate_style":"Duskpin","primosaur_seed_style":"Primosaur","primosaur_seedling_style":"Primosaur","primosaur_sapling_style":"Primosaur","primosaur_tree_style":"Primosaur","primosaur_ultimate_style":"Primosaur","starky_seed_style":"Starky","starky_seedling_style":"Starky","starky_sapling_style":"Starky","starky_tree_style":"Starky","starky_ultimate_style":"Starky","aqualine_seed_style":"Aqualine","aqualine_seedling_style":"Aqualine","aqualine_sapling_style":"Aqualine","aqualine_tree_style":"Aqualine","aqualine_ultimate_style":"Aqualine","spunky_sam_blue_style":"Spunky Sam","spunky_sam_green_style":"Spunky Sam","spunky_sam_orange_style":"Spunky Sam","spunky_sam_red_style":"Spunky Sam","marcimus_pink_style":"Marcimus","marcimus_orange_style":"Marcimus","marcimus_red_style":"Marcimus","marcimus_purple_style":"Marcimus","mr_pink_red_style":"Mr. Pink","mr_pink_green_style":"Mr. Pink","mr_pink_orange_style":"Mr. Pink","female_robot_amelia_style":"Amelia","female_robot_ada_style":"Ada","female_robot_grace_style":"Grace","male_robot_johnny_style":"Johnny","male_robot_donald_style":"Donald","male_robot_hal_style":"Hal","orange_juice_squid_orange_style":"Orange Juice Squid","purple_pi_purple_style":"Purple Pi","purple_pi_pink_style":"Purple Pi","purple_pi_teal_style":"Purple Pi","mr_pants_teal_style":"Mr. Pants","mr_pants_green_style":"Mr. Pants","mr_pants_orange_style":"Mr. Pants","mr_pants_pink_style":"Mr. Pants","mr_pants_purple_style":"Mr. Pants","old_spice_man_green_style":"Old Spice Man","old_spice_man_blue_style":"Old Spice Man","winston_default_style":"Winston","winston_baby_style":"Baby Winston","ohnoes_default_style":"Oh noes, the Error Buddy"}'),p=JSON.parse('{"leafers_seedling_style":"Earn 10,000 energy points.","piceratops_seedling_style":"Earn 10,000 energy points.","duskpin_seedling_style":"Earn 10,000 energy points.","primosaur_seedling_style":"Earn 10,000 energy points.","starky_seedling_style":"Earn 10,000 energy points.","spunky_sam_blue_style":"Earn 10,000 energy points.","spunky_sam_green_style":"Earn 10,000 energy points.","spunky_sam_orange_style":"Earn 10,000 energy points.","spunky_sam_red_style":"Earn 10,000 energy points.","marcimus_pink_style":"Earn 10,000 energy points.","marcimus_orange_style":"Earn 10,000 energy points.","marcimus_red_style":"Earn 10,000 energy points.","marcimus_purple_style":"Earn 10,000 energy points.","mr_pink_red_style":"Earn 10,000 energy points.","mr_pink_green_style":"Earn 10,000 energy points.","mr_pink_orange_style":"Earn 10,000 energy points.","mr_pants_teal_style":"Earn 10,000 energy points.","mr_pants_green_style":"Earn 10,000 energy points.","mr_pants_orange_style":"Earn 10,000 energy points.","mr_pants_pink_style":"Earn 10,000 energy points.","mr_pants_purple_style":"Earn 10,000 energy points.","old_spice_man_green_style":"Earn 10,000 energy points.","old_spice_man_blue_style":"Earn 10,000 energy points.","leafers_sapling_style":"Earn 50,000 energy points.","piceratops_sapling_style":"Earn 50,000 energy points.","duskpin_sapling_style":"Earn 50,000 energy points.","primosaur_sapling_style":"Earn 50,000 energy points.","starky_sapling_style":"Earn 50,000 energy points.","female_robot_amelia_style":"Earn 50,000 energy points.","male_robot_johnny_style":"Earn 50,000 energy points.","orange_juice_squid_orange_style":"Earn 50,000 energy points.","purple_pi_purple_style":"Earn 50,000 energy points.","purple_pi_pink_style":"Earn 50,000 energy points.","purple_pi_teal_style":"Earn 50,000 energy points.","leafers_tree_style":"Earn 100,000 energy points.","piceratops_tree_style":"Earn 100,000 energy points.","duskpin_tree_style":"Earn 100,000 energy points.","primosaur_tree_style":"Earn 100,000 energy points.","starky_tree_style":"Earn 100,000 energy points.","female_robot_ada_style":"Earn 100,000 energy points.","male_robot_donald_style":"Earn 100,000 energy points.","leafers_ultimate_style":"Earn 250,000 energy points.","piceratops_ultimate_style":"Earn 250,000 energy points.","duskpin_ultimate_style":"Earn 250,000 energy points.","primosaur_ultimate_style":"Earn 250,000 energy points.","starky_ultimate_style":"Earn 250,000 energy points.","female_robot_grace_style":"Earn 250,000 energy points.","male_robot_hal_style":"Earn 250,000 energy points.","winston_default_style":"Make changes to an official program","winston_baby_style":"Make changes to another user\'s program","ohnoes_default_style":"Finish watching a computer programming talk-through","hopper_happy_style":"Create a program from scratch","hopper_jumping_style":"Complete a coding challenge","hopper_cool_style":"Complete a coding challenge"}');function d(n){const e=((new Date).getTime()-n.getTime())/1e3|0;if(e<60)return`${e} second${1===e?"":"s"}`;if(e<3600){const n=e/60|0;return`${n} minute${1===n?"":"s"}`}if(e<86400){const n=e/3600|0;return`${n} hour${1===n?"":"s"}`}if(e<2592e3){const n=e/86400|0;return`${n} day${1===n?"":"s"}`}if(e<31536e3){const n=e/2592e3|0;return`${n} month${1===n?"":"s"}`}const t=e/31536e3|0;return`${t} year${1===t?"":"s"}`}function _(n){const{__typename:e,brandNew:t,date:a,url:i}=n;switch(e){case"ResponseFeedbackNotification":{const{authorAvatarUrl:e,authorNickname:o,content:r,feedbackType:l,focusTranslatedTitle:p}=n;return`<li class="notification ${t?"unread":""}"><div class="notification-header"><img class="notification-author--avatar" src="${e}"><h3 class="notification-author--nickname">${s(o)}</h3><a class="hyperlink" href="https://www.khanacademy.org${i}" target="_blank">${"REPLY"===l?"added a comment":"answered your question"} on ${p}</a><span class="notification-date">${d(new Date(a))} ago</span></div><div class="notification-content">${c(r)}</div><div class="feedback-button-wrapper"><button class="feedback-button" data-url="${i}" data-typename="ResponseFeedbackNotification" data-feedbackType="${l}">Reply</button></div></li>`}case"ProgramFeedbackNotification":{const{authorAvatarSrc:e,authorNickname:o,content:r,feedbackType:l,translatedScratchpadTitle:p}=n;return`<li class="notification ${t?"unread":""}"><div class="notification-header"><img class="notification-author--avatar" src="${e}"><h3 class="notification-author--nickname">${s(o)}</h3><a class="hyperlink" href="https://www.khanacademy.org${i}" target="_blank">${"COMMENT"===l?"commented":"asked a question"} on ${p}</a><span class="notification-date">${d(new Date(a))} ago</span></div><div class="notification-content">${c(r)}</div><div class="feedback-button-wrapper"><button class="feedback-button" data-url="${i}" data-typename="ProgramFeedbackNotification" data-feedbackType="${l}">Reply</button></div></li>`}case"GroupedBadgeNotification":{let e="";const{badgeNotifications:s}=n;return e=2===s.length?s[0].badge.description+" and "+s[1].badge.description:s.map((n=>n.badge.description)).slice(0,-1).join(", ")+", and "+s[s.length-1].badge.description,`<li class="notification ${t?"unread":""}"><div class="notification-header"><img class="notification-author--avatar" src="${s[0].badge.icons.compactUrl}"><h3 class="notification-author--nickname">KA Badges</h3><a class="hyperlink" href="https://www.khanacademy.org${i}" target="_blank">view badges</a><span class="notification-date">${d(new Date(a))} ago</span></div><p class="notification-content">You earned ${e}! Congratulations!</p></li>`}case"BadgeNotification":{const{badge:{description:e,icons:{compactUrl:t},relativeUrl:i}}=n;d(new Date(a))}case"ModeratorNotification":{const{text:e}=n;return`<li class="notification ${t?"unread":""}"><div class="notification-header"><img class="notification-author--avatar" src="guardian-icon.png"><h3 class="notification-author--nickname">KA Guardian</h3><span class="notification-date">${d(new Date(a))} ago</span></div><p class="notification-content">${e}</p></li>`}case"AvatarNotification":{const{name:e,thumbnailSrc:i,url:s}=n;return`<li class="notification ${t?"unread":""}"><div class="notification-header"><img class="notification-author--avatar" src="${i.startsWith("https://cdn.kastatic.org/")?i:"https://cdn.kastatic.org"+i}"><h3 class="notification-author--nickname">KA Avatars</h3><a class="hyperlink" href="https://www.khanacademy.org${s}" target="_blank">use avatar</a><span class="notification-date">${d(new Date(a))} ago</span></div><p class="notification-content">You unlocked <b>${l[e]}</b>! <i>${p[e]}</i></p></li>`}default:return`<li class="notification"><pre style="width:100%;overflow-x:auto">${JSON.stringify(n,null,2)}</pre></li>`}}chrome.action.setBadgeBackgroundColor({color:"#00BFA5"}),chrome.cookies.onChanged.addListener((({cookie:n,removed:e})=>{"KAAS"===n.name&&(chrome.action.setBadgeText({text:""}),chrome.storage.local.remove("notificationsCache"),!1===e&&m())}));const y="khanAcademyNotifications";function m(){new Promise(((n,e)=>{chrome.cookies.get({url:"https://www.khanacademy.org",name:"fkey"},(t=>{null===t&&e("Error: No fkey cookie found."),n(t.value)}))})).then((n=>{e("getFullUserProfile",n).then((async t=>{const a=await t.json(),{data:{user:i}}=a;if(null===i)return chrome.storage.local.remove("notificationsCache"),chrome.action.setBadgeText({text:""});const{newNotificationCount:s}=i;s>0?e("getNotificationsForUser",n).then((async n=>{const e=await n.json(),{data:{user:{notifications:t}}}=e;console.log("Notifications (background): ",t);const a=t.pageInfo.nextCursor,i=t.notifications.map(_).join("");chrome.storage.local.set({notificationsCache:{cursor:a,preloadString:i}}),chrome.action.setBadgeText({text:s>99?"99+":String(s)})})).catch((n=>{console.error("ERROR [2]: "+n),chrome.action.setBadgeText({text:"!"})})):chrome.action.setBadgeText({text:""})})).catch((n=>{console.error("ERROR [3]: "+n)}))}))}chrome.alarms.onAlarm.addListener((({name:n})=>{n===y&&m(),console.log("Alarm "+n+" fired.")})),m(),chrome.alarms.create(y,{periodInMinutes:1})})();