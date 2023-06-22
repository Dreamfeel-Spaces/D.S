//@ts-nocheck
async function initDreamfeelPay({ CLIENT_ID, CLIENT_SECRET }) {
    return {
        Buttons() {
            // console.log("BTN  S")
            return this
        },
        createOrder(data, action) {
            // console.log(data)
            return this
        },
        onApprove(func) {
            func()
        },
        onReject(func) {
            func()
        },
        renderBtn(id) {
            id = id.replace("?", "")
            const btnContainer = document.getElementById(id)
            const btn = document.createElement("button")
            const btnContent = document.createElement("span")
            const logo = document.createElement("img")
            logo.height = "100%"
            logo.src = "https://pay.dreamfeel.me/_app/immutable/assets/pay-transparent-45fa8770.png"
            btnContent.appendChild(logo)
            btn.append(btnContent)


            btn.onclick = this.handleClick

            btnContainer.append(btn)
        },
        handleClick() {

            // Set the mini browser window size to match the size of authentication popups
            var windowWidth = 500;
            var windowHeight = 600;

            // Get the screen width and height
            var screenWidth = window.screen.width;
            var screenHeight = window.screen.height;

            // Calculate the x and y coordinates of the window to center it on the screen
            var x = (screenWidth - windowWidth) / 2;
            var y = (screenHeight - windowHeight) / 2;

            // Open the mini browser window at the center of the screen
            var myWindow = window.open("", "myWindow", "width=500,height=600,left=" + x + ",top=" + y);

            // Create a loading indicator element
            var loadingIndicator = document.createElement("div");
            loadingIndicator.textContent = "Loading...";
            loadingIndicator.style.position = "absolute";
            loadingIndicator.style.top = "50%";
            loadingIndicator.style.left = "50%";
            loadingIndicator.style.transform = "translate(-50%, -50%)";

            // Create an iframe element
            var iframe = document.createElement("iframe");

            // Set the iframe width and height to 100%
            iframe.style.width = "100%";
            iframe.style.height = "100%";

            // Append the loading indicator and iframe to the document body of the mini browser window
            myWindow.document.body.appendChild(loadingIndicator);
            myWindow.document.body.appendChild(iframe);

            // Set the margin and padding of the html and body elements to 0
            myWindow.document.documentElement.style.margin = "0";
            myWindow.document.documentElement.style.padding = "0";
            myWindow.document.body.style.margin = "0";
            myWindow.document.body.style.padding = "0";

            // Set the iframe source to a webpage of your choice
            iframe.src = "https://pay.dreamfeel.me";

            // Show the loading indicator until the iframe has finished loading
            iframe.addEventListener("load", function () {
                loadingIndicator.style.display = "none";
            });


        }
    }
}
