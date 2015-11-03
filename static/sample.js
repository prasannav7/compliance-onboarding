/*!
    Copyright (C) 2015 Google Inc., 
    Created By: sasmita@google.com
    Maintained By: sasmita@google.com
*/

var base_url = "/sample/api/v1.0/systems";
var remote_url = "https://sasmita-ggrc-sample1.appspot.com/sample/api/v1.0/ggrcSystems";

$(document).ready(function(){
    //Get all button
    $("#b1").click(function(){
        var info = "";
        var jqxhr = $.ajax({
            url: base_url, 
            type:"GET",
            success: function(msg, hdr) {
                console.log("success---post");
                var items = msg.systems;
                var len = items.length;
                
                for ( var i = 0; i < len; i++) {
                    info = info + "Item" + (i+1) + ": "  + items[i].title + ",  " +
                        items[i].description + ", " + items[i].id + ", " +  
                        items[i].slug + ", " + items[i].pcontact + ", " +  
                        items[i].scontact + "<br>" ;
                }
                $("#info").html(info);
            }
        });
        
    });
    //Get 1 button
    $("#b2").click(function(){
        var changeId = $("#putAndDelete")[0].value;
        var url = base_url + "/" + changeId;
    	var b2Callback = function(data){
            var d = data.systems;
            var info = d.title + ",  " + d.description + ", " + d.id + ", " + d.slug + ", " + 
                d.pcontact + ", " + d.scontact + "<br>" ;
            $("#info").html(info);
    		//alert(data.systems.description);
    		console.log(info);
    	};
    	$.get(url, b2Callback, "json");
    });
    //post button
    $("#b3").click(function(){
        var oData = makeObject();
        $("#info").html(JSON.stringify(oData));

    	var jqxhr = $.ajax({
	      url: base_url, //"/sample/api/v1.0/systems",
	      type:"POST",
	      beforeSend: function(xhr){
	                xhr.setRequestHeader("Content-Type","application/json; charset=utf-8");
	                xhr.setRequestHeader("Accept","application/json; charset=utf-8");
	      },
	      //data: JSON.stringify({ title: "Chrome book 1", description: "Chrome book 1" }),
          data: JSON.stringify(oData),
	      //processData: false,
	      dataType:"json",
	      success: function(msg) {
                console.log("success---post");
          }
	    });
    	jqxhr.fail(function(){
    		alert( "error" );
    	});
    	jqxhr.always(function(){
    		console.log( "finished -1" );
    	});

    });

    //Put button
    $("#b4").click(function(){
        var oData = makeObject();
        $("#info").html(JSON.stringify(oData));
        var changeId = $("#putAndDelete")[0].value;
        var url = base_url + "/" + changeId;

        var jqxhr = $.ajax({
          url: url, //"/sample/api/v1.0/systems/2",
          type:"PUT",
          beforeSend: function(xhr){
                    xhr.setRequestHeader("Content-Type","application/json; charset=utf-8");
                    xhr.setRequestHeader("Accept","application/json; charset=utf-8");
          },
          data: JSON.stringify(oData),
          dataType:"json",
          success: function(msg) {
                console.log("success---PUT");
          }
        });
        jqxhr.fail(function(){
            alert( "error-put" );
        });
        jqxhr.always(function(){
            console.log( "finished PUT---" );
        });
    });
    
    //Delete button
    $("#b5").click(function(){
        var changeId = $("#putAndDelete")[0].value;
        var url = base_url + "/" + changeId;

        var jqxhr = $.ajax({
          url: url, //"/sample/api/v1.0/systems/2",
          type:"Delete",
          beforeSend: function(xhr){
                    xhr.setRequestHeader("Content-Type","application/json; charset=utf-8");
                    xhr.setRequestHeader("Accept","application/json; charset=utf-8");
          },
          success: function(msg) {
                console.log("success---Delete");
          }
        });
        jqxhr.fail(function(){
            alert( "error-Delete" );
        });
        jqxhr.always(function(){
            console.log( "finished Delete---" );
        });
    });

    //submitData click
    $("#submitData").click(function(){
        //alert("submit data"); return;
        var jsonObject = 
            {"product":{
                    "title":"prd_sasmita_40",
                    "context":null
            }};//getFormData();
        var url = "https://grc-test.appspot.com/api/products"; //makeUrl();
        alert(JSON.stringify(jsonObject));alert(url);//return;
        //this is a post
        var jqxhr = $.ajax({
            url: url,
            type: "POST",
            beforeSend: function(xhr) {
                //xhr.setRequestHeader("Access-Control-Allow-Origin","*");
                xhr.setRequestHeader("Content-Type","application/json; charset=utf-8");
                xhr.setRequestHeader("Accept","application/json; text/javascript; */*; charset=utf-8");
                //application/json, text/javascript, */*; q=0.01
                xhr.setRequestHeader("x-requested-by", "gGRC");
            },
            data: JSON.stringify(jsonObject),
            //dataType:"json",
            success: function(msg) {
                console.log("success --ggrc post");
            },
            error: function(msg) { alert('Failed!'); }
        });
        jqxhr.fail(function(){
            alert( "GGRC post error" );
        });
    });
    //Dummy GetAll
    $("#dummyGetAll").click(function(){
        //alert("get url: " + remote_url);
        var info = "";
        var jqxhr = $.ajax({
            url: remote_url,
            type: "GET",
            success: function(result, code) {
                //alert("success --dummy ggrc get");
                //console.log("success --dummy ggrc get");
                var items = result.ggrcSystems;
                var len = items.length;
                
                for ( var i = 0; i < len; i++) {
                    info = info + "Item" + (i+1) + ": "  + items[i].title + ",  " +
                        items[i].description + ", " + items[i].id + ", " +  
                        items[i].slug + ", " + items[i].pcontact + ", " +  
                        items[i].scontact + "<br>" ;
                }
                $("#infoRemote").html(info);
            },
            error: function(msg) { 
                console.log("-- failed: " + msg);
            }
        });
    });
    //Dummy Get1
    $("#dummyGet1").click(function(){
        var changeId = $("#putAndDelete")[0].value;
        var url = remote_url + "/" + changeId;
        //alert("get url: " + url);

        var jqxhr = $.ajax({
            url: url,
            type: "GET",
            success: function(result, code) {
                //alert("success --dummy ggrc get");
                //console.log("success --dummy ggrc get");
                var d = result.ggrcSystems;
                var info = d.title + ",  " + d.description + ", " + d.id + ", " + d.slug + ", " + 
                    d.pcontact + ", " + d.scontact + "<br>" ;
                $("#infoRemote").html(info);
            },
            error: function(msg) { 
                console.log("-- failed: " + msg);
                //alert('dummy ggrc get Failed!'); 
            }
        });
    });
    //Dummy POST
    $("#dummyPost").click(function(){
        var oData = makeObject();
        $("#infoRemote").html(JSON.stringify(oData));

        var jqxhr = $.ajax({
          url: remote_url, //"/sample/api/v1.0/systems",
          type:"POST",
          beforeSend: function(xhr){
                    xhr.setRequestHeader("Content-Type","application/json; charset=utf-8");
                    xhr.setRequestHeader("Accept","application/json; charset=utf-8");
          },
          //data: JSON.stringify({ title: "Chrome book 1", description: "Chrome book 1" }),
          data: JSON.stringify(oData),
          //processData: false,
          dataType:"json",
          success: function(request, code) {
                console.log("success---remote post: " + code);
          }
        });
        jqxhr.fail(function(msg){
            alert( "error remote post:" + msg );
        });
        jqxhr.always(function(msg){
            console.log( "finished remote post" );
        });
    });
    //Dummy Put
    $("#dummyPut").click(function(){
        var oData = makeObject();
        $("#infoRemote").html(JSON.stringify(oData));
        var changeId = $("#putAndDelete")[0].value;
        var url = remote_url + "/" + changeId;

        var jqxhr = $.ajax({
          url: url, //"/sample/api/v1.0/systems/2",
          type:"PUT",
          beforeSend: function(xhr){
                    xhr.setRequestHeader("Content-Type","application/json; charset=utf-8");
                    xhr.setRequestHeader("Accept","application/json; charset=utf-8");
          },
          data: JSON.stringify(oData),
          dataType:"json",
          success: function(msg) {
                console.log("success---PUT");
          }
        });
        jqxhr.fail(function(msg){
            alert( "error remote -put: "  + msg);
        });
        jqxhr.always(function(msg){
            console.log( "finished remote PUT---: "  + msg);
        });
    });
});



function makeObject(formData) {
    
    if($("#objectType")[0].value == "") {
        console.log("no object type");
        $("#info").html("No object type: enter object type");
        return;
    }
    
    var title = $("#title")[0];
    if(title.value == "" || title.value == undefined){
        $("#info").html("No title: enter title");
        return; 
    }
        
    var description = $("#description")[0], code = $("#code")[0], pcontact = $("#pcontact")[0],
        scontact = $("#scontact")[0];
    obj = {
        "title": title.value,
        "description": description.value,
        "slug": code.value,
        "pcontact": pcontact.value,
        "scontact": scontact.value
    }
    return obj;

}
function popup() {
	alert("Hello World");
}