$(function () {

  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie =
      name + "=" + encodeURIComponent(value) + expires + "; path=/";
  }

  function getCookie(name) {
    var nameEQ = name + "=";
    var parts = document.cookie.split(";");
    for (var i = 0; i < parts.length; i++) {
      var c = $.trim(parts[i]);
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length));
      }
    }
    return null;
  }

  function saveList() {
    var list = [];
    $("#ft_list .todo").each(function () {
      list.push($(this).text());
    });
    setCookie("todo_list", JSON.stringify(list), 365);
  }

  function createTodo(text, addToTop) {
    var $div = $("<div></div>")
      .addClass("todo")
      .text(text);

    $div.on("click", function () {
      if (confirm("Do you want to remove this TO DO?")) {
        $(this).remove();
        saveList();
      }
    });

    if (addToTop) {
      $("#ft_list").prepend($div);
    } else {
      $("#ft_list").append($div);
    }
  }

  function loadList() {
    $("#ft_list").empty();

    var saved = getCookie("todo_list");
    if (!saved) return;

    try {
      var arr = JSON.parse(saved);
      for (var i = 0; i < arr.length; i++) {
        createTodo(arr[i], false);
      }
    } catch (e) {
      setCookie("todo_list", "[]", 365);
    }
  }

  $("#new-btn").on("click", function () {
    var text = prompt("Enter a new TO DO:");
    if (text === null) return;

    text = $.trim(text);
    if (text === "") return;

    createTodo(text, true);
    saveList();
  });

  loadList();
});
