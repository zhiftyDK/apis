<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terminal2</title>
    <style>
        *{
            margin: 2px;
            padding: 2px;
            background-color: black;
            color: white;
            overflow: hidden;
        }

        #terminalPrefix{
            display: inline;
            margin-right: 0px;
        }

        #terminalInput{
            border-style: none;
            display: inline;
            margin-bottom: 10px;
            margin-top: 20px;
            margin-left: 0px;
        }

        #terminalInput:focus{
            outline: none;
        }
    </style>
</head>
<body>
    <div id="terminal">
        <p id="terminalText"></p>

        <p id="terminalPrefix">$</p>
        <input type="text" id="terminalInput" autocomplete="off">
    </div>

    <script>
        //Variables
        const terminal = document.getElementById("terminal");
        const terminalText = document.getElementById("terminalText");
        const terminalPrefix = document.getElementById("terminalPrefix");
        const terminalInput = document.getElementById("terminalInput");
        const latencyImg = document.getElementById("latencyImg");
        const terminalDatabase = [];
        const scrollingElement = (document.scrollingElement || document.body)

        //Load Terminal
        function loadTerminal() {
            terminalDatabase.push("Zhifty Terminal");
            terminalDatabase.push("The first client side terminal ever!");
            terminalDatabase.push("");
            const formatTerminalDatabase = terminalDatabase + "";
            const formattedTerminalDatabase = formatTerminalDatabase.split(",").join("<br>");
            terminalText.innerHTML = formattedTerminalDatabase;
        }
        window.onload = loadTerminal;

        //Terminal Handler
        terminalInput.focus()

        terminalInput.addEventListener("keyup", function(event) {
            if (event.keyCode === 13 && terminalInput.value !== "") {
                event.preventDefault();

                //Terminal Commands
                if(terminalInput.value == "--version") {
                    terminalDatabase.push("$ " + terminalInput.value);
                    terminalDatabase.push("You are running Zhifty Terminal version 1.2");
                    terminalDatabase.push("");
                    pushCommand();
                } 
                else if(terminalInput.value == "--clear") {
                    location.reload();
                }
                else if(terminalInput.value.includes("--start")) {
                    terminalDatabase.push("$ " + terminalInput.value);
                    const startLink = "http://" + terminalInput.value.replace(/--start /g, "") 
                    terminalDatabase.push("You started " + startLink);
                    terminalDatabase.push("");
                    window.open(startLink, "_blank");
                    pushCommand();
                }
                else {
                    pushNoncommand();
                }

                //Terminal DB Push
                function pushCommand() {
                    const formatTerminalDatabase = terminalDatabase + "";
                    const formattedTerminalDatabase = formatTerminalDatabase.split(",").join("<br>");
                    terminalText.innerHTML = formattedTerminalDatabase;
                }

                function pushNoncommand() {
                    terminalDatabase.push("$ " + terminalInput.value);
                    const formatTerminalDatabase = terminalDatabase + "";
                    const formattedTerminalDatabase = formatTerminalDatabase.split(",").join("<br>");
                    terminalText.innerHTML = formattedTerminalDatabase;
                }

                terminalInput.value = "";
                terminalInput.focus()
                scrollingElement.scrollTop = scrollingElement.scrollHeight;
            }
        });

    </script>
</body>
</html>
