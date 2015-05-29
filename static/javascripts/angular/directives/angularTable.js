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

    function generateTableBody(columnData, tableData, scope, attrs, editable, compileTable) {

        var tableBody = "<tbody>";

        _.each(tableData, function(row, rowIndex) {

            var thisRowEditable = row.__editable;

            tableBody += "<tr>";

            _.each(columnData, function(col, colIndex) {

                tableBody += "<td>";

                if (thisRowEditable) {

                    if (compileTable) {

                        tableBody += "<input ng-model='" + attrs.tableData + "[" + rowIndex + "]." + col.name + "' type='text'>";

                    } else {

                        tableBody += "<input value='" + tableData[rowIndex][col.name] + "' type='text'>";

                    }

                } else {

                    if (compileTable) {

                        tableBody += "{{" + attrs.tableData + "[" + rowIndex + "]." + col.name + "}}";

                    } else {

                        tableBody += tableData[rowIndex][col.name];

                    }

                }

                tableBody += "</td>";

            });

            if (editable) {

                if (compileTable) {

                    tableBody += "<td><button style='height:26px; width:26px; border-radius:4px;' ng-click='editRow(" + rowIndex + ");'><span style='left:-3px;' class='glyphicon glyphicon-pencil'></span></button></td>";

                } else {

                    tableBody += "<td><button style='height:26px; width:26px; border-radius:4px;' onclick='editRow(" + rowIndex + ");'><span style='left:-3px;' class='glyphicon glyphicon-pencil'></span></button></td>";

                }

            }

            tableBody += "</tr>";

        });

        tableBody += "</tbody>";

        return tableBody;

    }

    function buildTable(elem, scope, attrs, tableData, columnData, editable, compileTable, compile) {

        var tableHtml = "<table>";

        tableHtml += generateTableHeader(columnData, editable);

        tableHtml += generateTableBody(columnData, tableData, scope, attrs, editable, compileTable);

        tableHtml += "</table>";

        $(elem).html(tableHtml);

        if (compileTable) {

            var cellHtml = $(elem).contents();
            compile(cellHtml)(scope);

        }

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
            ctx.compileTable = (attrs.compileTable !== undefined ? true : false);

            // attrs.tableData - table data, array of JSON objects
            // attrs.columnData - column data, array of JSON objects

            buildTable(ctx.element, ctx.scope, ctx.attrs, ctx.tableData, ctx.columnData, ctx.tableEditable, ctx.compileTable, compile);

            ctx.table.rebuildTable = function() {

                buildTable(ctx.element, ctx.scope, ctx.attrs, ctx.tableData, ctx.columnData, ctx.tableEditable, ctx.compileTable, compile);

            };

        }

    }]);


}());