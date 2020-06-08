
## Firebase CLI

https://firebase.google.com/docs/cli

### Use project aliases

To use assigned Firebase project aliases, run any of the following commands from within your project directory.

Command	Description

	`firebase use`	View a list of currently defined aliases for your project directory

	`firebase use project_id_or_alias`	Directs all commands to run against the specified Firebase project. The CLI uses this project as the currently "active project".

	`firebase use --clear`	Clears the active project.
Run firebase use project_id_or_alias to set a new active project before running other CLI commands.

	`firebase use --unalias project_alias`	Removes an alias from your project directory.

You can override what's being used as the currently active project by passing the `--project` flag with any CLI command. As an example: You can set your CLI to run against a Firebase project that you've assigned the staging alias. If you want to run a single command against the Firebase project that you've assigned the prod alias, then you can run, for example, `firebase deploy --project=prod`.


## Gcoud Utils

### List operations

```sh
gcloud firestore operations list
```

## Manage and move data

https://firebase.google.com/docs/firestore/manage-data/move-data

## Export data from the source project

Export all data

```sh
gcloud firestore export gs://[SOURCE_BUCKET] --async
```

Export specific collections

```sh
gcloud firestore export gs://[SOURCE_BUCKET] --collection-ids=[COLLECTION_ID_1],[COLLECTION_ID_2
```
