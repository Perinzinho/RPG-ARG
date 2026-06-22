var before = document.getElementById("before");
var liner = document.getElementById("liner");
var command = document.getElementById("typer");
var textarea = document.getElementById("texter");
var terminal = document.getElementById("terminal");

var git = 0;
var pw = false;
let pwd = false;
var commands = [];


document.addEventListener("click", () => textarea.focus());

// ── BOOT SEQUENCE ANTES DO BANNER ─────────────────────────────────────
setTimeout(function () {
  var delay = 0;

  bootSequence.forEach(function (line) {
    delay += Math.floor(Math.random() * 180) + 600; 
    (function (d) {
      setTimeout(function () {
        addLine(line, "no-animation boot-line", 0);
      }, d);
    })(delay);
  });

  setTimeout(function () {
    loopLines(banner, "", 80);
    textarea.focus();
  }, delay + 600);
}, 200);


textarea.addEventListener("input", function () {
  if (pw) {
    command.innerHTML = "*".repeat(textarea.value.length);
    if (textarea.value === password) pwd = true;
  } else {
    command.innerHTML = escapeHTML(textarea.value);
  }
});

// Mantém o keyup no window para capturar Enter/setas mesmo sem foco exato
window.addEventListener("keyup", enterKey);
window.addEventListener("keydown", function (e) {
  if ([38, 40].includes(e.keyCode)) e.preventDefault();
});

textarea.value = "";
command.innerHTML = "";

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function enterKey(e) {
  if (e.keyCode == 181) {
    document.location.reload(true);
  }

  if (pw) {
    if (e.keyCode == 13) {
      if (pwd) {
        loopLines(secret, "color2 margin", 120);
        pwd = false;
      } else {
        addLine("Wrong password", "error", 0);
      }
      command.innerHTML = "";
      textarea.value = "";
      pw = false;
      liner.classList.remove("password");
    }
  } else {
    if (e.keyCode == 13) {
      const cmd = command.innerHTML;
      commands.push(cmd);
      git = commands.length;
      addLine("DEMP@Admin:~$ " + cmd, "no-animation", 0);
      commander(textarea.value.trim().toLowerCase());
      command.innerHTML = "";
      textarea.value = "";
    }

    if (e.keyCode == 38 && git > 0) {
      git -= 1;
      textarea.value = commands[git];
      command.innerHTML = escapeHTML(commands[git]);
    }

    if (e.keyCode == 40 && git < commands.length) {
      git += 1;
      const val = commands[git] ?? "";
      textarea.value = val;
      command.innerHTML = escapeHTML(val);
    }
  }
}

function commander(cmd) {
  switch (cmd) {
    case "clear":
      setTimeout(function () {
        terminal.innerHTML = '<a id="before"></a>';
        before = document.getElementById("before");
      }, 1);
      break;

    case "jasmin":
      loopLines(Jasmin, "color2 margin", 80);
      break;

    case "maria flor":
      loopLines(Jasmin, "color2 margin", 80);
      break;

    case "camila botelho":
      loopLines(Camila, "color2 margin", 80);
      break;

    case "botelho log0001":
      loopLines(Log01, "color2 margin", 80);
      break;

    case "botelho log0002":
      loopLines(Log02, "color2 margin", 80);
      break;

    case "botelho log0003":
      loopLines(Log03, "color2 margin", 80);
      break;

    case "botelho log0004":
      loopLines(Log04, "color2 margin", 80);
      break;

    default:
      addLine(
        "<span class=\"color2\">Command not found. For a list of commands, type 'help'.</span>",
        "error",
        100
      );
      break;
  }
}

function newTab(link) {
  setTimeout(function () {
    window.open(link, "_blank");
  }, 500);
}

function addLine(text, style, time) {
  var t = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) === " " && text.charAt(i + 1) === " ") {
      t += "&nbsp;&nbsp;";
      i++;
    } else {
      t += text.charAt(i);
    }
  }
  setTimeout(function () {
    var next = document.createElement("p");
    next.innerHTML = t;
    next.className = style;
    before.parentNode.insertBefore(next, before);
    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}

function loopLines(name, style, time) {
  name.forEach(function (item, index) {
    addLine(item, style, index * time);
  });
}