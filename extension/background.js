// Point this at http://localhost:3000 to try the extension against `pnpm dev`
const baseUrl = "https://njt.vercel.app";

const { version } = chrome.runtime.getManifest();

// Firefox differs from Chrome in a few omnibox details, see comments below.
// Checking for the `browser` global is not enough: recent Chrome defines it too.
const isFirefox = chrome.runtime.getURL("").startsWith("moz-extension:");

// Both browsers show 10 rows: the default one (describing Enter) + 9 suggestions
const maxSuggestionCount = 9;

// Chrome parses suggestion descriptions as XML, Firefox shows them as plain text
function escapeDescription(text) {
  return isFirefox
    ? text
    : text
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
}

const hint = "npm jump to: type a package name, then optionally a destination";

chrome.omnibox.setDefaultSuggestion({ description: hint });

let pendingRequest;

chrome.omnibox.onInputChanged.addListener(async (text, suggest) => {
  pendingRequest?.abort();
  const request = new AbortController();
  pendingRequest = request;

  try {
    const response = await fetch(
      `${baseUrl}/suggest?q=${encodeURIComponent(text)}`,
      // Always revalidate, so a response cached before a deploy is not reused
      { signal: request.signal, cache: "no-cache" },
    );
    // The first completion is what entering the text does
    const [
      ,
      [enteredCompletion, ...completions],
      [enteredDescription, ...descriptions],
    ] = await response.json();
    if (enteredCompletion === undefined) {
      await chrome.omnibox.setDefaultSuggestion({ description: hint });
      suggest([]);
      return;
    }

    // In Firefox, the entered row takes one of the suggestion slots (see below)
    const shownCount = isFirefox ? maxSuggestionCount - 1 : maxSuggestionCount;
    const hiddenKeywords = completions
      .slice(shownCount)
      .map((completion) => completion.slice(completion.lastIndexOf(" ") + 1));
    const enteredRowDescription = escapeDescription(
      [
        `${enteredCompletion} → ${enteredDescription}`,
        ...(hiddenKeywords.length > 0
          ? [`more: ${hiddenKeywords.join(" ")}`]
          : []),
      ].join(" · "),
    );

    const rows = completions.slice(0, shownCount).map((completion, index) => ({
      content: completion,
      description: escapeDescription(`${completion} → ${descriptions[index]}`),
    }));

    if (isFirefox) {
      // Firefox only applies a new default description on the next keystroke
      // (https://bugzil.la/1332942), so the entered row is a regular suggestion.
      // The trailing space stops Firefox from hiding it as identical to the input
      // and does not affect /jump.
      suggest([
        {
          content: `${enteredCompletion} `,
          description: enteredRowDescription,
        },
        ...rows,
      ]);
    } else {
      // Awaiting avoids a race where Chrome keeps the previous default description
      await chrome.omnibox.setDefaultSuggestion({
        description: enteredRowDescription,
      });
      suggest(rows);
    }
  } catch {
    // Aborted by a newer keystroke or offline: entering the text still works
  }
});

chrome.omnibox.onInputEntered.addListener(async (text, disposition) => {
  const url = `${baseUrl}/jump?from=extension%40${version}&to=${encodeURIComponent(
    text,
  )}`;

  switch (disposition) {
    case "newForegroundTab": {
      await chrome.tabs.create({ url });
      break;
    }
    case "newBackgroundTab": {
      await chrome.tabs.create({ url, active: false });
      break;
    }
    default: {
      await chrome.tabs.update({ url });
    }
  }
});
