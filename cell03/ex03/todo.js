function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var parts = document.cookie.split(";");
  for (var i = 0; i < parts.length; i++) {
    var c = parts[i].trim();
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length));
    }
  }
  return null;
}

function saveList() {
  var list = [];
  var items = document.querySelectorAll("#ft_list .todo");
  for (var i = 0; i < items.length; i++) {
    list.push(items[i].textContent);
  }
  setCookie("todo_list", JSON.stringify(list), 365);
}

function createTodo(text, addToTop) {
  var ftList = document.getElementById("ft_list");
  var div = document.createElement("div");
  div.className = "todo";
  div.textContent = text;

  div.addEventListener("click", function () {
    if (confirm("Do you want to remove this TO DO?")) {
      div.remove();        // ✅ ลบออกจาก DOM จริง
      saveList();          // ✅ อัปเดต cookie
    }
  });

  if (addToTop && ftList.firstChild) {
    ftList.insertBefore(div, ftList.firstChild); // ✅ เพิ่มบนสุด
  } else {
    ftList.appendChild(div);
  }
}

function loadList() {
  var saved = getCookie("todo_list");
  if (!saved) return;

  try {
    var arr = JSON.parse(saved);
    // arr ถูกเก็บตามลำดับบน->ล่างอยู่แล้ว
    for (var i = 0; i < arr.length; i++) {
      createTodo(arr[i], false);
    }
  } catch (e) {
    // ถ้าคุกกี้เสีย ให้ล้าง
    setCookie("todo_list", "[]", 365);
  }
}

document.getElementById("new-btn").addEventListener("click", function () {
  var text = prompt("Enter a new TO DO:");
  if (text === null) return;

  text = text.trim();
  if (text === "") return;

  createTodo(text, true);  // ✅ เพิ่มบนสุด
  saveList();              // ✅ เซฟลง cookie
});

// โหลดจาก cookie ตอนเปิดหน้า
loadList();
