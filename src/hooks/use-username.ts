import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

const ANIMALS = [
  "wolf", "bear", "deer", "fox", "rabbit", "turtle", "monkey", "panda", "koala", "giraffe",
  "lion", "tiger", "elephant", "zebra", "kangaroo", "sloth", "penguin", "otter", "axolotl", "capybara",
  "aardvark", "alligator", "alpaca", "antelope", "armadillo", "baboon", "badger", "bat", "beaver", "bison",
  "camel", "cat", "chameleon", "cheetah", "chimpanzee", "cougar", "dolphin", "eagle", "elephant", "falcon",
  "flamingo", "frog", "gazelle", "gorilla", "hamster", "hedgehog", "hippo", "jellyfish", "kangaroo", "lemur",
  "leopard", "llama", "manatee", "meerkat", "narwhal", "octopus", "orangutan", "panther", "parrot", "penguin",
  "platypus", "raccoon", "rhino", "seal", "shark", "snake", "tiger", "walrus", "whale", "yak"
];

const STORAGE_KEY = "chat_username";

const generateUsername = () => {
  const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  const id = nanoid(5);
  return `anonymous-${animal}-${id}`;
}


export const useUsername = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const loadUsername = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUsername(stored);
        return;
      }

      const newUsername = generateUsername();
      localStorage.setItem(STORAGE_KEY, newUsername);
      setUsername(newUsername);
    };

    loadUsername();
  }, []);

  return { username };
};
