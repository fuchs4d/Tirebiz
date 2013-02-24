﻿<!DOCTYPE html>
<html lang="en">
<head>
    <title id='Description'>In order to enter in edit mode, select a grid cell and start typing, "Click" or press the "F2" key. You 
    can also navigate through the cells using the keyboard arrows or with the "Tab" and "Shift + Tab" key combinations. To cancel the cell editing, press the "Esc" key. To save
    the changes press the "Enter" key or select another Grid cell. Pressing the 'Space' key when a checkbox cell is selected will toggle the check state.</title>
    <link rel="stylesheet" href="../../jqwidgets/styles/jqx.base.css" type="text/css" />
    <script type="text/javascript" src="../../scripts/jquery-1.8.2.min.js"></script>
    <script type="text/javascript" src="../../jqwidgets/jqxcore.js"></script>
    <script type="text/javascript" src="../../jqwidgets/jqxdata.js"></script> 
    <script type="text/javascript" src="../../jqwidgets/jqxbuttons.js"></script>
    <script type="text/javascript" src="../../jqwidgets/jqxscrollbar.js"></script>
    <script type="text/javascript" src="../../jqwidgets/jqxmenu.js"></script>
    <script type="text/javascript" src="../../jqwidgets/jqxgrid.js"></script>
    <script type="text/javascript" src="../../jqwidgets/jqxgrid.edit.js"></script>  
    <script type="text/javascript" src="../../jqwidgets/jqxgrid.selection.js"></script> 
    <script type="text/javascript" src="../../jqwidgets/jqxlistbox.js"></script>
    <script type="text/javascript" src="../../jqwidgets/jqxdropdownlist.js"></script>
    <script type="text/javascript" src="../../jqwidgets/jqxcheckbox.js"></script>
    <script type="text/javascript" src="../../jqwidgets/jqxcalendar.js"></script>
    <script type="text/javascript" src="../../jqwidgets/jqxnumberinput.js"></script>
    <script type="text/javascript" src="../../jqwidgets/jqxdatetimeinput.js"></script>
    <script type="text/javascript" src="../../jqwidgets/globalization/jquery.global.js"></script>
    <script type="text/javascript" src="../../scripts/gettheme.js"></script>
    <script type="text/javascript" src="generatedata.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            var theme = getTheme();
            // prepare the data
            var data = generatedata(200);
            var source =
            {
                localdata: data,
                datatype: "array",
                updaterow: function (rowid, rowdata, commit) {
                    // synchronize with the server - send update command
                    // call commit with parameter true if the synchronization with the server is successful 
                    // and with parameter false if the synchronization failder.
                    commit(true);
                },
                datafields:
                [
                    { name: 'firstname', type: 'string' },
                    { name: 'lastname', type: 'string' },
                    { name: 'productname', type: 'string' },
                    { name: 'available', type: 'bool' },
                    { name: 'quantity', type: 'number' },
                    { name: 'price', type: 'number' },
                    { name: 'date', type: 'date' }
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            // initialize jqxGrid
            $("#jqxgrid").jqxGrid(
            {
                width: 680,
                source: dataAdapter,
                editable: true,
                theme: theme,
                selectionmode: 'multiplecellsadvanced',
                columns: [
                  { text: 'First Name', columntype: 'textbox', datafield: 'firstname', width: 80 },
                  { text: 'Last Name', datafield: 'lastname', columntype: 'textbox', width: 80 },
                  { text: 'Product', columntype: 'dropdownlist', datafield: 'productname', width: 195 },
                  { text: 'Available', datafield: 'available', columntype: 'checkbox', width: 67 },
                  { text: 'Ship Date', datafield: 'date', columntype: 'datetimeinput', width: 110, cellsalign: 'right', cellsformat: 'd',
                  validation: function (cell, value) {
                          if (value == "")
                             return true;
                          var year = value.getFullYear();
                          if (year >= 2013) {
                              return { result: false, message: "Ship Date should be before 1/1/2013" };
                          }
                          return true;
                      }
                  },
                  { text: 'Quantity', datafield: 'quantity', width: 70, cellsalign: 'right', columntype: 'numberinput',
                      validation: function (cell, value) {
                          if (value < 0 || value > 150) {
                              return { result: false, message: "Quantity should be in the 0-150 interval" };
                          }
                          return true;
                      },
                      createeditor: function (row, cellvalue, editor) {
                          editor.jqxNumberInput({ decimalDigits: 0, digits: 3 });
                      }
                  },
                  { text: 'Price', datafield: 'price', cellsalign: 'right', cellsformat: 'c2', columntype: 'numberinput',
                      validation: function (cell, value) {
                          if (value < 0 || value > 15) {
                              return { result: false, message: "Price should be in the 0-15 interval" };
                          }
                          return true;
                      },
                      createeditor: function (row, cellvalue, editor) {
                          editor.jqxNumberInput({ digits: 3 });
                      }
                  }
                ]
            });
            // events
            $("#jqxgrid").bind('cellbeginedit', function (event) {
                var args = event.args;
                $("#cellbegineditevent").html("Event Type: cellbeginedit, Column: " + args.datafield + ", Row: " + (1 + args.rowindex) + ", Value: " + args.value);
            });
            $("#jqxgrid").bind('cellendedit', function (event) {
                var args = event.args;
                $("#cellendeditevent").html("Event Type: cellendedit, Column: " + args.datafield + ", Row: " + (1 + args.rowindex) + ", Value: " + args.value);
            });
        });
    </script>
</head>
<body class='default'>
    <div id='jqxWidget'>
        <div id="jqxgrid"></div>
        <div style="margin-top: 30px;">
            <div id="cellbegineditevent"></div>
            <div style="margin-top: 10px;" id="cellendeditevent"></div>
       </div>
    </div>
</body>
</html>