function doInit () {
    Score = 0
    MyHand = 0
    Status = 0
    Count = 0
}
function endJanken () {
    Status = 4
    if (Score == 0) {
        basic.showIcon(IconNames.Skull)
        music.startMelody(music.builtInMelody(Melodies.Punchline), MelodyOptions.Once)
        basic.pause(2000)
        basic.showNumber(Score)
    } else if (Score <= 2) {
        basic.showIcon(IconNames.Happy)
        music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
        basic.pause(2000)
        basic.showNumber(Score)
    } else if (Score == 3) {
        music.startMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.ForeverInBackground)
        for (let index = 0; index < 5; index++) {
            basic.showIcon(IconNames.SmallHeart)
            basic.showIcon(IconNames.Heart)
        }
        basic.showString("Good Job!")
        basic.showNumber(Score)
    }
    basic.pause(5000)
    music.stopMelody(MelodyStopOptions.All)
    doInit()
    waitForJanken()
}
function doJanken () {
    MyHand = 0
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
        Result = 0
    } else {
        if (Status == 1 && MyHand == 2) {
            basic.pause(1000)
            basic.showIcon(IconNames.Silly)
            Count += 1
        } else if (Status == 1 && MyHand == 3) {
            basic.pause(1000)
            basic.showIcon(IconNames.Confused)
            Score += 1
            Count += 1
        } else if (Status == 2 && MyHand == 3) {
            basic.pause(1000)
            basic.showIcon(IconNames.Silly)
            Count += 1
        } else if (Status == 2 && MyHand == 1) {
            basic.pause(1000)
            basic.showIcon(IconNames.Confused)
            Score += 1
            Count += 1
        } else if (Status == 3 && MyHand == 1) {
            basic.pause(1000)
            basic.showIcon(IconNames.Silly)
            Count += 1
        } else if (Status == 3 && MyHand == 2) {
            basic.pause(1000)
            basic.showIcon(IconNames.Confused)
            Score += 1
            Count += 1
        }
    }
    basic.pause(2000)
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
    while (Status == 0) {
        basic.showIcon(IconNames.Asleep)
    }
}
input.onButtonPressed(Button.AB, function () {
    MyHand = 3
})
input.onButtonPressed(Button.B, function () {
    MyHand = 2
})
let Result = 0
let Count = 0
let Status = 0
let MyHand = 0
let Score = 0
doInit()
waitForJanken()
