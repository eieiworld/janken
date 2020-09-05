function doInit () {
    Score = 0
    MyHand = 0
    Status = 0
    Count = 0
}
function endJanken () {
    basic.showNumber(Score)
    basic.pause(100)
    if (Score == 0) {
        music.startMelody(music.builtInMelody(Melodies.Punchline), MelodyOptions.Once)
        basic.showNumber(Score)
        basic.showIcon(IconNames.Skull)
    } else if (Score <= 2) {
        music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
        basic.showIcon(IconNames.Happy)
        basic.showNumber(Score)
    } else if (Score == 3) {
        music.startMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.OnceInBackground)
        for (let index = 0; index < 5; index++) {
            basic.showIcon(IconNames.SmallHeart)
            basic.showIcon(IconNames.Heart)
        }
        basic.showString("Thank you!")
        basic.showNumber(Score)
    }
    doInit()
}
function doJanken () {
    Status = randint(1, 3)
    music.playTone(440, music.beat(BeatFraction.Whole))
    basic.showIcon(IconNames.SmallDiamond)
    music.playTone(440, music.beat(BeatFraction.Whole))
    basic.showIcon(IconNames.Diamond)
    music.playTone(880, music.beat(BeatFraction.Whole))
    basic.showIcon(IconNames.Chessboard)
    while (MyHand == 0) {
        basic.pause(1)
    }
    if (Status == 1) {
        basic.showLeds(`
            . . . . .
            . # # # .
            # # # # #
            # # # # #
            . # # # .
            `)
    } else if (Status == 2) {
        basic.showLeds(`
            . # . # .
            . # . # .
            # # . # #
            # # # # #
            . # # # .
            `)
    } else if (Status == 3) {
        basic.showLeds(`
            . # # # #
            . # # # #
            # # # # #
            # # # # #
            . # # # .
            `)
    }
    if (Status == MyHand) {
        basic.pause(1000)
        MyHand = 0
        doJanken()
    } else {
        if (Status == 1 && MyHand == 2) {
            basic.pause(1000)
            basic.showIcon(IconNames.Silly)
        } else if (Status == 1 && MyHand == 3) {
            basic.pause(1000)
            basic.showIcon(IconNames.Confused)
            Score += 1
        } else if (Status == 2 && MyHand == 3) {
            basic.pause(1000)
            basic.showIcon(IconNames.Silly)
        } else if (Status == 2 && MyHand == 1) {
            basic.pause(1000)
            basic.showIcon(IconNames.Confused)
            Score += 1
        } else if (Status == 3 && MyHand == 1) {
            basic.pause(1000)
            basic.showIcon(IconNames.Silly)
        } else if (Status == 3 && MyHand == 2) {
            basic.pause(1000)
            basic.showIcon(IconNames.Confused)
            Score += 1
        }
        Count += 1
    }
    if (Count < 3) {
        doJanken()
    } else {
        endJanken()
    }
}
input.onButtonPressed(Button.A, function () {
    MyHand = 1
})
input.onGesture(Gesture.Shake, function () {
    if (Status == 0) {
        doJanken()
    }
})
function waitForJanken () {
    if (Status == 0) {
        basic.showIcon(IconNames.Asleep)
    }
}
input.onButtonPressed(Button.AB, function () {
    MyHand = 3
})
input.onButtonPressed(Button.B, function () {
    MyHand = 2
})
let Count = 0
let Status = 0
let MyHand = 0
let Score = 0
doInit()
basic.forever(function () {
    waitForJanken()
})
