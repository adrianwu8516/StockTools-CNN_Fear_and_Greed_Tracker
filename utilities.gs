function onSearch(sheetName, searchString, searchTargetCol) {
  var values = sheetName.getDataRange().getValues();
  for(var i=0; i<values.length; i++) {
    if(values[i][searchTargetCol] == searchString) {return i}
  }
}