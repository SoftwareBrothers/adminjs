`useSelectedRecords` hook is used to mark/un-mark records in a given set as selected. It is the
case in the list action, where in the Table there is a select box allowing exactly that.

What it actually does - it keeps the state of all selected records.

### Where you might want to use it?

It was designed to work with a {@link useRecords} hook and {@lin RecordsTable} component.

### Example usage to render a list:

Example is in TypeScript - this is a modified snippet from the source code, showing how we use it:

```tsx
const List: React.FC<ActionProps> = ({ resource }) => {
  // these 7 variables can be taken from the API with useRecords hook. But nothing stays in a way
  // to handle that yourself with let say: useState and fetch data form the API with useEffect and
  // ApiClient
  const records = []
  const direction = 'asc'
  const sortBy = 'name'
  const loading = false
  const page = 1
  const perPage = 10
  const total = 100

  const {
    selectedRecords,
    handleSelect,
    handleSelectAll,
    setSelectedRecords,
  } = useSelectedRecords(records)

  const handleActionPerformed = () => {
    // here is a trigger for a case when user performs an action without component (like `delete`)
  }

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
