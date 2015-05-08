/**
 * Created by Keith.Gould on 4/30/15.
 */

(function() {

    var app = angular.module('appRouter');

    function findColumnByName(columnData, name) {

        return _.find(columnData, function(columnDatum) { return name === columnDatum.name; });

    }

    function findColumnAtPosition(columnData, position) {

        return _.find(columnData, function(columnDatum) { return position === columnDatum.position; });

    }

    function generateTableHeader(columnData, editable) {

        var tableHeader = "<thead><tr>";

        _.each(columnData, function(columnDef, index) {

            columnDef.position = index;

            tableHeader += "<th style='" + (columnDef.width ? "width:" + columnDef.width + ";" : "") + "'>";

            tableHeader += columnDef.title;

            tableHeader += "</th>";

        });

        if (editable) {

            tableHeader += "<th style='width:60px;'>Edit</th>";

        }

        tableHeader += "</tr><thead>";

        return tableHeader;

    }

    function generateTableBody(columnData, tableData, scope, attrs, editable) {

        var tableBody = "<tbody>";

        _.each(tableData, function(row, rowIndex) {

            var thisRowEditable = row.__editable;

            tableBody += "<tr>";

            _.each(columnData, function(col, colIndex) {

                tableBody += "<td>";

                if (thisRowEditable) {

                    tableBody += "<input ng-model='" + attrs.tableData + "[" + rowIndex + "]." + col.name + "' type='text'>";

                } else {

                    tableBody += "{{" + attrs.tableData + "[" + rowIndex + "]." + col.name + "}}";

                }

                tableBody += "</td>";

            });

            if (editable) {

                tableBody += "<td><button ng-click='editRow(" + rowIndex + ");'>X</button></td>";

            }

            tableBody += "</tr>";

        });

        tableBody += "</tbody>";

        return tableBody;

    }

    function buildTable(elem, scope, attrs, tableData, columnData, editable, compile) {

        var tableHtml = "<table>";

        tableHtml += generateTableHeader(columnData, editable);

        tableHtml += generateTableBody(columnData, tableData, scope, attrs, editable);

        tableHtml += "</table>";

        $(elem).html(tableHtml);

        var cellHtml = $(elem).contents();
        compile(cellHtml)(scope);

        $(elem).addClass('angulartable');

    }

    app.directive('angularTable', ['$compile', function (compile) {

        var compile = compile;

        return function (scope, element, attrs) {

            var ctx = {};

            ctx.scope = scope;
            ctx.element = element;
            ctx.attrs = attrs;

            ctx.table = scope[attrs.angularTable];
            ctx.tableData = scope[attrs.tableData];
            ctx.columnData = scope[attrs.columnData];
            ctx.tableEditable = (attrs.editableTable !== undefined ? true : false);

            // attrs.tableData - table data, array of JSON objects
            // attrs.columnData - column data, array of JSON objects

            buildTable(ctx.element, ctx.scope, ctx.attrs, ctx.tableData, ctx.columnData, ctx.tableEditable, compile);

            ctx.table.rebuildTable = function() {

                buildTable(ctx.element, ctx.scope, ctx.attrs, ctx.tableData, ctx.columnData, ctx.tableEditable, compile);

            };

        }

    }]);


}());