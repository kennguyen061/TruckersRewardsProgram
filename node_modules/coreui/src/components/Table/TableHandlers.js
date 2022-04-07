import { dec, inc, is, max, min } from 'ramda';

const handleHeaderClick = (c, props) => {
  const { onSort, setPageIndex, setSortAscending, setSortField, sortAscending, sortField } = props;
  const selectedFieldId = c.id;

  if (selectedFieldId === sortField) {
    setSortAscending(!sortAscending);
  } else {
    setSortAscending(true);
    setSortField(selectedFieldId);
  }

  setPageIndex(0);

  if (is(Function, onSort)) {
    onSort(selectedFieldId);
  }
};

const handleNextPageClick = ({ maxPageIndex, pageIndex, setPageIndex }) => {
  setPageIndex(min(maxPageIndex, inc(pageIndex)));
};

const handlePageChange = (v, { pageIndex, setPageIndex, setPrevPageIndex }) => {
  setPageIndex(is(Number, v) ? dec(v) : v);

  if (!v) {
    setPrevPageIndex(pageIndex);
  }
};

const handlePrevPageClick = ({ pageIndex, setPageIndex }) => {
  setPageIndex(max(0, dec(pageIndex)));
};

const handleRowClick = (row, props, toggleRow) => {
  const { onClick, selectMultiple, selectedRows, setSelectedRows, valueField } = props;
  const rowId = row[valueField];
  const newSelectedRows = (selectMultiple === false) ?
    new Set([rowId]) :
    toggleRow(selectedRows, rowId);

  setSelectedRows(newSelectedRows);

  if (is(Function, onClick)) {
    onClick(rowId, newSelectedRows);
  }
};

const handleSearchChange = (v, { setPageIndex, setSearchValue }) => {
  setPageIndex(0);
  setSearchValue(v);
};

export default (helpers) => ({
  onHeaderClick: props => c => handleHeaderClick(c, props),
  onNextPageClick: props => () => handleNextPageClick(props),
  onPageChange: props => v => handlePageChange(v, props),
  onPrevPageClick: props => () => handlePrevPageClick(props),
  onRowClick: props => row => handleRowClick(row, props, helpers.toggleRow),
  onSearchChange: props => v => handleSearchChange(v, props),
});
