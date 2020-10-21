`useRecords` hook is used to fetch records for a given resource. Its main purpose is to render
a `list` action. It handles:

* data load,
* filtering,
* sorting,
* and pagination.

It does not handle selecting records in a list - this is the responsibility of
{@link useSelectedRecords} hook.

### Where you might want to use it?

Basically wherever you need a list of records of some type. It reacts to `location.search`
so whatever you put there will be used as a filter (the same as with a regular filter).

### Example usage to render a list:

Example is in TypeScript - this is a modified snippet from the source code, showing how we use it:

```tsx
const List: React.FC<ActionProps> = ({ resource }) => {
  const {
    records,
    loading,
    direction,
    sortBy,
    page,
    total,
    fetchData,
    perPage,
  } = useRecords(resource.id)

  const location = useLocation()
  const history = useHistory()

  const handleActionPerformed = () => {
    // here is a trigger for a case when user performs an action without component (like `delete`)
  }

  // these functions goes from useSelectedRecords hook, but are optional.
  const handleSelect = () => {}
  const handleSelectAll = () => {}
  const selectedRecords = () => {}

  const handlePaginationChange = (pageNumber: number): void => {
    const search = new URLSearchParams(location.search)
    search.set('page', pageNumber.toString())
    history.push({ search: search.toString() })
  }

  return (
    <Box variant="white">
      <RecordsTable
        resource={resource}
        records={records}
        actionPerformed={handleActionPerformed}
        onSelect={handleSelect}
        onSelectAll={handleSelectAll}
        selectedRecords={selectedRecords}
        direction={direction}
        sortBy={sortBy}
        isLoading={loading}
      />
      <Text mt="xl" textAlign="center">
        <Pagination
          page={page}
          perPage={perPage}
          total={total}
          onChange={handlePaginationChange}
        />
      </Text>
    </Box>
  )
}
```