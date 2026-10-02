// Point this at http://localhost:3000 to try the extension against `pnpm dev`
const baseUrl = "https://njt.vercel.app";

const { version } = chrome.runtime.getManifest();

chrome.omnibox.setDefaultSuggestion({
  description: "npm jump to: <package> [destination]",
});

// Chrome parses suggestion descriptions as XML
function escapeXml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

let pendingRequest;

chrome.omnibox.onInputChanged.addListener(async (text, suggest) => {
  pendingRequest?.abort();
  const request = new AbortController();
  pendingRequest = request;

  try {
    const response = await fetch(
      `${baseUrl}/suggest?q=${encodeURIComponent(text)}`,
      { signal: request.signal },
    );
    const [, completions, descriptions] = await response.json();

    suggest(
      completions.map((completion, index) => ({
        content: completion,
        description: escapeXml(`${completion} → ${descriptions[index]}`),
      })),
    );
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
