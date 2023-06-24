const box = document.getElementById("box")
const plainInput = document.getElementById("plain-input")
const cipher = document.getElementById("cipher-input")
const convertButton = document.getElementById("convert-button")
const selection = document.getElementById("selection")

let inputElement

const specialIndex = ["00", "01", "02", "03", "04", "05", "10", "20", "30", "40", "50"]

const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
]

for (let x = 0; x < 6; x++) {
    for (let y = 0; y < 6; y++) {
        inputElement = document.createElement("input")
        inputElement.setAttribute("type", "text")
        inputElement.setAttribute("maxLength", 1)
        const encodeValue = `${x}${y}`
        inputElement.setAttribute("data-encode", encodeValue)

        if (specialIndex.includes(encodeValue)) {
            inputElement.value = encodeValue.startsWith("0") ? encodeValue.charAt(1) : encodeValue.charAt(0)
            inputElement.disabled = true
        } else {
            inputElement.setAttribute("data-char", "")
        }

        if (encodeValue === "00") {
            inputElement.value = ""
        }

        box.append(inputElement)
    }
}

const allInput = document.querySelectorAll("[data-encode]")

const resetInput = () => {
    Array.from(allInput).forEach(input => {
        input.classList.remove("selected")
    })
}

convertButton.addEventListener("click", () => {
    resetInput()
    const plainText = plainInput.value.split(" ")
    let words = []
    plainText.forEach(text => {
        let result = ""
        text.split("").forEach(char => {
            const matchedInput = Array.from(allInput).find(input => input.value == char)
            if (matchedInput) {
                matchedInput.classList.add("selected")
                const decoded = matchedInput.getAttribute("data-encode")
                result += decoded
            }
        })
        words.push(result)
    })
    cipher.value = words.join(" ")
})

const allCharInput = document.querySelectorAll("[data-char]")

const insertBasicValue = () => {
    for (let index = 0; index < allCharInput.length; index++) {
        allCharInput[index].value = alphabet[index]
    }
}

selection.addEventListener("change", () => {
    if ((selection.value = "auto")) insertBasicValue()
})

cipher.addEventListener("click", async () => {
    try {
        if (cipher.value === "") {
            return
        } else {
            // cipher.select()
            // cipher.setSelectionRange(0, 99999)
            await navigator.clipboard.writeText(cipher.value)
            alert("success copy")
        }
    } catch (error) {}
})
