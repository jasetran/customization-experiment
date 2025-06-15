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
};

// function to dynamically set the background
export function setBackground(scene) {
    if (scene === 0) {
        return undefined;
    } else if (scene === 1) {
        return "--background-image: url(./assets/bg/bg-intro.svg)";
    } else if (scene === 2) {
        return "--background-image: url(./assets/bg/bg-customize.svg); --blur-amount: 0.1rem;";
    } else {
        return "--background-image: url(./assets/bg/bg-chat.svg); --blur-amount: 0.1rem;";
    }
}

// function to randomize the avatar
export function randomizeAvatar(userState, avatarComponents) {
    // options for different colors of the assets
    const nameOptions = ["Billy", "Dylan", "Sam", "Alex", "Wren", "Robin"];
    const skinTones = [ "#f9dcc4", "#f0c49d", "#dba67b", "#c28868", "#a16642", "#7f4a2b", "#59311d" ]; // prettier-ignore
    const hairColors = [ "#2e1a12", "#4b2e1f", "#d4a373", "#f6e7c1", "#a7a7a7", "#000000", "#893e66", "#d62828" ]; // prettier-ignore
    const eyeColors = [ "#17110f", "#3e2f25", "#5b8e7d", "#567d99", "#7b9e89", "#a482bf" ]; // prettier-ignore
    const clothesColors = [ "#338dab", "#db5461", "#fab95b", "#6f8f72", "#9e6c9e", "#f3f3f3", "#000000" ]; // prettier-ignore
    const accessoriesColors = [ "#69371b", "#c6c6c6", "#d4af37", "#1e6091", "#b5838d", "#222222" ]; // prettier-ignore

    // name randomization
    userState.charName = randomizeOptions(nameOptions);

    // head randomization
    userState.charHead = randomizeOptions(avatarComponents.heads);
    userState.headColor = randomizeOptions(skinTones);

    // hair randomization
    userState.charHair = randomizeOptions(avatarComponents.hairs);
    userState.hairColor = randomizeOptions(hairColors);

    // eyes randomization
    userState.charEyes = randomizeOptions(avatarComponents.eyes);
    userState.eyesColor = randomizeOptions(eyeColors);

    // mouth randomization
    userState.charMouth = randomizeOptions(avatarComponents.mouths);

    // nose randomization
    userState.charNose = randomizeOptions(avatarComponents.noses);

    // eyebrows default
    userState.charEyebrows = avatarComponents.eyebrows["eyebrows-neutral"];

    // clothes randomization
    const clothesEntries = Object.values(avatarComponents.clothes);
    const selectedClothes = randomizeOptions(clothesEntries);

    userState.charClothes = selectedClothes.component;
    userState.clothesColor = randomizeOptions(clothesColors);

    // selection the appropriate sleeve and arm for the clothes
    const sleeveType = selectedClothes.sleeveType ?? "long";
    const armsKey = `arms-neutral-${sleeveType}`;
    userState.charArms = avatarComponents.arms[armsKey];

    // accessory randomization
    userState.charAccessories = randomizeOptions(avatarComponents.accessories);
    userState.accessoriesColor = randomizeOptions(accessoriesColors);
}

// function to change the avatar's facial expression in the embodied conditions
export function setExpression(userState, avatarComponents) {
    if (userState.emotion == "neutral") {
    }

}
