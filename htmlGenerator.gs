function doGet(e){
  var html_page = HtmlService.createTemplateFromFile('view/FearAndGreed')
  html_page.data = macroModel()
  return html_page.evaluate().getContent()
}

function macroModel(){
  return
}