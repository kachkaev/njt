interface SuccessfullyResolvedDestination {
  outcome: "success";
  url: string;
}

interface UnresolvedDestination {
  outcome: "error";
  error: string;
}

type ResolvedDestination =
  | SuccessfullyResolvedDestination
  | UnresolvedDestination;
