
// set parameters for web app
// function to randomly select an option
export function randomizeOptions(options) {
    if (!options) return null;

    if (Array.isArray(options)) {
        return options[Math.floor(Math.random() * options.length)];
    }

    if (typeof options === "object") {
        const values = Object.values(options);
        return values[Math.floor(Math.random() * values.length)];
    }

    return null;
}

export const parameters = {
    conditions: ["text", "random", "customize"],
    randomNames: [
        "Noah",
        "Melina",
        "Leah",
        "Eddie",
        "Eris",
        "Logan",
        "Lincoln",
        "Madelyn",
        "Lillian",
        "Lucian",
        "Celeste",
        "Criselle",
        "Camden",
        "Adrian",
        "Pao",
        "Dylan",
        "Ethan",
        "Amy",
        "Natalie",
        "Henry",
        "An",
        "Anya",
    ],
}

// function to dynamically set the background
export function setBackground(scene) {
    if (scene === 0) {
        return undefined;
    } else if (scene === 1) {
        return "./assets/bg/bg-intro.svg";
    } else if (scene === 2) {
        return "./assets/bg/bg-customize.svg); --blur-amount: blur(2px);";
    } else {
        return "./assets/bg/bg-chat.svg); --blur-amount: blur(2px);";
    }
}
