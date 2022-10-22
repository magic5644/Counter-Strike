import {InventorySlot} from "./Enums.js";

export class Control {
    #game
    #action
    #setting

    constructor(game, action, setting) {
        this.#game = game
        this.#action = action
        this.#setting = setting
    }

    init(pointer) {
        const self = this
        const action = this.#action
        const game = this.#game
        const sprayEnableSlots = [InventorySlot.SLOT_KNIFE, InventorySlot.SLOT_PRIMARY]

        document.addEventListener("mouseup", function (event) {
            event.preventDefault()

            action.sprayingDisable()
        })
        document.addEventListener("mousedown", function (event) {
            event.preventDefault()

            action.sprayingDisable()
            if (!game.isPlaying() || game.isPaused() || !game.meIsAlive()) {
                return
            }
            if (!pointer.isLocked || !game.playerMe.data.canAttack) {
                return;
            }

            if (sprayEnableSlots.includes(game.playerMe.getEquippedSlotId())) {
                action.sprayingEnable()
            }
            action.attack(game.getPlayerMeRotation())
        })
        document.addEventListener('wheel', (event) => {
            event.preventDefault()

            if (!(game.isPlaying() && game.meIsAlive())) {
                return
            }

            if (event.deltaY > 0) {
                action.equip(InventorySlot.SLOT_SECONDARY)
            } else {
                action.equip(InventorySlot.SLOT_PRIMARY)
            }
        })
        document.addEventListener('keydown', function (event) {
            event.preventDefault()

            if (!game.isPlaying() || !game.meIsAlive()) {
                return
            }

            const actionIndex = self.#setting.getBinds()[event.key]
            if (actionIndex !== undefined) {
                self.#action.actionCallback[actionIndex](true)
            }
        });
        document.addEventListener('keyup', function (event) {
            event.preventDefault()

            if (!(game.isPlaying() && game.meIsAlive())) {
                return
            }

            const actionIndex = self.#setting.getBinds()[event.key]
            if (actionIndex !== undefined) {
                self.#action.actionCallback[actionIndex](false)
            }
        });
    }

    getTickAction() {
        return this.#action.getPlayerAction(this.#setting.getSprayTriggerDeltaMs())
    }
}
