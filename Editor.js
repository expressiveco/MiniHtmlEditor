var myScriptId = "my_jquery_script_s1";
var jqueryVersion = "3.4.1";
(function() {
    // the minimum version of jQuery we want
    var v = jqueryVersion;
  
    // check prior inclusion and version
    if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
      var done = false;
      var script = document.createElement("script");
      script.id = myScriptId;
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/jquery/" + v + "/jquery.js";
      script.onload = script.onreadystatechange = function() {
        if (
          !done &&
          (!this.readyState ||
            this.readyState == "loaded" ||
            this.readyState == "complete")
        ) {
          done = true;
          initMyBookmarklet();
        }
      };
      document.getElementsByTagName("head")[0].appendChild(script);
    } else {
      initMyBookmarklet();
    }
  
    function initMyBookmarklet() {
      (window.myBookmarklet = function() {
        myFunc();
      })();
    }
  })();
  
  function myFunc() {
    var $dragging, backColor;
  
    function setElem($elem) {
      resetElem(); // reset previous element
      $dragging = $elem;
      backColor = $dragging.css("background-color");
      $dragging.css("background-color", "yellow");
    }
    function resetElem() {
      if (!$dragging) return;
      $dragging.css("background-color", backColor);
      $dragging = null;
    }
    function dumpHtml() {
      resetElem();
      var html = $("html").html();
      html = html.replace('<script id="' + myScriptId + '" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/'  + jqueryVersion + '/jquery.js"></script>', "");      
      console.log(html);
    }
  
    $(document.body).on("click", function(e) {
      if (e.ctrlKey) {
        dumpHtml();
        return;
      }
      // Body must have given a height!
      if (e.target == document.body) {
        resetElem();
        return;
      }
      setElem($(e.target));
      //console.log($dragging[0].nodeName);
  
      return false;
    });
  
    $(document).on("keydown", function(e) {
      if (!$dragging) return;
      $elem = $dragging;
      //console.log($elem.css("top") + " " + $elem.position().top);
      if (e.which == "38") {
        // up arrow
        $elem.css("top", $elem.position().top - 1 + "px");
      } else if (e.which == "40") {
        // top arrow
        $elem.css("top", $elem.position().top + 1 + "px");
      } else if (e.which == "37") {
        // left arrow
        $elem.css("left", $elem.position().left - 1 + "px");
      } else if (e.which == "39") {
        // right arrow
        $elem.css("left", $elem.position().left + 1 + "px");
      }
      return false;
    });
  }
