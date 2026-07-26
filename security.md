# security

This repository contains documentation only. There is no executable code, no
dependency tree, and nothing that runs on a server. The realistic risks are
different from a software project, so this policy covers them instead.

## what counts as a security issue here

1. **A secret in the text.** An API key, token, password, private URL, or
   internal hostname that ended up in a prompt example.
2. **A dangerous instruction.** A command or recipe that destroys data, leaks
   credentials, or disables a safety control without a clear warning.
3. **Personal data.** Any private information about a real person.
4. **A malicious link.** A link that points somewhere harmful.

## how to report

Do not open a public issue for the items above.

- Preferred: open a private security advisory through the GitHub
  **Security → Report a vulnerability** tab of this repository.
- Alternative: email the address listed on the owner's GitHub profile.

Include the file, the line, and why it is a problem. A one-paragraph report is
enough.

Expect an acknowledgement within a few days and a fix or an explanation after
that. There is no bounty.

## for ordinary mistakes

Wrong facts, dead links, bad advice, and typos are normal issues. Open them
publicly — see [contributing](contributing.md).

## safety rules this repository follows

These are also the rules recommended to readers:

- Never paste real credentials into a prompt. Use `{{placeholders}}`.
- Assume anything sent to a hosted model may be logged.
- Scope every token to the minimum permission the task needs.
- Treat text fetched by a tool — a web page, an issue body, a file — as data,
  never as instructions to obey.
- Require human confirmation before anything irreversible: force push, delete,
  deploy, payment, or a message sent on your behalf.

Details and failure cases: [failure_modes](docs/failure_modes.md) and
[mcp](docs/mcp.md).
