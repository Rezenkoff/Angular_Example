"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRusPaginatorIntl = void 0;
var material_1 = require("@angular/material");
var rusRangeLabel = function (page, pageSize, length) {
    if (length == 0 || pageSize == 0) {
        return "0 \u0438\u0437 " + length;
    }
    length = Math.max(length, 0);
    var startIndex = page * pageSize;
    var endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
    return startIndex + 1 + " - " + endIndex + " \u0438\u0437 " + length;
};
function getRusPaginatorIntl() {
    var paginatorIntl = new material_1.MatPaginatorIntl();
    paginatorIntl.itemsPerPageLabel = 'Кол-во на страницу:';
    paginatorIntl.nextPageLabel = 'След.';
    paginatorIntl.previousPageLabel = 'Пред';
    paginatorIntl.getRangeLabel = rusRangeLabel;
    paginatorIntl.lastPageLabel = 'Последняя';
    paginatorIntl.firstPageLabel = 'Первая';
    return paginatorIntl;
}
exports.getRusPaginatorIntl = getRusPaginatorIntl;
//# sourceMappingURL=rus-paginator-intl.js.map