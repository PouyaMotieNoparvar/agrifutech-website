/*
 * Site content. Edit this file to update the platform stages, the progress timeline, news and events.
 * status: "ok" = working today, "dev" = in development, "plan" = planned.
 * Timeline state: "done", "current", "next".
 */
window.AGRIFUTECH = {
  stages: [
    {
      id: "connect", title: "Connect", status: "dev",
      summary: "Bring in the programme's data.",
      detail: "Candidate lines and trial results are imported from spreadsheets and data files, with size and format checks. " +
        "Connectors for breeding information systems (BrAPI v2 and REST) are built and tested against test servers; " +
        "connection to a partner's live system comes with the first pilot.",
      points: [["Spreadsheet and file import", "ok"], ["BrAPI v2 and REST connectors", "dev"], ["Live link to a partner system", "plan"]]
    },
    {
      id: "harmonise", title: "Harmonise", status: "ok",
      summary: "Check and align the data.",
      detail: "Every value is checked against the programme's trait definitions, valid ranges and units. Field mappings are " +
        "versioned and nothing is guessed: an unknown unit or a missing column stops the import with a clear message. " +
        "Once corrected, a dataset is sealed so it cannot change afterwards.",
      points: [["Row-by-row validation", "ok"], ["Versioned mappings and unit conversion", "ok"], ["Sealed datasets", "ok"]]
    },
    {
      id: "predict", title: "Predict", status: "dev",
      summary: "Use the best available predictions.",
      detail: "Predicted breeding values, for example from genomic prediction models, enter with their standard errors. " +
        "The platform records which model and version produced them. Running genomic prediction pipelines inside the " +
        "platform is the next step.",
      points: [["Model registry and provenance", "ok"], ["Standard errors carried through", "ok"], ["Built-in genomic prediction", "plan"]]
    },
    {
      id: "recommend", title: "Recommend", status: "ok",
      summary: "Rank lines and plan the trials.",
      detail: "Lines are ranked on the breeder's own trait priorities and thresholds, then allocated to sites within the real " +
        "limits: plots, sites, replicates, check varieties, seed and family caps. Each recommendation explains every line, " +
        "offers alternatives and a sensitivity check, and shows how likely each selection is to truly belong in the top group.",
      points: [["Explained, constraint-aware selection", "ok"], ["Uncertainty of every pick", "ok"], ["Exact optimisation", "plan"]]
    },
    {
      id: "decide", title: "Decide", status: "ok",
      summary: "People decide, and it is recorded.",
      detail: "The breeder accepts, modifies or rejects the recommendation, with a structured reason for any change. " +
        "Where the programme requires it, a second person approves before anything is planted. The original " +
        "recommendation is never overwritten.",
      points: [["Accept, modify or reject with reasons", "ok"], ["Second-person approval", "ok"], ["Constraint check on modified plans", "ok"]]
    },
    {
      id: "learn", title: "Learn", status: "ok",
      summary: "Compare plans with what happened.",
      detail: "What was actually planted and the observed outcomes are linked back to the decision, and predictions are " +
        "compared with results. Past seasons can be replayed as clearly labelled retrospective studies to test how a " +
        "method would have performed.",
      points: [["Execution and outcome records", "ok"], ["Predicted vs observed review", "ok"], ["Retrospective studies", "ok"]]
    },
    {
      id: "plan", title: "Plan scenarios", status: "plan",
      summary: "Explore strategies before committing.",
      detail: "The next increment lets breeders compare alternative strategies (different priorities, budgets or trial " +
        "designs) side by side on the same frozen data, with the trade-offs made visible, before choosing one.",
      points: [["Side-by-side scenarios", "plan"], ["Trade-off views", "plan"], ["Randomised field designs", "plan"]]
    }
  ],

  timeline: [
    { state: "done", when: "October 2026", title: "Decision Core prototype",
      text: "The first increment works end to end: import and validate data, recommend, decide, approve, record execution and outcomes, with a full audit history." },
    { state: "done", when: "November 2026", title: "Engineering foundations",
      text: "Automated testing on Windows, Linux and PostgreSQL, versioned and fingerprinted methods, a security review and verified backups." },
    { state: "current", when: "November 2026", title: "Validation on real breeding records",
      text: "Tested on public historical breeding records from two programmes. The lessons led to better handling of missing data, uncertainty shown for every selection, and retrospective studies." },
    { state: "current", when: "Now", title: "Growing the team",
      text: "Two Research Assistants (backend and frontend development) are being recruited; interviews are under way." },
    { state: "next", when: "Next", title: "Scientific review and first partner pilot",
      text: "Review of the methods with quantitative geneticists, then a pilot season with a breeding programme, run alongside its normal decisions." },
    { state: "next", when: "Later", title: "Scenario planning",
      text: "Compare alternative breeding strategies side by side before committing to one." },
    { state: "next", when: "Later", title: "Connected platform",
      text: "Live links to breeding information systems, built-in genomic prediction, randomised field designs and automatic outcome capture." }
  ],

  news: [
    { date: "2026-11-08", tag: "Milestone", title: "Retrospective studies: replaying past seasons",
      text: "Past breeding decisions can now be replayed inside the platform as clearly labelled studies, to test how a method would have performed without affecting live decisions." },
    { date: "2026-11-08", tag: "Feature", title: "Every recommendation now shows how certain it is",
      text: "Using the uncertainty of the predictions, each selected line now shows the likelihood that it truly belongs in the top group, and lines that may have been wrongly left out are listed." },
    { date: "2026-11-08", tag: "Research", title: "First validation on historical breeding records",
      text: "The Decision Core was tested against real advancement decisions in public historical breeding datasets. Its recommendations agreed with breeders well above chance, and the study showed where to improve." },
    { date: "2026-11", tag: "Team", title: "Recruiting two Research Assistants",
      text: "We advertised two Research Assistant posts, in backend and frontend development. Applications are now closed and interviews are under way." },
    { date: "2026-10-24", tag: "Milestone", title: "Decision Core prototype completed",
      text: "The first working version of the AgriFuTech Decision Core was completed and verified on synthetic breeding data." }
  ],

  events: []
};
