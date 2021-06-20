import { MatPaginatorIntl } from '@angular/material';

const rusRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) { return `0 из ${length}`; }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  const endIndex = startIndex < length ?
    Math.min(startIndex + pageSize, length) :
    startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} из ${length}`;
}


export function getRusPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Кол-во на страницу:';
  paginatorIntl.nextPageLabel = 'След.';
  paginatorIntl.previousPageLabel = 'Пред';
  paginatorIntl.getRangeLabel = rusRangeLabel;
  paginatorIntl.lastPageLabel = 'Последняя';
  paginatorIntl.firstPageLabel = 'Первая';

  return paginatorIntl;
}
