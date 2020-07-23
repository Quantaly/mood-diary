# Database design

I realize that IndexedDB isn't really a relational database, but I learned relational databases first, and it seems to make sense to use it as one.

## Object store: `entry`

Key: pathed (see below)

Value: Object
- `date` (primary key): String formatted as `"yyyy-mm-dd"` for lexical sorting (until Y10K, I guess)
- `mood`: Integer between -5 and 5

## Object store: `musings`

Key: Autoincremented integer

Value: Object
- `entry` (indexed): Foreign key into `entries` store
- `type`: `"text"`
- `contents`: String