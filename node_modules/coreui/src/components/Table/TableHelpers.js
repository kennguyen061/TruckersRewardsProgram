import defaultTheme from '../../theme/components/Table';
import {
  any, chain, compose, dec, is, isNil, keys, merge, partial,
  prop, reverse, splitEvery, sortBy, toLower, uniq,
} from 'ramda';

const currentPage = (pagination, pageIndex, pageSize, data) =>
  (!pagination ? data : splitEvery(pageSize, data)[pageIndex] || []);

const isColumnSearchable = (columnId, searchable) =>
  (is(Array, searchable) ? new Set(searchable).has(columnId) : !!searchable);

const isColumnSortable = (columnId, sortable) =>
  (is(Array, sortable) ? new Set(sortable).has(columnId) : !!sortable);

const isKeyColumnValid = (data, valueField) =>
  (!!(valueField && (new Set(data.filter((r) => !isNil(r[valueField]))).size === data.length)));

const isSearchMatchingRow = (columns, searchValue, row) =>
  any((c) => c.isSearchable &&
    (row[c.id] || '').toString().toLowerCase()
      .includes(searchValue.toLowerCase()), columns);

const maxPageIndex = (data, pageSize) => dec(splitEvery(pageSize, data).length);

const normalizedColumns = (baseTableProps, columns) => {
  const { data, helpers, searchable, sortable } = baseTableProps;

  return (columns || uniq(chain(keys, data))).map((c) => {
    const component = c.component;
    const displayName = isNil(c.displayName) ? c : c.displayName;
    const id = c.id || c;
    const isSearchable = helpers.isColumnSearchable(id, searchable);
    const isSortable = helpers.isColumnSortable(id, sortable);

    return { component, displayName, id, isSearchable, isSortable };
  });
};

const normalizedProps = (helpers, props) => {
  const {
    pagination, pageIndex, pageSize, prevPageIndex, searchable,
    selection, searchValue, sortable, sortAscending, sortField, valueField,
  } = props;

  const columns = helpers.normalizedColumns(
    { data: props.data, helpers, searchable, sortable },
    props.columns
  );

  const sortedData = helpers.sortedData(
    { columns, searchable, searchValue, sortAscending, sortField },
    helpers,
    props.data
  );

  const data = helpers.currentPage(
    pagination,
    isNil(pageIndex) ? prevPageIndex : pageIndex,
    pageSize,
    sortedData
  );

  return merge(props, {
    columns,
    data,
    maxPageIndex: helpers.maxPageIndex(sortedData, pageSize),
    searchable: !!searchable,
    selection: !!(selection && helpers.isKeyColumnValid(data, valueField)),
    sortable: !!sortable,
  });
};

const toString = (strOrNil) => (isNil(strOrNil) ? '' : strOrNil);

const caseInsensitiveSortedData = (filteredData, sortField) => {
  const firstValue = (filteredData.find((x) => x[sortField]) || {})[sortField];
  const isCaseInsensitiveSortable = sortField && firstValue &&
    is(Function, firstValue.toUpperCase);
  const sortByFn = sortBy(
    isCaseInsensitiveSortable ? compose(toLower, toString, prop(sortField)) : prop(sortField)
  );

  return sortByFn(filteredData);
};

const sortedData = (baseTableProps, helpers, data) => {
  const { columns, searchable, searchValue, sortAscending, sortField } = baseTableProps;
  const filteredData = searchable ?
    data.filter(partial(helpers.isSearchMatchingRow, [columns, searchValue])) :
    data;
  const xs = !sortField ? filteredData : caseInsensitiveSortedData(filteredData, sortField);

  return (sortField && sortAscending === false) ? reverse(xs) : xs;
};

const classes = defaultTheme.classes;
const options = defaultTheme.options;
const styles = defaultTheme.styles;

const tableDefaultProps = () => ({
  columns: null,
  data: [],
  pageSize: 10,
  pagination: false,
  searchable: false,
  searchPlaceholder: 'Search items...',
  selectMultiple: true,
  selection: true,
  sortable: true,
  sortAscending: true,
  theme: { classes, options, styles },
});

const toggleRow = (selectedRows, rowId) => {
  if (selectedRows.has(rowId)) {
    selectedRows.delete(rowId);
  } else {
    selectedRows.add(rowId);
  }

  return selectedRows;
};

export default {
  currentPage, isColumnSearchable, isColumnSortable, isKeyColumnValid, isSearchMatchingRow,
  maxPageIndex, normalizedColumns, normalizedProps, sortedData, tableDefaultProps, toggleRow,
};
