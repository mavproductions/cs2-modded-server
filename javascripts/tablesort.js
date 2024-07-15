document$.subscribe(function() {
    var tables = document.querySelectorAll("article table:not([class])");
    tables.forEach(function(table) {
      // Allow sorting for all rows except the first one
      table.querySelectorAll("tr:not(:first-child)").forEach(function(tr) {
        tr.querySelectorAll("td").forEach(function(td) {
          td.removeAttribute("data-sort-method");
        });
      });
  
      // Initialize Tablesort
      new Tablesort(table);
    });
  });
  