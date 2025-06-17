const power_frequency = 2
const extra_amplitudes = [
    0.5,
    0.7,
    0.4,
    0.2,
    0.5,
    0.1,
    0.2,
    1
]
const extra_modifiers = [
    0.15,
    0,
    -0.1,
    0,
    0.1,
    -0.05,
    0.2,
    0
]
const extra_frequencies = [
    3,
    8,
    5,
    9,
    12,
    6,
    7,
    4
]
const extra_IDs = [
    "bagger",
    "motorisiertesKanguru",
    "ak47",
    "shibaInu",
    "fordMustang",
    "macBook",
    "hypixel",
    "krokodil"
]
const negativePowerLevelNames = [
    "Blobfisch (-10)",
    "Wasserflo (-20)",
    "Blaualge (-30)",
    "Plankton (-40)",
    "Einzeller (-50)",
    "Atomares Wesen (-60)",
    "Blattschwanzgecko (-70)",
    "Mir fällt nix mehr ein (-80)",
]
const powerLevelNames = [
    "Goldfisch (0)",
    "Teddybär (10)",
    "Biene (20)",
    "Koala (30)",
    "Panda (40)",
    "Gans (50)",
    "Kampfschildkröte (60)",
    "Braunbär (70)",
    "Löwe (80)",
    "Brontosaurus (90)",
    "Johannes Schneider (100)",
    "Ferdinand Weinwurm (110)",
    "Belugawal (120)",
    "Pistolenkrebs (130)",
    "Giganotosaurus (140)",
    "Gigamegasupersaurus (150)",
    "Gepanzertes Känguru (160)",
    "Kampfquokka (170)"
]

window.onload = async function() {
    document.getElementById("leftInput").addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            if (document.getElementById("leftInput").value !== "" && document.getElementById("rightInput").value !== "") {
                fight()
            }
        }
    });
    document.getElementById("rightInput").addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            if (document.getElementById("leftInput").value !== "" && document.getElementById("rightInput").value !== "") {
                fight()
            }
        }
    });
}

function get_unique_id(str) {
    let id = 0
    str = str.toLowerCase()
    str = str.replace("ü", "u")
    str = str.replace("ö", "o")
    str = str.replace("ä", "a")
    str = str.replace(/\s/g, "")
    str = reverse(str)
    for (let i = 0; i < str.length; i++) {
        id += (parseInt(str.charAt(i), 36) - 10) * Math.pow(26, i)
    }
    return id;
}

function reverse(str){
    return str.split("").reverse().join("");
}

function checkFightButton() {
    if (document.getElementById("leftInput").value !== "" && document.getElementById("rightInput").value !== "") {
        document.getElementById("fightButton").style.visibility = "visible"
    } else {
        document.getElementById("fightButton").style.visibility = "hidden"
    }
}

function getExtraPower(leftSide, ID) {
    let extraPower = 0.0
    if (leftSide) {
        for (let i = 0; i < extra_frequencies.length; i++) {
            extraPower += ((Math.sin(extra_frequencies[i] * ID) + extra_modifiers[i]) * (document.getElementById(extra_IDs[i] + "Left").checked ? 1 : 0)) * extra_amplitudes[i]
        }
    } else {
        for (let i = 0; i < extra_frequencies.length; i++) {
            extraPower += ((Math.sin(extra_frequencies[i] * ID) + extra_modifiers[i]) * (document.getElementById(extra_IDs[i] + "Right").checked ? 1 : 0)) * extra_amplitudes[i]
        }
    }
    console.log(extraPower)
    return extraPower
}

function fight() {
    let leftID = get_unique_id(document.getElementById("leftInput").value)
    let powerLeft = Math.sin(power_frequency * leftID)
    powerLeft += getExtraPower(true, leftID)
    document.getElementById("leftPowerLevelSpan").innerText = getPowerLabel(((powerLeft + 1) / 2) * 100)
    let rightID = get_unique_id(document.getElementById("rightInput").value)
    let powerRight = Math.sin(power_frequency * rightID)
    powerRight += getExtraPower(false, rightID)
    document.getElementById("rightPowerLevelSpan").innerText = getPowerLabel(((powerRight + 1) / 2) * 100)
    let leftWon = doesLeftWin((powerLeft + 1) / 2, (powerRight + 1) / 2)
    if (leftWon) {
        burstExplosionLeft()
        document.getElementById("leftWinText").innerText = "WINNER"
        document.getElementById("rightWinText").innerText = "LOSER"
    } else {
        burstExplosionRight()
        document.getElementById("leftWinText").innerText = "LOSER"
        document.getElementById("rightWinText").innerText = "WINNER"
    }
}

function getPowerLabel(power) {
    if (power < 0) {
        return negativePowerLevelNames[Math.floor(Math.abs(power) / 10)]
    }
    return powerLevelNames[Math.floor(power / 10)]
}

function doesLeftWin(powerLeft, powerRight) {
    let sum = powerLeft + powerRight
    let randf = Math.random() * sum
    console.log("PowerLeft: " + powerLeft + " PowerRight: " + powerRight + " randf: " + randf)
    return randf < powerLeft
}

function burstExplosionLeft() {
    confetti({ particleCount: 200, spread: 70, startVelocity: 60, origin: { x: 0.25, y: 0.4 } });
}

function burstExplosionRight() {
    confetti({ particleCount: 200, spread: 70, startVelocity: 60, origin: { x: 0.75, y: 0.4 } });
}