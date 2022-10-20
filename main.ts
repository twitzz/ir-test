function car_backward () {
    mecanumRobot.Motor(LR.Upper_left, MD.Back, 30)
    mecanumRobot.Motor(LR.Lower_left, MD.Back, 30)
    mecanumRobot.Motor(LR.Upper_right, MD.Back, 30)
    mecanumRobot.Motor(LR.Lower_right, MD.Back, 30)
}
function car_left () {
    mecanumRobot.Motor(LR.Upper_left, MD.Back, 35)
    mecanumRobot.Motor(LR.Lower_left, MD.Back, 35)
    mecanumRobot.Motor(LR.Upper_right, MD.Forward, 35)
    mecanumRobot.Motor(LR.Lower_right, MD.Forward, 35)
}
function car_forward () {
    mecanumRobot.Motor(LR.Upper_left, MD.Forward, 30)
    mecanumRobot.Motor(LR.Lower_left, MD.Forward, 30)
    mecanumRobot.Motor(LR.Upper_right, MD.Forward, 30)
    mecanumRobot.Motor(LR.Lower_right, MD.Forward, 30)
}
function car_right () {
    mecanumRobot.Motor(LR.Upper_left, MD.Forward, 35)
    mecanumRobot.Motor(LR.Lower_left, MD.Forward, 35)
    mecanumRobot.Motor(LR.Upper_right, MD.Back, 35)
    mecanumRobot.Motor(LR.Lower_right, MD.Back, 35)
}
basic.showIcon(IconNames.Happy)
mecanumRobot.setServo(80)
irRemote.connectInfrared(DigitalPin.P9)
let Temp = 0
let Input = 0
let strip = neopixel.create(DigitalPin.P8, 4, NeoPixelMode.RGB)
strip.clear()
basic.forever(function () {
    Temp = irRemote.returnIrButton()
    if (Temp != 0) {
        Input = Temp
    } else if (Input == 70) {
        strip.show()
        strip.clear()
        car_forward()
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
        mecanumRobot.setLed(LedCount.Left, LedState.ON)
        mecanumRobot.setLed(LedCount.Right, LedState.ON)
    } else if (Input == 68) {
        strip.show()
        strip.clear()
        car_left()
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            `)
        mecanumRobot.setLed(LedCount.Left, LedState.ON)
        mecanumRobot.setLed(LedCount.Right, LedState.OFF)
    } else if (Input == 67) {
        strip.show()
        strip.clear()
        car_right()
        basic.showLeds(`
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
            `)
        mecanumRobot.setLed(LedCount.Left, LedState.OFF)
        mecanumRobot.setLed(LedCount.Right, LedState.ON)
    } else if (Input == 21) {
        car_backward()
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
        mecanumRobot.setLed(LedCount.Left, LedState.OFF)
        mecanumRobot.setLed(LedCount.Right, LedState.OFF)
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
    } else if (Input == 64) {
        mecanumRobot.setLed(LedCount.Left, LedState.OFF)
        mecanumRobot.setLed(LedCount.Right, LedState.OFF)
        mecanumRobot.state(MotorState.stop)
        strip.show()
        strip.clear()
    }
})
