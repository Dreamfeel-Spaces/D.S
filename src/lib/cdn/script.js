//@ts-nocheck

async function initDreamfeelPay({ CLIENT_ID, CLIENT_SECRET }) {

    return {
        Buttons() {
            console.log("BTNS")
            return this
        },
        createOrder(data, action) {
            console.log(data)
            return this
        }
    }
}
