const dgram = window.nodeApi.dgram

export class UdpSocketConnector {
    #game;
    #socket;
    sendIntervalId;

    constructor(game) {
        this.#game = game
    }

    close() {
        this.#socket.close()
    }

    connect(ip, port, loginCode) {
        let logged = false;

        const socket = dgram.createSocket('udp4');
        this.#socket = socket

        const connector = this
        const game = this.#game
        socket.on('close', function () {
            clearInterval(connector.sendIntervalId)
            console.log("UdpSocket closed")
        });
        socket.on('error', function (error) {
            alert(`Cannot connect to '${ip}:${port}'`)
            console.log("UdpSocket error: " + error.message)
        });
        socket.on('connect', function () {
            console.log("UdpSocket connection established.")
            if (!logged) {
                console.log("Sending login code to server.")
                socket.send("login " + loginCode)
                logged = true
            }
        });
        socket.on('message', function (msg) {
            let state
            try {
                state = JSON.parse(msg.toString())
            } catch (err) {
                game.end("Message parse error! " + err.message)
                return
            }
            game.tick(state)
        });

        socket.connect(port, ip)
    }

    startLoop(control, tickMs) {
        const game = this.#game
        const socket = this.#socket

        this.sendIntervalId = setInterval(function () {
            if (!game.isPlaying() || !game.meIsAlive()) {
                return;
            }

            let data = control.getTickAction()
            if (data !== '') {
                socket.send(data)
            }
        }, tickMs)
    }
}