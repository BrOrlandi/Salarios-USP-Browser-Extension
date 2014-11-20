var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    	// If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
    	// If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]], pair[1] ];
      query_string[pair[0]] = arr;
    	// If third or later entry with this name
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  } 
    return query_string;
} ();

Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

(function start(){

  function loading(){
    var str = "<div id='salario_usp' class='salario_usp_info'>Carregando...</div>";
    e = $(".flt-left.desc_pessoa h1");
    if(e){
      e.after(str);
    }
  }

  function setMsg(msg){
    $("#salario_usp").html(msg);
  }

  loading();
	id = QueryString.id;
	if(id != undefined){

    $.ajax({
      crossDomain: true,
      dataType: 'json',
      url: 'http://brorlandi.me/salariosusp/icmc/'+id,
      error: function(jqXHR, textStatus, errorThrown){
        setMsg("Ocorreu um erro no servidor!<br>"+errorThrown);
      },
      success: function(data){
        if(data.code == 1){
          setMsg(data.data);
        }
        else
        {
          data = data.data;
          sal = data.salario.formatMoney();
          if(data.tempo_usp > 1){
            anos = data.tempo_usp+" anos.";
          }
          else
          {
            anos = data.tempo_usp+" ano.";
          }

          var str = "<span class='salario_usp_nome'>"+data.nome+"</span><br>" +
          data.categoria+"<br>" +
          "Salário: <span class='salario_usp_sal'>R$ "+sal+"</span><br>"+
          "Anos na USP: <span class='salario_usp_anos'>"+anos+"</span>";

          $("#salario_usp").html(str);

        }
      }
    });
	}
})();